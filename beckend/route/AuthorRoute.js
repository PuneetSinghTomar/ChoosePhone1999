import express from "express";
import multer from "multer";
import path from "path";
import { createAuthor, getAuthorByName } from "../controller/AuthorController.js";

const router = express.Router();

// File storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // create this folder
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage });

// POST route with file upload
router.post("/", upload.single("avatar"), createAuthor);
router.get('/:name', getAuthorByName);

export default router;
