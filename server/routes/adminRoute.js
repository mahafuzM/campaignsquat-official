const express = require('express');
const router = express.Router();
// ✅ নাম পরিবর্তন করে updateAdminProfile করা হয়েছে
const { updateAdminProfile } = require('../controllers/adminController'); 

// ১. অথেনটিকেশন মিডলওয়্যার
const jwt = require("jsonwebtoken");
const authenticateAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ success: false, message: "Access Denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded; // এখানে আপনার টোকেন থেকে ইমেইল req.admin.email হিসেবে সেট হবে
    next();
  } catch (err) {
    res.status(400).json({ success: false, message: "Invalid Token" });
  }
};

/**
 * ২. প্রোফাইল আপডেট রুট (Email & Password)
 * যেহেতু আমরা এখন ইমেইলও এডিট করতে পারি, তাই পাথের নাম 'update-profile' দেওয়া ভালো
 */
if (typeof updateAdminProfile === 'function') {
    router.put('/update-profile', authenticateAdmin, updateAdminProfile);
} else {
    console.error("❌ Error: updateAdminProfile is not a function! Check your controller export.");
}

module.exports = router;