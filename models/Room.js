const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
  },
  taken: {
    type: Boolean,
    required: true,
  },
  bookedDates: {
    type: Object,
    required: true,
  },
  pendingStatus: {
    type: Boolean,
    required: false,
    default: false,
  },
});

module.exports = mongoose.model('Room', roomSchema);
