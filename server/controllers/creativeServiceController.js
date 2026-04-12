const CreativeService = require('../models/CreativeService');

// ✅ ১. সব সার্ভিস এবং হেডলাইন গেট করা
exports.getCreativeServices = async (req, res) => {
    try {
        const data = await CreativeService.findOne();
        if (!data) {
            // ডাটা না থাকলে একটি ডিফল্ট অবজেক্ট পাঠানো ভালো যাতে ফ্রন্টএন্ডে এরর না আসে
            return res.status(200).json({ 
                sectionTitle: "All Our Creative Services Included", 
                services: [] 
            });
        }
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

// ✅ ২. সার্ভিস এবং হেডলাইন আপডেট বা তৈরি করা (Upsert)
exports.updateCreativeServices = async (req, res) => {
    const { sectionTitle, services } = req.body;

    try {
        // ফাক্কা থাকলে আপডেট করবে, না থাকলে নতুন বানাবে
        const updatedData = await CreativeService.findOneAndUpdate(
            {}, 
            { sectionTitle, services },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        res.status(200).json({ 
            message: "Service Ecosystem Updated Successfully! 🚀", 
            data: updatedData 
        });
    } catch (err) {
        res.status(400).json({ message: "Update Failed", error: err.message });
    }
};