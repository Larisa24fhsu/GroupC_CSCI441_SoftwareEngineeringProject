//Retrieve JSON information
 document.getElementById("getCompanyDivision").addEventListener("click", getCompanyDivision);

function getcompanyDivision() {
  let output = `Loading company division...`;
  document.getElementById("output").innerHTML = output;

  fetch("/api/companyDivision")
    .then((res) => res.json())
    .then((data) => {
      // Create a table to display company division data
      let output = `
        <h1>Company Division</h1>
        <table border="1" class="company-division-table">
          <thead>
            <tr>
              <th>Division Id</th>
              <th>Division Name</th>
              <th>Manager</th>
            </tr>
          </thead>
          <tbody>
      `;

      // Loop through the company division data and create table rows
      data.forEach(function (companyDivision) {
        output += `
          <tr>
            <td>${companyDivision.divisionid}</td>
            <td>${companyDivision.divisionName}</td>
            <td>${companyDivision.manager}</td>
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
      console.error("Error fetching company division:", error);
      document.getElementById("output").innerHTML =
        "<p style='color:red;'>Failed to load company division data.</p>";
    });
}


//add new Company Division Name with POST

document.getElementById("companyDivisionForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const companyDivision = {
    divisionid: document.getElementById("divisionid").value,
    divisionname: document.getElementById("divisionname").value,
    manager: document.getElementById("manager").value
  };

  fetch("/api/companyDivision", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(companyDivision)
  })
    .then(response => response.json())
    .then(data => {
      document.getElementById("postResult").innerHTML = `<p>Compay Division Added: ${data.divisionname} (ID: ${data.divisionid})</p>`;
      document.getElementById("companyDivisionForm").reset();
    })
    .catch(error => {
      console.error("Error:", error);
      document.getElementById("postResult").innerHTML = `<p style="color:red;">Failed to add item.</p>`;
    });
});