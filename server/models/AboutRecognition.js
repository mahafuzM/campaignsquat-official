const mongoose = require('mongoose');

const AboutRecognitionSchema = new mongoose.Schema({
  mainTitle: { type: String, default: "The Global Recognition" }, // মেইন টাইটেল
  image: { type: String, required: true },
  platforms: [
    {
      platform: { type: String, required: true }, // এটা হবে H
      desc: { type: String, required: true }      // এটা হবে P
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('AboutRecognition', AboutRecognitionSchema);