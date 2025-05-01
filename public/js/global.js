document.addEventListener('DOMContentLoaded', () => {
    const rolesString = localStorage.getItem("roles"); // Retrieve roles as a string
    const roles = rolesString && rolesString !== "undefined" ? JSON.parse(rolesString) : []; // Parse roles or default to an empty array
    const currentPage = window.location.pathname;

    console.log('Roles from localStorage:', rolesString);
    console.log('Parsed Roles:', roles);
    console.log('Current Page:', currentPage);

    // Skip authentication check for login and register pages
    if (currentPage === '/login.html' || currentPage === '/register.html') {
        return;
    }

    // Check if the user is authenticated
    const token = localStorage.getItem("authToken");
    if (!token) {
        // Redirect to the login page if no token is found
        window.location.href = "./login.html";
    } else {
        fetch('/protected-route', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 401) {
                alert('Session expired. Please log in again.');
                localStorage.removeItem("authToken");
                localStorage.removeItem("username");
                localStorage.removeItem("roles");
                window.location.href = "./login.html";
            }
        }).catch(error => {
            console.error('Error:', error);
        });
    }

    // Logout functionality
    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            // Clear the authentication token and username
            localStorage.removeItem("authToken");
            localStorage.removeItem("username");
            localStorage.removeItem("roles");

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

    // Define role-based access for pages
    const pageAccess = {
        '/shipping.html': ['Vendor', 'User'], // Vendor and User can access
        '/index.html': ['User', 'Vendor', 'Admin'] // All roles can access
    };

    // Check if the current page has restricted access
    if (pageAccess[currentPage]) {
        const hasAccess = roles.some(role => pageAccess[currentPage].includes(role)); // Strictly check roles
        if (!hasAccess) {
            alert('You do not have access to this page.');
            window.location.href = './unauthorized.html'; // Redirect to an unauthorized page
        }
    }
});