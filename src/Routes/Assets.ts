import app from 'express'
import readFile, { readFileSync } from 'fs'
var Assets = app.Router()

Assets.get('/site.js', function (req: any, res: any) {
    res.send(readFileSync('Assets/site.js').toString());
})

Assets.get('/styles.css', function (req: any, res: any) {
    res.type('.css').send(readFileSync('Assets/styles.css').toString());
})

export default Assets