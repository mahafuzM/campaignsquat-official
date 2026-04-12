// models/Job.js
const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    iconName: { type: String, default: 'Code' },
    location: { type: String, default: 'On-site' },
    jobType: { type: String, default: 'Full Time' },
    salary: { type: String, default: 'Negotiable' },
    shift: { type: String, default: 'Day Shift' },
    
    // 🔥 Builder-এর সব ডেটা নির্ভুলভাবে সেভ করার জন্য আপডেট করা সেকশন
    sections: [{
        type: { 
            type: String, 
            enum: ['heading', 'text', 'list', 'summary', 'requirements'], // summary ও requirements যোগ করা হয়েছে
            required: true 
        },
        value: { type: String }, // Heading, Text বা Summary-র জন্য
        
        // List-এর জন্য সাধারণ স্ট্রিং অ্যারে
        items: [{ type: String }], 
        
        // Requirements-এর জন্য Object অ্যারে (label ও desc হ্যান্ডেল করার জন্য)
        requirementItems: [{
            label: { type: String },
            desc: { type: String }
        }]
    }],

    category: { type: String, default: 'General' },
    status: { type: String, enum: ['active', 'closed'], default: 'active' }
}, {
    timestamps: true 
});

module.exports = mongoose.model('Job', JobSchema);