const express = require('express');
const router = express.Router();
const { getAllServices, deleteService } = require('../controllers/serviceController');

router.get('/', getAllServices);
router.delete('/:id', deleteService);

module.exports = router;