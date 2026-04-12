const express = require('express');
const router = express.Router();
const aboutHeroController = require('../controllers/aboutHeroController');

// নিশ্চিত করুন aboutHeroController.getHero একটি ফাংশন
router.get('/hero', aboutHeroController.getHero);

// নিশ্চিত করুন aboutHeroController.updateHero একটি ফাংশন
router.post('/hero/update', aboutHeroController.updateHero); 

module.exports = router;