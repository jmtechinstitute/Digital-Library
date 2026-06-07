const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// ==========================
// 1. User Registration Route
// ==========================
router.post('/register', async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    // Email already irukka nu check pandrom
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, message: 'Email already exists! ❌' });
    }

    // Password-a pakka-va hash (encrypt) pandrom for software security
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Pudhu user-a db-la save pandrom
    user = new User({
      username,
      email,
      phone,
      password: hashedPassword,
      role: 'user' // Default-aa normal user thaan
    });

    await user.save();
    res.status(201).json({ success: true, message: 'Registration Successful! ✅ Please Login.' });

  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ success: false, message: 'Server Error during registration' });
  }
});

// ==========================
// 2. Login Route (User & Admin)
// ==========================
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // User db-la irukkangala nu thedurom
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Account not found! ❌' });
    }

    // Database-la irukka hash password-oda compare pandrom
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Wrong Password! ❌' });
    }

    // Login success aana udane security Token generate pandrom
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'digilib_super_secret_key', 
      { expiresIn: '1d' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: 'Server Error during login' });
  }
});

module.exports = router;