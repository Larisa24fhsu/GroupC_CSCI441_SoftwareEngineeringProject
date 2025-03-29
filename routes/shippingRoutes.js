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
      const result = await pool.query('SELECT * FROM Shipping WHERE shippingID = $1', [id]);  // Use shippingID for primary key
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Shipper not found' });
      }
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });