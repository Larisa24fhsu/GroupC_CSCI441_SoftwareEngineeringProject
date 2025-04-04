//Retrieve JSON information
document.getElementById("getCompanyDivision").addEventListener("click", getCompanyDivision);

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