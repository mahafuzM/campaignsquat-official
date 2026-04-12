const mongoose = require('mongoose');

const technicalEdgeSchema = new mongoose.Schema({
    mainHeader: { 
        type: String, 
        default: "The Technical Edge" 
    },
    subTitle: { 
        type: String, 
        default: "Strategic Assets included with every partnership" 
    },
    assets: [
        {
            icon: { type: String, required: true }, // e.g. 'zap'
            title: { type: String, required: true },
            description: { type: String, required: true }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('TechnicalEdge', technicalEdgeSchema);