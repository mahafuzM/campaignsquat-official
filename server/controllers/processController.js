const WorkProcess = require('../models/WorkProcess');
const fs = require('fs');
const path = require('path');

// সব স্টেপ গেট করা
exports.getSteps = async (req, res) => {
    try {
        const steps = await WorkProcess.find().sort({ order: 1 });
        res.status(200).json(steps);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// নতুন স্টেপ অ্যাড করা
exports.addStep = async (req, res) => {
    try {
        const { title, description, order } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : '';
        const newStep = new WorkProcess({ title, description, order, image });
        await newStep.save();
        res.status(201).json(newStep);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// স্টেপ আপডেট করা (পুরনো ইমেজ ক্লিনআপ সহ)
exports.updateStep = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };
        const existing = await WorkProcess.findById(id);

        if (req.file) {
            if (existing.image) {
                const oldPath = path.join(__dirname, '..', existing.image);
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }
            updateData.image = `/uploads/${req.file.filename}`;
        }

        const updated = await WorkProcess.findByIdAndUpdate(id, updateData, { new: true });
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ডিলিট করা
exports.deleteStep = async (req, res) => {
    try {
        const step = await WorkProcess.findById(req.params.id);
        if (step.image) {
            const imgPath = path.join(__dirname, '..', step.image);
            if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
        }
        await WorkProcess.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Step deleted!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};