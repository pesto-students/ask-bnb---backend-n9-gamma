const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  roomId: {
    type: String,
    required: true,
  },
  checkinDate: {
    type: Date,
    required: true,
  },
  checkoutDate: {
    type: Date,
    required: true,
  },
  paymentId: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
  },
});

module.exports = mongoose.model('Booking', bookingSchema);
