const mongoose = require('mongoose');

const AboutMissionSchema = new mongoose.Schema({
  missionIcon: { type: String, default: 'M13 10V3L4 14h7v7l9-11h-7z' }, // SVG Path
  missionTitle: { type: String, default: 'Our Mission' },
  missionDesc: { type: String },
  visionIcon: { type: String, default: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' },
  visionTitle: { type: String, default: 'Our Vision' },
  visionDesc: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('AboutMission', AboutMissionSchema);