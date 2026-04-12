const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    full_name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    // এই নতুন ফিল্ডটি যোগ করা হলো যাতে কোন পজিশনে অ্যাপ্লাই করেছে তা ট্র্যাক করা যায়
    applied_for: { type: String, default: "General Application" }, 
    total_exp: { type: String, required: true },
    current_salary: { type: String, required: true },
    expected_salary: { type: String, required: true },
    cover_letter: { type: String, required: true },
    cv_file: { type: String }, 
    // timestamps: true থাকায় createdAt স্বয়ংক্রিয়ভাবে তৈরি হবে, তাই appliedAt অপশনাল
    appliedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);