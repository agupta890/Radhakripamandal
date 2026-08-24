const Contact = require('../models/Contact');
const Volunteer = require('../models/Volunteer');

// @desc    Submit Contact Message
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res) => {
  try {
    const { name, phone, email, subject, message } = req.body;

    if (!name || !phone || !subject || !message) {
      return res.status(400).json({ success: false, message: 'कृपया सभी आवश्यक फ़ील्ड भरें' });
    }

    const contact = await Contact.create({
      name,
      phone,
      email,
      subject,
      message
    });

    res.status(201).json({
      success: true,
      message: 'आपका संदेश सफलतापूर्वक प्राप्त हो गया है। हम शीघ्र ही आपसे संपर्क करेंगे। राधे-राधे!',
      contact
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private (Admin)
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, count: contacts.length, contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete contact message
// @route   DELETE /api/contact/:id
// @access  Private (Admin)
const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: 'संदेश नहीं मिला' });
    }

    await contact.deleteOne();
    res.json({ success: true, message: 'संदेश सफलतापूर्वक हटा दिया गया' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Submit Volunteer / Seva form
// @route   POST /api/volunteer
// @access  Public
const submitVolunteer = async (req, res) => {
  try {
    const { name, phone, email, city, interest, message } = req.body;

    if (!name || !phone || !city) {
      return res.status(400).json({ success: false, message: 'कृपया नाम, फोन एवं शहर अवश्य भरें' });
    }

    const volunteer = await Volunteer.create({
      name,
      phone,
      email,
      city,
      interest,
      message
    });

    res.status(201).json({
      success: true,
      message: 'सेवा से जुड़ने हेतु आपका पंजीकरण सफलतापूर्वक हो गया है। संस्था परिवार आपसे शीघ्र संपर्क करेगा। जय श्री राधे!',
      volunteer
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get all volunteers
// @route   GET /api/volunteer
// @access  Private (Admin)
const getVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find().sort({ createdAt: -1 });
    res.json({ success: true, count: volunteers.length, volunteers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update volunteer status
// @route   PUT /api/volunteer/:id
// @access  Private (Admin)
const updateVolunteerStatus = async (req, res) => {
  try {
    const volunteer = await Volunteer.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!volunteer) {
      return res.status(404).json({ success: false, message: 'पंजीकरण नहीं मिला' });
    }
    res.json({ success: true, message: 'स्थिति अपडेट की गई', volunteer });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete volunteer
// @route   DELETE /api/volunteer/:id
// @access  Private (Admin)
const deleteVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);
    if (!volunteer) {
      return res.status(404).json({ success: false, message: 'पंजीकरण नहीं मिला' });
    }
    await volunteer.deleteOne();
    res.json({ success: true, message: 'पंजीकरण सफलतापूर्वक हटा दिया गया' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  submitContact,
  getContacts,
  deleteContact,
  submitVolunteer,
  getVolunteers,
  updateVolunteerStatus,
  deleteVolunteer
};
