const express = require('express');
const cors = require('cors');
const  mongoose  = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(8);

app.use(express.json());

app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173'
}));

//console.log(process.env.Mongo_URL)

mongoose.connect(process.env.Mongo_URL); // Your MongoDB connection string

app.get('/test', (req, res) => {
  res.json('Hello World!');
});

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const userDoc = await User.create({
    name,
    email,
    password: bcrypt.hashSync(password, bcryptSalt)
    })
  

 res.json(userDoc)
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});