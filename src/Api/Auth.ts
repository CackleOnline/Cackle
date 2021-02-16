import rethinkDbConnectionObject from "../db"
import r from 'rethinkdb'
import app from 'express'
import { compareSync } from 'bcrypt'
var Auth = app.Router()

function tokenGen(size) {
    var generatedOutput = '';
    var storedCharacters =
        '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-';
    var totalCharacterSize = storedCharacters.length;
    for (var index = 0; index < size; index++) {
        generatedOutput += storedCharacters.charAt(Math.floor(Math.random() *
            totalCharacterSize));
    }
    return generatedOutput;
}

Auth.post('/auth', function (req: any, res: any) {
    r.connect(rethinkDbConnectionObject, (err, conn) => {
        if (err) {
            console.error('Error:', err);
            res.send('an error occured')
            return;
        }
        try {
            conn.use('cackle')
            r.table('users').filter(r.row('username').eq(req.body.username)).
                run(conn, function (err, cursor) {
                    try {
                        if (err) throw err;
                        cursor.toArray(function (err, result) {
                            try {
                                if (err) throw err;
                                if (compareSync(req.body.password, result[0].password)) {
                                    var token = tokenGen(75)
                                    r.table('logins').insert({ token: token, account: result[0].username, expire: Date.now() + (1000 * 604800) }).run(conn)
                                    res.send({ token: token })
                                } else {
                                    res.send({ message: "error" })
                                }
                            } catch (e) {
                                console.log(e)
                                console.log(result[0])
                                res.send({ message: "error" })
                            }
                        });
                    } catch (e) {
                        console.log(e)
                        res.send({ message: "error" })
                    }
                });
        } catch (e) {
            res.send({ message: "error" })
        }
    });
})

export default Auth