import rethinkDbConnectionObject from "../db"
import r from 'rethinkdb'
import app from 'express'
import { hashSync } from 'bcrypt'
import e from "express"
var Register = app.Router()

Register.post('/register', function (req: any, res: any) {
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
                            if (err) throw err;

                            if (result.length <= 0) {
                                if (req.body.username === req.body.username.match(/[A-z0-9]{3,10}/g)[0]) {
                                    if (res.body.password.length >= 5) {
                                        var hash = hashSync(req.body.password, 12)
                                        r.table('users').insert({ username: req.body.username, password: hash }).run(conn)
                                        res.send({ message: "account created successfully" })
                                    } else {
                                        res.send({ message: "your password must be at least 5 characters long" })
                                    }
                                } else {
                                    res.send({ message: "that is not a valid username" })
                                }
                            } else {
                                res.send({ message: "account already exists with that username" })
                            }
                        });
                    } catch (e) {
                        console.log(e)
                        res.send("error")
                    }
                });
        } catch (e) {
            console.log(e);
            res.send('error')
        }
    });
})

export default Register