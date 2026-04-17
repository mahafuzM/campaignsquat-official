const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const upload = require('../config/uploadConfig');

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