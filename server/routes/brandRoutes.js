const express = require('express');
const router = express.Router();
const { getBrands, addBrand, deleteBrand } = require('../controllers/brandController');
const upload = require('../config/uploadConfig');

// রাউটগুলো
router.get('/', getBrands);
router.post('/', upload.single('image'), addBrand); // 'image' নামটা ফ্রন্টএন্ডের সাথে মিল থাকতে হবে
router.delete('/:id', deleteBrand);

module.exports = router;