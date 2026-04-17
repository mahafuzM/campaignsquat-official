const express = require("express");
const router = express.Router();
const { googleLogin } = require("../controllers/authController");

// POST /api/auth/google-login
router.post("/google-login", googleLogin);

module.exports = router;
