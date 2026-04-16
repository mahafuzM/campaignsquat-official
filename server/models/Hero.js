const mongoose = require('mongoose');

// আইকন হিস্ট্রির জন্য সাব-স্কিমা
const IconHistorySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    lowercase: true, 
    trim: true 
  }
}, { _id: true }); // প্রত্যেকটি আইকনের জন্য একটি ইউনিক ID থাকবে যা ডিলিট বা এডিট করতে সুবিধা দিবে

const HeroSchema = new mongoose.Schema({
  badge: { 
    type: String, 
    default: "zap",
    trim: true 
  },
  heading: {
    type: String,
    required: [true, "Heading is required for the Hero section"],
    trim: true
  },
  paragraph: {
    type: String,
    required: [true, "Paragraph content is required"],
    trim: true
  },
  vimeoId: {
    type: String,
    default: "1153559168", // আপনার ডিফল্ট ভিডিও আইডি
    trim: true
  },
  imageUrl: {
    type: String,
    default: ""
  },

  // আইকন হিস্ট্রি/লাইব্রেরি
  // এখানে Array হিসেবে রাখছেন, তাই ডুপ্লিকেট চেক কন্ট্রোলারে (addIcon) করাই বেস্ট
  iconHistory: [IconHistorySchema] 

}, { 
  timestamps: true,
  // এটি অ্যাড করা ভালো যাতে API রেসপন্সে অপ্রয়োজনীয় ভার্সন কি (__v) না আসে
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

module.exports = mongoose.model('Hero', HeroSchema);