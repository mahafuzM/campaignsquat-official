const express = require('express');
const router = express.Router();
const missionController = require('../controllers/aboutMissionController');

router.get('/', missionController.getMission);
router.post('/update', missionController.updateMission);

module.exports = router;