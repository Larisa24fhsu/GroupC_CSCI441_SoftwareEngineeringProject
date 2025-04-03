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

router.get("/companyDivision(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "companyDivision.html"));
});

router.get("/login(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "login.html"));
});

module.exports = router;
