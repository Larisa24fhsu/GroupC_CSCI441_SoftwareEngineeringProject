//Retrieve JSON information
document.getElementById("getInventory").addEventListener("click", getInventory);

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
                  `;
      });
      document.getElementById("output").innerHTML = output;
    });
}

//add new inventory item with POST
//updated to update item with PUT

document.getElementById("inventoryForm").addEventListener("submit", function (event) {
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
    alertthresholddays: parseInt(document.getElementById("alertthresholddays").value),
    storagespacerequired: parseInt(document.getElementById("storagespacerequired").value),
    department: document.getElementById("department").value,
    timestampreceived: document.getElementById("timestampreceived").value || null,
    demand: parseInt(document.getElementById("demand").value),
    orderingcost: parseFloat(document.getElementById("orderingcost").value),
    holdingcostperyear: parseFloat(document.getElementById("holdingcostperyear").value)
  };

  if (itemId) {
    // UPDATE existing inventory item
    fetch(`/api/inventory/${itemId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inventoryItem)
    })
      .then(response => response.json())
      .then(data => {
        document.getElementById("postResult").innerHTML = `<p>Updated: ${data.name} (ID: ${data.itemid})</p>`;
        document.getElementById("inventoryForm").reset();
      })
      .catch(error => {
        console.error("Error:", error);
        document.getElementById("postResult").innerHTML = `<p style="color:red;">Failed to update item.</p>`;
      });

  } else {
    // ADD new inventory item
    fetch("/api/inventory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inventoryItem)
    })
      .then(response => response.json())
      .then(data => {
        document.getElementById("postResult").innerHTML = `<p>Added: ${data.name} (ID: ${data.itemid})</p>`;
        document.getElementById("inventoryForm").reset();
      })
      .catch(error => {
        console.error("Error:", error);
        document.getElementById("postResult").innerHTML = `<p style="color:red;">Failed to add item.</p>`;
      });
  }
});