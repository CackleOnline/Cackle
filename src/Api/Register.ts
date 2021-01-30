import rethinkDbConnectionObject from "../db"
import r from 'rethinkdb'
import app from 'express'
import { hashSync } from 'bcrypt'
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
                    if (err) throw err;
                    cursor.toArray(function (err, result) {
                        if (err) throw err;

                        if (result.length <= 0) {
                            var hash = hashSync(req.body.password, 12)
                            r.table('users').insert({ username: req.body.username, password: hash}).run(conn)
                            res.send({message:"account created successfully"})
                        } else {
                            res.send({ message: "account already exists with that username" })
                        }
                    });
                });
        } catch (e) {
            res.send('error')
        }
    });
})

export default Register