const express = require('express');
const router = express.Router();
const industryController = require('../controllers/industryController');
const upload = require('../config/uploadConfig');

// ১. নতুন ডাটা অ্যাড করার রুট
router.post('/', upload.fields([
    { name: 'projectImg', maxCount: 1 },
    { name: 'ceoImg', maxCount: 1 }
]), industryController.addIndustry);

// ২. সব ডাটা গেট করার রুট
router.get('/', industryController.getIndustries);

// ৩. ডাটা এডিট/আপডেট করার রুট (এটি এডিট অপশনের জন্য যোগ করা হলো)
router.put('/:id', upload.fields([
    { name: 'projectImg', maxCount: 1 },
    { name: 'ceoImg', maxCount: 1 }
]), industryController.updateIndustry);

// ৪. আইডি ধরে ডাটা ডিলিট করার রুট
router.delete('/:id', industryController.deleteIndustry);

module.exports = router;