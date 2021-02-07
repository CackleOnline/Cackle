import r from 'rethinkdb'
import rethinkDbConnectionObject from '../db'
import app from 'express'
var TokenInfo = app.Router()

TokenInfo.get('/token', function (req: any, res: any) {
    try{
    r.connect(rethinkDbConnectionObject, (err, conn) => {
        conn.use('cackle')
        if (err) {
            console.error('Error:', err);
            return;
        }
        r.table('logins').filter({token: req.header('Authentication')}).run(conn, (data, data2) => {
            data2.toArray(function (err, result) {
                if (err) throw err;
                res.send({expire:result[0].expire, account:result[0].account})
            });
        })
    });
}catch(e){
    console.log(e)
    res.send({message:"an error occured"})
}
})

export default TokenInfo