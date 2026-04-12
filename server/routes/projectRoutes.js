const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const industryController = require('../controllers/industryController');

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// ২টা আলাদা ফিল্ড থেকে ইমেজ নেওয়ার জন্য .fields() ব্যবহার করা হয়েছে
router.post('/', upload.fields([
    { name: 'projectImg', maxCount: 1 },
    { name: 'ceoImg', maxCount: 1 }
]), industryController.addIndustry);

router.get('/', industryController.getIndustries);

module.exports = router;