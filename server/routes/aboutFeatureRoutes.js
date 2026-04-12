const express = require('express');
const router = express.Router();
const featureController = require('../controllers/aboutFeatureController');

// সব ফিচার দেখার জন্য
router.get('/', featureController.getFeatures);

// নতুন ফিচার যোগ করার জন্য
router.post('/add', featureController.addFeature);

// এক্সিস্টিং ফিচার এডিট/আপডেট করার জন্য (নতুন যোগ করা হলো)
router.post('/update/:id', featureController.updateFeature);

// ফিচার ডিলিট করার জন্য
router.delete('/:id', featureController.deleteFeature);

module.exports = router;