const router = require('express').Router();
const {
	add,
	update,
	getHotelIds,
	getHotelRooms,
	getHotels,
	blockRooms,
	getReviews,
	addReview,
} = require('../controllers/hotel');

// @route   POST api/hotel/add
// @desc    Add new hotel
// @access  Public
router.post('/add', add);

// @route   POST api/hotel/add
// @desc    Add new hotel
// @access  Public
router.post('/blockRooms', blockRooms);

// @route   GET api/hotel/getHotels
// @desc    Get all hotel lists
// @access  Public
router.get('/getHotels', getHotels);

// @route   GET api/hotel/getHotelRooms
// @desc    Get rooms list in hotel
// @access  Public
router.get('/getHotelRooms', getHotelRooms);

// @route   GET api/hotel/addReviews
// @desc    Add new hotel review
// @access  Public
router.post('/addReview', addReview);

// @route   GET api/hotel/getReviews
// @desc    Get hotel reviews
// @access  Public
router.get('/getReviews', getReviews);

router.put('/update', update);

router.get('/getHotelIds', getHotelIds);

module.exports = router;
