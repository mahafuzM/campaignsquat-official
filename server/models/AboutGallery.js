const mongoose = require('mongoose');

const AboutGallerySchema = new mongoose.Schema({
  images: [{ type: String }] // ইমেজের পাথগুলো এখানে অ্যারে হিসেবে থাকবে
}, { timestamps: true });

module.exports = mongoose.model('AboutGallery', AboutGallerySchema);