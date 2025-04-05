//Retrieve JSON information
document.getElementById("getVendor").addEventListener("click", getVendor);
/*
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
} 

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

  */

  function getVendor() {
    let output = `Loading vendor...`;
    document.getElementById("output").innerHTML = output;
  
    fetch("/api/vendors")
    .then((res) => res.json())
      .then((data) => {
        // Create a table to display vendor data
        let output = `
          <h1>Vendors</h1>
          <table border="1" class="vendor-table">
            <thead>
              <tr>
                <th>Vendor Id</th>
                <th>Vendor Name</th>
                <th>Contact Info</th>
                <th>Contact Info</th>
              </tr>
            </thead>
            <tbody>
        `;
  
        // Loop through the vendor data and create table rows
          data.forEach(function (vendor) {
          output += `
            <tr>
              <td>${vendor.vendorid}</td>
              <td>${vendor.vendorname}</td>
              <td>${vendor.contactinfo}</td>
              <td>${vendor.address}</td>
            </tr>
          `;
        });
  
        output += `
            </tbody>
          </table>
        `;
  
        document.getElementById("output").innerHTML = output;
      })
      .catch((error) => {
        console.error("Error fetching vendor:", error);
        document.getElementById("output").innerHTML =
          "<p style='color:red;'>Failed to load vendor data.</p>";
      });
  }  

//add new vendor with POST

document.getElementById("vendorForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const itemId = document.getElementById("vendorid").value;

  const vendorItem = {
    vendorname: document.getElementById("vendorname").value,
    contactinfo: document.getElementById("contactinfo").value,
    address: document.getElementById("address").value
  };
/*
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
*/
if (vendorid) {
      // UPDATE existing vendor
      fetch(`/api/vendors/${vendorid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vendorItem),
      })
        .then((response) => response.json())
        .then((data) => {
          document.getElementById(
            "postResult"
          ).innerHTML = `<p>Updated: ${data.vendorname} (ID: ${data.vendorid})</p>`;
          document.getElementById("vendorForm").reset();
        })
        .catch((error) => {
          console.error("Error:", error);
          document.getElementById(
            "postResult"
          ).innerHTML = `<p style="color:red;">Failed to update vendor.</p>`;
        });
    } else {
      // ADD new vendor
      fetch("/api/vendors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vendorItem),
      })
        .then((response) => response.json())
        .then((data) => {
          document.getElementById(
            "postResult"
          ).innerHTML = `<p>Added: ${data.vendorname} (ID: ${data.vendorid})</p>`;
          document.getElementById("vendorForm").reset();
        })
        .catch((error) => {
          console.error("Error:", error);
          document.getElementById(
            "postResult"
          ).innerHTML = `<p style="color:red;">Failed to add vendor.</p>`;
        });
    }
  });

//Delete product
document
  .getElementById("deleteVendorForm")
  .addEventListener("submit", deleteVendor);

function deleteVendor(e) {
  e.preventDefault();

  const deleteVendorid = document.getElementById("deleteVendorid").value;

  fetch(`/api/vendors/${deleteVendorid}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      if (res.ok) {
        document.getElementById(
          "deleteResult"
        ).innerHTML = `<p>Deleted Vendor ID: ${deleteVendorid}</p>`;
        document.getElementById("deleteVendorForm");
        getVendor();
      } else {
        document.getElementById("deleteVendorForm").reset();
        document.getElementById(
          "deleteResult"
        ).innerHTML = `<p style="color:red;">Vendor ID: ${deleteVendorid}, does not exist</p>`;
        document.getElementById("deleteVendorForm");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      document.getElementById(
        "deleteResult"
      ).innerHTML = `<p style="color:red;">Failed to DELETE vendor.</p>`;
    });
}

//PATCH update for specific fields
document.getElementById("patchBtn").addEventListener("click", function () {
  const vendorid = document.getElementById("vendorid").value;

  if (!vendorid) {
    document.getElementById("postResult").innerHTML =
      "<p style='color:red;'>Vendor ID is required for PATCH updates.</p>";
    return;
  }

  // Build PATCH payload only with fields that have a value
  const patchPayload = {};

  const fields = [
    "vendorname", "contactinfo", "address"
  ];

   fields.forEach((field) => {
    const element = document.getElementById(field);
    let value = element.value;

    if (value !== "") {
      if (field === "isperishable") {
      /*  value = value === "true";
      } else if (!isNaN(value) && element.type !== "text") {*/
        value = element.type === "number" || element.type === "date" ? Number(value) : value;
      }
      patchPayload[field] = value;
    }
  }); 

  fetch(`/api/vendors/${vendorid}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patchPayload),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to update vendor.");
      return res.json();
    })
    .then((data) => {
      document.getElementById(
        "postResult"
      ).innerHTML = `<p>Updated: ${data.vendorname} (ID: ${data.vendorid})</p>`;
      getVendor();
    })
    .catch((error) => {
      console.error("Update Error:", error);
      document.getElementById(
        "postResult"
      ).innerHTML = `<p style="color:red;">${error.message}</p>`;
    });
});