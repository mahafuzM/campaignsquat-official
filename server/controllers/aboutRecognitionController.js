const AboutRecognition = require('../models/AboutRecognition');

exports.getRecognition = async (req, res) => {
  try {
    const data = await AboutRecognition.findOne();
    res.json(data);
  } catch (err) { 
    res.status(500).json({ error: err.message }); 
  }
};

exports.updateRecognition = async (req, res) => {
  try {
    const { mainTitle, image, platforms } = req.body;
    const data = await AboutRecognition.findOneAndUpdate(
      {}, 
      { mainTitle, image, platforms }, 
      { upsert: true, new: true }
    );
    res.json({ success: true, data });
  } catch (err) { 
    res.status(500).json({ error: err.message }); 
  }
};