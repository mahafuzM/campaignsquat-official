const mongoose = require("mongoose");

const aboutVisionSchemaM = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    default: "Your Success is Our Reputation \n Powered by CampaignSquat Ltd"
  },
  description: { 
    type: String, 
    required: true,
    default: "At Campaignsquat Ltd., we believe in true digital excellence."
  },
  imageUrl: { 
    type: String,
    default: "" 
  }
}, { timestamps: true });

module.exports = mongoose.model("AboutVisionM", aboutVisionSchemaM);