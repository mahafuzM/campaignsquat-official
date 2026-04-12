const mongoose = require('mongoose');

const GtmSettingsSchema = new mongoose.Schema({
  gtmId: { type: String, default: "" },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('GtmSettings', GtmSettingsSchema);