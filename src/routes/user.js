import express from "express";
import uploadToCloud from "./../utils/uploadToCloud.js";
import { filePath } from "./../constant.js";
const user = express.Router();

import handleFile from "../middlewares/handleFile.js";

user.get("/", (req, res) => {
  res.json("Route is working fine");
});

user.post("/addproperty", handleFile, async (req, res) => {

  try {
    const response = await uploadToCloud(req, filePath);
    if (response) {
      return res.status(200).json({ message: "Property added successfully" });
    }
  } catch (error) {
    console.log(error)
  }

});

export default user;
