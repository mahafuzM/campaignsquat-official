const mongoose = require('mongoose');

const FooterSchema = new mongoose.Schema({
  brandName: { 
    type: String, 
    default: "CampaignSquat Ltd",
    trim: true 
  },
  brandDescription: { 
    type: String, 
    default: "",
    trim: true 
  },
  socialLinks: [
    {
      platform: { type: String, lowercase: true, trim: true }, // 'Facebook' কে 'facebook' এ কনভার্ট করবে ম্যাপিং এর সুবিধার জন্য
      url: { type: String, trim: true }
    }
  ],
  services: [
    {
      name: { type: String, trim: true },
      link: { type: String, trim: true }
    }
  ],
  quickLinks: [
    {
      name: { type: String, trim: true },
      url: { type: String, trim: true }
    }
  ],
  contact: {
    email: { 
      type: String, 
      default: "", 
      trim: true, 
      lowercase: true 
    },
    phone: { 
      type: String, 
      default: "", 
      trim: true 
    },
    offices: [
      {
        country: { type: String, trim: true },
        address: { type: String, trim: true }
      }
    ]
  },
  hiringStatus: {
    showCard: { type: Boolean, default: true },
    isHiring: { type: Boolean, default: true },
    title: { type: String, default: "Careers", trim: true },
    description: { type: String, default: "", trim: true },
    hiringNotice: { type: String, default: "We Are Hiring!", trim: true }
  }
}, { timestamps: true });

// ডুপ্লিকেট ডকুমেন্ট এড়াতে ইনডেক্স ব্যবহার করা যেতে পারে (যেহেতু ফুটার একটাই হবে)
// FooterSchema.index({ brandName: 1 }); 

module.exports = mongoose.model('Footer', FooterSchema);