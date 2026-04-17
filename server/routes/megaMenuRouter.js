const express = require('express');
const router = express.Router();
const megaMenuController = require('../controllers/megaMenuController');
const upload = require('../config/uploadConfig');

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