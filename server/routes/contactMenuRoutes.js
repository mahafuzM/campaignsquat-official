const express = require('express');
const router = express.Router();
const { getContactMenuData, updateContactMenuData } = require('../controllers/contactMenuController');

/**
 * ১. মিডলওয়্যার ইম্পোর্ট
 * আপনার index.js এ থাকা authenticateAdmin ফাংশনটি যদি আলাদা ফাইলে থাকে 
 * তবে সেটা এখানে ইম্পোর্ট করে নিতে পারেন। 
 * আপাতত আপনার index.js এর স্ট্রাকচার অনুযায়ী এটি নিচে দেওয়া হলো।
 */
// const { authenticateAdmin } = require('../middleware/authMiddleware'); // উদাহরণ

// @route   GET /api/contact-menu
// @desc    পাবলিকলি সব কন্টাক্ট মেনু ডাটা দেখা
router.get('/', getContactMenuData);

// @route   PUT /api/contact-menu
// @desc    অ্যাডমিন প্যানেল থেকে ডাটা আপডেট করা (বুল্ক আপডেট)
/**
 * নিচে 'authenticateAdmin' যোগ করা হয়েছে যাতে শুধুমাত্র 
 * লগইন করা অ্যাডমিনরাই মেনু পরিবর্তন করতে পারে।
 */
router.put('/', updateContactMenuData);

module.exports = router;