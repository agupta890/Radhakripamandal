const express = require('express');
const router = express.Router();
const {
  submitVolunteer,
  getVolunteers,
  updateVolunteerStatus,
  deleteVolunteer
} = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(submitVolunteer)
  .get(protect, getVolunteers);

router.route('/:id')
  .put(protect, updateVolunteerStatus)
  .delete(protect, deleteVolunteer);

module.exports = router;
