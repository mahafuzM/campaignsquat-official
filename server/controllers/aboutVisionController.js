const AboutVision = require('../models/AboutVision');

// ডাটা গেট করা
exports.getVision = async (req, res) => {
  try {
    const vision = await AboutVision.findOne();
    res.status(200).json(vision || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ডাটা আপডেট করা (Overwrite Logic)
exports.updateVision = async (req, res) => {
  try {
    const { title, description, imageUrl } = req.body;

    const vision = await AboutVision.findOneAndUpdate(
      {}, 
      { title, description, imageUrl },
      { new: true, upsert: true }
    );

    res.status(200).json({ success: true, data: vision });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};