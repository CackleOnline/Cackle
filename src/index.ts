//imports
import app from 'express'
import cookieParser from 'cookie-parser'
import Home from './Routes/Home'
import Posts from './Api/Posts'
import Post from './Api/Post'
//import Follow from './Api/Follow'
import bodyparser from 'body-parser'
import Auth from './Api/Auth'
import Register from './Api/Register'
import Assets from './Routes/Assets'
import TokenInfo from './Api/TokenInfo'
import Login from './Routes/Login'
import Register1 from './Routes/Register'
import SW from './Routes/ServiceWorker'
//import Comment1 from './Api/Comment'

//express stuff
var App = app()
App.set('views', __dirname + '/Views')
App.set('view engine', 'jsx')
App.engine('jsx', require('express-react-views').createEngine())
App.use(bodyparser.json());
App.use(cookieParser())

//main website
App.use('/', Home)
App.use('/', Login)
App.use('/', Register1)

//pages
App.use('/pages', Home)

//api routes
App.use('/api', Posts)
App.use('/api', Post)
//App.use('/api', Follow)
//App.use('/api', Comment1)

//authentication routes
App.use('/cauth', Auth)
App.use('/cauth', Register)
App.use('/cauth', TokenInfo)

//misc. routes
App.use('/assets', Assets)
App.use('/', SW)

App.listen(7777)