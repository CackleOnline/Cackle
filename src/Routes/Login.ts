import app from 'express'
var Login = app.Router()

Login.get('/login', function (req: any, res: any) {
    if(req.cookies.token === undefined){
    res.render('Login');
    }else{
        res.redirect('/')
    }
})

export default Login