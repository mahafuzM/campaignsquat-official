const express = require('express');
const router = express.Router();
const projectAllcontrollers = require('../controllers/projectAllcontrollers');
const upload = require('../config/uploadConfig');

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