import app from 'express'
var Home = app.Router()

Home.get('/', function (req: any, res: any) {
    if(req.cookies.token != undefined){
        res.render('Home', {token : req.cookies.token});
    }else{
        res.render('Login')
    }
})

export default Home