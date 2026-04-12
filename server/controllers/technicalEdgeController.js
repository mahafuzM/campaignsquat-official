const TechnicalEdge = require('../models/TechnicalEdge');

// ১. ডেটা গেট করা
exports.getTechnicalEdge = async (req, res) => {
    try {
        const data = await TechnicalEdge.findOne();
        if (!data) {
            return res.status(200).json({ msg: "No data found, please create one." });
        }
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

// ২. ডেটা আপডেট বা তৈরি করা (Upsert)
exports.updateTechnicalEdge = async (req, res) => {
    const { mainHeader, subTitle, assets } = req.body;

    try {
        // এই লজিকটি চেক করবে ডেটা আছে কিনা, থাকলে আপডেট করবে নাহলে নতুন বানাবে
        const updatedData = await TechnicalEdge.findOneAndUpdate(
            {}, 
            { mainHeader, subTitle, assets },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        res.status(200).json(updatedData);
    } catch (err) {
        res.status(400).json({ message: "Update Failed", error: err.message });
    }
};