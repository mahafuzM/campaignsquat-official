const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true,
        trim: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    image: { 
        type: String, 
        required: true 
    },
    category: { 
        type: String, 
        required: true,
        trim: true
    },
    fullName: { 
        type: String, 
        required: true, 
        unique: true, // স্লাগ বা আইডি হিসেবে কাজ করবে তাই ইউনিক হওয়া জরুরি
        trim: true 
    },
    client: { 
        type: String, 
        default: "" 
    },
    year: { 
        type: String, 
        default: "2026" 
    },
    projectUrl: { 
        type: String, 
        default: "" 
    },
    // Array-র বদলে Mixed ব্যবহার করছি কারণ সেকশনের ভেতর অবজেক্ট, টেক্সট, লিস্ট সব থাকতে পারে
    sections: { 
        type: mongoose.Schema.Types.Mixed, 
        default: [] 
    }
}, { 
    timestamps: true // এটি অটোমেটিক createdAt এবং updatedAt টাইম যোগ করবে
});

module.exports = mongoose.model('Project', ProjectSchema);