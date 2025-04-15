//Import express
const express = require("express");

//Define a router with express
const router = express.Router();

//Import common core modules
const path = require("path");

//Define Routes
router.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

router.get("/login(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "login.html"));
});

router.get("/companyDivision(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "companyDivision.html"));
});

router.get("/inventory(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "inventory.html"));
});

router.get("/vendor(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "vendor.html"));
});

router.get("/agingInventory(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "agingInventory.html"));
});

module.exports = router;
