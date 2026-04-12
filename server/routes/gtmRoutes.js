const router = require('express').Router();
const { getGtmConfig, updateGtmConfig } = require('../controllers/gtmController');

// এটি এখন কাজ করবে: GET /api/gtm-config
router.get('/', getGtmConfig);

// এটি এখন কাজ করবে: PUT /api/gtm-config
router.put('/', updateGtmConfig);

module.exports = router;