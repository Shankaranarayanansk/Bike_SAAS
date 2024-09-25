const Booking = require('../models/Booking');
const { sendEmail } = require('../utils/email');

exports.createBooking = async (req, res) => {
  try {
    const booking = await Booking.create({ ...req.body, user: req.user.id });
    await sendEmail({
      email: process.env.OWNER_EMAIL,
      subject: 'New Booking',
      message: `A new booking has been made for ${booking.service} on ${booking.date}`
    });
    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};


exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find(req.user.role === 'owner' ? {} : { user: req.user.id }).populate('service');
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true });
    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }
    if (status === 'ready for delivery') {
      await sendEmail({
        email: booking.user.email,
        subject: 'Your bike is ready for the  delivery',
        message: `Your bike service for ${booking.service.name} is completed and ready for delivery.`
      });
    }
    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
