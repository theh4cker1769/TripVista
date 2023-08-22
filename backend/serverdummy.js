const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;


const SECRET_KEY = 'ahvduafvuiaruiffua56126e89eecjfweo9vk3'
// Middleware
app.use(bodyParser.json());

// Mock user data (replace with database in a real app)
const users = [
  { id: 1, username: 'user1', password: 'password1', email: 'user1@example.com' },
  { id: 2, username: 'user2', password: 'password2', email: 'user2@example.com' },
];

// Generate JWT token
function generateToken(user) {
  return jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
}

// Authentication middleware
function authenticateToken(req, res, next) {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    const token = generateToken(user);
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Profile endpoint
app.get('/api/profile', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (user) {
    res.json({ username: user.username, email: user.email });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});