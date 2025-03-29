// controllers/shippingController.js
const pool = require('../db');  // Assuming you have a database connection in db.js

// Function to handle GET request to get all vendors
const getAllShippers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Shipping');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getAllVendors };