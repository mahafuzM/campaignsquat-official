const express = require('express');
const router = express.Router();
const aboutController = require('../controllers/aboutController');
const upload = require('../config/uploadConfig');

// রাউট সেটআপ
router.get('/', aboutController.getAbout);
// এখানে 'image' নামটি ফ্রন্টএন্ডের FormData এর সাথে মিল থাকতে হবে
router.post('/', upload.single('image'), aboutController.updateAbout); 

module.exports = router;