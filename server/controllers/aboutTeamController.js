const AboutTeam = require('../models/AboutTeam');

// ডাটা গেট করার ফাংশন
exports.getAboutTeam = async (req, res) => {
  try {
    const data = await AboutTeam.findOne();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ডাটা আপডেট বা ক্রিয়েট করার ফাংশন
exports.updateAboutTeam = async (req, res) => {
  try {
    const { 
      badgeText, 
      mainTitle, 
      highlightTitle, 
      ceoName, 
      ceoDesignation, 
      experienceType, 
      ceoMessage, 
      closingTitle, 
      closingSub, 
      image,
      recognitionItems // ✅ ফ্রন্টএন্ড থেকে পাঠানো নতুন লিস্ট
    } = req.body;

    const updatedData = await AboutTeam.findOneAndUpdate(
      {}, // প্রথম ডকুমেন্টটিই আপডেট করবে
      { 
        badgeText, 
        mainTitle, 
        highlightTitle, 
        ceoName, 
        ceoDesignation, 
        experienceType, 
        ceoMessage, 
        closingTitle, 
        closingSub, 
        image,
        recognitionItems // ✅ এখন ডাটাবেসে সেভ হবে
      },
      { upsert: true, new: true }
    );
    res.json(updatedData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};