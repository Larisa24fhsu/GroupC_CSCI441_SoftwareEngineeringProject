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
      const result = await pool.query('SELECT * FROM Inventory WHERE itemid= $1', [id]);  // Use itemid for primary key
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
  console.log("Request Headers:", req.headers); //Debugging
  console.log("Received Request Body:", req.body); // Debugging
  console.log("Keys in Received Request:", Object.keys(req.body)); //more debugging

  const requiredFields = [
    "name", "sku", "batchnumber", "category", "processedstatus",
    "receiveddate", "expirationdate", "locationid", "isperishable",
    "shelflifedays", "alertthresholddays", "storagespacerequired",
    "department", "timestampreceived", "demand", "orderingcost", "holdingcostperyear"
  ];

  const missingFields = requiredFields.filter(field => req.body[field] === undefined); //added more debugging due to missing required fields failure

  if (missingFields.length > 0) {
    console.log("Missing Fields:", missingFields); // Debugging
    return res.status(400).json({ error: "Missing required fields", missingFields });
  }

  const { name, sku, batchnumber, category, processedstatus, receiveddate, expirationdate, locationid, isperishable, shelflifedays, alertthresholddays, storagespacerequired, department, timestampreceived, demand, orderingcost, holdingcostperyear } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO inventory (name, sku, batchnumber, category, processedstatus, receiveddate, expirationdate, locationid, isperishable, shelflifedays, alertthresholddays, storagespacerequired, department, timestampreceived, demand, orderingcost, holdingcostperyear) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *`,
      [name, sku, batchnumber, category, processedstatus, receiveddate, expirationdate, locationid, isperishable, shelflifedays, alertthresholddays, storagespacerequired, department, timestampreceived || new Date(), demand, orderingcost, holdingcostperyear]
    );

    console.log("Inserted Inventory", result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Database Error:", err.message);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }

// tested with this POST
// {
 //   "name": "paper",
//    "sku": "SKU99999",
//    "batchnumber": "B999",
//    "category": "Office Supplies",
//    "processedstatus": "received",
//    "receiveddate": "2025-03-29",
//    "expirationdate": null,
//    "locationid": 1,
//    "isperishable": false,
//    "shelflifedays": 0,
//    "alertthresholddays": 30,
//    "storagespacerequired": 40,
//    "department": "Office Supplies",
//    "timestampreceived": null,
//    "demand": 0,
//   "orderingcost": 1.23,
//    "holdingcostperyear": 6.54
//  }


});

// Update an inventory item
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  
  console.log("Received Request Body:", req.body); // Debugging log

  console.log("Keys in Received Request:", Object.keys(req.body)); //more debugging

  const requiredFields = [
    "name", "sku", "batchnumber", "category", "processedstatus",
    "receiveddate", "expirationdate", "locationid", "isperishable",
    "shelflifedays", "alertthresholddays", "storagespacerequired",
    "department", "timestampreceived", "demand", "orderingcost", "holdingcostperyear"
  ];

  const missingFields = requiredFields.filter(field => req.body[field] == null); // checks for both undefined and null - added more debugging due to missing required fields failure

  if (missingFields.length > 0) {
    console.log("Missing Fields:", missingFields); // Debugging
    return res.status(400).json({ error: "Missing required fields", missingFields });
  }

  //destruct required fields
  const { name, sku, batchnumber, category, processedstatus, receiveddate, expirationdate, locationid, isperishable, shelflifedays, alertthresholddays, storagespacerequired, department, timestampreceived, demand, orderingcost, holdingcostperyear } = req.body;


  // Construct the update query dynamically based on provided fields
  try {
    const result = await pool.query(
      //timestampreceived = COALESCE($14, NOW()) - use this to fallback to NOW if null
      'UPDATE Inventory SET name = $1, sku = $2, batchnumber = $3, category = $4, processedstatus = $5, receiveddate = $6, expirationdate = $7, locationid = $8, isperishable = $9, shelflifedays = $10, alertthresholddays = $11, storagespacerequired = $12, department = $13, timestampreceived = COALESCE($14, NOW()), demand = $15, orderingcost = $16, holdingcostperyear = $17 WHERE itemid = $18 RETURNING *',
      [name, sku, batchnumber, category, processedstatus, receiveddate, expirationdate, locationid, isperishable, shelflifedays, alertthresholddays, storagespacerequired, department, timestampreceived, demand, orderingcost, holdingcostperyear, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Inventory item not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Database Error:", err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT tested and functioning
//{
// "name": "papers",
//  "sku": "SKU995569",
//  "batchnumber": "B989",
//  "category": "Office Supplies",
//  "processedstatus": "received",
//  "receiveddate": "2025-03-30",
//  "expirationdate": "3000-04-04",
// "locationid": 1,
//  "isperishable": false,
//  "shelflifedays": 55,
//  "alertthresholddays": 55,
//  "storagespacerequired": 41,
//  "department": "Office Suppliess",
//  "timestampreceived": "2025-03-30T00:00:00.000Z",
//  "demand": 15,
//  "orderingcost": 1.32,
//  "holdingcostperyear": 7.54
//  }


// Delete an inventory item
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM Inventory WHERE itemid = $1 RETURNING *', [id]);  // Use itemid for primary key
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Inventory Item not found' });
    }
    res.json({ message: 'Inventory item deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
  



  module.exports = router;