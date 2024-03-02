import express from 'express'

const user = express.Router()

user.get("/",(req, res)=>{
    res.json("Route is working fine")
})

user.post('/addproperty',(req, res)=>{
    console.log(req.body)
    res.status(200).json({message:"Property added successfully"})
})

export default user;