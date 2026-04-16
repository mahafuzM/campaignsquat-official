const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const heroController = require('../controllers/heroController');

// নিশ্চিত করা যে 'uploads' ফোল্ডারটি আছে
const uploadDir = path.join(__dirname, '../uploads/');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        // ফাইলের নাম ইউনিক রাখা
        cb(null, `hero-${Date.now()}${path.extname(file.originalname)}`);
    }
});

// ইমেজ ফিল্টার (Security)
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp|svg/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Only images (jpg, png, webp, svg) are allowed!'));
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // সর্বোচ্চ ৫ মেগাবাইট
});

// --- Hero Routes ---
router.get('/', heroController.getHero);
// Hero update এ ইমেজ আপলোড হ্যান্ডলিং
router.post('/', upload.single('heroImage'), heroController.updateHero);

// --- Icon Routes ---
router.get('/icons', heroController.getAllIcons);
router.post('/icons/add', heroController.addIcon);
router.delete('/icons/:id', heroController.deleteIcon);

module.exports = router;