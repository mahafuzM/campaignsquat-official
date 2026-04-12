const mongoose = require('mongoose');

const pricingSchema = new mongoose.Schema({
  category: { 
    type: String, 
    required: true, 
    enum: ['UI/UX Design', 'Web Development', 'Software Development', 'Mobile App Development', 'CMS Packages'] 
  },
  name: { type: String, required: true },
  price: { type: String, required: true },
  subText: { type: String }, // e.g., "/ Design only"
  features: [{ type: String }], // অ্যারে হিসেবে থাকবে: ["Title: Detail"]
  isPopular: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pricing', pricingSchema);