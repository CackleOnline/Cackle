import express from "express";
import Auth from "../../lib/User/Auth.js"

const router = express.Router()
const h = new Auth()

router.post('/Login', async (req,res)=>{
    const login = await h.Login(req.body.username,req.body.password)
    res.send(login)
})

router.post('/Register', async (req, res)=>{
    const register = await h.Register(req.body.username,req.body.password)
    res.send(register)
})

export default router