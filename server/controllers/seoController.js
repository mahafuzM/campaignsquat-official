const SeoSettings = require('../models/SeoSettings');

// ✅ SEO কনফিগারেশন গেট করা
exports.getSeoConfig = async (req, res) => {
  try {
    let config = await SeoSettings.findOne();
    if (!config) {
      config = await SeoSettings.create({
        googleVerificationCode: "",
        metaTitle: "Campaignsquat Ltd",
        metaDescription: ""
      });
    }
    res.status(200).json(config);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ SEO কনফিগারেশন আপডেট করা (Warning & Logic Fixed)
exports.updateSeoConfig = async (req, res) => {
  try {
    const { googleVerificationCode, metaTitle, metaDescription } = req.body;

    // ১. ডাইনামিক অবজেক্ট তৈরি (যাতে অন্য ফিল্ড ডিলিট না হয়)
    const updateData = {};
    if (googleVerificationCode !== undefined) updateData.googleVerificationCode = googleVerificationCode.trim();
    if (metaTitle !== undefined) updateData.metaTitle = metaTitle;
    if (metaDescription !== undefined) updateData.metaDescription = metaDescription;

    // ২. ডাটাবেজে আপডেট
    const updated = await SeoSettings.findOneAndUpdate(
      {}, 
      { $set: updateData }, 
      { 
        upsert: true, 
        returnDocument: 'after', // ✅ 'new: true' এর বদলে এটি ব্যবহার করুন (Warning ফিক্স হবে)
        runValidators: true,
        setDefaultsOnInsert: true 
      }
    );

    res.status(200).json(updated);
  } catch (err) {
    console.error("Error in updateSeoConfig:", err);
    res.status(500).json({ 
      success: false, 
      message: "SEO আপডেট করতে ব্যর্থ হয়েছে", 
      error: err.message 
    });
  }
};