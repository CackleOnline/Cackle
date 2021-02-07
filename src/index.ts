import app from 'express'
import Home from './Routes/Home'
import Posts from './Api/Posts'
import Post from './Api/Post'
import bodyparser from 'body-parser'
import Auth from './Api/Auth'
import Register from './Api/Register'
import Assets from './Routes/Assets'
import TokenInfo from './Api/TokenInfo'

//express stuff
var App = app()
App.set('views', __dirname + '/Views')
App.set('view engine', 'jsx')
App.engine('jsx', require('express-react-views').createEngine())
App.use(bodyparser.json());

//main website
App.use('/', Home)

//api routes
App.use('/api', Posts)
App.use('/api', Post)
App.use('/cauth', Auth)
App.use('/cauth', Register)
App.use('/cauth', TokenInfo)
App.use('/assets', Assets)

App.listen(7777)