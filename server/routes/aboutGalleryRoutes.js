const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/aboutGalleryController');

router.get('/', galleryController.getGallery);
router.post('/update', galleryController.updateGallery);

module.exports = router;