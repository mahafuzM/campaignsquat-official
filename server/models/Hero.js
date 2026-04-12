const mongoose = require('mongoose');

// আইকন হিস্ট্রির জন্য একটি ছোট স্কিমা
const IconHistorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, lowercase: true, trim: true }
});

const HeroSchema = new mongoose.Schema({
  // বর্তমানে সিলেক্ট করা আইকন নাম
  badge: { 
    type: String, 
    default: "zap" 
  },
  heading: String,
  paragraph: String,
  vimeoId: String,
  imageUrl: String,

  // আইকন হিস্ট্রি/লাইব্রেরি এখানে সেভ হবে
  iconHistory: [IconHistorySchema] 

}, { timestamps: true });

module.exports = mongoose.model('Hero', HeroSchema);