import rethinkDbConnectionObject from "../db"
import r from 'rethinkdb'
import app from 'express'
import crypto from 'crypto'
var Post = app.Router()

function randombits(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}


const SNOWFLAKE_EPOCH = Date.UTC(2021, 0, 1);
const UNSIGNED_23BIT_MAX = 8388607; // (Math.pow(2, 23) - 1) >> 0

const SNOWFLAKE_TIMESTAMP_SHIFT = 23n;

var snowflake = (ts = Date.now(), epoch = SNOWFLAKE_EPOCH) =>{
    var thingy = (BigInt(ts - epoch) << SNOWFLAKE_TIMESTAMP_SHIFT) + BigInt(Math.round(Math.random() * UNSIGNED_23BIT_MAX));
    return parseInt(thingy.toString(10))
}


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
                    try {
                        if (err) throw err;
                        cursor.toArray(function (err, result) {
                            if (err) throw err;
                            console.log(result[0])
                            r.table('posts').
                                run(conn, function (err, cursor) {
                                    try {
                                        if (err) throw err;
                                        cursor.toArray(function (err, result1) {
                                            if (err) throw err;
                                            console.log(result1.length)
                                            if (result[0].expire > Date.now()) {
                                                r.table('posts').insert({ id: snowflake(Date.now(), SNOWFLAKE_EPOCH), title: req.body.title, content: req.body.content, author: result[0].account, timestamp: Date.now() }).run(conn)
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
        } catch (e) {
            console.log(e)
            res.send({ message: 'an error occured' })
        }
    });
})

export default Post