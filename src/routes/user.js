import express from "express";
const user = express.Router();

import uploadToCloud from "./../utils/uploadToCloud.js";
import { filePath } from "./../constant.js";
import handleFile from "../middlewares/handleFile.js";
import Property from "../models/property.module.js";
import ApiResponse from "../utils/apiResponse.js";
import User from './../models/user.module.js'

user.get("/", (req, res) => {
  res.json("Route is working fine");
});

user.post('/signup', async(req, res)=>{
   try {
    const {email, phone}=req.body

    if(!email || !phone){
      return ApiResponse.failure([],"All fields are required",400).send(res)
    }

    const addUser = new User(req.body)
    const response = await addUser.save()
    console.log(response)
    return ApiResponse.success([],"User has been registered successfully",200).send(res)

   } catch (error) {

    if(error?.code === 11000 && error.keyPattern.email === 1){
      return ApiResponse.failure([],"Email is already exists",400).send(res)
    }
    if(error?.code === 11000 && error.keyPattern.phone === 1){
      return ApiResponse.failure([],"Phone number is already exists",400).send(res)
    }

    return ApiResponse.failure([],"Something went wrong",400).send(res)
   }

})

user.post("/addproperty", handleFile, async (req, res) => {

  try {
    const response = await uploadToCloud(req, filePath);
    const fileUrl= response?.map((file => file.url))
    const property = {...req.body , images:fileUrl}

    if (response) {
      const payload = new Property(property)
      const response = await payload.save()
      console.log(response)
      return res.status(200).json({ message: "Property added successfully" });
    }
  } catch (error) {
    console.log(error)
  }

});

export default user;
