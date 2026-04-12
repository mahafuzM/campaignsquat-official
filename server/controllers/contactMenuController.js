const ContactMenu = require('../models/ContactMenu');

// ১. সব কন্টাক্ট মেনু ডাটা রিট্রিভ করা
exports.getContactMenuData = async (req, res) => {
    try {
        const menus = await ContactMenu.find().sort({ order: 1 }).lean();
        
        // যদি ডাটাবেস খালি থাকে তবে খালি অ্যারে পাঠানো
        res.status(200).json(menus || []);
    } catch (err) {
        console.error("Get Menu Error:", err);
        res.status(500).json({ 
            success: false, 
            message: "ডাটা লোড করতে সমস্যা হয়েছে", 
            error: err.message 
        });
    }
};

// ২. কন্টাক্ট মেনু আপডেট করা (Bulk Update with Optional Link)
exports.updateContactMenuData = async (req, res) => {
    try {
        const menuData = req.body;

        // চেক করা ডাটা অ্যারে কি না
        if (!Array.isArray(menuData)) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid data format. Array expected." 
            });
        }

        /**
         * ডাটা ক্লিনিং লজিক:
         * এখানে link: item.link || "" দেওয়া হয়েছে।
         * এর ফলে ইউজার যদি লিঙ্ক না দেয়, তবে ডাটাবেসে এরর আসবে না, খালি স্ট্রিং সেভ হবে।
         */
        const cleanedData = menuData.map((item, index) => ({
            text: item.text || "Untitled", // টেক্সট না থাকলে ডিফল্ট নাম
            icon: item.icon ? item.icon.toLowerCase() : 'message', // আইকন না থাকলে ডিফল্ট message
            link: item.link || "", // লিঙ্ক না থাকলে খালি স্ট্রিং (Optional logic)
            order: index
        }));

        // পুরানো সব ডাটা মুছে ফেলা
        await ContactMenu.deleteMany({});
        
        // নতুন ফ্রেশ ডাটা ইনসার্ট করা
        const newMenuItems = await ContactMenu.insertMany(cleanedData);
        
        res.status(200).json({ 
            success: true, 
            message: "Floating Contact Menu updated successfully!", 
            data: newMenuItems 
        });
    } catch (err) {
        console.error("Update Error:", err);
        res.status(500).json({ 
            success: false, 
            message: "আপডেট ব্যর্থ হয়েছে", 
            error: err.message 
        });
    }
};