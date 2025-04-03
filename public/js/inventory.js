//Retrieve JSON information
document.getElementById("getInventory").addEventListener("click", getInventory);

function getInventory() {
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
