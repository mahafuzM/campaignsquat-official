const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const heroController = require('../controllers/heroController'); // কন্ট্রোলার ইম্পোর্ট

// Multer Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads/')),
  filename: (req, file, cb) => cb(null, 'hero-' + Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage: storage });

// Hero Routes
router.get('/', heroController.getHero);
router.post('/', upload.single('heroImage'), heroController.updateHero);

// Icon Routes
router.get('/icons', heroController.getAllIcons);
router.post('/icons/add', heroController.addIcon);
router.delete('/icons/:id', heroController.deleteIcon);

module.exports = router;