import app from 'express'
import readFile, { readFileSync } from 'fs'
var Scripts = app.Router()

Scripts.get('/site.js', function (req: any, res: any) {
    res.send(readFileSync('Scripts/site.js').toString());
})

export default Scripts