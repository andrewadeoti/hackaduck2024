// Register Function (Update for Server Storage)
function register() {
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;

    if (username && password) {
        // Send data to server to store in users.txt
        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.text())
        .then(data => {
            alert(data); // Display server response
            goBackToLogin();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Registration failed. Please try again.');
        });
    } else {
        alert("Please enter both username and password.");
    }
}


// Function to handle login
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        // Store user data in local storage (simulating login)
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);

        // Redirect to the user dashboard
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('userPage').style.display = 'block';
        document.getElementById('welcomeMessage').textContent = `Welcome, ${username}`;
    } else {
        alert("Please enter both username and password.");
    }
}


// Show Register Section
function showRegister() {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("registerSection").style.display = "block";
}

// Register Function
function register() {
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;

    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    alert("Registration successful! Please log in.");
    goBackToLogin();
}

// Navigate Back to Login
function goBackToLogin() {
    document.getElementById("registerSection").style.display = "none";
    document.getElementById("userPage").style.display = "none";
    document.getElementById("settingsSection").style.display = "block";
    document.getElementById("loginSection").style.display = "block";
}

// Check if User is Already Logged In
document.addEventListener('DOMContentLoaded', () => {
    const savedUsername = localStorage.getItem('username');
    const savedPassword = localStorage.getItem('password');

    if (savedUsername && savedPassword) {
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('userPage').style.display = 'block';
        document.getElementById('welcomeMessage').textContent = `Welcome back, ${savedUsername}`;
    }
});

// Show Settings Section
function showSettings() {
    const username = localStorage.getItem("username");
    const password = "****"; 

    document.getElementById("displayUsername").innerText = username;
    document.getElementById("displayPassword").innerText = password;

    document.getElementById("userPage").style.display = "none";
    document.getElementById("settingsSection").style.display = "block";
}

// Navigate Back to Dashboard from Settings
function goBackToDashboard() {
    document.getElementById("settingsSection").style.display = "none";
    document.getElementById("userPage").style.display = "block";
}

// Clock In and Clock Out Functionality
let clockInTime = null;
const clockInBtn = document.getElementById('clockInBtn');
const clockOutBtn = document.getElementById('clockOutBtn');
const timesheetBody = document.getElementById('timesheetBody');

clockInBtn.addEventListener('click', () => {
    const now = new Date();
    const dateStr = now.toLocaleDateString();
    const timeStr = now.toLocaleTimeString();

    clockInTime = now;

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${dateStr}</td>
        <td>${timeStr}</td>
        <td>-</td>
        <td>-</td>
    `;
    row.dataset.clockIn = timeStr;

    timesheetBody.appendChild(row);
});

clockOutBtn.addEventListener('click', () => {
    if (!clockInTime) {
        alert("Please clock in first!");
        return;
    }

    const now = new Date();
    const timeStr = now.toLocaleTimeString();

    const lastRow = timesheetBody.lastElementChild;
    if (lastRow) {
        lastRow.cells[2].textContent = timeStr;

        const totalTimeMs = now - clockInTime;
        const hours = Math.floor(totalTimeMs / (1000 * 60 * 60));
        const minutes = Math.floor((totalTimeMs % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((totalTimeMs % (1000 * 60)) / 1000);

        const formattedTime = `${hours} hour(s) ${minutes} minute(s) ${seconds} second(s)`;
        lastRow.cells[3].textContent = formattedTime;

        clockInTime = null;
    }
});

