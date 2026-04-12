const express = require('express');
const router = express.Router();

// ১. updateJob ফাংশনটিও ইম্পোর্ট করুন
const { 
    getAllJobs, 
    getJobById, 
    createJob, 
    updateJob, // এটি নিশ্চিত করুন
    deleteJob 
} = require('../controllers/jobController');

// ২. রাউটগুলো ডিফাইন করুন
router.get('/', getAllJobs);
router.get('/:id', getJobById);
router.post('/', createJob);

// ৩. এই লাইনটি যোগ করুন (যা মিসিং ছিল)
router.put('/:id', updateJob); 

router.delete('/:id', deleteJob);

module.exports = router;