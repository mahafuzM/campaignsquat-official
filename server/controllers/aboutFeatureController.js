const AboutFeature = require('../models/AboutFeature');

// ১. সব ফিচার গেট করা
exports.getFeatures = async (req, res) => {
  try {
    const features = await AboutFeature.find();
    res.json(features);
  } catch (err) { 
    res.status(500).json({ error: err.message }); 
  }
};

// ২. নতুন ফিচার অ্যাড করা
exports.addFeature = async (req, res) => {
  try {
    const newFeature = new AboutFeature(req.body);
    await newFeature.save();
    res.json({ success: true });
  } catch (err) { 
    res.status(500).json({ error: err.message }); 
  }
};

// ৩. ফিচার আপডেট করা (নতুন যোগ করা হলো)
exports.updateFeature = async (req, res) => {
  try {
    const { title, desc, iconPath } = req.body;
    const updated = await AboutFeature.findByIdAndUpdate(
      req.params.id, 
      { title, desc, iconPath }, 
      { returnDocument: 'after' } // নতুন ভ্যালু রিটার্ন করবে এবং ওয়ার্নিং আসবে না
    );
    res.json({ success: true, data: updated });
  } catch (err) { 
    res.status(500).json({ error: err.message }); 
  }
};

// ৪. ফিচার ডিলিট করা
exports.deleteFeature = async (req, res) => {
  try {
    await AboutFeature.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) { 
    res.status(500).json({ error: err.message }); 
  }
};