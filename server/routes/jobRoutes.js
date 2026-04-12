const express = require('express');
const router = express.Router();

// কন্ট্রোলার থেকে সব ফাংশন ইম্পোর্ট করা হচ্ছে
const { 
    getAllJobs, 
    getJobById, 
    createJob, 
    deleteJob, 
    updateJob // নিশ্চিত করুন এটি এখানে আছে
} = require('../controllers/jobController');

// @route   GET /api/jobs (সব জব দেখার জন্য)
router.get('/', getAllJobs);

// @route   GET /api/jobs/:id (একটি নির্দিষ্ট জব দেখার জন্য)
router.get('/:id', getJobById);

// @route   POST /api/jobs (নতুন জব তৈরি)
router.post('/', createJob);

// @route   PUT /api/jobs/:id (এডিট বা আপডেট করার জন্য - এটাই আপনার মিসিং ছিল)
router.put('/:id', updateJob); 

// @route   DELETE /api/jobs/:id (ডিলিট করার জন্য)
router.delete('/:id', deleteJob);

module.exports = router;