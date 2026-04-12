const Industry = require('../models/Industry');
const fs = require('fs');
const path = require('path');

// ১. নতুন ইন্ডাস্ট্রি কার্ড যোগ করা (আপনার আগের কোড)
exports.addIndustry = async (req, res) => {
    try {
        const { title, heading, description, pages, growth, ceoName, ceoTitle, color, imgBg, link } = req.body;

        const projectImg = req.files['projectImg'] ? `/uploads/${req.files['projectImg'][0].filename}` : '';
        const ceoImg = req.files['ceoImg'] ? `/uploads/${req.files['ceoImg'][0].filename}` : '';

        const newIndustry = new Industry({
            title, heading, description, pages, growth, 
            ceoName, ceoTitle, color, imgBg, link, 
            projectImg, ceoImg
        });

        await newIndustry.save();
        res.status(201).json({ message: "Industry Card added successfully!", data: newIndustry });
    } catch (error) {
        console.error("Error in addIndustry:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// ২. সব ইন্ডাস্ট্রি কার্ড নিয়ে আসা (আপনার আগের কোড)
exports.getIndustries = async (req, res) => {
    try {
        const industries = await Industry.find().sort({ createdAt: -1 });
        res.status(200).json(industries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ৩. ইন্ডাস্ট্রি কার্ড ডিলিট করা (নতুন যোগ করা হয়েছে)
exports.deleteIndustry = async (req, res) => {
    try {
        const { id } = req.params;
        
        // ডিলিট করার আগে ইমেজগুলো সার্ভার থেকে মুছে ফেলা (ভালো প্র্যাকটিস)
        const item = await Industry.findById(id);
        if (item) {
            if (item.projectImg) {
                const projectImgPath = path.join(__dirname, '..', item.projectImg);
                if (fs.existsSync(projectImgPath)) fs.unlinkSync(projectImgPath);
            }
            if (item.ceoImg) {
                const ceoImgPath = path.join(__dirname, '..', item.ceoImg);
                if (fs.existsSync(ceoImgPath)) fs.unlinkSync(ceoImgPath);
            }
        }

        await Industry.findByIdAndDelete(id);
        res.status(200).json({ message: "Card and images deleted successfully! 🗑️" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting card", error: error.message });
    }
};

// ৪. ইন্ডাস্ট্রি কার্ড আপডেট করা (নতুন ইমেজ আসলে পুরনোটি মুছে ফেলার লজিকসহ)
exports.updateIndustry = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        // ১. আগে পুরনো ডাটাবেস এন্ট্রি খুঁজে বের করা
        const existingItem = await Industry.findById(id);
        if (!existingItem) {
            return res.status(404).json({ message: "Industry not found!" });
        }

        // ২. যদি নতুন ইমেজ আপলোড করা হয়
        if (req.files) {
            // প্রজেক্ট ইমেজ হ্যান্ডলিং
            if (req.files['projectImg']) {
                // নতুন ইমেজ যোগ করার আগে পুরনো ইমেজটি সার্ভার থেকে ডিলিট করা
                if (existingItem.projectImg) {
                    const oldProjectPath = path.join(__dirname, '..', existingItem.projectImg);
                    if (fs.existsSync(oldProjectPath)) fs.unlinkSync(oldProjectPath);
                }
                updateData.projectImg = `/uploads/${req.files['projectImg'][0].filename}`;
            }

            // CEO ইমেজ হ্যান্ডলিং
            if (req.files['ceoImg']) {
                // নতুন ইমেজ যোগ করার আগে পুরনো ইমেজটি সার্ভার থেকে ডিলিট করা
                if (existingItem.ceoImg) {
                    const oldCeoPath = path.join(__dirname, '..', existingItem.ceoImg);
                    if (fs.existsSync(oldCeoPath)) fs.unlinkSync(oldCeoPath);
                }
                updateData.ceoImg = `/uploads/${req.files['ceoImg'][0].filename}`;
            }
        }

        // ৩. ডাটাবেস আপডেট করা
        const updatedIndustry = await Industry.findByIdAndUpdate(id, updateData, { new: true });
        res.status(200).json({ message: "Card updated successfully! ✅", data: updatedIndustry });
    } catch (error) {
        console.error("Error in updateIndustry:", error);
        res.status(500).json({ message: "Error updating card", error: error.message });
    }
};