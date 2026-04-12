const Pricing = require('../models/Pricing');

// ১. সব প্ল্যান গেট করা
exports.getAllPlans = async (req, res) => {
    try {
        const plans = await Pricing.find().sort({ createdAt: 1 });
        res.status(200).json(plans);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ২. নতুন প্ল্যান অ্যাড করা
exports.createPlan = async (req, res) => {
    try {
        const newPlan = new Pricing(req.body);
        await newPlan.save();
        res.status(201).json(newPlan);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// ৩. প্ল্যান আপডেট করা
exports.updatePlan = async (req, res) => {
    try {
        const updatedPlan = await Pricing.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        res.status(200).json(updatedPlan);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// ৪. প্ল্যান ডিলিট করা
exports.deletePlan = async (req, res) => {
    try {
        await Pricing.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Plan deleted successfully!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};