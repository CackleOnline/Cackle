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

Posts.get('/posts/:user', function (req: any, res: any) {
    r.connect(rethinkDbConnectionObject, (err, conn) => {
        conn.use('cackle')
        if (err) {
            console.error('Error:', err);
            return;
        }

        r.table('posts').filter(r.row('author').eq(req.params.user)).
            run(conn, function (err, cursor) {
                if (err) throw err;
                cursor.toArray(function (err, result) {
                    if (err) throw err;
                    var results = JSON.stringify(result, null, 2)
                    res.send(result)
                });
            });
    });
})

export default Posts