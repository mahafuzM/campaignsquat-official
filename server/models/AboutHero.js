const mongoose = require('mongoose');

const AboutHeroSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  history: [
    {
      previousTitle: String,
      updatedAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

// ✅ ৩ নম্বর প্যারামিটার হিসেবে কালেকশনের নাম 'aboutheros' দিন
module.exports = mongoose.model('AboutHero', AboutHeroSchema, 'aboutheros');