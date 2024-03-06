import express from "express";
import uploadToCloud from "./../utils/uploadToCloud.js";
import { filePath } from "./../constant.js";
const user = express.Router();
import handleFile from "../middlewares/handleFile.js";
import Property from "../models/property.module.js";

user.get("/", (req, res) => {
  res.json("Route is working fine");
});

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
