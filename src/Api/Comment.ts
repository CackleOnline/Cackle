import rethinkDbConnectionObject from "../db"
import r from 'rethinkdb'
import app from 'express'
var Comment1 = app.Router()

Comment1.post('/comment', function (req: any, res: any) {
    r.connect(rethinkDbConnectionObject, (err, conn) => {
        if (err) {
            console.error('Error:', err);
            res.send('an error occured')
            return;
        }
        try {
            conn.use('cackle')

            r.table('logins').filter(r.row('token').eq(req.header('Authentication'))).
                run(conn, function (err, cursor) {
                    try {
                        if (err) throw err;
                        cursor.toArray(function (err, result) {
                            if (err) throw err;
                            r.table('comments').
                                run(conn, function (err, cursor) {
                                    try {
                                        if (err) throw err;
                                        cursor.toArray(function (err, result1) {
                                            if (err) throw err;
                                            if (result[0].expire > Date.now()) {
                                                r.table('comments').insert({ id: result1.length + 1, post_id: req.body.post, content: req.body.content, author: result[0].account, timestamp: Date.now() }).run(conn,(err,res1)=>
                                                {
                                                    if(err) res.send({ message: "An error has occured" });
                                                    console.log(res1)
                                                }
                                                )
                                                
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
        } catch (e) {
            console.log(e)
            res.send({ message: 'an error occured' })
        }
    });
})

export default Comment1