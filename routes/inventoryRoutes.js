// routes/inventoryRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../db');  // Assuming the database connection is in db.js

// Get all inventory items
router.get('/', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM Inventory');
      res.json(result.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
// Get inventory by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query('SELECT * FROM Inventory WHERE id itemid= $1', [id]);  // Use itemid for primary key
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Inventory item not found' });
      }
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Create a new inventory item
router.post('/', async (req, res) => {
  console.log(" Request Headers:", req.headers); //Debugging
  console.log("Received Request Body:", req.body); // Debugging

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Request body is empty or missing" });
  }

  const {name, SKU, batchnumber, category, processedstatus, receiveddate, expirationdate,locationid,isperishable,shelflifedays,alertthresholddays,storagespacerequired,department,demand,orderingcost,holdingcostperyear} = req.body;

  if (!name || !SKU || !batchnumber || !category || !processedstatus || !receiveddate || !expirationdate || !locationid || !isperishable || !shelflifedays || !alertthresholddays || !storagespacerequired || !department || !demand || !orderingcost|| !holdingcostperyear) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const result = await pool.query(
      'INSERT INTO Inventory (name, SKU, batchnumber, category, processedstatus, receiveddate, expirationdate,locationid,isperishable,shelflifedays,alertthresholddays,storagespacerequired,department,demand,orderingcost,holdingcostperyear) VALUES ($1, $2, $3) RETURNING *',
      [name, SKU, batchnumber, category, processedstatus, receiveddate, expirationdate,locationid,isperishable,shelflifedays,alertthresholddays,storagespacerequired,department,demand,orderingcost,holdingcostperyear]
    );
    console.log("Inserted Inventory", result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Database Error:", err.message);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
});

  module.exports = router;