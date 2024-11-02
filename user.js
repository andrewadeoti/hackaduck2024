function register() {
  const username = document.getElementById('registerUsername').value;
  const password = document.getElementById('registerPassword').value;   


  // Send a POST request to the server-side registration endpoint
  fetch('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `username=${username}&password=${password}`
  })
  .then(response => response.json())
  .then(data   
 => {
    // Handle the response from the server (e.g., success, error)
    if (data.success) {
      // Redirect to login page or show success message
      window.location.href = '/login';
    } else {
      // Display error message to the user
      alert(data.error);
    }
  })
  .catch(error => {
    // Handle errors
    console.error('Error:', error);
    alert('Registration failed. Please try again.');
  });
}