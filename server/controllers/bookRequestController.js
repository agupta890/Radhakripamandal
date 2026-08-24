const BookRequest = require('../models/BookRequest');

// @desc    Submit new Radha Naam Pustika request
// @route   POST /api/book-requests
// @access  Public
const createBookRequest = async (req, res) => {
  try {
    const { name, phone, email, address, city, pincode, state, copies, sankalpNaam, notes } = req.body;

    if (!name || !phone || !address || !city || !pincode) {
      return res.status(400).json({ success: false, message: 'कृपया नाम, फोन नंबर, पूरा पता, शहर और पिनकोड दर्ज करें' });
    }

    const request = await BookRequest.create({
      name,
      phone,
      email,
      address,
      city,
      pincode,
      state: state || 'उत्तर प्रदेश',
      copies: copies || 1,
      sankalpNaam: sankalpNaam || '1,08,000 श्री राधा नाम लेखन',
      notes
    });

    res.status(201).json({
      success: true,
      message: 'श्री राधा नाम लेखन पुस्तिका हेतु आपका अनुरोध सफलतापूर्वक प्राप्त हो गया है। पुस्तिका शीघ्र ही आपके पते पर प्रेषित की जाएगी। जय श्री राधे!',
      request
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get all book requests
// @route   GET /api/book-requests
// @access  Private (Admin)
const getBookRequests = async (req, res) => {
  try {
    const requests = await BookRequest.find().sort({ createdAt: -1 });
    res.json({ success: true, count: requests.length, requests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update book request status
// @route   PUT /api/book-requests/:id
// @access  Private (Admin)
const updateBookRequestStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;
    const request = await BookRequest.findByIdAndUpdate(
      req.params.id,
      { status, ...(notes !== undefined && { notes }) },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ success: false, message: 'अनुरोध नहीं मिला' });
    }

    res.json({ success: true, message: 'स्थिति अपडेट की गई', request });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete book request
// @route   DELETE /api/book-requests/:id
// @access  Private (Admin)
const deleteBookRequest = async (req, res) => {
  try {
    const request = await BookRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ success: false, message: 'अनुरोध नहीं मिला' });
    }

    await request.deleteOne();
    res.json({ success: true, message: 'अनुरोध सफलतापूर्वक हटा दिया गया' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createBookRequest,
  getBookRequests,
  updateBookRequestStatus,
  deleteBookRequest
};
