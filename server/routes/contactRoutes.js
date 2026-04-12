const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.post('/submit', contactController.submitContact);
router.get('/all', contactController.getAllContacts);
router.delete('/:id', contactController.deleteContact); // 👈 এই লাইনটি যোগ করুন

module.exports = router;