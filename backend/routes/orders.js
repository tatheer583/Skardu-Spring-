const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/Order');
const { verifyToken } = require('../middleware/authMiddleware');
const { sendOrderEmails } = require('../services/emailService');

/**
 * @route   POST /api/orders
 * @desc    Create a new order
 * @access  Public
 */
router.post('/', async (req, res, next) => {
  try {
    const { customerName, address, phone, product, quantity } = req.body;
    if (!customerName || !address || !phone || !product || !quantity) {
      return res.status(400).json({ error: 'Please provide all required delivery details.' });
    }

    let savedOrder;
    if (mongoose.connection.readyState === 1) {
      const newOrder = new Order({ customerName, address, phone, product, quantity });
      savedOrder = await newOrder.save();
    } else {
      // Degraded mode fallback
      savedOrder = { _id: Date.now(), customerName, address, phone, product, quantity, createdAt: new Date() };
    }

    // Trigger emails in background
    sendOrderEmails(savedOrder).catch(err => console.error('📧 Email Dispatch Failed:', err));

    // Generate WhatsApp link
    const whatsappMsg = `Hello Skardu Spring! My name is ${customerName}. I just placed an order for ${quantity}x ${product}. Please confirm my delivery at ${address}.`;
    const whatsappLink = `https://wa.me/923492899537?text=${encodeURIComponent(whatsappMsg)}`;

    res.status(201).json({ 
      message: 'Order received successfully!', 
      order: savedOrder,
      whatsappLink 
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/orders
 * @desc    Get all orders
 * @access  Private (Admin)
 */
router.get('/', verifyToken, async (req, res, next) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

/**
 * @route   PUT /api/orders/:id
 * @desc    Update order status
 * @access  Private (Admin)
 */
router.put('/:id', verifyToken, async (req, res, next) => {
  try {
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    );
    res.json(updatedOrder);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
