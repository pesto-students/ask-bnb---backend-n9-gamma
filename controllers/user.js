const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const { registerValidation, loginValidation } = require('../validation');

// Initialize OAuth2Client
const oauth2client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);

/* All response will be sent in the following format
{
    status: String, (values can be Success or Error)
    code: Number, (HTTP code)
    message: String, (Custom message)
    data: Object (Javascript object)
} */

// REGISTER USER FUNCTION
exports.register = async (req, res) => {
  // Initialize the response object to send
  const responseObject = {
    status: null,
    code: null,
    message: null,
    data: {},
  };

  /* Validate user data before creating new user. 
  It returns an error if there is validation error. 
  If error, we return the message in the response with status code 400 */

  const { error } = registerValidation(req.body);
  if (error) {
    res.send({
      ...responseObject,
      ...{ status: 'Error', code: 400, message: error.details[0].message },
    });
    return;
  }

  // Check if user is already in database. If exists, send status code 400 with error message.
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    res.send({
      ...responseObject,
      ...{ status: 'Error', code: 400, message: 'Email already exists' },
    });
    return;
  }

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create new user and save to database. After saving, send the id back in response object
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.send({
      ...responseObject,
      ...{
        status: 'Success',
        code: 200,
        message: 'Registration successful',
        data: { user: savedUser._id },
      },
    });
    return;
  } catch (err) {
    res.send({
      ...responseObject,
      ...{
        status: 'Error',
        code: 400,
        message: 'Unfortunately, some error occured. Try after sometime.',
      },
    });
  }
};

// LOGIN FUNCTION
exports.login = async (req, res) => {
  // Initialize the response object to send
  const responseObject = {
    status: null,
    code: null,
    message: null,
    data: {},
  };
  /* Validate user data before logging in new user. 
  It returns an error if there is validation error. 
  If error, we return the message in the response with status code 400 */

  const { error } = loginValidation(req.body);
  if (error) {
    res.send({
      ...responseObject,
      ...{ status: 'Error', code: 400, message: error.details[0].message },
    });
    return;
  }

  // Check if user exist in database. If user doesn't exist, send status code 400 with error message.
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.send({
      ...responseObject,
      ...{ status: 'Error', code: 400, message: 'Email not found' },
    });
    return;
  }

  // Check if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    res.send({
      ...responseObject,
      ...{ status: 'Error', code: 400, message: 'Wrong password' },
    });
    return;
  }

  // Get user _id,name and email from user object
  const { _id, name, email } = user;

  // Create and assign a token
  const token = jwt.sign({ _id }, process.env.TOKEN_SECRET);
  res.send({
    ...responseObject,
    ...{
      status: 'Success',
      code: 200,
      message: 'Login successful',
      data: { token, _id, name, email },
    },
  });
};

// GOOGLE LOGIN FUNCTION
exports.googlelogin = async (req, res) => {
  // Initialize the response object to send
  const responseObject = {
    status: null,
    code: null,
    message: null,
    data: {},
  };

  // Get the token sent in the request
  const { tokenId } = req.body;

  // Verify the token
  const response = await oauth2client.verifyIdToken({
    idToken: tokenId,
    audience: process.env.OAUTH_CLIENT_ID,
  });
  // Get the name and email property from reponse payload
  const { name, email } = response.payload;

  try {
    // Check if user is already in database.
    const user = await User.findOne({ email: email });

    // If user exists, return a signed token with user details in reponse
    if (user) {
      // Get the _id from user object
      const { _id } = user;

      // Create token
      const token = jwt.sign({ _id }, process.env.TOKEN_SECRET);

      res.send({
        ...responseObject,
        ...{
          status: 'Success',
          code: 200,
          message: 'Login successful',
          data: {
            token,
            user: { _id, name, email },
          },
        },
      });
    } else {
      // Create default password for user and encrypt with bcryptjs
      const password = email + process.env.TOKEN_SECRET;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user and save to database.
      const newUser = new User({
        name: name,
        email: email,
        password: hashedPassword,
      });

      const savedUser = await newUser.save();

      const token = jwt.sign({ _id: savedUser._id }, process.env.TOKEN_SECRET);

      res.send({
        ...responseObject,
        ...{
          status: 'Success',
          code: 200,
          message: 'Login successful',
          data: {
            token,
            user: { _id: savedUser._id, name, email },
          },
        },
      });
    }
  } catch (err) {
    res.send({
      ...responseObject,
      ...{ status: 'Error', code: 400, message: 'Something went wrong' },
    });
  }
};
