const Footer = require('../models/Footer');

// ১. ফুটার ডেটা পাওয়া (Get Footer Data)
exports.getFooter = async (req, res) => {
  try {
    let footer = await Footer.findOne().lean(); // .lean() পারফরম্যান্স বাড়ায় (Read-only হলে)
    
    if (!footer) {
      // যদি ডাটাবেসে কোনো ডকুমেন্ট না থাকে, তবে একটি ডিফল্ট স্ট্রাকচার রিটার্ন করবে
      const defaultFooter = {
        brandName: "CampaignSquat Ltd",
        brandDescription: "",
        socialLinks: [],
        services: [],
        quickLinks: [],
        contact: { email: "", phone: "", offices: [] },
        hiringStatus: { showCard: false, isHiring: false, title: "", description: "", hiringNotice: "" }
      };
      
      // অপশনাল: চাইলে এখানে Footer.create(defaultFooter) দিয়ে ইনিশিয়াল ডাটা তৈরি করে নিতে পারো
      return res.status(200).json(defaultFooter);
    }
    
    res.status(200).json(footer);
  } catch (err) {
    console.error("Get Footer Error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ২. ফুটার ডেটা আপডেট করা (Update Footer Data)
exports.updateFooter = async (req, res) => {
  try {
    // findOneAndUpdate ব্যবহার করলে কোড অনেক ছোট এবং ফাস্ট হয়
    // upsert: true মানে হলো ডাটা না থাকলে নতুন তৈরি করবে, থাকলে আপডেট করবে
    const footer = await Footer.findOneAndUpdate(
      {}, // আমরা যেহেতু একটাই ডকুমেন্ট মেইনটেইন করি, তাই কুয়েরি এম্পটি
      { $set: req.body }, // শুধু পাঠানো ডাটাগুলোই আপডেট করবে
      { 
        new: true, // আপডেট হওয়া লেটেস্ট ডাটা রিটার্ন করবে
        upsert: true, // ডাটা না থাকলে তৈরি করবে
        runValidators: true // স্কিমা অনুযায়ী ভ্যালিডেশন চেক করবে
      }
    );

    res.status(200).json({
      success: true,
      message: "Footer updated successfully!",
      data: footer
    });
  } catch (err) {
    console.error("Update Footer Error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Update Failed", 
      error: err.message 
    });
  }
};