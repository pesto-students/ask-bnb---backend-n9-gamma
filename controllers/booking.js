// const Booking = require('../models/Booking');
const Razorpay = require('razorpay');

exports.newBooking = (req, res) => {
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
  // Otherwise, send order details in response with status code 200

  razorpay.orders.create(options, (err, order) => {
    if (err)
      res.send({
        ...responseObject,
        ...{
          status: 'Error',
          code: 400,
          message: 'Something went wrong. Please try again.',
        },
      });
    res.send({
      ...responseObject,
      ...{
        status: 'Success',
        code: 200,
        message: 'Order created successfully',
        data: order,
      },
    });
  });
};
