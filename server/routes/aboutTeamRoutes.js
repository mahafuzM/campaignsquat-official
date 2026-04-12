const express = require('express');
const router = express.Router();
const aboutTeamController = require('../controllers/aboutTeamController');

// GET request: ডাটা দেখার জন্য
router.get('/', aboutTeamController.getAboutTeam);

// POST request: ডাটা আপডেট করার জন্য
router.post('/update', aboutTeamController.updateAboutTeam);

module.exports = router;