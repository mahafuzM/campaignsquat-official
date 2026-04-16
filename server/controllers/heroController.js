const Hero = require("../models/Hero");
const fs = require("fs");

// --- Hero Section Logic ---

// ১. Get Hero Data & Icon History
exports.getHero = async (req, res) => {
  try {
    let data = await Hero.findOne();

    // Data thakle kintu iconHistory na thakle default set kora
    if (data && !data.iconHistory) {
      data.iconHistory = [{ name: "zap" }];
      await data.save();
    }

    // Data ekdom-i na thakle default object create kora
    if (!data) {
      data = await Hero.create({
        badge: "zap",
        iconHistory: [{ name: "zap" }],
        heading: "Default Heading",
        paragraph: "Default Paragraph",
        vimeoId: "1153559168",
      });
    }
    
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: "Fetch failed" });
  }
};

// ২. Update Hero Content (Relative Path Fix)
exports.updateHero = async (req, res) => {
  try {
    const { badge, heading, paragraph, vimeoId } = req.body;
    
    // Prothome current data khuje nibo jate purono image delete kora jay
    const currentHero = await Hero.findOne();

    let updateData = {
      badge: badge ? badge.toLowerCase().trim() : "zap",
      heading,
      paragraph,
      vimeoId,
    };

    // ✅ Best Practice: Sudhu relative path save kora
    if (req.file) {
      // Purono image delete kora (Optional but recommended)
      if (currentHero && currentHero.imageUrl) {
        const oldFilePath = `./${currentHero.imageUrl}`;
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }
      
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
    res.status(200).json({ success: true, data: hero ? hero.iconHistory : [] });
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

    const isExist = hero.iconHistory.find((icon) => icon.name === cleanName);
    if (isExist)
      return res.status(400).json({ error: "This icon already exists" });

    hero.iconHistory.push({ name: cleanName });
    await hero.save();

    res.status(201).json({ success: true, data: hero.iconHistory[hero.iconHistory.length - 1] });
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
      (icon) => icon._id.toString() !== req.params.id,
    );

    await hero.save();
    res.status(200).json({ success: true, message: "Icon deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: "Delete failed" });
  }
};