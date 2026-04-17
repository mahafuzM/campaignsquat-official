const express = require('express');
const router = express.Router();
const aboutController = require('../controllers/aboutController');
const multer = require('multer');
const path = require('path');

// ইমেজ কোথায় সেভ হবে তার কনফিগারেশন
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../uploads/'); // নিশ্চিত করুন সার্ভারে uploads ফোল্ডারটি আছে
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// রাউট সেটআপ
router.get('/', aboutController.getAbout);
// এখানে 'image' নামটি ফ্রন্টএন্ডের FormData এর সাথে মিল থাকতে হবে
router.post('/', upload.single('image'), aboutController.updateAbout); 

module.exports = router;