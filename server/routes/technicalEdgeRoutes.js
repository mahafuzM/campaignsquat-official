const express = require('express');
const router = express.Router();
const { getTechnicalEdge, updateTechnicalEdge } = require('../controllers/technicalEdgeController');

// পাবলিকলি ডেটা দেখার জন্য
router.get('/', getTechnicalEdge);

// অ্যাডমিন প্যানেল থেকে ডেটা আপডেট করার জন্য
router.post('/', updateTechnicalEdge);

module.exports = router;