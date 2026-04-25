const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

async function initAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB...');

    // Clear any existing admins to ensure the new one works
    await User.deleteMany({ role: 'admin' });

    const admin = new User({
      username: '@user',
      password: 'tatheer@123',
      role: 'admin'
    });

    await admin.save();
    console.log('Admin user initialized successfully!');
    console.log('Username: @user');
    console.log('Password: tatheer@123');
    
    process.exit(0);
  } catch (err) {
    console.error('Initialization error:', err);
    process.exit(1);
  }
}

initAdmin();
