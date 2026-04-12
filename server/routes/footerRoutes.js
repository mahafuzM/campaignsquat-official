const express = require('express');
const router = express.Router();
const { getFooter, updateFooter } = require('../controllers/footerController');
// const { protect, admin } = require('../middleware/authMiddleware'); // উদাহরণ হিসেবে

// @route   GET /api/footer
// @desc    পাবলিকলি ফুটার ডেটা রিট্রিভ করা
// @access  Public
router.get('/', getFooter);

// @route   PUT /api/footer
// @desc    ফুটার ডেটা আপডেট করা
// @access  Private/Admin
// তোমার প্রজেক্টের অ্যাডমিন অথেনটিকেশন মিডলওয়্যারটি এখানে বসিয়ে দাও
router.put('/', updateFooter); 

module.exports = router;