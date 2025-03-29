// server.js

const dotenv = require('dotenv');
dotenv.config();  // Loads environment variables from .env file

const express = require('express');
const app = express();
const vendorRoutes = require('./routes/vendorRoutes');  // Import vendor routes
const shippingRoutes = require('./routes/shippingRoutes'); // Import shipping routes
const pool = require('./db');  // Assuming you have db.js set up to handle your PostgreSQL connection



// Middleware to parse incoming JSON requests
app.use(express.json());

// Use vendor routes
app.use('/api/vendors', vendorRoutes);

// User shipping routes
app.use('/api/shippers', shippingRoutes);


// Sample endpoint to test the server
app.get('/', (req, res) => {
  res.send('API is working!');
});

// Define other API endpoints here

// Start the server
const PORT = process.env.PORT || 3444;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
