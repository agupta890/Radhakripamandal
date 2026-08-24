const express = require('express');
const router = express.Router();
const {
  getVideos,
  createVideo,
  updateVideo,
  deleteVideo
} = require('../controllers/videoController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getVideos)
  .post(protect, createVideo);

router.route('/:id')
  .put(protect, updateVideo)
  .delete(protect, deleteVideo);

module.exports = router;
