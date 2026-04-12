const express = require('express');
const router = express.Router();
const recognitionController = require('../controllers/aboutRecognitionController');

router.get('/', recognitionController.getRecognition);
router.post('/update', recognitionController.updateRecognition);

module.exports = router;