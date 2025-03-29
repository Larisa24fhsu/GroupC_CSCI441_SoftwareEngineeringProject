// controllers/vendorController.js
const pool = require('../db');  // Assuming you have a database connection in db.js

// Function to handle GET request to get all vendors
const getAllVendors = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Vendor');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to handle POST request to create a new vendor
const createVendor = async (req, res) => {
  const { vendorName, contactInfo, address } = req.body;  // Use correct column names
  try {
    const result = await pool.query(
      'INSERT INTO Vendor (vendorName, contactInfo, address) VALUES ($1, $2, $3) RETURNING *',
      [vendorName, contactInfo, address]  // Insert values into correct columns
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getAllVendors, createVendor };
