import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);

// Multer Config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, join(__dirname, "public", "images"));
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + extname(file.originalname).toLocaleLowerCase());
  },
});

export const uploader = multer({
  storage,
  limits: { fileSize: 10000000 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const ext = filetypes.test(extname(file.originalname));

    if (mimetype && ext) {
      return cb(null, true);
    }
    cb(new Error("El archivo debe ser una imagen"));
  },
}).single("image");

export default __dirname;
