const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  hotel_id: {
    type: String,
    required: false,
    min: 6,
  },
  hotel_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  zip_code: {
    type: String,
    required: true,
  },
  room_collection: {
    type: Object,
    required: true,
  },
  amenities: {
    type: Array,
    required: true,
  },
  indexImage: {
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
  location: {
    type: String,
    required: false,
    default: 'Bangalore',
  },
  totalRooms: {
    type: Number,
    required: false,
  },
});

module.exports = mongoose.model('Hotel', hotelSchema);
