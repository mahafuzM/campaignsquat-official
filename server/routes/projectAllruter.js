const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const projectAllcontrollers = require('../controllers/projectAllcontrollers');

// Multer Storage Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // নিশ্চিত করুন আপনার রুট ডিরেক্টরিতে 'uploads' নামে একটি ফোল্ডার আছে
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    // ফাইলের নাম ইউনিক করার জন্য টাইমস্ট্যাম্প + অরিজিনাল এক্সটেনশন
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// --- Routes ---

// ১. সব প্রজেক্ট গেট করা (Latest First)
router.get('/', projectAllcontrollers.getProjects);

// ২. 🚨 অত্যন্ত গুরুত্বপূর্ণ: স্লাগ দিয়ে সিঙ্গেল প্রজেক্ট ডিটেইলস গেট করা
// ফ্রন্টএন্ডে যেহেতু /api/projects/slug/${slug} কল করছেন, তাই এই রাউটটি লাগবেই
router.get('/slug/:slug', projectAllcontrollers.getProjectBySlug);

// ৩. নতুন প্রজেক্ট অ্যাড করা (imageUrl ফিল্ড ফ্রন্টএন্ড FormData এর সাথে মিল আছে)
router.post('/', upload.single('imageUrl'), projectAllcontrollers.addProject);

// ৪. 🛠️ এডিট করার জন্য PUT রাউট (ভবিষ্যতে লাগবেই)
router.put('/:id', upload.single('imageUrl'), projectAllcontrollers.updateProject);

// ৫. ডিলিট করা
router.delete('/:id', projectAllcontrollers.deleteProject);

module.exports = router;