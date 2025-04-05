//Retrieve JSON information
/* document.getElementById("getCompanyDivision").addEventListener("click", getCompanyDivision);

function getCompanyDivision() {
  let output = `Loading Company Division...`;
  document.getElementById("output").innerHTML = output;

  fetch("/api/companyDivision")
    .then((res) => res.json())
    .then((data) => {
      let output = "<h1>Company Division</h1>";
      //The foreach is a loop that can be used with an array
      data.forEach(function (companyDivision) {
        output += `
                      <ul>
                          <li>Division Id: ${companyDivision.divisionid}</li>
                          <li>Division Name: ${companyDivision.divisionName}</li>
                          <li>Manager: ${companyDivision.manager}</li>
                      </ul>
                  `;
      });
      document.getElementById("output").innerHTML = output;
    });
} */

    document.getElementById('getCompanyDivision').addEventListener('click', async () => {
      const outputDiv = document.getElementById('output');
      outputDiv.innerHTML = ''; // Clear previous content
  
      try {
          // Fetch company division data from the server
          const response = await fetch("/api/companyDivision");
          if (!response.ok) {
              throw new Error(`Error: ${response.status} ${response.statusText}`);
          }
  
          const companyDivisionData = await response.json();
  
          // Create a table
          const table = document.createElement('table');
          table.classList.add('company-division-table'); // Add a class for styling
  
          // Create table header
          const thead = document.createElement('thead');
          const headerRow = document.createElement('tr');
          const headers = [
              'Division ID', 'Division Name', 'Manager'
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
          companyDivisionData.forEach(item => {
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
          console.error('Error fetching company divisions:', error);
          outputDiv.textContent = 'Failed to load company division data.';
      }
  });

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