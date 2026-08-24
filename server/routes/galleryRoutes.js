const express = require('express');
const router = express.Router();
const {
  getGalleryImages,
  addGalleryImage,
  deleteGalleryImage
} = require('../controllers/galleryController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getGalleryImages)
  .post(protect, addGalleryImage);

router.route('/:id')
  .delete(protect, deleteGalleryImage);

module.exports = router;
