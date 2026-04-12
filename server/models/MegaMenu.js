const mongoose = require('mongoose');

const megaMenuSchema = new mongoose.Schema({
  // ১. মেইন ৪টি ক্যাটাগরির নাম
  category: { 
    type: String, 
    required: true,
    enum: ["UI/UX Design", "Web Design & Development", "Software Development", "Mobile App Development"] 
  },
  
  // ২. সাব-আইটেমের নাম (যেমন: Custom Web Development)
  title: { 
    type: String, 
    required: true 
  },

  // ৩. এসইও ফ্রেন্ডলি ইউআরএল এর জন্য স্লাগ (যেমন: custom-web-development)
  slug: { 
    type: String, 
    required: true,
    unique: true, // একই স্লাগ যেন দুইবার না হয়
    lowercase: true,
    trim: true
  },

  // ৪. হিরো সেকশনের টেক্সট
  headerText: { 
    type: String, 
    default: "" 
  },
  
  paragraphText: { 
    type: String, 
    default: "" 
  },

  // ৫. বিস্তারিত বর্ণনা (HTML কন্টেন্টের জন্য)
  description: { 
    type: String, 
    default: "" 
  },

  // ৬. মেইন ইমেজের URL
  image: { 
    type: String, 
    default: "" 
  },

  // ৭. পেজ পাথ বা লিঙ্ক
  path: { 
    type: String, 
    default: "" 
  },

  // ৮. সিরিয়াল ঠিক রাখার জন্য
  order: { 
    type: Number, 
    default: 0 
  },

  // --- Section 2 (Expertise) ---
  sec2Title: { type: String, default: "" },
  sec2Desc: { type: String, default: "" },
  expertiseCards: [
    {
      title: { type: String, default: "" },
      desc: { type: String, default: "" },
      img: { type: String, default: "" }
    }
  ],

  // --- Section 3 (Feature Data) ---
  featureData: [
    {
      title: { type: String, default: "" },
      desc: { type: String, default: "" },
      img: { type: String, default: "" }
    }
  ],

  // --- Section 4 (Process Steps) ---
  sec4Title: { type: String, default: "" },
  sec4Desc: { type: String, default: "" },
  processSteps: [
    {
      title: { type: String, default: "" },
      desc: { type: String, default: "" },
      img: { type: String, default: "" }
    }
  ],

  // --- Section 5 (Why Choose Us) ---
  sec5Title: { type: String, default: "" },
  sec5Desc: { type: String, default: "" },
  points: [ { type: String } ], // Array of strings for points
  sideImg: { type: String, default: "" },

  // --- Section 6 (Industry Expertise) ---
  sec6Title: { type: String, default: "" },
  sec6Desc: { type: String, default: "" },
  industryData: [
    {
      title: { type: String, default: "" },
      desc: { type: String, default: "" },
      img: { type: String, default: "" }
    }
  ],

  // --- Section 7 (FAQ Section) ---
  sec7Title: { type: String, default: "" },
  sec7Desc: { type: String, default: "" },
  faqData: [
    {
      question: { type: String, default: "" },
      answer: { type: String, default: "" }
    }
  ],

  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('MegaMenu', megaMenuSchema);