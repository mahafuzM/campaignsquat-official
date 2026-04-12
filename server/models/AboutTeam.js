const mongoose = require('mongoose');

const AboutTeamSchema = new mongoose.Schema({
  badgeText: { type: String, default: "Message from the CEO" },
  mainTitle: { type: String, default: "Building the Future of" },
  highlightTitle: { type: String, default: "Digital Innovation" },
  ceoName: { type: String, required: true },
  ceoDesignation: { type: String, required: true },
  experienceType: { type: String, default: "Full Stack" },
  ceoMessage: { type: String, required: true },
  closingTitle: { type: String, default: "Let's build the future — together." },
  closingSub: { type: String, default: "Join us in redefining the digital frontier." },
  image: { type: String, required: true },
  
  // ✅ ডাইনামিক আইটেম সেভ করার জন্য এই পার্টটি যোগ করা হয়েছে
  recognitionItems: [
    {
      platformName: { type: String },
      description: { type: String }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('AboutTeam', AboutTeamSchema);