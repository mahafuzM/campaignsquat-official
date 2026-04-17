const express = require('express');
const router = express.Router();
const processController = require('../controllers/processController');
const upload = require('../config/uploadConfig');

// এপিআই রুটস
router.get('/', processController.getSteps); // সব ডাটা দেখা
router.post('/', upload.single('image'), processController.addStep); // নতুন অ্যাড করা
router.put('/:id', upload.single('image'), processController.updateStep); // এডিট করা
router.delete('/:id', processController.deleteStep); // ডিলিট করা

module.exports = router;