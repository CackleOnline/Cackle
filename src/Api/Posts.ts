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

Posts.get('/post/:id', function (req: any, res: any) {
    try{
    r.connect(rethinkDbConnectionObject, (err, conn) => {
        conn.use('cackle')
        if (err) {
            console.error('Error:', err)
            res.send([])
            return;
        }

        r.table('posts').filter(r.row('id').eq(parseInt(req.params.id))).
            run(conn, function (err, cursor) {
                try{
                if (err) console.log(err);
                cursor.toArray(function (err, result) {
                    if (err) console.log(err);
                    
                    var results = JSON.stringify(result, null, 2)
                    res.set('Cache-Control', 'no-store')
                    console.log(results)
                    res.send(result)
                });}catch(e){
                    console.log(e)
                    res.send({error:"there was an error"})
                }
            });
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

Posts.get('/feed', function (req: any, res: any) {
    r.connect(rethinkDbConnectionObject, (err, conn) => {
        let feed:object[] = []
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
                            r.table('posts').orderBy({index:'id'}).
                                run(conn, function (err, cursor1) {
                                    try {
                                        if (err) console.log (err);
                                        cursor1.toArray(function (err, result1) {
                                            if (err) throw err;

                                            r.table('follows').filter(r.row('userFollowing').eq(result[0].account)).
                                            run(conn, function (err, cursor2) {
                                                try{
                                                if (err) throw err;
                                                cursor2.toArray(function (err, resultI) {
                                                    if (err) throw err;
                                                    for (let i = 0; i < result1.length; i++) {
                                                        for (let l = 0; l < resultI.length; l++) {
                                                            const element = resultI[l].userFollowed;
                                                            if(result1[i].author === resultI[l].userFollowed){
                                                                feed.push(result1[i])
                                                            }
                                                        }
                                                    }
                                                    res.send(feed)
                                                });}catch(e){

                                                }
                                            });
                                    })
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

export default Posts