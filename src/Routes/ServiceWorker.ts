import app from 'express'
import readFile, { readFileSync } from 'fs'
var SW = app.Router()

SW.get('/manifest.json', function (req: any, res: any) {
    res.type('.json').send(readFileSync('Assets/manifest.json').toString());
})

SW.get('/sw.js', function (req: any, res: any) {
    res.type('.js').send(readFileSync('Assets/sw.js').toString());
})

export default SW