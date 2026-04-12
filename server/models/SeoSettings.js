const mongoose = require('mongoose');

const seoSchema = new mongoose.Schema({
  // শুধু গুগল সার্চ কনসোল ভেরিফিকেশন কোডের জন্য
  googleVerificationCode: { 
    type: String, 
    default: "" 
  },
  // ভবিষ্যতের জন্য টাইটেল এবং ডেসক্রিপশন রাখা ভালো, 
  // তবে আপনি চাইলে এগুলো বাদও দিতে পারেন
  metaTitle: { 
    type: String, 
    default: "Campaignsquat Ltd" 
  },
  metaDescription: { 
    type: String, 
    default: "" 
  }
}, { timestamps: true });

module.exports = mongoose.model('SeoSettings', seoSchema);