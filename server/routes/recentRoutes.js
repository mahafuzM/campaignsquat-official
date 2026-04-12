const express = require('express');
const router = express.Router();
const recentController = require('../controllers/recentController');

// ডাটা পাওয়ার জন্য (Public)
router.get('/', recentController.getRecent);

// ডাটা আপডেট বা সেভ করার জন্য (Admin Only)
router.post('/update', recentController.updateRecent);

module.exports = router;