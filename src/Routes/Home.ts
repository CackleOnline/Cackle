import app from 'express'
import fs from 'fs'

var Home = app.Router()

Home.get('/', function (req: any, res: any) {
    if(req.cookies.token != undefined){
        res.send(fs.readFileSync('./html/Home.html').toString())
    }else{
        res.redirect('/login')
    }

})

export default Home