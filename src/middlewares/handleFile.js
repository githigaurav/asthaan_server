import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { promisify } from "util";

const handleFile = async (req, res, next) => {
  try {

    // * if we use import statement , we have to get path using import.meta.url
    // * fileUrlToPath is used to convert to actual working path which is exported through import.meta.url
    const __dirname = fileURLToPath(import.meta.url);
    const filePath = path.join(__dirname, `./../../../public/temp`);

    //* if directory is not exists then create it otherwise skip this
    fs.existsSync(filePath) || fs.mkdirSync(filePath);

    //* Configure storage in order to save client side files at temp storage
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, filePath);
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
      },
    });

    //* init multer function && we are using promisify so multer will act as promises
    const upload = multer({ storage: storage }).array("file", 3);
    const uploadFileToTemp = promisify(upload);

    //* executing multer function
    await uploadFileToTemp(req, res);

    if (!!req.files.length) {
      req.files.forEach((file, index) => {
        fs.unlinkSync(`${filePath}/${file.filename}`);
        console.log("File deleted", file.filename);
      });
      next();
    } else {
      res.status(200).json({ message: "File is required" });
    }
    
  } catch (error) {
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({ message: "Max 3 files allowed" });
    }

    console.log(error);
  }
};

export default handleFile;
