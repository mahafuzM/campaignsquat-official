const Hero = require("../models/Hero");

// --- Hero Section Logic ---

// Get Hero Data & Icon History
exports.getHero = async (req, res) => {
  try {
    let data = await Hero.findOne();

    if (data && !data.iconHistory) {
      data.iconHistory = [{ name: "zap" }];
      await data.save();
    }

    if (!data) {
      data = await Hero.create({
        badge: "zap",
        iconHistory: [{ name: "zap" }],
        heading: "Default Heading",
        paragraph: "Default Paragraph",
        vimeoId: "1153559168",
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
      vimeoId,
    };

    // যদি নতুন ফাইল আপলোড হয় তবেই imageUrl আপডেট হবে
    if (req.file) {
      // লোকালহোস্টের বদলে .env থেকে BASE_URL ব্যবহার করা হয়েছে
      const baseUrl = process.env.BASE_URL || "http://localhost:5000";
      updateData.imageUrl = `${baseUrl}/uploads/${req.file.filename}`;
    }

    const updatedHero = await Hero.findOneAndUpdate({}, updateData, {
      upsert: true,
      new: true,
    });

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

    const isExist = hero.iconHistory.find((icon) => icon.name === cleanName);
    if (isExist)
      return res
        .status(400)
        .json({ error: "This icon already exists in history" });

    hero.iconHistory.push({ name: cleanName });
    await hero.save();

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

    hero.iconHistory = hero.iconHistory.filter(
      (icon) => icon._id.toString() !== req.params.id,
    );

    await hero.save();
    res.status(200).json({ message: "Icon deleted from history" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
};