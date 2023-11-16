const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');

const app = express()
app.use(bodyParser.json());
app.use(cors());

const SECRET_KEY = 'ahvduafvuiaruiffua56126e89eecjfweo9vk3'

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
        .then((err) => { console.log(err); })
        .catch(err => console.log(err))
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
        return res.status(404).send('User not found');
    }
    console.log('helooo', user._id)
    if (password == user.password) {
        res.status(200).send(user._id);
    } else {
        res.status(401).send('Invalid password');
    }

})

app.get('/api/profile/:userID', async (req, res) => {
    const userID = req.params.userID;

    const user = await UserModel.findById(userID).exec();


    if (!user) {
        return res.status(404).send('User not found');
    }

    res.json({
        name: user.name,
        email: user.email
    });

});

app.listen(5000, () => {
    console.log("On Port 5000!!")
})