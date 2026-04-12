const mongoose = require('mongoose');

const RecentProjectSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  sectionBg: { type: String, default: '#02050A' },
  projects: [
    {
      videoId: String,
      alt: String,
      image: String,
    }
  ],
  // এই অংশটি হিস্টোরির জন্য জরুরি
  history: [
    {
      action: String,
      date: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('RecentProject', RecentProjectSchema);