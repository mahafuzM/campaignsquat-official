const AboutGallery = require('../models/AboutGallery');

exports.getGallery = async (req, res) => {
  try {
    const gallery = await AboutGallery.findOne();
    res.json(gallery || { images: [] });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.updateGallery = async (req, res) => {
  try {
    const { images } = req.body;
    const gallery = await AboutGallery.findOneAndUpdate({}, { images }, { new: true, upsert: true });
    res.json({ success: true, data: gallery });
  } catch (err) { res.status(500).json({ error: err.message }); }
};