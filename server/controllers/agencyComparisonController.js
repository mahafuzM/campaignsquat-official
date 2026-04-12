const AgencyComparison = require('../models/AgencyComparison');

// ১. ডেটা পাওয়ার জন্য
exports.getComparisonData = async (req, res) => {
    try {
        const data = await AgencyComparison.findOne();
        res.status(200).json(data || {});
    } catch (err) {
        res.status(500).json({ message: "Error fetching data", error: err.message });
    }
};

// ২. ডেটা সেভ বা আপডেট করার জন্য
exports.updateComparisonData = async (req, res) => {
    try {
        const { titlePart1, brandName, competitorLabel, comparisonList } = req.body;

        // ডাটাবেসে যদি আগে থেকে থাকে তবে আপডেট করবে, নাহলে নতুন বানাবে
        const updatedData = await AgencyComparison.findOneAndUpdate(
            {}, 
            { titlePart1, brandName, competitorLabel, comparisonList },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        res.status(200).json({ message: "Comparison table updated successfully!", data: updatedData });
    } catch (err) {
        res.status(500).json({ message: "Error updating data", error: err.message });
    }
};