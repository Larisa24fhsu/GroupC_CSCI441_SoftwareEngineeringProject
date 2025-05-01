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
            const token = result.accessToken;
            const username = result.username;
            const roles = result.roles; // Ensure the server sends roles in the response

            // Store the token, username, and roles in local storage
            localStorage.setItem("authToken", token);
            localStorage.setItem("username", username);
            localStorage.setItem("roles", JSON.stringify(roles)); // Store roles as a JSON string

            alert('Login successful!');
            window.location.href = './index.html';
        } else {
            alert(`Error: ${result.message}`);
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('Failed to login. Please try again later.');
    }
});