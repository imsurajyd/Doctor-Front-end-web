document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Basic validation
    if (password !== confirmPassword) {
        document.getElementById('error-message').innerText = "Passwords do not match.";
        return;
    }

    // Send a POST request to the server
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Registration failed');
        }
        return response.json();
    })
    .then(data => {
        // Handle successful registration (e.g., redirect to login page)
        alert('Registration successful! Please log in.');
        window.location.href = 'login.html'; // Redirect to login page
    })
    .catch(error => {
        document.getElementById('error-message').innerText = error.message;
    });
});
