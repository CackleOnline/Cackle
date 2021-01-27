import rethinkDbConnectionObject from "../db"
import r from 'rethinkdb'
import app from 'express'
var Post = app.Router()

Post.post('/', function (req: any, res: any) {
    r.connect(rethinkDbConnectionObject, (err, conn) => {
        if (err) {
            console.error('Error:', err);
            res.send('an error occured')
            return;
        }
        try{
        conn.use('cackle')
        r.table('posts').insert({ title: req.body.title, content: req.body.content, author: "kiwiscripter", timestamp: Date.now() }).run(conn)
        res.send('successful')
        }catch(e) {
            res.send('error')
        }
    });
})

export default Post