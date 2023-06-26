import express from "express"
import Mail from "../../lib/Mail/Mail.js"

const router = express.Router()
let M = new Mail()

router.post('/new', async (req, res)=>{
    const result = await M.New(req.headers.token, req.body.to, req.body.cc, req.body.bcc, req.body.content)
    res.send(result)
})

router.get('/read/:id', async (req, res)=>{
    const result = await M.Read(req.params.id, req.headers.token)
    res.send(result)
})

router.get('/fetch', async (req, res)=>{
    const result = await M.fetchAll(req.headers.token)
    res.send(result)
})

export default router