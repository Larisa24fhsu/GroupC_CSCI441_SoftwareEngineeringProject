document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname;

    // Skip authentication check for login and register pages
    if (currentPage === '/login.html' || currentPage === '/register.html') {
        return;
    }

    // Check if the user is authenticated
    const token = localStorage.getItem("authToken");
    if (!token) {
        // Redirect to the login page if no token is found
        window.location.href = "./login.html";
    }

    // Logout functionality
    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            // Clear the authentication token and username
            localStorage.removeItem("authToken");
            localStorage.removeItem("username");

            // Redirect to the login page
            window.location.href = "./login.html";
        });
    }

    // Display the username in the navbar
    const username = localStorage.getItem("username");
    if (username) {
        const usernameDisplay = document.getElementById('username-display');
        if (usernameDisplay) {
            usernameDisplay.textContent = `Welcome, ${username}`;
        }
    }
});