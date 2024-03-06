
import path from "path";
import fs from 'fs'
import {fileURLToPath} from 'url'

export const DB_NAME = "Asthaan";

// * Setting up default path for saving images file for temp
const __dirname = fileURLToPath(import.meta.url);
export const filePath = path.join(__dirname, `./../../public/temp`);
