document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Send a POST request to the server
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Login failed');
            }
            return response.json();
        })
        .then(data => {
            // Handle successful login (e.g., redirect to another page)
            alert('Login successful!');
            window.location.href = '/dashboard'; // Redirect to dashboard or home page
        })
        .catch(error => {
            document.getElementById('error-message').innerText = error.message;
        });
});
