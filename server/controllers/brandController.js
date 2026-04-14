const Brand = require("../models/Brand");

// সব লোগো গেট করা
exports.getBrands = async (req, res) => {
  try {
    const brands = await Brand.find().sort({ createdAt: -1 });
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// নতুন লোগো অ্যাড করা (ফাইল আপলোড সহ)
exports.addBrand = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // লোকালহোস্টের বদলে .env থেকে BASE_URL ব্যবহার করা হয়েছে
    const baseUrl = process.env.BASE_URL || "http://localhost:5000";
    const imageUrl = `${baseUrl}/uploads/${req.file.filename}`;

    const newBrand = new Brand({ url: imageUrl });
    await newBrand.save();
    res.status(201).json(newBrand);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// লোগো ডিলিট করা
exports.deleteBrand = async (req, res) => {
  try {
    await Brand.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Brand deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};