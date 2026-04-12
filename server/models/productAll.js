const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  fullName: { type: String, required: true }, 
  category: { type: String },
  description: { type: String },
  clientName: { type: String },
  technology: [String],
  projectUrl: { type: String },
  imageUrl: { type: String },
  completedDate: { type: Date },
  sections: { type: Array, default: [] } 
}, { timestamps: true });

module.exports = mongoose.model('ProductAll', productSchema);