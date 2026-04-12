const router = require('express').Router();
const SuccessStory = require('../models/SuccessStory');

// ১. ডেটা আনা
router.get('/', async (req, res) => {
  try {
    const data = await SuccessStory.findOne();
    res.json(data);
  } catch (err) { res.status(500).json(err); }
});

// ২. আপডেট এবং হিস্টোরি লগ করা
router.post('/update', async (req, res) => {
  try {
    const logAction = "Success Story Section Updated";
    const updatedData = await SuccessStory.findOneAndUpdate(
      {},
      { ...req.body, $push: { history: { action: logAction } } },
      { upsert: true, new: true }
    );
    res.json(updatedData);
  } catch (err) { res.status(500).json(err); }
});

// ৩. নির্দিষ্ট একটি স্টোরি ডিলিট করা (নতুন যোগ করা হয়েছে) ✅
router.delete('/delete-story/:storyId', async (req, res) => {
  try {
    const { storyId } = req.params;
    
    const updatedData = await SuccessStory.findOneAndUpdate(
      {}, 
      { 
        $pull: { stories: { _id: storyId } }, // অ্যারে থেকে ওই ID-র স্টোরিটি সরিয়ে ফেলবে
        $push: { history: { action: `A story was deleted (ID: ${storyId})` } } 
      },
      { new: true }
    );

    if (!updatedData) return res.status(404).json({ message: "No data found" });
    
    res.json({ message: "Deleted successfully", data: updatedData });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;