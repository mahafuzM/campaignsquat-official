const bcrypt = require('bcryptjs'); 
const Admin = require('../models/Admin'); 

/**
 * ✅ অ্যাডমিন প্রোফাইল আপডেট (Email & Password Edit)
 * এই ফাংশনটি দিয়ে আপনি শুধু ইমেইল, শুধু পাসওয়ার্ড অথবা দুইটাই একসাথে এডিট করতে পারবেন।
 */
const updateAdminProfile = async (req, res) => {
    try {
        const { currentPassword, newEmail, newPassword } = req.body;

        // ১. টোকেন থেকে অ্যাডমিন ভেরিফিকেশন
        if (!req.admin || !req.admin.email) {
            return res.status(401).json({ success: false, message: "Unauthorized: Access Denied!" });
        }

        const currentAdminEmail = req.admin.email; 

        // ২. ডাটাবেসে অ্যাডমিন ইউজার খুঁজে বের করা
        let admin = await Admin.findOne({ email: currentAdminEmail });
        
        // ৩. অ্যাডমিন ডাটাবেসে না থাকলে (Initial .env fallback)
        if (!admin) {
            const ENV_PASSWORD = process.env.ADMIN_PASSWORD;
            const ENV_EMAIL = process.env.ADMIN_EMAIL;

            if (currentPassword === ENV_PASSWORD) {
                admin = new Admin({
                    email: newEmail || ENV_EMAIL,
                    password: newPassword || ENV_PASSWORD 
                });
                await admin.save();
                return res.json({ success: true, message: "Admin initialized and saved successfully!" });
            } else {
                return res.status(400).json({ success: false, message: "System key mismatch!" });
            }
        }

        // ৪. সিকিউরিটি চেক: বর্তমান পাসওয়ার্ড দিয়ে ভেরিফাই করা (যেকোনো এডিট করার আগে এটি মাস্ট)
        const isMatch = await bcrypt.compare(currentPassword, admin.password);
        if (!isMatch) {
            return res.status(400).json({ 
                success: false, 
                message: "Current password validation failed! Access denied." 
            });
        }

        // ৫. ইমেইল এডিট করার লজিক
        if (newEmail && newEmail !== admin.email) {
            // চেক করা হচ্ছে নতুন ইমেইলটি অন্য কেউ ব্যবহার করছে কি না
            const emailExists = await Admin.findOne({ email: newEmail });
            if (emailExists) {
                return res.status(400).json({ success: false, message: "New email is already taken by another admin!" });
            }
            admin.email = newEmail;
            console.log("📧 Updating Email to:", newEmail);
        }

        // ৬. পাসওয়ার্ড এডিট করার লজিক
        if (newPassword) {
            // সরাসরি এসাইন করা হচ্ছে, আপনার Admin Model-এর 'pre-save' হুক এটিকে অটো হ্যাশ করবে
            admin.password = newPassword; 
            console.log("🔐 Password update detected.");
        }

        // ৭. পরিবর্তনগুলো সেভ করা
        await admin.save();

        res.json({ 
            success: true, 
            message: "Admin credentials updated successfully!",
            updatedEmail: admin.email // ফ্রন্টএন্ডে এটি পাঠিয়ে দেওয়া যাতে স্টেট আপডেট করা যায়
        });

    } catch (error) {
        console.error("🔥 Profile Edit Error:", error.message);
        res.status(500).json({ 
            success: false, 
            message: "Internal Server Error!",
            error: error.message 
        });
    }
};

module.exports = { updateAdminProfile };