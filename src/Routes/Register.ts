import app from 'express'
var Register = app.Router()

Register.get('/register', function (req: any, res: any) {
    if(req.cookies.token === undefined){
        res.render('Register');
    }else{
        res.redirect('/')
    }
})

export default Register