const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Title is required'], 
    trim: true 
  },
  url: { 
    type: String, 
    required: [true, 'Slug URL is required'], 
    unique: true, // SEO-র জন্য এটি মাস্ট
    lowercase: true,
    trim: true,
    index: true // দ্রুত সার্চ করার জন্য ইনডেক্সিং যোগ করা হয়েছে
  },
  category: { 
    type: String, 
    enum: {
      values: ['Ui/Ux Design', 'Web Development', 'Software Development', 'Mobile Apps Development'],
      message: '{VALUE} is not a valid category'
    },
    required: true 
  },
  description: { 
    type: String, 
    required: [true, 'Short description is required'] 
  },
  image: { 
    type: String, 
    required: [true, 'Featured image is required'] 
  },
  author: { 
    type: String, 
    default: 'Md Maharab Biswas Api' 
  },
  // views কে Number রাখা ভালো, যাতে পরে অংক (increment) করা সহজ হয়
  views: { 
    type: Number, 
    default: 0 
  },
  // আর্টিকেল বিল্ডার পার্ট
  sections: [
    {
      type: { 
        type: String, 
        enum: ['text', 'heading', 'list'],
        required: true 
      },
      value: { type: String }, // text বা heading এর জন্য
      items: [String] // শুধুমাত্র list টাইপের বুলেট পয়েন্টের জন্য
    }
  ]
}, { 
  timestamps: true, // এটি অটোমেটিক createdAt এবং updatedAt তৈরি করবে
  versionKey: false // __v ফিল্ডটি রিমুভ করার জন্য
});

// URL (Slug) তৈরি করার সময় যাতে কোনো ডুপ্লিকেট না হয়, তার জন্য একটি প্রি-সেভ চেক রাখা ভালো
// তবে তুমি যেহেতু ফ্রন্টএন্ড এবং কন্ট্রোলারে হ্যান্ডেল করছ, তাই এটি অপশনাল।

module.exports = mongoose.model('Blog', blogSchema);