import r from 'rethinkdb'
import rethinkDbConnectionObject from '../db'
import app from 'express'
var Posts = app.Router()

Posts.get('/posts', function (req: any, res: any) {
    try{
    r.connect(rethinkDbConnectionObject, (err, conn) => {
        conn.use('cackle')
        if (err) {
            console.error('Error:', err);
            res.send([])
            return;
        }
        r.table('posts').orderBy({index:'id'}).run(conn, (data, data2) => {
            data2.toArray(function (err, result) {
                if (err) throw err;
                var results = JSON.stringify(result.reverse(), null, 2)
                res.send(result)
            });
        })
    });
}catch(e){
    console.log(e)
    res.send({message:"an error occured"})
}
})

Posts.get('/posts/:user', function (req: any, res: any) {
    try{
    r.connect(rethinkDbConnectionObject, (err, conn) => {
        conn.use('cackle')
        if (err) {
            console.error('Error:', err)
            res.send([])
            return;
        }

        r.table('posts').orderBy({index:'id'}).filter(r.row('author').eq(req.params.user)).
            run(conn, function (err, cursor) {
                if (err) throw err;
                cursor.toArray(function (err, result) {
                    if (err) throw err;
                    
                    var results = JSON.stringify(result, null, 2)
                    res.set('Cache-Control', 'no-store')
                    res.send(result)
                });
            });
    });
}catch(e){
    console.log(e)
    res.send({message:"an error occured"})
}
})

export default Posts