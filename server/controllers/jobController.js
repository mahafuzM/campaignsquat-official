const Job = require('../models/Job');

// ১. সকল জব গেট করা
exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find().sort({ createdAt: -1 });
        res.json(jobs);
    } catch (err) {
        console.error("Get All Jobs Error:", err.message);
        res.status(500).json({ error: 'Server Error' });
    }
};

// ২. সিঙ্গেল জব গেট করা
exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ msg: 'Job not found' });
        res.json(job);
    } catch (err) {
        console.error("Get Job By ID Error:", err.message);
        if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'Job not found' });
        res.status(500).json({ error: 'Server Error' });
    }
};

// ৩. নতুন জব অ্যাড করা
exports.createJob = async (req, res) => {
    try {
        const newJob = new Job(req.body); 
        newJob.status = 'active'; // default status
        const job = await newJob.save();
        res.status(201).json(job);
    } catch (err) {
        console.error("Create Error:", err.message);
        res.status(400).json({ error: err.message });
    }
};

// ৪. জব আপডেট করা (Perfect Edit Logic with Icon Fix)
exports.updateJob = async (req, res) => {
    try {
        const { id } = req.params;

        // আপনার মডেল অনুযায়ী সব ডাটা আপডেট হবে
        const updatedJob = await Job.findByIdAndUpdate(
            id,
            { $set: req.body }, 
            { new: true, runValidators: true }
        );

        if (!updatedJob) {
            return res.status(404).json({ error: 'Job not found' });
        }

        console.log("✅ Update Success for ID:", id);
        res.status(200).json(updatedJob);

    } catch (err) {
        console.error("❌ Update Error:", err.message);
        res.status(400).json({ 
            error: "Update failed", 
            details: err.message 
        });
    }
};

/// ৫. জব ডিলিট করা
exports.deleteJob = async (req, res) => {
    try {
        const { id } = req.params;

        // আইডি দিয়ে খুঁজে ডিলিট করা
        const job = await Job.findByIdAndDelete(id);
        
        if (!job) {
            return res.status(404).json({ msg: 'Job not found' });
        }

        console.log(`✅ Job Deleted: ${id}`);
        res.json({ msg: 'Job removed successfully' });
    } catch (err) {
        console.error("❌ Delete Error:", err.message);
        
        // যদি আইডি ফরম্যাট ভুল হয় (Invalid ObjectId)
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Job not found' });
        }
        
        res.status(500).json({ error: 'Server Error' });
    }
};