const Application = require('../models/Application');

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
            applied_for 
        } = req.body;

        let cvPath = "";
        if (req.file) {
            cvPath = `http://localhost:5000/uploads/${req.file.filename}`;
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
            cv_file: cvPath 
        });

        await newApplication.save();

        res.status(201).json({ 
            success: true, 
            message: "Application submitted and saved to MongoDB!" 
        });
    } catch (error) {
        console.error("MongoDB Save Error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Database error! Could not save application." 
        });
    }
};

// ২. সব অ্যাপ্লিকেশন একসাথে পাওয়া (অ্যাডমিন প্যানেলের জন্য)
// আপনার ফ্রন্টএন্ডে axios.get('http://localhost:5000/api/applications/all') কল হচ্ছে, তাই এই অংশটি দরকার
exports.getAllApplications = async (req, res) => {
    try {
        // নতুন অ্যাপ্লিকেশনগুলো আগে দেখানোর জন্য sort({ createdAt: -1 }) যোগ করা হয়েছে
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