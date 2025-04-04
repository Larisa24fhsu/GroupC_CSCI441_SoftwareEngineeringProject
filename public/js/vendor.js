//Retrieve JSON information
document.getElementById("getVendor").addEventListener("click", getVendor);

function getVendor() {
  let output = `Loading Vendors...`;
  document.getElementById("output").innerHTML = output;

  fetch("/api/vendor")
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

//add new vendor with POST

document.getElementById("vendorForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const vendor = {
    name: document.getElementById("vendorname").value,
    sku: document.getElementById("contactinfo").value,
    batchnumber: document.getElementById("address").value
  };

  fetch("/api/vendor", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(vendor)
  })
    .then(response => response.json())
    .then(data => {
      document.getElementById("postResult").innerHTML = `<p>Item Added: ${data.vendorname} (ID: ${data.vendorid})</p>`;
      document.getElementById("vendorForm").reset();
    })
    .catch(error => {
      console.error("Error:", error);
      document.getElementById("postResult").innerHTML = `<p style="color:red;">Failed to add item.</p>`;
    });
});