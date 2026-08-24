const express = require('express');
const router = express.Router();
const {
  createBookRequest,
  getBookRequests,
  updateBookRequestStatus,
  deleteBookRequest
} = require('../controllers/bookRequestController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(createBookRequest)
  .get(protect, getBookRequests);

router.route('/:id')
  .put(protect, updateBookRequestStatus)
  .delete(protect, deleteBookRequest);

module.exports = router;
