const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  clientName: { type: String },
  technology: [String], // যেমন: React, Node
  projectUrl: { type: String },
  imageUrl: { type: String },
  completedDate: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);