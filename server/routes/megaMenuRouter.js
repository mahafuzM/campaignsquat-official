const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const megaMenuController = require('../controllers/megaMenuController');

// ১. ইমেজ স্টোরেজ কনফিগারেশন
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = 'uploads/';
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath); 
    },
    filename: (req, file, cb) => {
        // ফাইল নেম ইউনিক করার জন্য টাইমস্ট্যাম্প এবং অরিজিনাল নেম ক্লিন করা
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// ফাইল ফিল্টার (নিরাপত্তার জন্য শুধু ইমেজ এলাউ করা)
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp|svg/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Error: Only Images (JPG, PNG, WEBP, SVG) are allowed!'));
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // ১০ এমবি লিমিট (সার্ভার পারফরম্যান্সের জন্য যথেষ্ট)
});

// --- ✅ মাল্টি-আপলোড লজিক ---
const multiUpload = (req, res, next) => {
    upload.any()(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // মাল্টার স্পেসিফিক এরর (যেমন: ফাইল সাইজ বড়)
            return res.status(400).json({ message: "Multer Error: " + err.message });
        } else if (err) {
            // কাস্টম এরর (যেমন: ভুল ফাইল টাইপ)
            return res.status(400).json({ message: err.message });
        }
        next();
    });
};

// --- রাউটস ---

// ২. সব মেনু আইটেম গেট করা
router.get('/', megaMenuController.getMenu);

// ৩. নির্দিষ্ট আইটেমের ডিটেইলস গেট করা
router.get('/:id', megaMenuController.getMenuItemById);

// ৪. নতুন আইটেম তৈরি করা
router.post('/', multiUpload, megaMenuController.createMenu);

// ৫. আপডেট করা
router.put('/:id', multiUpload, megaMenuController.updateMenu);

// ৬. ডিলিট করা
router.delete('/:id', megaMenuController.deleteMenu);

module.exports = router;