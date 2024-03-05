import express from 'express'

const user = express.Router()

import handleFile from '../middlewares/handleFile.js'

user.get("/",(req, res)=>{
    res.json("Route is working fine")
})

user.post('/addproperty', handleFile , (req, res)=>{
    console.log(req.file)
    console.log(req.body)
    res.status(200).json({message:"Property added successfully"})
})

export default user;