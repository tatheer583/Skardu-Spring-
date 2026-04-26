const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Contact = require('../models/Contact');
const { verifyToken } = require('../middleware/authMiddleware');
const { sendContactEmail } = require('../services/emailService');

/**
 * @route   POST /api/contact
 * @desc    Submit a contact form
 * @access  Public
 */
router.post('/', async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Please fill in all fields.' });
    }

    let savedContact;
    if (mongoose.connection.readyState === 1) {
      const newContact = new Contact({ name, email, subject, message });
      savedContact = await newContact.save();
    } else {
      savedContact = { _id: Date.now(), name, email, subject, message, createdAt: new Date() };
    }

    // Trigger admin notification email
    sendContactEmail(savedContact).catch(err => console.error('📧 Contact Email Failed:', err));

    res.status(201).json({ message: 'Message sent successfully. We will get back to you soon!' });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/contact
 * @desc    Get all contact messages
 * @access  Private (Admin)
 */
router.get('/', verifyToken, async (req, res, next) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
