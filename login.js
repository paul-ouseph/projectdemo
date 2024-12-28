// Set default credentials if not already stored
if (!localStorage.getItem('username') || !localStorage.getItem('password')) {
    localStorage.setItem('username', 'admin');
    localStorage.setItem('password', '123');
}


// LOGIN FUNCTIONALITY
document.getElementById('loginForm')?.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Retrieve stored credentials
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    // Authentication logic
    if (username === storedUsername && password === storedPassword) {
        localStorage.setItem('isLoggedIn', 'true'); // Set login status
        window.location.href = 'website prototype.html'; // Redirect to main page
    } else {
        alert('Invalid username or password');
    }
});



