const express = require('express');
const router = express.Router();
const pricingController = require('../controllers/pricingController');

// সব রুট সেটআপ
router.get('/all', pricingController.getAllPlans);
router.post('/add', pricingController.createPlan);
router.put('/:id', pricingController.updatePlan);
router.delete('/:id', pricingController.deletePlan);

module.exports = router;