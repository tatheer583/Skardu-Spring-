const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * @route   POST /api/auth/login
 * @desc    Admin login
 * @access  Public
 */
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '24h'
    });

    res.json({
      message: 'Login successful',
      token,
      username: user.username
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   POST /api/auth/setup
 * @desc    Initial admin setup
 * @access  Public
 */
router.post('/setup', async (req, res, next) => {
  try {
    const adminExists = await User.findOne({ role: 'admin' });
    if (adminExists) {
      return res.status(400).json({ error: 'Admin already exists.' });
    }

    const { username, password } = req.body;
    const newAdmin = new User({ username, password });
    await newAdmin.save();

    res.status(201).json({ message: 'Admin created successfully.' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
