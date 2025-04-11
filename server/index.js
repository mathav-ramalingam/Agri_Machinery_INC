const express = require('express');
const app = express()
var cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const session = require('express-session');
const router = require('./routes/route.js')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors())

app.use(cors({
    origin: 'http://localhost:5174',
    credentials: true,
  }));
  
  

  app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  }));
  
  
  const bcrypt = require('bcrypt');
  const User = require('./model/user.model.js');
  bcrypt.hash('admin123', 10).then(hash => {
    User.create({ email: 'admin@example.com', password: hash });
  });


app.use('/agri',router)

app.use('/uploads', express.static('uploads'));

mongoose.connect(process.env.MONGO_URL).then((result) => {
    console.log('connected to mongodb')
}).catch((err)=>{
    console.error(err);
})


app.listen(process.env.PORT, () =>{
    console.log(`server running ${process.env.PORT}`)
})