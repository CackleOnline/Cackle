import r from 'rethinkdb'
import rethinkDbConnectionObject from '../db'
import app from 'express'
var Follows = app.Router()

Follows.get('/following/:user', function (req: any, res: any) {
    try{
    r.connect(rethinkDbConnectionObject, (err, conn) => {
        conn.use('cackle')
        if (err) {
            console.error('Error:', err)
            res.send([])
            return;
        }
        let followings : string[] = []
        r.table('follows').filter(r.row('userFollowed').eq(req.params.user)).
            run(conn, function (err, cursor) {
                if (err) throw err;
                cursor.toArray(function (err, result) {
                    if (err) throw err;
                    for (let i = 0; i < result.length; i++) {
                        const element = result[i].userFollowing;
                        followings.push(element)
                    }
                    var results = JSON.stringify(result, null, 2)
                    res.set('Cache-Control', 'no-store')
                    res.send(followings)
                });
            });
    });
}catch(e){
    console.log(e)
    res.send({message:"an error occured"})
}
})

Follows.get('/follows/:user', function (req: any, res: any) {
    try{
        r.connect(rethinkDbConnectionObject, (err, conn) => {
            conn.use('cackle')
            if (err) {
                console.error('Error:', err)
                res.send([])
                return;
            }
            let followings : string[] = []
            r.table('follows').filter(r.row('userFollowing').eq(req.params.user)).
                run(conn, function (err, cursor) {
                    if (err) throw err;
                    cursor.toArray(function (err, result) {
                        if (err) throw err;
                        for (let i = 0; i < result.length; i++) {
                            const element = result[i].userFollowed;
                            followings.push(element)
                        }
                        var results = JSON.stringify(result, null, 2)
                        res.set('Cache-Control', 'no-store')
                        res.send(followings)
                    });
                });
    });
    }catch(e){
        console.log(e)
        res.send({message:"an error occured"})
    }
})

export default Follows