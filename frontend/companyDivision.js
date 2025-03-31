const express = require('express');
const { Client } = require('pg');
const app = express();
const pool = require('../db');  // Assuming you have a database connection in db.js

app.get('/', async (req, res) => {
    try {
      await client.connect();
      const result = await client.query('SELECT * FROM CompanyDivision');
  
      // Generate HTML table
      let html = '<table class="min-w-full">';
      html += '<thead class="bg-gray-100">';
      html += '<tr>';
      if (result.rows.length > 0) {
        for (const column in result.rows[0]) {
          html += `<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${column}</th>`;
        }
        html += '</tr>';
        html += '</thead>';
        html += '<tbody class="bg-white divide-y divide-gray-200">';
        result.rows.forEach((row) => {
          html += '<tr>';
          for (const column in row) {
            html += `<td class="px-6 py-4 whitespace-nowrap">${row[column]}</td>`;
          }
          html += '</tr>';
        });
        html += '</tbody>';
      } else {
        html += '<tr><td class="px-6 py-4 whitespace-nowrap text-center text-gray-500">No data found</td></tr>';
      }
      html += '</table>';
  
      res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>PostgreSQL Data</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
            <s
       </head>
        <body class="bg-gray-100 p-6">
          <div class="container mx-auto bg-white rounded-lg shadow-md p-8">
              <h1 class="text-2xl font-semibold text-gray-800 mb-6 text-center">PostgreSQL Data</h1>
              <div id="table-container" class="rounded-md overflow-hidden">
                  ${html}
              </div>
          </div>
        </body>
        </html>
      `);
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).send('Error retrieving data');
    } finally {
      await client.end();
    }
  });
  
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:3444/companyDivision`);
  });
