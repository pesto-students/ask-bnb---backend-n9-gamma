const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  hotel_id: {
    type: String,
    required: true,
  },
  hotel_name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  guests: {
    type: String,
    required: true,
  },
  check_in: {
    type: String,
    required: true,
  },
  check_out: {
    type: String,
    required: true,
  },
  rooms_booked: [{ room_type: String, room_id: String, price: Number }],
  total_amount: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  payment_id: String,
});

module.exports = mongoose.model('Booking', bookingSchema);
