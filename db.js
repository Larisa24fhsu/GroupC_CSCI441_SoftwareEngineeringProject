// db.js
const { Pool } = require('pg');
require('dotenv').config();

// Set up the PostgreSQL connection pool using the DATABASE_URL from environment variables
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,  // This is often required for cloud-hosted databases (like Render)
  },
});

// Export the pool so it can be used in your routes (like vendorRoutes.js)
module.exports = pool;
