const Application = require("../models/Application");

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

    let cvPath = "";
    if (req.file) {
      // লোকালহোস্টের বদলে .env থেকে BASE_URL ব্যবহার করা হয়েছে
      const baseUrl = process.env.BASE_URL || "http://localhost:5000";
      cvPath = `${baseUrl}/uploads/${req.file.filename}`;
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
    });
  } catch (error) {
    console.error("MongoDB Save Error:", error);
    res.status(500).json({
      success: false,
      message: "Database error! Could not save application.",
    });
  }
};

// ২. সব অ্যাপ্লিকেশন একসাথে পাওয়া (অ্যাডমিন প্যানেলের জন্য)
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.status(200).json(applications);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ message: "Error fetching applications" });
  }
};

// ৩. সিঙ্গেল অ্যাপ্লিকেশন ডিলিট করা
exports.deleteApplication = async (req, res) => {
  try {
    await Application.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Application deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting application" });
  }
};