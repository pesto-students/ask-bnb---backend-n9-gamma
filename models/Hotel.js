const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
  },
  hotelDetail: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
  amnities: {
    type: Array,
    required: true,
  },
  indexImages: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
  reviews: {
    type: Number,
    required: false,
  },
  ratings: {
    type: String,
    required: true,
  },
  pricePerNight: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Hotel', hotelSchema);
