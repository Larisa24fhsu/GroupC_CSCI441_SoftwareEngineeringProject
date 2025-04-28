document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const username = document.querySelector('input[placeholder="Username"]').value;
    const password = document.querySelector('input[placeholder="Password"]').value;

    // Assume successful login and token is returned as "token"
const token = "yeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJ1c2VybmFtZSI6InRlc3Q1MTIzNDEyMyIsInJvbGVzIjpbXX0sImlhdCI6MTc0NTgwMDc4OSwiZXhwIjoxNzQ1ODg3MTg5fQ.SfctYpHMC14qx07h1TfnObLN7Kge0BT7mCKkewHAs1w"; // Replace with the actual token from your login process

// Store the token in local storage.
localStorage.setItem("authToken", token);

// ... later, when making the request to /dashboard
// Get token from local storage
const storedToken = localStorage.getItem("authToken");

// make the request to /dashboard
fetch('http://localhost:3444/dashboard', {
  method: 'GET',
  headers: {
    // Add the Authorization header with the token.
    'Authorization': `Bearer ${storedToken}`, // add authentication header.
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7'
    // ... other headers
  },
})
.then(response => {
  if (!response.ok) {
    // check if the request is not okay, and throw the error.
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
})
.then(data => {
  // Handle the data from the server
  console.log('Data from dashboard:', data);
})
.catch(error => {
  // handle errors
  console.error('Error fetching data:', error);
});

    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user: username, pwd: password }),
        });

        const result = await response.json();

        if (response.ok) {
            alert('Login successful!');
            // Redirect to another page or perform further actions
            window.location.href = './index.html';
        } else {
            alert(`Error: ${result.message}`);
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('Failed to login. Please try again later.');
    }
});