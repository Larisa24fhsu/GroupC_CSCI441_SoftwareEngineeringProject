// server.js
const dotenv = require("dotenv");
dotenv.config(); // Loads environment variables from .env file

const express = require("express");
const cors = require("cors"); // Import CORS
const app = express();

//Import router files
const vendorRoutes = require("./routes/vendorRoutes"); // Import vendor routes
const companyDivisionRoutes = require("./routes/companyDivisionRoutes"); // Import vendor routes
const locationRoutes = require("./routes/locationRoutes"); // Import location routes
const inventoryRoutes = require("./routes/inventoryRoutes"); // Import inventory routes
const agingInventoryRoutes = require("./routes/agingInventoryRoutes"); // Import aginginventory routes
const customerRoutes = require("./routes/customerRoutes"); // Import customerRoutes routes
const orderRoutes = require("./routes/orderRoutes"); // Import orderRoutes
const alertRoutes = require("./routes/alertRoutes"); // Import alert routes
const userAccountRoutes = require("./routes/userAccountRoutes"); // Import userAccountRoutes
const shippingRoutes = require("./routes/shippingRoutes"); // Import shipping routes
const pool = require("./db"); // Assuming you have db.js set up to handle your PostgreSQL connection

// Middleware to parse incoming JSON requests
app.use(express.json());

// CORS setup
const allowedOrigins = process.env.ALLOWED_ORIGINS || "*";
app.use(
  cors({
    origin: allowedOrigins.split(","),
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Use vendor routes
app.use("/api/vendors", vendorRoutes);

// Use location routes
app.use("/api/locations", locationRoutes);

// Use inventory routes
app.use("/api/inventory", inventoryRoutes);

// User aginginventory routes
app.use("/api/aginginventory", agingInventoryRoutes);

// User alert routes
app.use("/api/alerts", alertRoutes);

// User shipping routes
app.use("/api/shippers", shippingRoutes);

// Sample endpoint to test the server
app.get("/", (req, res) => {
  res.send("API is working!");
});

// Define other API endpoints here

//Pavel - Use companyDivisionRoutes
app.use("/api/companyDivisions", companyDivisionRoutes);

//Pavel - Use customerRoutes
app.use("/api/customers", customerRoutes);

//Pavel - Use orderRoutes
app.use("/api/orders", orderRoutes);

//Pavel - Use userAccountRoutes
app.use("/api/userAccounts", userAccountRoutes);

// Start the server
const PORT = process.env.PORT || 3444;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
