// server.js
const dotenv = require("dotenv");
dotenv.config(); // Loads environment variables from .env file

const express = require("express"); //Import express
const app = express(); //Call express and place it in the app variable

const path = require("path"); //Import common core modules

//Import custom log module
const { logger } = require("./middleware/logEvents");

const cors = require("cors"); // Import CORS

//Define port for webserver
const PORT = process.env.PORT || 3444;

//Custom middleware logger
app.use(logger);

//built-in middleware to handle urlencoded data, in other words, from :data
//‘content-type: application/x-www-form-urlencoded’
//This is used to handle you url encoded data
app.use(express.urlencoded({ extended: false }));

// Middleware to parse incoming JSON requests
app.use(express.json());

//built-in middleware to to serve static files like CSS
app.use(express.static(path.join(__dirname, "/public")));

//Import router files
const vendorRoutes = require("./routes/vendorRoutes"); // Import vendor routes
const companyDivisionRoutes = require("./routes/companyDivisionRoutes"); // Import vendor routes
const locationRoutes = require("./routes/locationRoutes"); // Import location routes
const inventoryRoutes = require("./routes/inventoryRoutes"); // Import inventory routes
const agingInventoryRoutes = require("./routes/agingInventoryRoutes.js"); // Import aginginventory routes
const customerRoutes = require("./routes/customerRoutes"); // Import customerRoutes routes
const orderRoutes = require("./routes/orderRoutes"); // Import orderRoutes
const orderItemsRoutes = require("./routes/orderItemsRoutes"); // Import  routes
const alertRoutes = require("./routes/alertRoutes"); // Import alert routes
const userAccountRoutes = require("./routes/userAccountRoutes"); // Import userAccountRoutes
const shippingRoutes = require("./routes/shippingRoutes"); // Import shipping routes
const pool = require("./db"); // Assuming you have db.js set up to handle your PostgreSQL connection

// CORS setup
const allowedOrigins = process.env.ALLOWED_ORIGINS || "*";
app.use(
  cors({
    origin: allowedOrigins.split(","),
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* // Sample endpoint to test the server
app.get("/", (req, res) => {
  res.send("API is working!");
}); */

//Define endpoints

// Use vendor routes
app.use("/api/vendors", vendorRoutes);

// Pavel - Use companyDivisionRoutes
app.use("/api/companyDivisions", companyDivisionRoutes);

// Use location routes
app.use("/api/locations", locationRoutes);

// Use inventory routes
app.use("/api/inventory", inventoryRoutes);

// User aginginventory routes
app.use("/api/aginginventory", agingInventoryRoutes);

// Pavel - Use customerRoutes
app.use("/api/customers", customerRoutes);

// Pavel - Use orderRoutes
app.use("/api/orders", orderRoutes);

// User orderItemsRoutes
app.use("/api/orderItems", orderItemsRoutes);

// User alert routes
app.use("/api/alerts", alertRoutes);

// Pavel - Use userAccountRoutes
app.use("/api/userAccounts", userAccountRoutes);

// User shipping routes
app.use("/api/shippers", shippingRoutes);

//Define Route html
app.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

//Server listen for request using express, remember we called express and set it to the variable app
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
