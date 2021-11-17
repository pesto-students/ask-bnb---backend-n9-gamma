const router = require('express').Router();
const {
  add,
  update,
  getHotelIds,
  getHotelRooms,
  getHotels,
} = require('../controllers/hotel');

// @route   POST api/hotel/add
// @desc    Add new hotel
// @access  Public
router.post('/add', add);

// @route   GET api/hotel/getHotels
// @desc    Get all hotel lists
// @access  Public
router.get('/getHotels', getHotels);

// @route   GET api/hotel/getHotelRooms
// @desc    Get rooms list in hotel
// @access  Public
router.get('/getHotelRooms', getHotelRooms);

router.put('/update', update);

router.get('/getHotelIds', getHotelIds);

module.exports = router;
