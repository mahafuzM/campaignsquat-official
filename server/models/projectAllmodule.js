const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  
  // ১. স্লাগ (fullName) - URL এর জন্য ইউনিক হওয়া জরুরি
  fullName: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true 
  }, 
  
  category: { type: String, trim: true },
  description: { type: String },
  clientName: { type: String },
  
  // ✅ এই ফিল্ডটা আপনার মিসিং ছিল! 
  // এটি অ্যাড করলেই এখন ডাটাবেসে ২০২০ বা ২০২৬ সেভ হবে।
  year: { 
    type: String, 
    default: "2026",
    trim: true 
  },
  
  // ২. টেকনোলজি এরে হিসেবেই থাকবে
  technology: [String],
  
  projectUrl: { type: String },
  imageUrl: { type: String },
  completedDate: { type: Date },
  
  // ৩. সেকশনস - Mixed টাইপ দেওয়া ভালো কারণ এখানে অবজেক্টের এরে থাকে
  sections: { 
    type: mongoose.Schema.Types.Mixed, 
    default: [] 
  } 
}, { 
  timestamps: true // createdAt এবং updatedAt অটো হ্যান্ডেল করবে
});

// ৩য় প্যারামিটার দিয়ে কালেকশন ফিক্সড করা একদম পারফেক্ট!
module.exports = mongoose.model('ProjectAll', projectSchema, 'projectalls');