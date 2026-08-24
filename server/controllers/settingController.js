const Setting = require('../models/Setting');
const Event = require('../models/Event');
const Blog = require('../models/Blog');
const Gallery = require('../models/Gallery');
const Video = require('../models/Video');
const Contact = require('../models/Contact');
const Volunteer = require('../models/Volunteer');
const BookRequest = require('../models/BookRequest');

// @desc    Get Settings (Donation info & Sanstha details)
// @route   GET /api/settings
// @access  Public
const getSettings = async (req, res) => {
  try {
    let setting = await Setting.findOne();
    if (!setting) {
      setting = await Setting.create({});
    }
    res.json({ success: true, setting });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update Settings
// @route   PUT /api/settings
// @access  Private (Admin)
const updateSettings = async (req, res) => {
  try {
    let setting = await Setting.findOne();
    if (!setting) {
      setting = await Setting.create(req.body);
    } else {
      setting = await Setting.findByIdAndUpdate(setting._id, req.body, { new: true });
    }
    res.json({ success: true, message: 'सेटिंग्स सफलतापूर्वक सहेजी गईं', setting });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get Admin Dashboard Stats
// @route   GET /api/settings/stats
// @access  Private (Admin)
const getStats = async (req, res) => {
  try {
    const totalEvents = await Event.countDocuments();
    const upcomingEvents = await Event.countDocuments({ status: 'upcoming' });
    const totalBlogs = await Blog.countDocuments();
    const totalImages = await Gallery.countDocuments();
    const totalVideos = await Video.countDocuments();
    const totalMessages = await Contact.countDocuments();
    const unreadMessages = await Contact.countDocuments({ isRead: false });
    const totalVolunteers = await Volunteer.countDocuments();
    const pendingVolunteers = await Volunteer.countDocuments({ status: 'pending' });
    const totalBookRequests = await BookRequest.countDocuments();
    const pendingBookRequests = await BookRequest.countDocuments({ status: 'pending' });

    res.json({
      success: true,
      stats: {
        totalEvents,
        upcomingEvents,
        totalBlogs,
        totalImages,
        totalVideos,
        totalMessages,
        unreadMessages,
        totalVolunteers,
        pendingVolunteers,
        totalBookRequests,
        pendingBookRequests
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getSettings,
  updateSettings,
  getStats
};
