const express = require("express");
const routerM = express.Router();
const multer = require("multer");
const path = require("path");
const { getVisionM, updateVisionM } = require("../controllers/aboutVisionControllerM");

// মুল্টার স্টোরেজ কনফিগারেশন
const storageM = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, "vision-" + Date.now() + path.extname(file.originalname));
  }
});

const uploadM = multer({ storage: storageM });

// API Endpoints
routerM.get("/", getVisionM);
routerM.post("/", uploadM.single("image"), updateVisionM);

module.exports = routerM;