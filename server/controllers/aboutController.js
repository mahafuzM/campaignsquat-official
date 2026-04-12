const About = require('../models/About');

exports.getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    res.status(200).json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateAbout = async (req, res) => {
  try {
    const { title, description } = req.body;
    let updateData = { title, description };

    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const about = await About.findOneAndUpdate(
      {}, 
      updateData, 
      { upsert: true, new: true, returnDocument: 'after' }
    );
    res.status(200).json(about);
  } catch (error) {
    res.status(400).json({ message: "Update Failed: " + error.message });
  }
};