const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  order: { type: Number, default: 0 }, // সিরিয়াল মেইনটেইন করার জন্য
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Faq', faqSchema);