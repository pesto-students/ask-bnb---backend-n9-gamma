const Razorpay = require('razorpay');
const Booking = require('../models/Booking');

// Function to add new booking
exports.newBooking = async (req, res) => {
  // Initialize response object to send
  const responseObject = {
    status: null,
    code: null,
    message: null,
    data: {},
  };

  // Instantiate Razorpay object
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
  });

  // Initialize options object
  const options = {
    amount: req.body.amount,
    currency: 'INR',
  };

  // Create order using Razorpay Orders API
  // If error, send status code 400 with message in response
  // Otherwise, save booking to DB & send order details in response with status code 200

  razorpay.orders.create(options, async (err, order) => {
    if (err)
      res.send({
        ...responseObject,
        ...{
          status: 'Error',
          code: 400,
          message: 'Something went wrong. Please try again.',
        },
      });

    // Create new Booking model object
    const booking = new Booking({
      _id: order.id,
      user_id: req.user._id,
      hotel_id: req.body.hotel_id,
      check_in: req.body.check_in,
      check_out: req.body.check_out,
      rooms_booked: req.body.rooms_booked,
      total_amount: req.body.amount,
      payment_id: null,
    });

    // Save booking to DB
    booking.save((error) => {
      if (error) {
        res.send({
          ...responseObject,
          ...{
            status: 'Error',
            code: 400,
            message: 'Something went wrong. Please try again.',
          },
        });
      } else {
        // Send the response back with order details to client
        res.send({
          ...responseObject,
          ...{
            status: 'Success',
            code: 200,
            message: 'Order created successfully',
            data: order,
          },
        });
      }
    });
  });
};

// Function to verify payment
exports.verifyPayment = async (req, res) => {
  // Initialize response object to send
  const responseObject = {
    status: null,
    code: null,
    message: null,
    data: {},
  };

  // Get the order_id and payment_id from request body
  const { order_id, payment_id } = req.body;

  // Update the booking with the above order_id with payment_id set to above payment_id
  // const booking = await Booking.findOne({ _id: order_id });
  Booking.updateOne({ _id: order_id }, { payment_id: payment_id }, (err) => {
    if (err) {
      res.send({
        ...responseObject,
        ...{
          status: 'Error',
          code: 400,
          message: 'Something went wrong. Please try again.',
        },
      });
    }

    // Send success message
    res.send({
      ...responseObject,
      ...{ status: 'Success', code: 200, message: 'Booking Confirmed' },
    });
  });
};

// Get booking history of user
exports.getBookingHistory = async (req, res) => {
  // Initialize response object to send
  const responseObject = {
    status: null,
    code: null,
    message: null,
    data: {},
  };

  // Find booking history of request user
  const bookings = await Booking.find({ user_id: req.user._id });
  try {
    if (bookings.length) {
      res.send({
        ...responseObject,
        ...{
          status: 'Success',
          code: 200,
          message: '',
          data: bookings,
        },
      });
    } else {
      res.send({
        ...responseObject,
        ...{ status: 'Error', code: 400, message: 'No bookings to show' },
      });
    }
  } catch (error) {
    res.send({
      ...responseObject,
      ...{ status: 'Error', code: 400, message: 'Sorry something went wrong.' },
    });
  }
};
