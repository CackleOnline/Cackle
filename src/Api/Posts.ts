import r from 'rethinkdb'
import rethinkDbConnectionObject from '../db'
import app from 'express'
var Posts = app.Router()

Posts.get('/posts', function (req: any, res: any) {
    r.connect(rethinkDbConnectionObject, (err, conn) => {
        conn.use('cackle')
        if (err) {
            console.error('Error:', err);
            return;
        }
        r.table('posts').run(conn, (data, data2) => {
            res.send(data2['_responses'][0].r)
        })
    });
})

export default Posts