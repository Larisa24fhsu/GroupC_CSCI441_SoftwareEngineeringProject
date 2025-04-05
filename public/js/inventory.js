//Retrieve JSON information


/* document.getElementById("getInventory").addEventListener("click", getInventory);

function getInventory() {
  let output = `Loading Inventory...`;
  document.getElementById("output").innerHTML = output;

  fetch("/api/inventory")
    .then((res) => res.json())
    .then((data) => {
      let output = "<h1>Inventory</h1>";
      //The foreach is a loop that can be used with an array
      data.forEach(function (inventory) {
        output += `
                      <ul>
                          <li>Item Id: ${inventory.itemid}</li>
                          <li>Name: ${inventory.name}</li>
                          <li>SKU: ${inventory.sku}</li>
                          <li>Batch Number: ${inventory.batchnumber}</li>
                          <li>Category: ${inventory.category}</li>
                          <li>Processed Date Status: ${inventory.processedstatus}</li>
                          <li>Expiration Date: ${inventory.expirationdate}</li>
                          <li>Location Id: ${inventory.locationid}</li>
                          <li>Perishable: ${inventory.isperishable}</li>
                          <li>Shelf-life Days: ${inventory.shelflifedays}</li>
                          <li>Alert Threshold Days: ${inventory.alertthresholddays}</li>
                          <li>Storage Space Required: ${inventory.storagespacerequired}</li>
                          <li>Department: ${inventory.department}</li>
                          <li>Time Stamp Received: ${inventory.timestampreceived}</li>
                          <li>Demand: ${inventory.demand}</li>
                          <li>Ordering Cost: ${inventory.orderingcost}</li>
                          <li>Holding Cost Per Year: ${inventory.holdingcostperyear}</li>
                      </ul>
                      <br />
                  `;
      });
      document.getElementById("output").innerHTML = output;
    });
} */

    document.getElementById('getInventory').addEventListener('click', async () => {
      const outputDiv = document.getElementById('output');
      outputDiv.innerHTML = ''; // Clear previous content
  
      try {
          // Fetch inventory data from the server
          const response = await fetch("/api/inventory");
          if (!response.ok) {
              throw new Error(`Error: ${response.status} ${response.statusText}`);
          }
  
          const inventoryData = await response.json();
  
          // Create a table
          const table = document.createElement('table');
          table.classList.add('inventory-table'); // Add a class for styling
  
          // Create table header
          const thead = document.createElement('thead');
          const headerRow = document.createElement('tr');
          const headers = [
              'Item ID', 'Name', 'SKU', 'Batch Number', 'Category', 'Processed Status',
              'Received Date', 'Expiration Date', 'Location ID', 'Is Perishable',
              'Shelf-life Days', 'Alert Threshold Days', 'Storage Space Required',
              'Department', 'Timestamp Received', 'Demand', 'Ordering Cost',
              'Holding Cost per Year'
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
          inventoryData.forEach(item => {
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
          console.error('Error fetching inventory:', error);
          outputDiv.textContent = 'Failed to load inventory data.';
      }
  });

//add new inventory item with POST
//updated to update item with PUT

document
  .getElementById("inventoryForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const itemId = document.getElementById("itemid").value;

    const inventoryItem = {
      name: document.getElementById("name").value,
      sku: document.getElementById("sku").value,
      batchnumber: document.getElementById("batchnumber").value,
      category: document.getElementById("category").value,
      processedstatus: document.getElementById("processedstatus").value,
      receiveddate: document.getElementById("receiveddate").value,
      expirationdate: document.getElementById("expirationdate").value || null,
      locationid: parseInt(document.getElementById("locationid").value),
      isperishable: document.getElementById("isperishable").value === "true",
      shelflifedays: parseInt(document.getElementById("shelflifedays").value),
      alertthresholddays: parseInt(
        document.getElementById("alertthresholddays").value
      ),
      storagespacerequired: parseInt(
        document.getElementById("storagespacerequired").value
      ),
      department: document.getElementById("department").value,
      timestampreceived:
        document.getElementById("timestampreceived").value || null,
      demand: parseInt(document.getElementById("demand").value),
      orderingcost: parseFloat(document.getElementById("orderingcost").value),
      holdingcostperyear: parseFloat(
        document.getElementById("holdingcostperyear").value
      ),
    };

    if (itemId) {
      // UPDATE existing inventory item
      fetch(`/api/inventory/${itemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inventoryItem),
      })
        .then((response) => response.json())
        .then((data) => {
          document.getElementById(
            "postResult"
          ).innerHTML = `<p>Updated: ${data.name} (ID: ${data.itemid})</p>`;
          document.getElementById("inventoryForm").reset();
        })
        .catch((error) => {
          console.error("Error:", error);
          document.getElementById(
            "postResult"
          ).innerHTML = `<p style="color:red;">Failed to update item.</p>`;
        });
    } else {
      // ADD new inventory item
      fetch("/api/inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inventoryItem),
      })
        .then((response) => response.json())
        .then((data) => {
          document.getElementById(
            "postResult"
          ).innerHTML = `<p>Added: ${data.name} (ID: ${data.itemid})</p>`;
          document.getElementById("inventoryForm").reset();
        })
        .catch((error) => {
          console.error("Error:", error);
          document.getElementById(
            "postResult"
          ).innerHTML = `<p style="color:red;">Failed to add item.</p>`;
        });
    }
  });

//Delete product
document
  .getElementById("deleteInventoryForm")
  .addEventListener("submit", deleteInventory);

function deleteInventory(e) {
  e.preventDefault();

  const deleteItemID = document.getElementById("deleteItemID").value;

  fetch(`/api/inventory/${deleteItemID}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      if (res.ok) {
        document.getElementById(
          "deleteResult"
        ).innerHTML = `<p>Deleted Product Item ID: ${deleteItemID}</p>`;
        document.getElementById("deleteInventoryForm");
        getInventory();
      } else {
        document.getElementById("deleteInventoryForm").reset();
        document.getElementById(
          "deleteResult"
        ).innerHTML = `<p style="color:red;">Product Item ID: ${deleteItemID}, does not exist</p>`;
        document.getElementById("deleteInventoryForm");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      document.getElementById(
        "deleteResult"
      ).innerHTML = `<p style="color:red;">Failed to DELETE item.</p>`;
    });
}

//PATCH update for specific fields
document.getElementById("patchBtn").addEventListener("click", function () {
  const itemId = document.getElementById("itemid").value;

  if (!itemId) {
    document.getElementById("postResult").innerHTML =
      "<p style='color:red;'>Item ID is required for PATCH updates.</p>";
    return;
  }

  // Build PATCH payload only with fields that have a value
  const patchPayload = {};

  const fields = [
    "name", "sku", "batchnumber", "category", "processedstatus", "receiveddate",
    "expirationdate", "locationid", "isperishable", "shelflifedays",
    "alertthresholddays", "storagespacerequired", "department",
    "timestampreceived", "demand", "orderingcost", "holdingcostperyear"
  ];

  fields.forEach((field) => {
    const element = document.getElementById(field);
    let value = element.value;

    if (value !== "") {
      if (field === "isperishable") {
        value = value === "true";
      } else if (!isNaN(value) && element.type !== "text") {
        value = element.type === "number" || element.type === "date" ? Number(value) : value;
      }
      patchPayload[field] = value;
    }
  });

  fetch(`/api/inventory/${itemId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patchPayload),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to Update item.");
      return res.json();
    })
    .then((data) => {
      document.getElementById(
        "postResult"
      ).innerHTML = `<p>Updated: ${data.name} (ID: ${data.itemid})</p>`;
      getInventory();
    })
    .catch((error) => {
      console.error("Update Error:", error);
      document.getElementById(
        "postResult"
      ).innerHTML = `<p style="color:red;">${error.message}</p>`;
    });
});
