import rethinkDbConnectionObject from "../db"
import r from 'rethinkdb'
import app from 'express'
var Post = app.Router()



Post.post('/post', function (req: any, res: any) {
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
                    console.log(req.header('Authentication'))
                    try{
                    if (err) throw err;
                    cursor.toArray(function (err, result) {
                        if (err) throw err;
                        console.log(result[0])

                        if (result[0].expire > Date.now()) {
                            r.table('posts').insert({ title: req.body.title, content: req.body.content, author: result[0].account, timestamp: Date.now() }).run(conn)
                            res.send({ message: "successful" })
                        } else {
                            res.send({ message: "sorry, your session has expired." })
                        }
                    });
                    }catch(e){
                        console.log(e)
                        res.send({message: 'an error occured'})
                    }
                });
        } catch (e) {
            console.log(e)
            res.send({message: 'an error occured'})
        }
    });
})

export default Post