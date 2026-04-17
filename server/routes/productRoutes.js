const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');

// ইমেজ আপলোড কনফিগারেশন
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, '../uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// --- 🛠️ Data Parsing Middleware (এটি যোগ করা হয়েছে) ---
// এটি স্ট্রিং হিসেবে আসা contentSections এবং testimonials-কে অবজেক্টে রূপান্তর করবে
const parseProductData = (req, res, next) => {
  if (req.body.contentSections && typeof req.body.contentSections === 'string') {
    try {
      req.body.contentSections = JSON.parse(req.body.contentSections);
    } catch (err) {
      console.error("Error parsing contentSections:", err);
    }
  }
  if (req.body.testimonials && typeof req.body.testimonials === 'string') {
    try {
      req.body.testimonials = JSON.parse(req.body.testimonials);
    } catch (err) {
      console.error("Error parsing testimonials:", err);
    }
  }
  next();
};

// ১. সব প্রোডাক্ট গেট করা
router.get('/all', productController.getAllProducts);

// ২. নির্দিষ্ট একটি প্রোডাক্ট গেট করা
router.get('/:id', productController.getProductById);

// ৩. নতুন প্রোডাক্ট অ্যাড করা (parseProductData যোগ করা হয়েছে)
router.post('/add', upload.single('image'), parseProductData, productController.createProduct);

// ৪. প্রোডাক্ট এডিট বা আপডেট করা (parseProductData যোগ করা হয়েছে)
router.put('/:id', upload.single('image'), parseProductData, productController.updateProduct); 

// ৫. প্রোডাক্ট ডিলিট করা
router.delete('/:id', productController.deleteProduct);

module.exports = router;