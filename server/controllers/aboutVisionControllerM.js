const AboutVisionM = require("../models/aboutVisionM.model");
const fs = require("fs");
const path = require("path");

// ডাটা গেট করার ফাংশন
const getVisionM = async (req, res) => {
  try {
    const visionDataM = await AboutVisionM.findOne();
    res.status(200).json(visionDataM);
  } catch (err) {
    res.status(500).json({ message: "Error fetching data", error: err.message });
  }
};

// ডাটা আপডেট বা ক্রিয়েট করার ফাংশন
const updateVisionM = async (req, res) => {
  try {
    const { title, description } = req.body;
    let updateDataM = { title, description };

    if (req.file) {
      updateDataM.imageUrl = `/uploads/${req.file.filename}`;

      // ১. পুরাতন ইমেজ ডিলিট লজিক (ফিক্সড পাথ)
      const oldDocM = await AboutVisionM.findOne();
      if (oldDocM && oldDocM.imageUrl) {
        // process.cwd() ব্যবহার করলে সরাসরি প্রজেক্টের রুট ডিরেক্টরি থেকে পাথ ধরে
        const oldImagePath = path.join(process.cwd(), oldDocM.imageUrl);
        
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
          console.log("🗑️ Old image deleted successfully");
        }
      }
    }

    // ২. Upsert logic
    const resultM = await AboutVisionM.findOneAndUpdate(
      {}, 
      updateDataM, 
      { 
        new: true, 
        upsert: true, 
        setDefaultsOnInsert: true // নতুন ডাটা ইনসার্ট হলে স্কিমার ডিফল্ট ভ্যালুগুলোও নিবে
      }
    );

    res.status(200).json({
      success: true,
      message: "Vision Updated successfully! ✅",
      data: resultM
    });
  } catch (err) {
    console.error("Update failed:", err.message);
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

module.exports = { getVisionM, updateVisionM };