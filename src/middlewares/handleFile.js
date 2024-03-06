import multer from "multer";
import fs from "fs";
import { promisify } from "util";
import { filePath } from "./../constant.js";
import ApiResponse from "../utils/apiResponse.js";
const handleFile = async (req, res, next) => {

  try {
    //* if directory is not  exists then create it otherwise skip this
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
      next();
    } else {
      return ApiResponse.failure([], "File is required", 400).send(res);
    }

  } catch (error) {

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      console.log(req?.files)
      return ApiResponse.failure([], "Max 3 files allowed", 400).send(res);
    }

    console.log(error);

  }
};

export default handleFile;
