import express from 'express'
import rl from "express-rate-limit"
import bp from 'body-parser'
import dotenv from 'dotenv';
import AuthRoute from './Routes/Auth/Auth.js'
import MailRoute from './Routes/Mail/Mail.js'
import cors from 'cors'
dotenv.config();
const app = express()

if (process.env.NODE_ENV == "PROD") {
    app.use(rl({
        windowMs: 60 * 60 * 1000,
        max: 600,
        message: {success:false, message:'Too many requests, please try again later.'}
    }))
}

app.use(cors())
app.use(bp.json())

app.use('/Auth/', AuthRoute)
app.use('/Mail/', MailRoute)

app.listen(3141)