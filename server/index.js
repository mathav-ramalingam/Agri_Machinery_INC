const express = require('express');
const app = express()
var cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const session = require('express-session');
const router = require('./routes/route.js')
const twilio = require('twilio');



const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors())

app.use(cors({
    origin: 'http://localhost:5173',
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


// message for new order
const sendSmsToAdmin = async (name, payment_id) => {
  let message = '';

  if (payment_id == 0) {
    message = `New order! Order by ${name}. Not yet Paid.`;
  } else {
    message = `New order! Order by ${name}. Payment ID: ${payment_id}`;
  }

  try {
    const response = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: process.env.ADMIN_PHONE_NUMBER,
    });

    console.log(`✅ SMS sent to Admin (${process.env.ADMIN_PHONE_NUMBER})`);
    return response;
  } catch (error) {
    console.error(`❌ Error sending SMS to Admin:`, error.message);
    throw error;
  }
};



app.use('/agri',router)

app.use('/uploads', express.static('uploads'));


app.post('/agri/send-sms', async (req, res) => {
  const { name, phone, message, payment_id } = req.body;
  try {
    // Notify Admin about the order
    await sendSmsToAdmin(name, payment_id);
    // Notify User about their order
    const userResponse = await client.messages.create({
      body: message,
      to: `+91${phone}`,
      from: process.env.TWILIO_PHONE_NUMBER,
    });

    console.log(`✅ SMS sent to user (+91${phone})`);
    res.status(200).json({ success: true, sid: userResponse.sid });

  } catch (err) {
    console.error(`❌ Failed to send SMS:`, err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});



mongoose.connect(process.env.MONGO_URL).then((result) => {
    console.log('connected to mongodb')
}).catch((err)=>{
    console.error(err);
})


app.listen(process.env.PORT, () =>{
    console.log(`server running ${process.env.PORT}`)
})