// server.js

const dotenv = require("dotenv");
dotenv.config(); // Loads environment variables from .env file

const express = require("express");
const app = express();
const vendorRoutes = require("./routes/vendorRoutes"); // Import vendor routes
const companyDivisionRoutes = require("./routes/companyDivisionRoutes"); // Import vendor routes
const locationRoutes = require("./routes/locationRoutes"); // Import location routes
const inventoryRoutes = require("./routes/inventoryRoutes"); // Import inventory routes
const agingInventoryRoutes = require("./routes/agingInventoryRoutes"); // Import aginginventory routes
const alertRoutes = require("./routes/alertRoutes"); // Import alert routes
const shippingRoutes = require("./routes/shippingRoutes"); // Import shipping routes
const pool = require("./db"); // Assuming you have db.js set up to handle your PostgreSQL connection

// Middleware to parse incoming JSON requests
app.use(express.json());

// Use vendor routes
app.use("/api/vendors", vendorRoutes);

//Pavel - Use companyDivisionRoutes
app.use("/api/companyDivision", companyDivisionRoutes);

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

app.use(cors({
  origin: '*', // Allow all origins (you can restrict this to specific origins if needed)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
}));

// Define other API endpoints here

// Start the server
const PORT = process.env.PORT || 3444;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
