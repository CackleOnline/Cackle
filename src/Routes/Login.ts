import app from 'express'
import fs from 'fs'
var Login = app.Router()

Login.get('/login', function (req: any, res: any) {
    if(req.cookies.token === undefined){
        res.send(fs.readFileSync('./html/Login.html').toString())
    }else{
        res.redirect('/')
    }
})

export default Login