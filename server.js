// server.js
const express = require('express');
const dotenv = require('dotenv');
const vendorRoutes = require('./routes/vendorRoutes');  // Import vendor routes
const pool = require('./db');  // Assuming you have db.js set up to handle your PostgreSQL connection

dotenv.config();  // Loads environment variables from .env file

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Use vendor routes
app.use('/api/vendors', vendorRoutes);


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
