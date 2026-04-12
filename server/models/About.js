const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String }
}, { timestamps: true });

// মডেলের নাম অবশ্যই 'About' হতে হবে কারণ কন্ট্রোলারে আপনি 'About' ইমপোর্ট করেছেন
module.exports = mongoose.model('About', aboutSchema);