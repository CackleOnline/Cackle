import bcrypt from 'bcrypt';
import flake from '../Utils/flake.js';
import validate from '../Utils/validation.js';
import h from 'jsonwebtoken';
import r from 'rethinkdb';
import connect from '../db.js';

export default class Auth {
    async Login(username, password) {
        try {
            username = username.toLowerCase()
            const conn = await connect();
            const cursor = await r.table('users').filter({username: username}).run(conn)
            const rows = await cursor.toArray()
            if (rows.length == 0)
                return { success: false, message: "User either does not exist or the password is wrong." }

            await conn.close()
            let passValid = await bcrypt.compare(password, rows[0].password)

            if (!passValid)
                return { success: false, message: "User either does not exist or the password is wrong." }
            let jwt = h.sign({ id: rows[0].ID, username: rows[0].username }, process.env.JWT_SECRET)
            return { success: true, message: "Logged in successfully!", token: jwt }
        } catch(e) {
            console.log(e)
            return { success: false, message: "Failed to login." }
        }
    }

    async Register(username, password) {
        try {
            username = username.toLowerCase()
            if (!validate(username))
                return { success: false, message: "User is not valid or already exists." }
            const conn = await connect();
            const cursor = await r.table('users').filter({username: username}).run(conn);
            const rows = await cursor.toArray();
            if (rows.length > 0)
                return { success: false, message: "User is not valid or already exists." }

            await conn.close()
            const snowflake = flake()
            const hashed = await bcrypt.hash(password, 10)

            const conn2 = await connect();
            const result = await r.table('users').insert({ID: snowflake, password: hashed, username: username}).run(conn2)
            await conn2.close()

            return { success: true, message: "User created successfully!" }
        } catch(e) {
            console.log(e)
            return { success: false, message: "Failed to register." }
        }
    }
}
