const router = require('express').Router();
const verify = require('./verifyToken');
const {
  newBooking,
  verifyPayment,
  getBookingHistory,
} = require('../controllers/booking');

// ADD NEW BOOKING ROUTE (PROTECTED)
// Verify token to proceed. See verifyToken.js
router.get('/about', verify, (req, res) => {
  res.send(req.user);
});

// Add new booking route
router.post('/newbooking', verify, newBooking);

// Payment verification route
router.post('/verifypayment', verifyPayment);

// Get booking history route
router.get('/bookinghistory', verify, getBookingHistory);

module.exports = router;
