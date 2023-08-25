const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const mongodb = require('mongodb')

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

const SECRET_KEY = 'ahvduafvuiaruiffua56126e89eecjfweo9vk3'

const client = new mongodb.MongoClient("mongodb+srv://theh4cker:MongoDB%40123@cluster0.esb8t.mongodb.net");

const db = client.db("TripVista");
const users = db.collection("users");

// const UserSchema = new mongoose.Schema({
//   name: { type: String, require: true },
//   email: { type: String, require: true },
//   password: { type: String, require: true },
//   foodPreference: { type: String }
// })

// const users = db.collection("users");

// const users = mongoose.model("users", UserSchema)

// const users = [
//   { id: 1, username: 'user1', password: 'password1', email: 'user1@example.com' },
//   { id: 2, username: 'user2', password: 'password2', email: 'user2@example.com' },
//   { id: 2, username: 'user2', password: '1234567890', email: 'test@gmail.com' },
// ];

// app.post('/api/register', (req, res) => {
//   const { name, email, password } = req.body;

//   const newUser = new users({ name, email, password });

//   newUser.save()
//       .then((err) => { console.log(err); })
//       .catch(err => console.log(err))
// });

app.post('/api/login', async (req, res) => {
  
  try {
    
    const { email, password } = req.body;
    
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
      console.log('userEmail111', user)

      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
});

// Profile endpoint
app.get('/api/profile', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const userEmail = decoded.userId;
    console.log('userEmail', decoded)

    const user = users.find(u => u.email === userEmail);
    if (user) {
      res.json({ name: user.name, email: user.email });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});