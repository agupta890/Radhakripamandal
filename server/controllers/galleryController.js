const Gallery = require('../models/Gallery');

// @desc    Get all gallery images
// @route   GET /api/gallery
// @access  Public
const getGalleryImages = async (req, res) => {
  try {
    const { category, limit } = req.query;
    let query = {};

    if (category && category !== 'सभी') {
      query.category = category;
    }

    let queryExec = Gallery.find(query).sort({ date: -1, createdAt: -1 });
    if (limit) {
      queryExec = queryExec.limit(Number(limit));
    }

    const images = await queryExec;
    res.json({ success: true, count: images.length, images });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Add image to gallery
// @route   POST /api/gallery
// @access  Private (Admin)
const addGalleryImage = async (req, res) => {
  try {
    const { title, category, imageUrl, caption, date } = req.body;

    const image = await Gallery.create({
      title,
      category,
      imageUrl,
      caption,
      date: date || undefined
    });

    res.status(201).json({ success: true, message: 'चित्र सफलतापूर्वक जोड़ा गया', image });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete gallery image
// @route   DELETE /api/gallery/:id
// @access  Private (Admin)
const deleteGalleryImage = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ success: false, message: 'चित्र नहीं मिला' });
    }

    await image.deleteOne();
    res.json({ success: true, message: 'चित्र सफलतापूर्वक हटा दिया गया' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getGalleryImages,
  addGalleryImage,
  deleteGalleryImage
};
