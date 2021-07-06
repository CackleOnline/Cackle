//imports
import Crab from './Crab/Crab'
import crash from './Crab/CrabCrashHelper'
import app from 'express'
import cookieParser from 'cookie-parser'
import Home from './Routes/Home'
import Posts from './Api/Posts'
import Post from './Api/Post'
import Follow from './Api/Follow'
import bodyparser from 'body-parser'
import Auth from './Api/Auth'
import Register from './Api/Register'
import Assets from './Routes/Assets'
import TokenInfo from './Api/TokenInfo'
import Login from './Routes/Login'
import Register1 from './Routes/Register'
import SW from './Routes/ServiceWorker'
import Comment1 from './Api/Comment'
import Comments from './Api/Comments'
import Follows from './Api/Follows'

//V Crab V
new Crab()
crash()

//express stuff
var App = app()
App.set('views', __dirname + '/Views')
App.set('view engine', 'jsx')
App.engine('jsx', require('express-react-views').createEngine())
App.use(bodyparser.json());
App.use(cookieParser())

//api routes
App.use('/api', Posts)
App.use('/api', Post)
App.use('/api', Follow)
App.use('/api', Follows)
App.use('/api', Comments)
App.use('/api', Comment1)

//authentication routes
App.use('/cauth', Auth)
App.use('/cauth', Register)
App.use('/cauth', TokenInfo)

//misc. routes
App.use('/assets', Assets)
App.use('/', SW)

//main website
App.use('/', Login)
App.use('/', Register1)
App.use('/', Home)

App.listen(7777)