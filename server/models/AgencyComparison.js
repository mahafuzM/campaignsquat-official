const mongoose = require('mongoose');

const ComparisonItemSchema = new mongoose.Schema({
    label: { type: String, required: true },
    othersHasIt: { type: Boolean, default: false }
});

const AgencyComparisonSchema = new mongoose.Schema({
    titlePart1: { type: String, default: "What Do You Get By Choosing" },
    brandName: { type: String, default: "Campaignsquat?" },
    competitorLabel: { type: String, default: "Other Design Agencies" },
    comparisonList: [ComparisonItemSchema],
}, { timestamps: true });

module.exports = mongoose.model('AgencyComparison', AgencyComparisonSchema);