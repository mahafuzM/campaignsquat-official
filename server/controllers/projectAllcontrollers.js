const ProjectAll = require('../models/projectAllmodule');

/**
 * ১. স্লাগ (fullName) দিয়ে সিঙ্গেল প্রজেক্ট খুঁজে বের করা
 */
exports.getProjectBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    // স্লাগ যদি খালি থাকে
    if (!slug) {
      return res.status(400).json({ success: false, message: "Slug is required" });
    }

    // Case-insensitive search: যাতে 'My-Project' আর 'my-project' দুইটাই কাজ করে
    const project = await ProjectAll.findOne({ 
      fullName: { $regex: new RegExp("^" + slug + "$", "i") } 
    });

    if (!project) {
      console.log(`❌ Project NOT found in DB for slug: ${slug}`);
      return res.status(404).json({ 
        success: false, 
        message: "মামা, এই প্রজেক্ট তো ডাটাবেসে নেই!" 
      });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error("🔥 Backend Fetch Error:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

/**
 * ২. নতুন প্রজেক্ট অ্যাড করা
 */
exports.addProject = async (req, res, next) => {
  try {
    const { 
      title, fullName, category, description, clientName, 
      year, technology, projectUrl, completedDate, sections 
    } = req.body;

    const imageUrl = req.file ? req.file.filename : "";

    // Sections parsing logic
    let parsedSections = [];
    if (sections) {
      parsedSections = typeof sections === 'string' ? JSON.parse(sections) : sections;
    }

    const newProject = new ProjectAll({
      title,
      fullName: fullName.trim(), // স্লাগ থেকে বাড়তি স্পেস রিমুভ
      category,
      description,
      clientName,
      year: year || "2026",
      technology,
      projectUrl,
      completedDate,
      imageUrl,
      sections: parsedSections 
    });

    await newProject.save();
    
    res.status(201).json({ 
      success: true,
      message: "Project added successfully!",
      data: newProject 
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: "এই নামে বা স্লাগে অলরেডি একটা প্রজেক্ট আছে!" });
    }
    next(error);
  }
};

/**
 * ৩. প্রজেক্ট আপডেট করা
 */
exports.updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (req.file) {
      updateData.imageUrl = req.file.filename;
    }

    if (updateData.sections && typeof updateData.sections === 'string') {
      updateData.sections = JSON.parse(updateData.sections);
    }

    const updatedProject = await ProjectAll.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!updatedProject) {
      return res.status(404).json({ success: false, message: "Project not found!" });
    }

    res.status(200).json({ 
      success: true, 
      message: "Project updated successfully!", 
      data: updatedProject 
    });
  } catch (error) {
    next(error);
  }
};

/**
 * ৪. সব প্রজেক্ট গেট করা
 */
exports.getProjects = async (req, res, next) => {
  try {
    const projects = await ProjectAll.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) { 
    next(error); 
  }
};

/**
 * ৫. প্রজেক্ট ডিলিট করা
 */
exports.deleteProject = async (req, res, next) => {
  try {
    await ProjectAll.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Project deleted successfully!" });
  } catch (error) { 
    next(error); 
  }
};