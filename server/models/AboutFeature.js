const mongoose = require('mongoose');

const AboutFeatureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  iconPath: { type: String, required: true } // শুধু SVG-এর d="..." অংশটুকু
}, { timestamps: true });

module.exports = mongoose.model('AboutFeature', AboutFeatureSchema);