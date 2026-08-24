const Video = require('../models/Video');

// @desc    Get all videos
// @route   GET /api/videos
// @access  Public
const getVideos = async (req, res) => {
  try {
    const { category, featured, limit } = req.query;
    let query = {};

    if (category && category !== 'सभी') {
      query.category = category;
    }

    if (featured === 'true') {
      query.isFeatured = true;
    }

    let queryExec = Video.find(query).sort({ createdAt: -1 });
    if (limit) {
      queryExec = queryExec.limit(Number(limit));
    }

    const videos = await queryExec;
    res.json({ success: true, count: videos.length, videos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Add new video
// @route   POST /api/videos
// @access  Private (Admin)
const createVideo = async (req, res) => {
  try {
    const { title, category, youtubeUrl, description, isFeatured } = req.body;

    const video = await Video.create({
      title,
      category,
      youtubeUrl,
      description,
      isFeatured
    });

    res.status(201).json({ success: true, message: 'वीडियो सफलतापूर्वक जोड़ा गया', video });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update video
// @route   PUT /api/videos/:id
// @access  Private (Admin)
const updateVideo = async (req, res) => {
  try {
    let video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ success: false, message: 'वीडियो नहीं मिला' });
    }

    video = await Video.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({ success: true, message: 'वीडियो सफलतापूर्वक अपडेट किया गया', video });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete video
// @route   DELETE /api/videos/:id
// @access  Private (Admin)
const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ success: false, message: 'वीडियो नहीं मिला' });
    }

    await video.deleteOne();
    res.json({ success: true, message: 'वीडियो सफलतापूर्वक हटा दिया गया' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getVideos,
  createVideo,
  updateVideo,
  deleteVideo
};
