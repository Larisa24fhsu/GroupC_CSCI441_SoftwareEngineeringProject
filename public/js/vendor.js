//Retrieve JSON information
/* document.getElementById("getVendor").addEventListener("click", getVendor);

function getVendor() {
  let output = `Loading Vendors...`;
  document.getElementById("output").innerHTML = output;

  fetch("/api/vendors")
    .then((res) => res.json())
    .then((data) => {
      let output = "<h1>Vendors</h1>";
      //The foreach is a loop that can be used with an array
      data.forEach(function (vendor) {
        output += `
                      <ul>
                          <li>Vendor Id: ${vendor.vendorid}</li>
                          <li>Vendor Name: ${vendor.vendorname}</li>
                          <li>Contact Info: ${vendor.contactinfo}</li>
                          <li>Vendor Address: ${vendor.address}</li>
                      </ul>
                  `;
      });
      document.getElementById("output").innerHTML = output;
    });
} */

    document.getElementById('getVendor').addEventListener('click', async () => {
      const outputDiv = document.getElementById('output');
      outputDiv.innerHTML = ''; // Clear previous content
  
      try {
          // Fetch vendor data from the server
          const response = await fetch("/api/vendors");
          if (!response.ok) {
              throw new Error(`Error: ${response.status} ${response.statusText}`);
          }
  
          const vendorData = await response.json();
  
          // Create a table
          const table = document.createElement('table');
          table.classList.add('vendor-table'); // Add a class for styling
  
          // Create table header
          const thead = document.createElement('thead');
          const headerRow = document.createElement('tr');
          const headers = [
              'Vendor ID', 'Vendor Name', 'Contact Info', 'Vendor Address'
          ];
          headers.forEach(header => {
              const th = document.createElement('th');
              th.textContent = header;
              headerRow.appendChild(th);
          });
          thead.appendChild(headerRow);
          table.appendChild(thead);
  
          // Create table body
          const tbody = document.createElement('tbody');
          vendorData.forEach(item => {
              const row = document.createElement('tr');
              headers.forEach(header => {
                  const key = header.toLowerCase().replace(/ /g, ''); // Match object keys
                  const td = document.createElement('td');
                  td.textContent = item[key] || 'N/A'; // Display 'N/A' if data is missing
                  row.appendChild(td);
              });
              tbody.appendChild(row);
          });
          table.appendChild(tbody);
  
          // Append the table to the output div
          outputDiv.appendChild(table);
      } catch (error) {
          console.error('Error fetching vendors:', error);
          outputDiv.textContent = 'Failed to load vendor data.';
      }
  });

//add new vendor with POST

document.getElementById("vendorForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const vendors = {
    name: document.getElementById("vendorname").value,
    sku: document.getElementById("contactinfo").value,
    batchnumber: document.getElementById("address").value
  };

  fetch("/api/vendors", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(vendors)
  })
    .then(response => response.json())
    .then(data => {
      document.getElementById("postResult").innerHTML = `<p>Vendor Added: ${data.vendorname} (ID: ${data.vendorid})</p>`;
      document.getElementById("vendorForm").reset();
    })
    .catch(error => {
      console.error("Error:", error);
      document.getElementById("postResult").innerHTML = `<p style="color:red;">Failed to add item.</p>`;
    });
});