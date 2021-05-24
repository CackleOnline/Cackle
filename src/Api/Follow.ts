import rethinkDbConnectionObject from "../db"
import r from 'rethinkdb'
import app from 'express'
var Follow = app.Router()

Follow.post('/follow/:user', function (req: any, res: any) {
    r.connect(rethinkDbConnectionObject, (err, conn) => {
        if (err) {
            console.error('Error:', err);
            res.send('an error occured')
            return;
        }
        try {
            conn.use('cackle')
            r.table('users').filter(r.row('username').eq(req.params.user)).
                run(conn, function (errr, c) {
                    c.toArray(function (err, resulth) {
                        if(resulth.length <= 1){
                            res.send({message:"the user you where trying to follow doesnt exist"})
                        }else{
                r.table('logins').filter(r.row('token').eq(req.header('Authentication'))).
                    run(conn, function (err, cursor) {
                        try {
                            if (err) throw err;
                            cursor.toArray(function (err, result) {
                                if (err) throw err;
                                r.table('users').filter(r.row('username').eq(req.params.user)).
                                    run(conn, function (err, cursor) {
                                        try {
                                            if (err) throw err;
                                            cursor.toArray(function (err, result1) {
                                                if (err) throw err;
                                                if (result[0].expire > Date.now()) {
                                                    r.table('follows').filter(r.row('userFollowed').eq(result1[0].username)).filter(r.row('userFollowing').eq(result[0].account)).
                                                        run(conn, function (err, cursor) {
                                                        try {
                                                            if (err) throw err;
                                                            cursor.toArray(function (err, result11) {
                                                                console.log(result11.length)
                                                                if(result11.length <= 0){
                                                                    r.table('follows').insert({ userFollowed: result1[0].username, userFollowing: result[0].account, timestamp: Date.now() }).run(conn,(err, reseff)=>{
                                                                        console.log(reseff)
                                                                        console.log(err)
                                                                    })
                                                                }else{
                                                                    r.table('follows').filter(r.row('userFollowed').eq(result1[0].username)).filter(r.row('userFollowing').eq(result[0].account)).delete().run(conn,(err, reseff)=>{
                                                                        console.log(reseff)
                                                                        console.log(err)
                                                                    })
                                                                }
                                                            })}catch(e){
                                                                console.log(e)
                                                                res.send({ message: "error" })
                                                            }
                                                        }
                                                    )
                                                    res.send({ message: "successful" })

                                                } else {
                                                    res.send({ message: "sorry, your session has expired." })
                                                }
                                            });
                                        } catch (e) {
                                            console.log(e)
                                            res.send({ message: 'an error occured' })
                                        }
                                    });
                            });
                        } catch (e) {
                            console.log(e)
                            res.send({ message: 'an error occured' })
                        }
                    });
                    }})
                });
        } catch (e) {
            console.log(e)
            res.send({ message: 'an error occured' })
        }
    });
})

export default Follow