const router = require('express').Router();
const { register, login, googlelogin } = require('../controllers/user');

// REGISTER ROUTE
router.post('/register', register);

// LOGIN ROUTE
router.post('/login', login);

// GOOGLE LOGIN ROUTE
router.post('/googlelogin', googlelogin);

module.exports = router;
