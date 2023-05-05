import express from 'express'
import session from 'express-session'
import rl from "express-rate-limit"
import bp from 'body-parser'
import dotenv from 'dotenv';
import AuthRoute from './Routes/Auth/Auth.js'
dotenv.config();
const app = express()

if (process.env.STATE == "PROD") {
    app.use(rl({
        windowMs: 60 * 60 * 1000,
        max: 100,
        message: 'Too many requests, please try again later.'
    }))
}

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}))

app.use(bp.json())

app.use('/Auth/', AuthRoute)

app.listen(3141)