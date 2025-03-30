// controllers/inventoryController.js
const pool = require('../db');  // Assuming you have a database connection in db.js

// Function to handle GET request to get all inventory
const getAllInventory = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Inventory');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Function to handle POST request to create a new inventory
const createInventory = async (req, res) => {
    console.log("Received Body:", req.body); // Debugging line
    
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Request body is empty or missing" });
    }
    
    const { itemid, name, batchnumber, category, processedstatus, receiveddate, expirationdate,locationid,isperishable,shelflifedays,alertthresholddays,storagespacerequired,department,timestampreceived,demand,orderingcost,holdingcostperyear} = req.body;
  
    if (!vendorid || !name || !batchnumber || !category || !processedstatus || !receiveddate || !expirationdate || !locationid || !isperishable || !shelflifedays || !alertthresholddays || !storagespacerequired || !department || !timestampreceived || !demand || !orderingcost|| !holdingcostperyear) {
      return res.status(400).json({ error: "Missing required fields" }); //adding Debug Line
    }
  
    try {
      const result = await pool.query(
        'INSERT INTO Inventory (itemid, name, batchnumber, category, processedstatus, receiveddate, expirationdate,locationid,isperishable,shelflifedays,alertthresholddays,storagespacerequired,department,timestampreceived,demand,orderingcost,holdingcostperyear) VALUES ($1, $2, $3) RETURNING *',
        [itemid, name, batchnumber, category, processedstatus, receiveddate, expirationdate,locationid,isperishable,shelflifedays,alertthresholddays,storagespacerequired,department,timestampreceived,demand,orderingcost,holdingcostperyear]
      );
      console.log("Inserted Inventory",result.rows[0]);
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error("Database Error:", err.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  
  module.exports = { getAllInventory, createInventory };