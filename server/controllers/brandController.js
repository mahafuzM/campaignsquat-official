const Brand = require("../models/Brand");
const fs = require("fs"); // File system module delete korar jonno

// ১. সব লোগো গেট করা
exports.getBrands = async (req, res) => {
  try {
    const brands = await Brand.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: brands
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ২. নতুন লোগো অ্যাড করা (Relative Path Logic)
exports.addBrand = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // ✅ Best Practice: Database-e sudhu path save kora (No hardcoded localhost/domain)
    const imagePath = `/uploads/${req.file.filename}`;

    const newBrand = new Brand({ url: imagePath });
    await newBrand.save();
    
    res.status(201).json({
      success: true,
      message: "Brand logo added successfully",
      data: newBrand
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ৩. লোগো ডিলিট করা (Physical File সহ)
exports.deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    
    if (!brand) {
      return res.status(404).json({ success: false, message: "Brand not found" });
    }

    // ✅ Physical file delete kora jate storage full na hoy
    if (brand.url) {
      const filePath = `./${brand.url}`; // Relative structure: ./uploads/filename
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await Brand.findByIdAndDelete(req.params.id);
    
    res.status(200).json({ 
      success: true, 
      message: "Brand and logo file deleted successfully" 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};