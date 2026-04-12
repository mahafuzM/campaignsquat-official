const express = require('express');
const router = express.Router();
const otherPageController = require('../controllers/otherPageController');
const multer = require('multer');
const fs = require('fs');

// আপলোড ফোল্ডার না থাকলে তৈরি করা
if (!fs.existsSync('uploads/')) {
    fs.mkdirSync('uploads/');
}

// ইমেজ আপলোড কনফিগারেশন
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname.replace(/\s/g, "_"))
});
const upload = multer({ storage });

// ✅ ইমেজ কনফিগারেশন (সেকশন ১-৭ পর্যন্ত ইমেজ আছে, ৮ এবং ৯ এ শুধু টেক্সট)
const multiUpload = upload.fields([
    { name: 'image', maxCount: 1 },           // সেকশন ১: হিরো ইমেজ
    { name: 'extraImage', maxCount: 1 },      // সেকশন ৩: স্ট্যান্ডঅ্যালোন মডিউল ইমেজ
    { name: 'cardImages', maxCount: 20 },      // সেকশন ২: কার্ড ইমেজ
    { name: 'featureImages', maxCount: 20 },   // সেকশন ৪: ফিচার ইমেজ
    { name: 'processImages', maxCount: 20 },   // সেকশন ৫: ওয়ার্কিং প্রসেস ইমেজ
    { name: 'sec6Image', maxCount: 1 },        // সেকশন ৬: হোয়াই চুজ আস মেইন ইমেজ
    { name: 'industryImages', maxCount: 20 }   // সেকশন ৭: ইন্ডাস্ট্রি কার্ড ইমেজ
]);

// --- Routes ---

// ১. এডমিন ড্যাশবোর্ডের লিস্টের জন্য (GET All)
router.get('/', otherPageController.getAllPages);

// ২. স্লাগ দিয়ে ডাটা রিড (Front-end API)
router.get('/:slug', otherPageController.getPageBySlug);

// ৩. নতুন পেজ তৈরি (FAQ ও SEO Blocks ডাটা req.body তে JSON হিসেবে যাবে)
router.post('/', multiUpload, otherPageController.createPage);

// ৪. পেজ এডিট/আপডেট (এখানেও multiUpload থাকবে যাতে ইমেজ আপডেট করা যায়)
router.put('/:id', multiUpload, otherPageController.updatePage);

// ৫. পেজ ডিলিট
router.delete('/:id', otherPageController.deletePage);

module.exports = router;