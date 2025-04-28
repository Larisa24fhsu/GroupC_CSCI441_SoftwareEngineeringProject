document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const username = document.querySelector('input[placeholder="Username"]').value;
    const password = document.querySelector('input[placeholder="Password"]').value;

    try {
      // Send login request to the server
      const response = await fetch('/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user: username, pwd: password }),
      });

      // Parse the response JSON
      const result = await response.json();

      if (response.ok) {
          // Extract the token from the server's response
          const token = result.accessToken;

          // Store the token in local storage
          localStorage.setItem("authToken", token);

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