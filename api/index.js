const express = require('express');
const cors = require('cors');
const  mongoose  = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');

require('dotenv').config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(8);


app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
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


app.post('/upload-by-link', async (req,res) => {
  const {link} = req.body;
  const newName = 'photo' + Date.now() + '.jpg';
  await imageDownloader.image({
    url: link,
    dest: __dirname + '/uploads/' +newName,
  })
  res.json(newName)
});


const photosMiddelware = multer({ dest: 'uploads/'})
app.post ('/upload', photosMiddelware.array('photos', 25) , async (req, res) => {
  const uploadedFiles = []
for (let i = 0; i < req.files.length; i++) {
  const {path, originalname} = req.files[i];
  const parts = originalname.split('.')
  const ext = parts[parts.length - 1]
  const newPath = path + '.' + ext 
  fs.renameSync(path, newPath)
  uploadedFiles.push(newPath.replace('uploads\\', ''))
}

  res.json(uploadedFiles)
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});