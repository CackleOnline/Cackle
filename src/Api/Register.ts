import rethinkDbConnectionObject from "../db"
import r from 'rethinkdb'
import app from 'express'
import { hashSync } from 'bcrypt'
import e from "express"
var Register = app.Router()
import rateLimit from 'express-rate-limit'
const createAccountLimiter = rateLimit({
    //windowMs: 60 * 60 * 1000,
    //max: 4,
    //message:
    //    "Too many accounts created from this IP, please try again after an hour"
});

Register.post('/register', createAccountLimiter, function (req: any, res: any) {
    r.connect(rethinkDbConnectionObject, (err, conn) => {
        if (err) {
            console.error('Error:', err);
            res.send('an error occured')
            return;
        }
        try {
            conn.use('cackle')
            console.log(req.body)
            r.table('users').filter(r.row('username').eq(req.body.username)).
                run(conn, function (err, cursor) {
                    try {
                        if (err) throw err;
                        cursor.toArray(function (err, result) {
                            try{
                                if (err) throw err;
                                if (result.length <= 0) {
                                    if (req.body.email === req.body.email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g)[0]) {
                                        if (req.body.username.toLowerCase() === req.body.username.match(/[A-z0-9]{3,10}/g)[0]) {
                                            if (res.body.password.length >= 5) {
                                                var hash = hashSync(req.body.password, 12)
                                                r.table('users').insert({ username: req.body.username, email: req.body.email, password: hash }).run(conn)
                                                res.send({ message: "account created successfully" })
                                            } else {
                                                res.send({ message: "your password must be at least 5 characters long" })
                                            }
                                        } else {
                                            res.send({ message: "that is not a valid username" })
                                        }
                                    } else {
                                        res.send({ message: "that is not a valid email" })
                                    }
                                } else {
                                    res.send({ message: "account already exists with that username" })
                                }
                            }catch(e){
                                console.log(e)
                                res.send({ message: "error" })
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