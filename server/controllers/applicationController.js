const Application = require("../models/Application");
const fs = require("fs"); // File delete korar jonno

// ১. অ্যাপ্লিকেশন সাবমিট করা
exports.submitApplication = async (req, res) => {
  try {
    const {
      full_name,
      email,
      phone,
      total_exp,
      current_salary,
      expected_salary,
      cover_letter,
      applied_for,
    } = req.body;

    // ✅ Best Practice: Database-e sudhu filename ba relative path save kora
    let cvPath = "";
    if (req.file) {
      cvPath = `/uploads/${req.file.filename}`; 
    }

    const newApplication = new Application({
      full_name,
      email,
      phone,
      total_exp,
      current_salary,
      expected_salary,
      cover_letter,
      applied_for: applied_for || "General Application",
      cv_file: cvPath,
    });

    await newApplication.save();

    res.status(201).json({
      success: true,
      message: "Application submitted and saved successfully!",
      data: newApplication
    });
  } catch (error) {
    console.error("MongoDB Save Error:", error);
    res.status(500).json({
      success: false,
      message: "Database error! Could not save application.",
      error: error.message
    });
  }
};

// ২. সব অ্যাপ্লিকেশন একসাথে পাওয়া (অ্যাডমিন প্যানেলের জন্য)
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ success: false, message: "Error fetching applications" });
  }
};

// ৩. সিঙ্গেল অ্যাপ্লিকেশন ডিলিট করা (Sathe File-o delete hobe)
exports.deleteApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }

    // ✅ Extra Step: Database theke delete korar sathe physical file-ta delete kora
    if (application.cv_file) {
      const filePath = `./${application.cv_file}`; // Relative path structure
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await Application.findByIdAndDelete(req.params.id);
    
    res.status(200).json({ success: true, message: "Application and CV deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ success: false, message: "Error deleting application" });
  }
};