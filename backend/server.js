const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://theh4cker:MongoDB%40123@cluster0.esb8t.mongodb.net/TripVista')

const UserSchema = new mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true }
})

const UserModel = mongoose.model("users", UserSchema)

app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;

    const newUser = new UserModel({ name, email, password });

    newUser.save()
    .then((err) => {console.log(err);})
    .catch(err => console.log(err))
});

app.listen(5000, ()=> {
    console.log("On Port 5000!!")
})