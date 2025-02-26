const express = require('express');
const app = express()
var cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const router = require('./routes/route.js')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())


app.use('/agri',router)

mongoose.connect(process.env.MONGO_URL).then((result) => {
    console.log('connected to mongodb')
}).catch((err)=>{
    console.error(err);
})


app.listen(3000, () =>{
    console.log("server running")
})