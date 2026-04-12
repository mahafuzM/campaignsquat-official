const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AdminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        default: 'admin'
    },
    lastLogin: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

// --- 🛡️ পাসওয়ার্ড সেভ করার আগে অটোমেটিক হ্যাশ (Hash) করার লজিক ---
// এখানে আমরা async ব্যবহার করছি, তাই 'next' এর দরকার নাই
AdminSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }
    
    // পাসওয়ার্ড হ্যাশ করা হচ্ছে
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// --- 🔑 পাসওয়ার্ড চেক করার মেথড ---
AdminSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);