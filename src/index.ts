import app from 'express'
var App = app()
import Home from './Routes/Home'
import Posts from './Api/Posts'

App.set('views', __dirname + '/Views')
App.set('view engine', 'jsx')
App.engine('jsx', require('express-react-views').createEngine())
App.use('/', Home)
App.use('/api', Posts)

App.listen(7777)