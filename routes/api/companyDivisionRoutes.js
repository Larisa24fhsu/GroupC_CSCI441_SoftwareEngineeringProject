// routes/companyDivisionRoutes.js
const express = require("express");
const router = express.Router();
const pool = require("../../db"); // Assuming the database connection is in db.js
const companyDivisionController = require("../../controllers/companyDivisionController");

router
  .route("/")
  .get(companyDivisionController.getAllCompanyDivisions)
  .post(companyDivisionController.createCompanyDivision);

//This is for a parameter inside the url
router
  .route("/:id")
  .get(companyDivisionController.getCompanyDivision)
  .put(companyDivisionController.updateCompanyDivision)
  .delete(companyDivisionController.deleteCompanyDivision);

module.exports = router;
