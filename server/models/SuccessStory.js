const mongoose = require('mongoose');

const SuccessStorySchema = new mongoose.Schema({
  sectionTitle: { type: String, default: "Success Story" },
  sectionSubtitle: { type: String, default: "Real Results From The People Who Trust Us Most" },
  sectionBg: { type: String, default: "#0A0A0A" },
  accentColor: { type: String, default: "#f7a400" }, // থিম কালার কন্ট্রোল
  stories: [{
    name: String,
    role: String,
    company: String,
    feedback: String,
    image: String,
    videoUrl: String,
    rating: { type: Number, default: 5 }
  }],
  history: [{
    action: String,
    date: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('SuccessStory', SuccessStorySchema);