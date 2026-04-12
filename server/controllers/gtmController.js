const GtmSettings = require('../models/GtmSettings');

/**
 * @desc    GTM কনফিগারেশন গেট করা
 * @route   GET /api/gtm-config
 * @access  Public
 */
exports.getGtmConfig = async (req, res) => {
  try {
    // ডাটাবেজ থেকে প্রথম ডকুমেন্টটি খোঁজা
    let config = await GtmSettings.findOne();

    // যদি কোনো কনফিগারেশন না থাকে, তবে একটি ডিফল্ট তৈরি করা
    if (!config) {
      config = await GtmSettings.create({ 
        gtmId: "", 
        isActive: false 
      });
    }

    res.status(200).json(config);
  } catch (err) {
    console.error("Error in getGtmConfig:", err);
    res.status(500).json({ 
      success: false, 
      message: "GTM ডাটা ফেচ করতে সমস্যা হয়েছে", 
      error: err.message 
    });
  }
};

/**
 * @desc    GTM কনফিগারেশন আপডেট করা
 * @route   PUT /api/gtm-config
 * @access  Private (Admin Only)
 */
exports.updateGtmConfig = async (req, res) => {
  try {
    // ১. রিকোয়েস্ট বডি থেকে শুধু প্রয়োজনীয় ডাটা আলাদা করা (Security Best Practice)
    const { gtmId, isActive } = req.body; 

    // ২. ডাটাবেজে আপডেট করুন
    const updated = await GtmSettings.findOneAndUpdate(
      {}, // প্রথম যে ডকুমেন্ট পাবে সেটিই ধরবে
      { gtmId, isActive }, // শুধু এই ফিল্ডগুলোই সেভ হবে
      { 
        upsert: true,            // না থাকলে নতুন তৈরি করবে
        returnDocument: 'after', // ✅ 'new: true' এর বদলে এটি ব্যবহার করুন (Warning ফিক্স হবে)
        runValidators: true,     // মডেলের ভ্যালিডেশন চেক করবে
        setDefaultsOnInsert: true // নতুন তৈরির সময় ডিফল্ট ভ্যালু সেট করবে
      }
    );

    // ৩. সাকসেস রেসপন্স পাঠানো
    res.status(200).json(updated);
    
  } catch (err) {
    console.error("Error in updateGtmConfig:", err);
    res.status(500).json({ 
      success: false, 
      message: "GTM আপডেট করতে ব্যর্থ হয়েছে", 
      error: err.message 
    });
  }
};