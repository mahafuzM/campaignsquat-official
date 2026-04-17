const express = require('express');
const router = express.Router();
const heroController = require('../controllers/heroController');
const upload = require('../config/uploadConfig');

// --- Hero Routes ---

// --- Hero Routes ---
router.get('/', heroController.getHero);
// Hero update এ ইমেজ আপলোড হ্যান্ডলিং
router.post('/', upload.single('heroImage'), heroController.updateHero);

// --- Icon Routes ---
router.get('/icons', heroController.getAllIcons);
router.post('/icons/add', heroController.addIcon);
router.delete('/icons/:id', heroController.deleteIcon);

module.exports = router;