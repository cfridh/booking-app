const express = require('express');
const cors = require('cors');
const  mongoose  = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(8);


app.use(express.json());
app.use(cookieParser());

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
try {
  const userDoc = await User.create({
    name,
    email,
    password: bcrypt.hashSync(password, bcryptSalt)
    })
    res.json(userDoc)
}
catch (err) {
  res.status(422).json(err)
}
});

app.post('/login', async (req, res) => {
 const {email, password} = req.body;
 const userDoc = await User.findOne({email}) // 'email password'
  if (!userDoc) {
    return res.status(404).json({error: 'User not found'})
  }
  else {
    const isValidPassword = bcrypt.compareSync(password, userDoc.password)
    if (isValidPassword) {
      jwt.sign({email:userDoc.email, id:userDoc._id, }, process.env.JWT_SECRET, {}, (err, token) => {
        if (err) throw err;
         res.cookie('token', token).json(userDoc)
      })
    } else {
      return res.status(422).json({error: 'Invalid password'})
    } 
  }
});

app.get('/profile',  (req, res) => {
  const {token} = req.cookies;
    if (!token) {
      return res.status(401).json({error: 'Unauthorized'})
      res.json(null)
    } else {
      jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
        if (err) throw err;
        const {name,email,_id} = await User.findById(userData.id)
        res.json({name,email,_id})
        })}
});

  
app.post('/logout', async (req, res) => { 
  res.cookie('token', '').json(true)
});


app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});