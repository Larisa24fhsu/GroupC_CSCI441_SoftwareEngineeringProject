// routes/companyDivisionRoutes.js
const express = require("express");
const router = express.Router();
const pool = require("../db"); // Assuming the database connection is in db.js

// Get all Divisions
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM companydivision");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get Company Division by divisionid
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM companydivision WHERE divisionid = $1",
      [id]
    ); // Use divisionid for primary key
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Division not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create a new Division
router.post("/", async (req, res) => {
  console.log("Request Headers:", req.headers); //Debugging
  console.log("Received Request Body:", req.body); // Debugging

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Request body is empty or missing" });
  }

  const { divisionname, manager } = req.body;

  if (!divisionname || !manager) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO companydivision (divisionname, manager) VALUES ($1, $2) RETURNING *"[
        (divisionname, manager)
      ]
    );
    console.log("Inserted Inventory", result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Database Error:", err.message);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

// Update a companyDivision
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { divisionname, manager } = req.body;

  console.log("Received Request Body:", req.body); // Debugging log

  if (!divisionname || !manager) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const result = await pool.query(
      "UPDATE companydivision SET divisionname = $1, manager = $2 WHERE divisionid = $3 RETURNING *"[
        (divisionname, manager, id)
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Vendor not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Database Error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a Division
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM companydivision WHERE divisionid = $1 RETURNING *",
      [id]
    ); // Use divisionid for primary key
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Vendor not found" });
    }
    res.json({ message: "Division deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
