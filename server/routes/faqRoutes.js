const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faqController');

// নিশ্চিত করুন faqController.getFaqs এবং faqController.updateFaqs ডিফাইন করা আছে
router.get('/', faqController.getFaqs);
router.post('/update', faqController.updateFaqs);

module.exports = router;