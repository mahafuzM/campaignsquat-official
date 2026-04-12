const express = require('express');
const router = express.Router();
const creativeController = require('../controllers/creativeServiceController');

// ডাটা গেট করার জন্য
router.get('/', creativeController.getCreativeServices);

// ডাটা আপডেট বা নতুন তৈরি করার জন্য
router.post('/', creativeController.updateCreativeServices);

module.exports = router;