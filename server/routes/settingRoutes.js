const express = require('express');
const router = express.Router();
const {
  getSettings,
  updateSettings,
  getStats
} = require('../controllers/settingController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getSettings)
  .put(protect, updateSettings);

router.get('/stats', protect, getStats);

module.exports = router;
