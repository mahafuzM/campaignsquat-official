const express = require('express');
const router = express.Router();
const visionController = require('../controllers/aboutVisionController');

// ১. ভিশন ডাটা পাওয়ার জন্য (GET)
router.get('/vision', visionController.getVision);

// ২. ভিশন ডাটা আপডেট করার জন্য (POST)
router.post('/vision/update', visionController.updateVision);

module.exports = router;