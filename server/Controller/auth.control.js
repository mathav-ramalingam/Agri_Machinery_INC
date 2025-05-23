const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../model/user.model.js');

// Login
const adminlogin = async (req, res) => {
    
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  req.session.user = { id: user._id, email: user.email };
  res.json({ message: "Login successful" });
};

// Logout
const logout =  (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.json({ message: "Logged out" });
  });
};

// Auth check
// const authcheck = (req, res) => {
//   if (req.session.user) {
//     res.json({ user: req.session.user });
//   } else {
//     res.status(401).json({ message: "Unauthorized" });
//   }
// };

module.exports = {adminlogin, logout};
