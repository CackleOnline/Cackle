import app from 'express'
import readFile, { readFileSync } from 'fs'
var Assets = app.Router()

Assets.get('/site.js', function (req: any, res: any) {
    res.send(readFileSync('Assets/site.js').toString());
})

Assets.get('/styles.css', function (req: any, res: any) {
    res.type('.css').send(readFileSync('Assets/styles.css').toString());
})

Assets.get('/danger.svg', function (req: any, res: any) {
    res.type('.svg').send(readFileSync('Assets/danger.svg').toString());
})

Assets.get('/logo.png', function (req: any, res: any) {
    res.type('.png').send(readFileSync('Assets/logo.png'));
})

Assets.get('/logo-512.png', function (req: any, res: any) {
    res.type('.png').send(readFileSync('Assets/logo-512.png'));
})

Assets.get('/icon-home.svg', function (req: any, res: any) {
    res.type('.svg').send(readFileSync('Assets/icon-home.svg'));
})
Assets.get('/icon-mgnfgls.svg', function (req: any, res: any) {
    res.type('.svg').send(readFileSync('Assets/icon-mgnfgls.svg'));
})
Assets.get('/icon-msg.svg', function (req: any, res: any) {
    res.type('.svg').send(readFileSync('Assets/icon-msg.svg'));
})

export default Assets