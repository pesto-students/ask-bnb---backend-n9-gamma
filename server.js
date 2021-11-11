const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
// Import Routes
const userRoutes = require('./routes/user');
const bookingRoutes = require('./routes/booking');

const server = express();
dotenv.config();

// Connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Connected to DB');
    }
  }
);

// Middlewares
server.use(express.json());
server.use(cors());
// server.use(express.urlencoded({ extended: true }));

// Routes Middlewares
server.use('/api/user', userRoutes);
server.use('/api/booking', bookingRoutes);

server.get('/', (req, res) => {
  res.send('Hello AskBnB');
});

const PORT = process.env.PORT || 9000;

server.listen(PORT, () => {
  console.log(`Server is started & listening at ${PORT}`);
});
