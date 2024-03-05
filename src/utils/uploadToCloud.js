import { v2 as cloudinary } from "cloudinary";
import fs from 'fs'

const uploadToCloud = async (req, filePath) => {
  try {

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });


   if(!!req.files){
    const response = await req.files.map(async(file, index)=>{
      return await cloudinary.uploader.upload(`${filePath}/${req.files[index].filename}`, { folder: 'Asthaan' })
    
    })
    const publicUrls = await Promise.all(response);

     req.files.forEach((file) => {
       fs.unlinkSync(`${filePath}/${file.filename}`);
     });

    return publicUrls

   }
  
  } catch (error) {
    
    if(!!req.files){
      req.files.forEach((file) => {
        fs.unlinkSync(`${filePath}/${file.filename}`);
      });
    }
    console.log(error)
  }
};

export default uploadToCloud;
