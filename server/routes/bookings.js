const express = require('express');
const router = express.Router();
const { createBooking, getBookings, updateBookingStatus } = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', protect, createBooking);
router.get('/', protect, getBookings);
router.put('/:id/status', protect, authorize('owner'), updateBookingStatus);

module.exports = router;