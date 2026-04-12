const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }, 
  buttonText: { type: String, default: "Get The Product" }, 
  buttonUrl: { type: String, default: "/book-meeting" }, 
  
  // --- নতুন এই অংশটুকু অ্যাড করা হয়েছে ---
  contentSections: [
    {
      type: { type: String, enum: ['heading', 'text', 'list'] },
      value: { type: String },
      items: [String] // শুধুমাত্র লিস্ট টাইপ হলে এই অ্যারেতে ডাটা থাকবে
    }
  ],
  
  testimonials: [
    {
      user: String,
      designation: String,
      feedback: String
    }
  ],
  // ------------------------------------

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);