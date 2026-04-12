const mongoose = require('mongoose');

const WorkProcessSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true }, // ইমেজ পাথ স্টোর হবে
    order: { type: Number, default: 0 }     // স্টেপগুলোর সিরিয়াল মেইনটেইন করার জন্য
}, { timestamps: true });

module.exports = mongoose.model('WorkProcess', WorkProcessSchema);