const AboutHero = require('../models/AboutHero');

// ১. কন্টেন্ট গেট করা
exports.getHero = async (req, res) => {
  try {
    const hero = await AboutHero.findOne();
    res.status(200).json(hero || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ২. কন্টেন্ট আপডেট করা (হিস্টোরি ছাড়া)
exports.updateHero = async (req, res) => {
  try {
    const { title, description, imageUrl } = req.body;
    console.log("🔥 Syncing Data:", { title, imageUrl });

    // findOneAndUpdate ব্যবহার করলে ডাটাবেসে মাত্র ১টি ডকুমেন্ট থাকবে এবং সেটিই বারবার আপডেট হবে
    const hero = await AboutHero.findOneAndUpdate(
      {}, // ফিল্টার: প্রথম যা পাবে
      { 
        title, 
        description, 
        imageUrl, 
        history: [] // যদি মডেলে হিস্টোরি ফিল্ড থেকে থাকে, তবে সেটি খালি করে দেবে
      },
      { 
        new: true,    // আপডেট হওয়া ডাটা রিটার্ন করবে
        upsert: true, // ডাটা না থাকলে নতুন তৈরি করবে
        setDefaultsOnInsert: true 
      }
    );

    res.status(200).json({ success: true, data: hero });
  } catch (err) {
    console.error("❌ Update Error:", err);
    res.status(500).json({ error: err.message });
  }
};