const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
	hotel_id: {
		type: String,
		required: true,
	},
	comment: {
		type: String,
		required: false,
		default: '',
	},
	name: {
		type: String,
		required: false,
		default: 'Anonymous',
	},
	rating: {
		type: Number,
		required: true,
	},
	timeStamp: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model('Review', reviewSchema);
