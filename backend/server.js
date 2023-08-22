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
    password: { type: String, require: true },
    foodPreference: { type: String }
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
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({ email });
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
    if (user) {
        if (password === user.password) {
            res.status(200).send({ token });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } else {
        res.status(401).json({ message: 'User not found' });
    }

})

// app.post('/api/profile', async (req, res) => {
//     const token = req.headers['authorization'].split('Bearer ')[1];
//     try {
//         const decodedToken = jwt.verify(token, SECRET_KEY);
//         const emailUser = decodedToken.email
//     } catch (error) {
//         res.status(401).send('Invalid token');
//         return;
//     }

    
//     res.status(200).send(user);
// })

app.listen(5000, () => {
    console.log("On Port 5000!!")
})