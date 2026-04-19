const Hero = require("../models/Hero");
const fs = require("fs");
const path = require("path");

// --- Hero Section Logic ---

// ১. Get Hero Data
exports.getHero = async (req, res) => {
  try {
    let data = await Hero.findOne();

    // ডাটা না থাকলে একটি ডিফল্ট ডাটাবেস এন্ট্রি তৈরি করা
    if (!data) {
      data = await Hero.create({
        badge: "zap",
        iconHistory: [{ name: "zap" }],
        heading: "Custom Software Engineering & High-End UI/UX Solutions",
        paragraph: "Campaignsquat Ltd delivers high-performance solutions.",
        videoUrl: "",
        imageUrl: "",
      });
    }

    // রেসপন্স ফরমেট ঠিক রাখা (Frontend-এর সাথে সামঞ্জস্য রেখে সরাসরি ডাটা পাঠানো)
    res.status(200).json(data); 
  } catch (err) {
    console.error("Fetch Error:", err);
    res.status(500).json({ success: false, error: "Fetch failed" });
  }
};

// ২. Update Hero Content
exports.updateHero = async (req, res) => {
  try {
    const { badge, heading, paragraph, videoUrl } = req.body;
    const currentHero = await Hero.findOne();

    let updateData = {
      badge: badge ? badge.toLowerCase().trim() : "zap",
      heading,
      paragraph,
      videoUrl,
    };

    // ইমেজ আপলোড হ্যান্ডলিং
    if (req.file) {
      // পুরাতন ফাইল ডিলিট করার লজিক (Error handling সহ)
      if (currentHero && currentHero.imageUrl) {
        // imageUrl থেকে '/' বা '\' সরিয়ে লোকাল পাথ তৈরি করা
        const oldPath = path.join(__dirname, "..", currentHero.imageUrl.replace(/^\//, ""));
        if (fs.existsSync(oldPath)) {
          try {
            fs.unlinkSync(oldPath);
          } catch (e) {
            console.error("Old file delete error:", e);
          }
        }
      }
      // রিলেটিভ পাথ সেভ করা (যেমন: /uploads/filename.png)
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedHero = await Hero.findOneAndUpdate({}, updateData, {
      upsert: true,
      new: true,
    });

    res.status(200).json({ success: true, data: updatedHero });
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ success: false, error: "Update failed" });
  }
};

// --- Icon Management Logic ---

// ৩. Get All Icons
exports.getAllIcons = async (req, res) => {
  try {
    const hero = await Hero.findOne();
    res.status(200).json({ 
      success: true, 
      data: hero ? hero.iconHistory : [] 
    });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to fetch icons" });
  }
};

// ৪. Add New Icon
exports.addIcon = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Icon name required" });

    const cleanName = name.toLowerCase().trim();
    const hero = await Hero.findOne();

    if (!hero) return res.status(404).json({ error: "Hero data not found" });

    // ডুপ্লিকেট চেক
    const isExist = hero.iconHistory.find((icon) => icon.name === cleanName);
    if (isExist) return res.status(400).json({ error: "This icon already exists" });

    hero.iconHistory.push({ name: cleanName });
    await hero.save();

    res.status(201).json({ 
      success: true, 
      data: hero.iconHistory[hero.iconHistory.length - 1] 
    });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to add icon" });
  }
};

// ৫. Delete Icon
exports.deleteIcon = async (req, res) => {
  try {
    const hero = await Hero.findOne();
    if (!hero) return res.status(404).json({ error: "Hero not found" });

    hero.iconHistory = hero.iconHistory.filter(
      (icon) => icon._id.toString() !== req.params.id
    );

    await hero.save();
    res.status(200).json({ success: true, message: "Icon deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: "Delete failed" });
  }
};