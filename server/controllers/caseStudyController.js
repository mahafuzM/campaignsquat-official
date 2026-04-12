const Project = require('../models/projectsData'); 
const mongoose = require('mongoose'); 
const fs = require('fs'); 
const path = require('path');

// ১. সব প্রজেক্ট গেট করা
exports.getAllCaseStudies = async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ২. নতুন প্রজেক্ট তৈরি করা
exports.createCaseStudy = async (req, res) => {
    try {
        const { title, description, category, fullName, client, year, projectUrl, sections } = req.body;
        const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

        // --- স্লাগ/ইউনিক নেম অলরেডি আছে কিনা চেক (প্রতিরোধমূলক ব্যবস্থা) ---
        const existing = await Project.findOne({ fullName });
        if (existing) {
            return res.status(400).json({ error: "A project with this Full Name (slug) already exists." });
        }

        const newProject = new Project({
            title,
            description,
            image: imagePath,
            category,
            fullName,
            client,
            year,
            projectUrl,
            sections: sections ? (typeof sections === 'string' ? JSON.parse(sections) : sections) : []
        });

        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (err) {
        // যদি ডাটা সেভ না হয় এবং ইমেজ আপলোড হয়ে থাকে, তবে সেই গারবেজ ইমেজ ডিলিট করা
        if (req.file) {
            const uploadedPath = path.join(__dirname, '..', `/uploads/${req.file.filename}`);
            if (fs.existsSync(uploadedPath)) fs.unlinkSync(uploadedPath);
        }
        res.status(400).json({ error: err.message });
    }
};

// ৩. স্লাগ দিয়ে খুঁজে বের করা
exports.getCaseStudyBySlug = async (req, res) => {
    try {
        const project = await Project.findOne({ fullName: req.params.slug });
        if (!project) return res.status(404).json({ message: "Project not found" });
        res.status(200).json(project);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ৪. প্রজেক্ট আপডেট করা
exports.updateCaseStudy = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid Project ID format" });
        }

        const existingProject = await Project.findById(id);
        if (!existingProject) return res.status(404).json({ message: "Project not found" });

        const { title, description, category, fullName, client, year, projectUrl, sections } = req.body;
        let updateData = { title, description, category, fullName, client, year, projectUrl };

        if (req.file) {
            updateData.image = `/uploads/${req.file.filename}`;
            
            // পুরানো ইমেজ ডিলিট
            if (existingProject.image) {
                const oldImagePath = path.join(__dirname, '..', existingProject.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
        }

        if (sections) {
            updateData.sections = typeof sections === 'string' ? JSON.parse(sections) : sections;
        }

        const updatedProject = await Project.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true } // runValidators যোগ করা হয়েছে যাতে আপডেট করার সময়ও স্কিমা রুল কাজ করে
        );

        res.status(200).json(updatedProject);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// ৫. প্রজেক্ট ডিলিট করা
exports.deleteCaseStudy = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid Project ID format" });
        }

        const projectToDelete = await Project.findById(id);
        if (!projectToDelete) return res.status(404).json({ message: "Project not found" });

        if (projectToDelete.image) {
            const imagePath = path.join(__dirname, '..', projectToDelete.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await Project.findByIdAndDelete(id);
        res.status(200).json({ message: "Project and image deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};