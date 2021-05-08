import r from 'rethinkdb'
import rethinkDbConnectionObject from '../db'
import app from 'express'
var Comments = app.Router()

Comments.get('/comments/:post', function (req: any, res: any) {
    try{
    r.connect(rethinkDbConnectionObject, (err, conn) => {
        conn.use('cackle')
        if (err) {
            console.error('Error:', err)
            res.send([])
            return;
        }

        r.db('cackle').table('comments').orderBy({index:'id'}).filter(r.row('post_id').eq(parseInt(req.params.post))).
            run(conn, function (err, cursor) {
                if (err) console.log(err);
                cursor.toArray(function (err, result) {
                    if (err) console.log(err);
                    
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

export default Comments