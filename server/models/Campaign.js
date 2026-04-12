const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String },
  status: { type: String, default: 'active' }
}, { timestamps: true });

// সার্চ অপ্টিমাইজেশনের জন্য ইনডেক্স
campaignSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Campaign', campaignSchema);