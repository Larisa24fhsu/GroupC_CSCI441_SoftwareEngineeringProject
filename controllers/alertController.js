// controllers/alertController.js
const pool = require('../db');  // Assuming you have a database connection in db.js

// Function to handle GET request to get all alerts
const getAllAlerts = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Alerts');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to handle POST request to create a new alert
const createAlert = async (req, res) => {
  console.log("Received Body:", req.body); // Debugging line
  
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Request body is empty or missing" });
  }
  
  const { alerttype, affecteditemid, datetriggered, alertstatus, department } = req.body;

  if (!alerttype || !affecteditemid || !datetriggered || !alertstatus || !department) {
    return res.status(400).json({ error: "Missing required fields" }); //adding Debug Line
  }

  try {
    const result = await pool.query(
      'INSERT INTO Alerts (alerttype, affecteditemid, datetriggered, alertstatus, department) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [alerttype, affecteditemid, datetriggered, alertstatus, department]
    );
    console.log("Inserted Alert",result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Database Error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getAllAlerts, createAlert};
