const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// 🔥 ইমেজ আপলোড ডিরেক্টরি চেক (যদি না থাকে তবে অটো তৈরি হবে)
const uploadDir = path.join(__dirname, '../uploads/');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); 
  },
  filename: (req, file, cb) => {
    // ফাইলের নাম ক্লিন রাখার জন্য স্পেস রিমুভ করা হয়েছে
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// ফাইল টাইপ ফিল্টার (শুধুমাত্র ইমেজ এলাউ করার জন্য)
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed!'), false);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // ৫ এমবি লিমিট
});

// --- API Routes ---

// ১. সব ব্লগ রিট্রাইভ
router.get('/', blogController.getBlogs);

// ২. স্লাগ ইউআরএল দিয়ে ব্লগ খোঁজা
router.get('/url/:url', blogController.getBlogByUrl);

// ৩. নতুন ব্লগ পাবলিশ (ইমেজ সহ)
router.post('/', upload.single('image'), blogController.createBlog);

// ৪. বিদ্যমান ব্লগ আপডেট (ইমেজ অপশনাল)
router.put('/:id', upload.single('image'), blogController.updateBlog); 

// ৫. ব্লগ ডিলিট
router.delete('/:id', blogController.deleteBlog);

module.exports = router;