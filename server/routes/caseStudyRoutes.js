const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const caseStudyController = require('../controllers/caseStudyController');

// ১. ইমেজ স্টোরেজ কনফিগারেশন
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } 
});

/**
 * 🛣️ Routes Definition
 */

// সব প্রজেক্ট গেট করা
router.get('/', caseStudyController.getAllCaseStudies);

// নির্দিষ্ট স্লাগ দিয়ে প্রজেক্ট খোঁজা
router.get('/:slug', caseStudyController.getCaseStudyBySlug);

// নতুন প্রজেক্ট তৈরি করা
router.post('/', upload.single('image'), caseStudyController.createCaseStudy);

// --- 🛠️ নিচে এই দুটি লাইন অ্যাড করা হয়েছে যা আপনার ফাইলে ছিল না ---

// প্রজেক্ট আপডেট করা (Edit এর জন্য)
router.put('/:id', upload.single('image'), caseStudyController.updateCaseStudy);

// প্রজেক্ট ডিলিট করা (Delete এর জন্য)
router.delete('/:id', caseStudyController.deleteCaseStudy);

module.exports = router;