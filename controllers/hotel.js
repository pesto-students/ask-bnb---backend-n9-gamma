/* eslint-disable camelcase */
const Hotel = require('../models/Hotel');
// Initialize the response object to send
const responseObject = {
  status: null,
  code: null,
  message: null,
  data: {},
};

// ADD HOTEL FUNCTION
exports.add = async (req, res) => {
  // Initialize the response object to send

  const {
    hotel_id,
    hotel_name,
    description,
    address,
    city,
    state,
    country,
    zip_code,
    room_collection,
    amenities,
    indexImage,
    images,
    reviews,
    ratings,
    location,
    totalRooms,
  } = req.body;

  /* Validate user data before creating new user. 
    It returns an error if there is validation error. 
    If error, we return the message in the response with status code 400 */

  // Create new hotel and save to database. After saving, send the id back in response object
  const user = new Hotel({
    hotel_id,
    hotel_name,
    description,
    address,
    city,
    state,
    country,
    zip_code,
    room_collection,
    amenities,
    indexImage,
    images,
    reviews,
    ratings,
    location,
    totalRooms,
  });
  try {
    // res.send({
    //   ...responseObject,
    //   status: 'Success',
    //   code: 403,
    //   message: 'API Disables',
    // });

    const savedHotel = await user.save();
    res.send({
      ...responseObject,
      status: 'Success',
      code: 200,
      message: 'Hotel added successfully',
      data: savedHotel,
    });
    return;
  } catch (err) {
    res.send({
      ...responseObject,
      status: 'Error',
      code: 400,
      message: 'Unfortunately, some error occured. Try after sometime.',
      error_data: err,
    });
  }
};

// GET HOTEL LIST
exports.getHotels = async (req, res) => {
  const { page = 0, location, select } = req.query;

  // Get all hotels list from database.

  try {
    const hotelList = await Hotel.find({
      location: { $regex: new RegExp(`${location.toLowerCase()}`, 'i') },
    }).select(select.replace(/,/g, ' '));

    if (!page)
      res.send({
        ...responseObject,
        status: 'Success',
        code: 200,
        message: 'Response successfully received',
        data: hotelList,
      });
    else throw new Error('Pagination not implemented');
    return;
  } catch (err) {
    console.log(err);
    res.send({
      ...responseObject,
      status: 'Error',
      code: 400,
      message: err._message,
      error_data: err,
    });
  }
};

// UPDATE HOTEL LIST FUNCTION
exports.update = async (_, res) => {
  // const hotels = await Hotel.find({});
  // let hotelRooms = [];
  // hotels.forEach(async item => {
  //   let standard = [];
  //   const std_price = Math.floor(600 + Math.random() * 400);
  //   item.room_collection.standard.forEach(std_room => {
  //     Object.assign(std_room, {
  //       base_price: std_price,
  //     });
  //     standard.push(std_room);
  //   });
  //   let delux = [];
  //   const del_price = Math.floor(800 + Math.random() * 400);
  //   item.room_collection.delux.forEach(d_room => {
  //     Object.assign(d_room, {
  //       base_price: del_price,
  //     });
  //     delux.push(d_room);
  //   });
  //   const data = await Hotel.updateOne(
  //     { _id: item._id },
  //     { $set: { room_collection: { standard, delux } } },
  //     { upsert: true }
  //   );
  //   console.log(data);
  //   hotelRooms.push({ standard, delux, response: data });
  // });

  const data = await Hotel.update(
    {},
    { $set: { city: 'Bangalore' } },
    { upsert: true }
  );

  // console.log(hotelRooms);
  // const resp = await Hotel.find({ room_collection: 'room_collection' });

  res.send({
    ...responseObject,
    status: 'Success',
    code: 200,
    message: 'Hotel updated successfully',
    data,
  });
};

// GET HOTEL ID FUNCTION
exports.getHotelIds = async (_, res) => {
  const data = await Hotel.find({}).select('_id');

  res.send({
    ...responseObject,
    status: 'Success',
    code: 200,
    message: 'Hotel updated successfully',
    data,
  });
};

// ADD ROOMS TO HOTEL FUNCTION
exports.getHotelRooms = async (req, res) => {
  const { hotel_id } = req.body;

  try {
    const getTotalRooms = await Hotel.find({ hotel_id });

    res.send({
      ...responseObject,
      status: 'Success',
      code: 200,
      message: 'Room added successfully',
      data: getTotalRooms,
    });
  } catch (err) {
    res.send({
      ...responseObject,
      status: 'Error',
      code: 400,
      message: err._message,
      error_data: err.message,
    });
  }

  // const data = await Hotel.find({});

  // res.send({
  //   ...responseObject,
  //   status: 'Success',
  //   code: 200,
  //   message: 'Hotel updated successfully',
  //   data,
  // });
};
