const mongoose = require('mongoose');

const ContactMenuSchema = new mongoose.Schema({
    text: { 
        type: String, 
        required: true, 
        trim: true 
    },
    icon: { 
        type: String, 
        required: true,
        // নিশ্চিত করুন ফ্রন্টএন্ড থেকে এই ৪টি ভ্যালুর যেকোনো একটি আসছে
        enum: ['calendar', 'whatsapp', 'zap', 'message'] 
    },
    link: { 
        type: String, 
        required: false, // এখন লিঙ্ক না দিলেও এরর আসবে না
        trim: true,
        default: ""      // ডিফল্ট খালি স্ট্রিং থাকবে
    },
    order: { 
        type: Number, 
        default: 0 
    }
}, { timestamps: true });

module.exports = mongoose.model('ContactMenu', ContactMenuSchema);