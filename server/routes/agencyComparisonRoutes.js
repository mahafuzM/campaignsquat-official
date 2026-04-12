const express = require('express');
const router = express.Router();
const comparisonController = require('../controllers/agencyComparisonController');

// GET: /api/agency-comparison
router.get('/', comparisonController.getComparisonData);

// POST: /api/agency-comparison (ডেটা সেভ বা আপডেটের জন্য)
router.post('/', comparisonController.updateComparisonData);

module.exports = router;