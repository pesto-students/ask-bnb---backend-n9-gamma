const jwt = require('jsonwebtoken');
// Middleware for checking if user is authenticated
function verifyToken(req, res, next) {
  // Get the token stored in auth-token from header of request
  const token = req.header('auth-token');

  // If no token available in header
  // Send status 401 with message in response
  if (!token) return res.status(401).send('Access Denied');

  // If token is available, verify the token
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    return res.status(400).send('Invalid Token');
  }
  return true;
}

module.exports = verifyToken;
