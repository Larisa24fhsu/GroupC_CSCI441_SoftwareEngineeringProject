document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname;

    // Check if the user is authenticated
    const token = localStorage.getItem("authToken");
    if (!token) {
        // Redirect to the login page if no token is found
        window.location.href = "./login.html";
    }
    // Skip authentication check for login and register pages
    if (currentPage === '/login.html' || currentPage === '/register.html') {
        return;
    }

    // Logout functionality
    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            // Clear the authentication token
            localStorage.removeItem("authToken");

            // Redirect to the login page
            window.location.href = "./login.html";
        });
    }
});