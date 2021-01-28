import app from 'express'
var Home = app.Router()

Home.get('/', function (req: any, res: any) {
    res.render('Home');
})

export default Home