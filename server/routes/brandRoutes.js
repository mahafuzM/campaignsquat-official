const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getBrands, addBrand, deleteBrand } = require('../controllers/brandController');

// ফাইল কোথায় সেভ হবে তার কনফিগারেশন
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // নিশ্চিত করুন সার্ভার ফোল্ডারে 'uploads' ফোল্ডার আছে
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// রাউটগুলো
router.get('/', getBrands);
router.post('/', upload.single('image'), addBrand); // 'image' নামটা ফ্রন্টএন্ডের সাথে মিল থাকতে হবে
router.delete('/:id', deleteBrand);

module.exports = router;