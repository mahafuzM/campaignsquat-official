const express = require('express');
const router = express.Router();
const { getSeoConfig, updateSeoConfig } = require('../controllers/seoController');

// রাউট ডিফাইন
router.get('/', getSeoConfig);
router.put('/', updateSeoConfig);

module.exports = router;