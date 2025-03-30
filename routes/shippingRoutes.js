// routes/shippingRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../db');  // Assuming the database connection is in db.js

// Get all shippers
router.get('/', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM Shipping');
      res.json(result.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
// Get shipper by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query('SELECT * FROM Shipping WHERE shippingid = $1', [id]);  // Use shippingid for primary key
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Shipper not found' });
      }
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Create a new shipper
router.post('/', async (req, res) => {
  console.log(" Request Headers:", req.headers);
  console.log("Received Request Body:", req.body); // Debugging

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Request body is empty or missing" });
  }

  const { vendorid, estimateddeliverydate, carriername, trackingnumber } = req.body;

  if (!vendorid || !estimateddeliverydate || !carriername || !trackingnumber) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const result = await pool.query(
      'INSERT INTO Shipping (vendorid, estimateddeliverydate, carriername, trackingnumber) VALUES ($1, $2, $3) RETURNING *',
      [vendorid, estimateddeliverydate, carriername, trackingnumber]
    );
    console.log("Inserted Shipper:", result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Database Error:", err.message);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
});

  module.exports = router;