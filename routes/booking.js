const router = require('express').Router();
const verify = require('./verifyToken');
const { newBooking, verifyPayment } = require('../controllers/booking');

// ADD NEW BOOKING ROUTE (PROTECTED)
// Verify token to proceed. See verifyToken.js
router.get('/about', verify, (req, res) => {
  res.send(req.user);
});

router.post('/newbooking', verify, newBooking);

router.post('/verifypayment', verifyPayment);

module.exports = router;
