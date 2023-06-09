
import flake from '../utils/flake.js';
import h from 'jsonwebtoken';
import r from 'rethinkdb';
import connect from '../db.js';

class Mail {

    async containsValidUser(username) {
        const conn = await connect();
        const cursor = await r.table('users').filter({ username: username }).run(conn);
        const rows = await cursor.toArray();
        await conn.close()
        return rows.length > 0
    }

    async validMail(id) {
        const conn = await connect();
        const cursor = await r.table('users').filter({ ID: id }).run(conn);
        const rows = await cursor.toArray();
        await conn.close()
        return rows.length > 0
    }

    async New(token, to, cc, bcc, content) {
        try {
            let jwt = h.verify(token, process.env.JWT_SECRET)

            if (typeof jwt != "object" || typeof token != "string")
                return { success: false, message: "'Token' field must be a valid token." }
            if (typeof to != "string")
                return { success: false, message: "'To' field must be a string." }
            if (typeof cc != "object")
                return { success: false, message: "'CC' field must be an array." }
            if (typeof bcc != "object")
                return { success: false, message: "'BCC' field must be an array." }
            if (typeof content != "string")
                return { success: false, message: "'Content' field must be a string" }

            if (!jwt)
                return { success: false, message: "'Token' field must be a valid token." }

            // check for valid user id in to, cc, bcc, we need to iterate over the cc and bcc arrays
            for (let i = 0; i < cc.length; i++) {
                if (!this.containsValidUser(cc[i]))
                    return { success: false, message: "'CC' field must be a valid email." }
            }
            for (let i = 0; i < bcc.length; i++) {
                if (!this.containsValidUser(bcc[i]))
                    return { success: false, message: "'BCC' field must be a valid email." }
            }

            const conn = await connect();
            const snowflake = flake()
            const timestamp = Date.now()
            const result = await r.table('mails').insert({ ID: snowflake, timestamp: timestamp, from: jwt.username, to: to, cc: cc, bcc: bcc, content: content, read: false }).run(conn)

            await conn.close()

            return { success: true, message: "Mail sent successfully!" }
        } catch (err) {
            console.log(err)
            return { success: false, message: "There was an unknown error." };
        }
    }

    async Read(id, token) {
        try {
            let jwt = h.verify(token, process.env.JWT_SECRET)

            if (typeof jwt != "object" || typeof token != "string")
                return { success: false, message: "'Token' field must be a valid token." }
            if (!this.containsValidUser(jwt.id))
                return { success: false, message: "User does not exist or the token is invalid." }

            if (!this.validMail(id))
                return { success: false, message: "'ID' field must be a valid mail." }

            let conn = await connect();
            const cursor = await r.table('mails').filter({ ID: id }).run(conn);
            const rows = await cursor.toArray();
            await conn.close()
            // make sure the user is either in the to, cc, or bcc fields and if not just return an error
            conn = await connect();
            let validUserForMail = false
            for (let i = 0; i < rows[0].cc.length; i++) {
                // check if the user is in the cc and if they dont appear once (or more) in the cc
                if (this.containsValidUser(rows[0].cc[i]))
                    validUserForMail = true
            }
            for (let i = 0; i < rows[0].bcc.length; i++) {
                // check if the user is in the bcc and if they dont appear once (or more) in the bcc
                if (this.containsValidUser(rows[0].bcc[i]))
                    validUserForMail = true
            }

            if (rows[0].to == jwt.id || rows[0].from == jwt.id)
                validUserForMail = true

            if (!validUserForMail)
                return { success: false, message: "User does not exist or the token is invalid." }

            await r.table('mails').filter({ ID: id }).update({ read: true }).run(conn)
            await conn.close()

            // remove bcc field before sending it to them
            rows[0].bcc = undefined
            rows[0].id = undefined

            return { success: true, message: "Mail read successfully!", mail: rows[0] }
        } catch (e) {
            console.log(e)
            return { success: false, message: "There was an unknown error." };
        }
    }

    async fetchAll(token) {
        try {
            let jwt = h.verify(token, process.env.JWT_SECRET);
            if (typeof jwt != "object" || typeof token != "string")
                return { success: false, message: "'Token' field must be a valid token." };

            // Check if the user has permission to access mail
            if (!this.containsValidUser(jwt.id))
                return { success: false, message: "User does not exist or the token is invalid." };

            // Connect to the database
            let conn = await connect();

            // Query the mails table for all mails that the user has permission to see
            const cursor = await r.table('mails').orderBy('timestamp').run(conn)

            // Get the array of mails from the cursor
            const rows = await cursor.toArray()

            // iterate over the rows
            for (let i = 0; i < rows.length; i++) {

                let validUserForMail = false
                if (rows[i].to == jwt.username || rows[i].from == jwt.username)
                    validUserForMail = true

                for (let j = 0; j < rows[i].cc.length; j++) {
                    if (this.containsValidUser(rows[i].cc[j]) === jwt.username)
                        validUserForMail = true
                }
                for (let j = 0; j < rows[i].bcc.length; j++) {
                    if (this.containsValidUser(rows[i].bcc[j]) === jwt.username)
                        validUserForMail = true
                }

                rows[i].bcc = undefined
                rows[i].id = undefined
            }

            await conn.close();

            // Return the array of mails
            return { success: true, message: "Successfully gathered all mails", mail: rows }
        } catch (error) {
            console.log(error)
            return { success: false, message: "There was an unknown error." };
        }
    }

}

export default Mail