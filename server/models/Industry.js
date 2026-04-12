const mongoose = require('mongoose');

const IndustrySchema = new mongoose.Schema({
  title: String,
  heading: String,
  description: String,
  pages: { type: String, default: "0+" },
  growth: { type: String, default: "0%" },
  ceoName: String,
  ceoTitle: String, // required: true ফেলে দিন
  ceoImg: String,
  projectImg: String,
  color: { type: String, default: "#FFFFFF" },
  imgBg: { type: String, default: "#F0F0F0" },
  link: { type: String, default: "#" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Industry', IndustrySchema);