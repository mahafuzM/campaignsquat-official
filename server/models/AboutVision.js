const mongoose = require('mongoose');

const AboutVisionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('AboutVision', AboutVisionSchema);