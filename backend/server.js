const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/registration')

const UserSchema = new mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true }
})

const UserModel = mongoose.model("users", UserSchema)

app.post('http://localhost:3000/api/register', (req, res) => {
    const { name, email, password } = req.body;

    const newUser = new UserModel({ name, email, password });

    newUser.save((err) => {
        if (err) {
            res.status(500).json({ error: 'Failed to register user.' });
        } else {
            res.status(200).json({ message: 'User registered successfully.' });
        }
    });
});

app.listen(5000, ()=> {
    console.log("On Port 5000!!")
})