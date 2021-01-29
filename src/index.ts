import app from 'express'
var App = app()
import Home from './Routes/Home'
import Posts from './Api/Posts'
import Post from './Api/Post'
import bodyparser from 'body-parser'
import Auth from './Api/Auth'

App.set('views', __dirname + '/Views')
App.set('view engine', 'jsx')
App.engine('jsx', require('express-react-views').createEngine())
App.use(bodyparser.json());
App.use('/', Home)
App.use('/api', Posts)
App.use('/api', Post)
App.use('/api', Auth)

App.listen(7777)