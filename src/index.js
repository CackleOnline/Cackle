import express from 'express'
import session from 'express-session'
const app = express()

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

app.listen(3145)