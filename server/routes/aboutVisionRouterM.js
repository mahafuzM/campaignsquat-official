const express = require("express");
const routerM = express.Router();
const { getVisionM, updateVisionM } = require("../controllers/aboutVisionControllerM");
const uploadM = require('../config/uploadConfig');

// API Endpoints
routerM.get("/", getVisionM);
routerM.post("/", uploadM.single("image"), updateVisionM);

module.exports = routerM;