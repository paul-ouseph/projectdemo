// CHANGE CREDENTIALS FUNCTIONALITY
document.getElementById('changeCredentialsForm')?.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    const newUsername = document.getElementById('newUsername').value.trim();
    const newPassword = document.getElementById('newPassword').value.trim();

    if (newUsername && newPassword) {
        // Update credentials in localStorage
        localStorage.setItem('username', newUsername);
        localStorage.setItem('password', newPassword);
        alert('Credentials updated successfully!');
        window.location.href = 'login.html'; // Redirect back to login page
    } else {
        alert('Please fill out both fields.');
    }
});
