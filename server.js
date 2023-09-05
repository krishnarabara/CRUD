const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Data
let users = JSON.parse(fs.readFileSync('users.json'));

// Routes
// Get all usersg
app.get('/users', (req, res) => res.json(users));

// Get a single user
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    const user = users.find((user) => user.id === parseInt(userId));

if (!user) {
res.status(404).json({ message: 'User not found' });
} else {
res.json(user);
}
});

// Create a user
app.post('/users', (req, res) => {
const newUser = {
id: users.length + 1,
name: req.body.name,
};

users.push(newUser);
fs.writeFileSync('users.json', JSON.stringify(users, null, 2));

res.status(201).json(newUser);
});

// Update a user
app.put('/users/:id', (req, res) => {
const userId = req.params.id;
const user = users.find((user) => user.id === parseInt(userId));

if (!user) {
    res.status(404).json({ message: 'User not found' });
    } else {
    user.name = req.body.name;
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));

    res.json(user);
}
});

// Delete a user
app.delete('/users/:id', (req, res) => {
const userId = req.params.id;
users = users.filter((user) => user.id !== parseInt(userId));

res.json({ message: 'User deleted' });
});

// Start the server
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});