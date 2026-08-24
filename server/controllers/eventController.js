const Event = require('../models/Event');

// @desc    Get all events (public with filter)
// @route   GET /api/events
// @access  Public
const getEvents = async (req, res) => {
  try {
    const { category, status, search, featured, limit } = req.query;
    let query = {};

    if (category && category !== 'सभी') {
      query.category = category;
    }

    if (status) {
      query.status = status;
    }

    if (featured === 'true') {
      query.isFeatured = true;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    let queryExec = Event.find(query).sort({ date: 1 });
    if (limit) {
      queryExec = queryExec.limit(Number(limit));
    }

    const events = await queryExec;
    res.json({ success: true, count: events.length, events });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single event by ID
// @route   GET /api/events/:id
// @access  Public
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'कार्यक्रम नहीं मिला' });
    }
    res.json({ success: true, event });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new event
// @route   POST /api/events
// @access  Private (Admin)
const createEvent = async (req, res) => {
  try {
    const { title, category, description, date, time, location, image, organizer, isFeatured, status } = req.body;

    const event = await Event.create({
      title,
      category,
      description,
      date,
      time,
      location,
      image: image || undefined,
      organizer,
      isFeatured,
      status
    });

    res.status(201).json({ success: true, message: 'कार्यक्रम सफलतापूर्वक जोड़ा गया', event });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private (Admin)
const updateEvent = async (req, res) => {
  try {
    let event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'कार्यक्रम नहीं मिला' });
    }

    event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({ success: true, message: 'कार्यक्रम सफलतापूर्वक अपडेट किया गया', event });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private (Admin)
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'कार्यक्रम नहीं मिला' });
    }

    await event.deleteOne();
    res.json({ success: true, message: 'कार्यक्रम सफलतापूर्वक हटा दिया गया' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
};
