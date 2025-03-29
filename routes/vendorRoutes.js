// routes/vendorRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../db');  // Assuming the database connection is in db.js

// Get all vendors
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Vendor');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get vendor by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM Vendor WHERE vendorID = $1', [id]);  // Use vendorID for primary key
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Vendor not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new vendor
router.post('/', async (req, res) => {
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
});

// Update a vendor
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { vendorName, contactInfo, address } = req.body;  // Use correct column names
  try {
    const result = await pool.query(
      'UPDATE Vendor SET vendorName = $1, contactInfo = $2, address = $3 WHERE vendorID = $4 RETURNING *',
      [vendorName, contactInfo, address, id]  // Update with correct columns
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Vendor not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a vendor
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM Vendor WHERE vendorID = $1 RETURNING *', [id]);  // Use vendorID for primary key
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Vendor not found' });
    }
    res.json({ message: 'Vendor deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
