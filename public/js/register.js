document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const username = document.getElementById('username-input').value;
    const password = document.getElementById('password-input').value;
    const repeatPassword = document.getElementById('repeat-password-input').value;

    try {
        const response = await fetch('/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, repeatPassword }),
        });

        const result = await response.json();

        if (response.ok) {
            document.getElementById('registerResult').innerHTML = `<p style="color:green;">${result.message}</p>`;
            document.getElementById('registerForm').reset();
        } else {
            document.getElementById('registerResult').innerHTML = `<p style="color:red;">${result.message}</p>`;
        }
    } catch (error) {
        console.error('Error during registration:', error);
        document.getElementById('registerResult').innerHTML = `<p style="color:red;">Failed to register. Please try again later.</p>`;
    }
});