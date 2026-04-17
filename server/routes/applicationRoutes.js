const express = require('express');
const router = express.Router();
const { submitApplication } = require('../controllers/applicationController');
const Application = require('../models/Application');
const upload = require('../config/uploadConfig');

// --- ২. জবের আবেদন সেভ করার রুট (POST) ---
router.post('/apply', upload.single('cv_file'), submitApplication);

// --- ৩. সব আবেদন দেখার রুট ---
router.get('/all', async (req, res) => {
    try {
        const applications = await Application.find().sort({ createdAt: -1 });
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// --- ৪. আবেদন ডিলিট করার রুট ---
router.delete('/:id', async (req, res) => {
    try {
        await Application.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Application Deleted!" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;