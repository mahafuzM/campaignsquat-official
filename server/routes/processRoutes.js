const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const processController = require('../controllers/processController');

// ইমেজ আপলোড কনফিগারেশন
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// এপিআই রুটস
router.get('/', processController.getSteps); // সব ডাটা দেখা
router.post('/', upload.single('image'), processController.addStep); // নতুন অ্যাড করা
router.put('/:id', upload.single('image'), processController.updateStep); // এডিট করা
router.delete('/:id', processController.deleteStep); // ডিলিট করা

module.exports = router;