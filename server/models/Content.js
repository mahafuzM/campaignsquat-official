const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
  sectionName: { type: String, required: true, unique: true }, // যেমন: 'hero', 'about', 'skills'
  data: { type: Object, required: true } // ওই সেকশনের সব টেক্সট/ইমেজ এখানে থাকবে
}, { timestamps: true });

module.exports = mongoose.model('Content', ContentSchema);