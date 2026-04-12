const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const industryController = require('../controllers/industryController');

// ইমেজ সেভ করার কনফিগারেশন
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// ১. নতুন ডাটা অ্যাড করার রুট
router.post('/', upload.fields([
    { name: 'projectImg', maxCount: 1 },
    { name: 'ceoImg', maxCount: 1 }
]), industryController.addIndustry);

// ২. সব ডাটা গেট করার রুট
router.get('/', industryController.getIndustries);

// ৩. ডাটা এডিট/আপডেট করার রুট (এটি এডিট অপশনের জন্য যোগ করা হলো)
router.put('/:id', upload.fields([
    { name: 'projectImg', maxCount: 1 },
    { name: 'ceoImg', maxCount: 1 }
]), industryController.updateIndustry);

// ৪. আইডি ধরে ডাটা ডিলিট করার রুট
router.delete('/:id', industryController.deleteIndustry);

module.exports = router;