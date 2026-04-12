const ProjectAll = require('../models/projectAllmodule');

/**
 * ১. স্লাগ (fullName) দিয়ে সিঙ্গেল প্রজেক্ট খুঁজে বের করা
 * এটি আপনার ফ্রন্টএন্ডের ডিটেইলস পেজ লোড করবে।
 */
exports.getProjectBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    // ডাটাবেসে fullName ফিল্ডের সাথে ফ্রন্টএন্ডের পাঠানো slug ম্যাচ করা হচ্ছে
    const project = await ProjectAll.findOne({ fullName: slug });

    if (!project) {
      return res.status(404).json({ 
        success: false, 
        message: "মামা, এই প্রজেক্ট তো ডাটাবেসে নেই!" 
      });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error("Fetch by Slug Error:", error.message);
    next(error);
  }
};

/**
 * ২. নতুন প্রজেক্ট অ্যাড করা
 * ইমেজ এবং সেকশনস (JSON String) হ্যান্ডেল করে।
 */
exports.addProject = async (req, res, next) => {
  try {
    const { 
      title, fullName, category, description, clientName, 
      year, // ✅ নতুন অ্যাড করা হলো: ফ্রন্টএন্ড থেকে আসা সাল রিসিভ করা
      technology, projectUrl, completedDate, sections 
    } = req.body;

    const imageUrl = req.file ? req.file.filename : "";

    // FormData থেকে পাঠানো String-কে Array-তে কনভার্ট করা
    let parsedSections = [];
    if (sections) {
      try {
        parsedSections = typeof sections === 'string' ? JSON.parse(sections) : sections;
      } catch (e) {
        console.error("Sections parsing error:", e);
        parsedSections = [];
      }
    }

    const newProject = new ProjectAll({
      title,
      fullName,
      category,
      description,
      clientName,
      year: year || "2026", // ✅ ডাটাবেসে পাঠানোর জন্য year ফিল্ড ম্যাপ করা হলো
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
    console.error("Backend Error:", error.message);
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: "এই নামে অলরেডি একটা প্রজেক্ট আছে!" });
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
    
    // সরাসরি req.body স্প্রেড করা হচ্ছে যাতে year সহ সব ডাটা চলে আসে
    const updateData = { ...req.body };

    // যদি নতুন ইমেজ আপলোড করা হয়, তবে সেটি আপডেট করা
    if (req.file) {
      updateData.imageUrl = req.file.filename;
    }

    // সেকশনস স্ট্রিং হিসেবে আসলে সেটিকে পার্স করা
    if (updateData.sections && typeof updateData.sections === 'string') {
      try {
        updateData.sections = JSON.parse(updateData.sections);
      } catch (e) {
        console.error("Update Sections parsing error:", e);
      }
    }

    // এখানে updateData-এর ভেতরে year অটোমেটিক চলে আসবে যেহেতু আমরা req.body স্প্রেড করেছি
    const updatedProject = await ProjectAll.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!updatedProject) {
      return res.status(404).json({ success: false, message: "Project not found for update!" });
    }

    res.status(200).json({ 
      success: true, 
      message: "Project updated successfully!", 
      data: updatedProject 
    });
  } catch (error) {
    console.error("Update Error:", error.message);
    next(error);
  }
};

/**
 * ৪. সব প্রজেক্ট গেট করা (Latest First)
 */
exports.getProjects = async (req, res, next) => {
  try {
    const projects = await ProjectAll.find().sort({ createdAt: -1 });
    res.json(projects);
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
    res.json({ success: true, message: "Project deleted successfully!" });
  } catch (error) { 
    next(error); 
  }
};