const express = require('express');
const router = express.Router();
const Content = require('../models/Content');

// সেকশন অনুযায়ী ডাটা পাওয়া (GET)
router.get('/:sectionName', async (req, res) => {
  try {
    const content = await Content.findOne({ sectionName: req.params.sectionName });
    res.json(content ? content.data : {});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// সেকশন অনুযায়ী ডাটা সেভ বা আপডেট করা (POST)
router.post('/:sectionName', async (req, res) => {
  try {
    const { sectionName } = req.params;
    const newData = req.body;

    const updatedContent = await Content.findOneAndUpdate(
      { sectionName },
      { data: newData },
      { upsert: true, new: true }
    );
    res.json(updatedContent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;