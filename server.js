// server.js
const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint to register user
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
        // Append username and password to users.txt
        fs.appendFile('users.txt', `${username}:${password}\n`, (err) => {
            if (err) {
                console.error('Error saving user data:', err);
                return res.status(500).send('Server error');
            }
            res.status(200).send('User registered successfully!');
        });
    } else {
        res.status(400).send('Please provide a username and password.');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
