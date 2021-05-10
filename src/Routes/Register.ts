import app from 'express'
import fs from 'fs'
var Register = app.Router()

Register.get('/register', function (req: any, res: any) {
    if(req.cookies.token === undefined){
        res.send(fs.readFileSync('./html/Register.html').toString())
    }else{
        res.redirect('/')
    }
})

export default Register