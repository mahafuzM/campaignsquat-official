const mongoose = require('mongoose');

const creativeServiceSchema = new mongoose.Schema({
    sectionTitle: { 
        type: String, 
        default: "All Our Creative Services Included" 
    },
    services: [
        {
            name: { type: String, required: true },
            url: { type: String, default: "#" }
        }
    ]
}, { 
    timestamps: true 
});

module.exports = mongoose.model('CreativeService', creativeServiceSchema);