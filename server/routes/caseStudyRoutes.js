const express = require('express');
const router = express.Router();
const caseStudyController = require('../controllers/caseStudyController');
const upload = require('../config/uploadConfig');

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