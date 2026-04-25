const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  product: {
    type: String,
    required: true,
    enum: ['19 Liter Bottle', '1.5 Liter Bottle', '500 ML Bottle', '12 Liter Bottle']
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  status: {
    type: String,
    default: 'Pending',
    enum: ['Pending', 'Processing', 'Delivered', 'Cancelled']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);
