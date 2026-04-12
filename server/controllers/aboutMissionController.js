const AboutMission = require('../models/AboutMission');

exports.getMission = async (req, res) => {
  try {
    const data = await AboutMission.findOne();
    res.json(data || {});
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.updateMission = async (req, res) => {
  try {
    const data = await AboutMission.findOneAndUpdate({}, req.body, { 
      returnDocument: 'after', 
      upsert: true 
    });
    res.json({ success: true, data });
  } catch (err) { res.status(500).json({ error: err.message }); }
};