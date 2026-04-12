const Hero = require('../models/Hero');

// --- Hero Section Logic ---

// Get Hero Data & Icon History
exports.getHero = async (req, res) => {
  try {
    let data = await Hero.findOne();
    
    // ডাটা থাকলে কিন্তু iconHistory না থাকলে (পুরোনো ডাটা ফিক্স করার জন্য)
    if (data && !data.iconHistory) {
      data.iconHistory = [{ name: "zap" }];
      await data.save();
    }

    if (!data) {
      // যদি ডাটা না থাকে তবে ডিফল্ট হিসেবে একটা তৈরি হবে
      data = await Hero.create({ 
        badge: "zap", 
        iconHistory: [{ name: "zap" }],
        heading: "Default Heading",
        paragraph: "Default Paragraph",
        vimeoId: "1153559168"
      });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Fetch failed" });
  }
};

// Update Hero Content
exports.updateHero = async (req, res) => {
  try {
    const { badge, heading, paragraph, vimeoId } = req.body;
    let updateData = { 
      badge: badge ? badge.toLowerCase().trim() : "zap",
      heading, 
      paragraph, 
      vimeoId 
    };

    // যদি নতুন ফাইল আপলোড হয় তবেই imageUrl আপডেট হবে
    if (req.file) {
      updateData.imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    const updatedHero = await Hero.findOneAndUpdate(
      {}, 
      updateData,
      { upsert: true, new: true }
    );

    res.status(200).json(updatedHero);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
};

// --- Icon Management Logic (Using Hero Model Array) ---

// Get All Icons from Hero History
exports.getAllIcons = async (req, res) => {
  try {
    const hero = await Hero.findOne();
    // হিরো ডাটার ভেতর যে iconHistory অ্যারে আছে সেটা পাঠানো হচ্ছে
    res.status(200).json(hero ? hero.iconHistory : []);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch icons" });
  }
};

// Add New Icon to History Array
exports.addIcon = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Icon name required" });

    const cleanName = name.toLowerCase().trim();
    const hero = await Hero.findOne();

    if (!hero) return res.status(404).json({ error: "Hero data not found" });

    // চেক করা হচ্ছে অ্যারেতে এই নাম অলরেডি আছে কি না
    const isExist = hero.iconHistory.find(icon => icon.name === cleanName);
    if (isExist) return res.status(400).json({ error: "This icon already exists in history" });

    // অ্যারেতে নতুন আইকন পুশ করা
    hero.iconHistory.push({ name: cleanName });
    await hero.save();

    // মাত্র অ্যাড হওয়া আইকনটি পাঠানো
    res.status(201).json(hero.iconHistory[hero.iconHistory.length - 1]);
  } catch (err) {
    res.status(500).json({ error: "Failed to add icon" });
  }
};

// Delete Icon from History Array
exports.deleteIcon = async (req, res) => {
  try {
    const hero = await Hero.findOne();
    if (!hero) return res.status(404).json({ error: "Hero not found" });

    // অ্যারে থেকে নির্দিষ্ট আইডি বাদ দেওয়া
    hero.iconHistory = hero.iconHistory.filter(
      icon => icon._id.toString() !== req.params.id
    );
    
    await hero.save();
    res.status(200).json({ message: "Icon deleted from history" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
};