require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { OpenAI } = require('openai');

const Order = require('./models/Order');
const User = require('./models/User');
const Contact = require('./models/Contact');
const { sendOrderEmails, sendContactEmail } = require('./services/emailService');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// Global logger
app.use((req, res, next) => {
  console.log(`📡 [${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Initialize OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Database Connection with improved error handling and timeout
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of 30
      socketTimeoutMS: 45000,
    });
    console.log(`✅ MongoDB connected successfully: ${conn.connection.host}`);
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    console.log('⚠️ Running in degraded mode: Some features (orders/auth) may not be available.');
    console.log('💡 Tip: Ensure MongoDB is running locally (mongod) or check MONGODB_URI in .env');
  }
};
connectDB();

// --- Health Check ---
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// --- Authentication Middleware ---
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(403).json({ error: 'No token provided. Access denied.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Failed to authenticate token.' });
    }
    req.userId = decoded.id;
    next();
  });
};

// --- Auth Routes ---

// 1. Admin Login
app.post('/api/auth/login', async (req, res) => {
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
    res.status(500).json({ error: 'Login failed.' });
  }
});

// 2. Initial Setup (Create first admin)
app.post('/api/auth/setup', async (req, res) => {
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
    res.status(500).json({ error: 'Setup failed.' });
  }
});

// --- OpenAI Chatbot Route ---
const SYSTEM_PROMPT = `You are a helpful assistant for Skardu Organic website. 
Your goal is to provide luxury-level customer service and expert knowledge about our products.

### 🌟 Brand Story & Philosophy
- **Origin**: Sourced from the pristine Karakoram glaciers at an altitude of 2,500m in Skardu, Pakistan.
- **The Journey**: Every drop undergoes a 10,000-year natural filtration process through ancient glacial rock.
- **Philosophy**: We believe in delivering nature's purest essence directly to the urban doorstep without compromise.

### 💧 Water Composition & Science
- **pH Level**: 7.5 (Optimal alkalinity for body balance).
- **Minerals**: Rich in naturally occurring Calcium, Magnesium, and essential electrolytes.
- **Purification**: We use a 7-stage purification process including Reverse Osmosis, Mineral Dosing, UV Treatment, and Ozonation to ensure absolute safety while retaining natural character.

### 📜 Certifications & Quality
- **Standards**: ISO 9001:2015 certified, WHO Compliant, and rigorously tested by independent laboratories.
- **Safety**: 100% bacteria-free and free from heavy metals or micro-particles.

### 🛍️ Products & Pricing
1. **Artisanal Pure (500ml)**: Rs. 60. Perfect for elite events and active lifestyles.
2. **Glacial Reserve (1 Liter)**: Rs. 100. Our flagship daily hydration bottle.
3. **Mountain Essence (1.5 Liter)**: Rs. 140. Designed for all-day purity.
4. **Mega Hydrate (5 Liter)**: Rs. 350. Ideal for family dining.
5. **Office & Home (10 Liter)**: Rs. 600. Our largest premium format for consistent hydration.

### 🚚 Ordering & Delivery
- **Coverage**: We offer FREE delivery in Islamabad and Rawalpindi. We also deliver to all major cities across Pakistan.
- **Delivery Time**: Same-day delivery for orders placed before 12 PM in twin cities. Others take 24-48 hours.
- **Subscription**: We offer weekly and monthly subscription plans for homes and offices.

### ⚠️ Interaction Rules
- **Scope**: Only answer questions about Skardu Organic. If asked about other topics, politely redirect them back to our products.
- **Fallback**: If the system fails to fetch data, do NOT say technical errors. Give a helpful human response and suggest checking the Shop page. Always try to answer based on available product knowledge.
- **Tone**: Professional, sophisticated, yet welcoming (Luxury Brand Voice).
- **Conciseness**: Keep answers short (under 3 sentences) unless the user asks for technical details.
- **Hallucination**: Never make up prices or certificates. If you don't know, ask the user to contact us at info@skarduspring.com.`;

app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) return res.status(400).json({ error: 'Message is required.' });

    console.log(`🤖 Chat request received: "${message.substring(0, 50)}..."`);
    if (!process.env.OPENAI_API_KEY) {
      console.error('❌ OPENAI_API_KEY is missing from .env');
      return res.status(500).json({ error: 'Assistant configuration error.' });
    }

    const chatHistory = history || [];
    const openAiMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...chatHistory.map(m => ({
        role: m.role === 'bot' ? 'assistant' : m.role,
        content: m.content
      })),
      { role: "user", content: message }
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: openAiMessages,
      temperature: 0.7,
      max_tokens: 250
    });

    const botResponse = completion.choices[0].message.content;
    res.json({ response: botResponse });
  } catch (error) {
    console.error('❌ OpenAI Error Detail:', error);
    if (error.response) {
      console.error('Data:', error.response.data);
      console.error('Status:', error.response.status);
    }
    res.status(500).json({ error: 'I am currently having a little trouble connecting, but you can explore all our products directly on our Shop page! Alternatively, please try again in a moment.' });
  }
});

// --- Order Routes ---

// 1. Create a new order (Public)
app.post('/api/orders', async (req, res) => {
  try {
    const { customerName, address, phone, product, quantity } = req.body;
    if (!customerName || !address || !phone || !product || !quantity) {
      return res.status(400).json({ error: 'Please provide all required delivery details.' });
    }

    // Attempt to save to DB if connected
    let savedOrder = { _id: Date.now(), customerName, address, phone, product, quantity, createdAt: new Date() };
    if (mongoose.connection.readyState === 1) {
      const newOrder = new Order({ customerName, address, phone, product, quantity });
      savedOrder = await newOrder.save();
    }

    // Trigger Automated Emails (Don't await, let it run in background)
    sendOrderEmails(savedOrder).catch(err => console.error('Email failed:', err));

    // Generate WhatsApp Link for the client to use
    const whatsappMsg = `Hello Skardu Spring! My name is ${customerName}. I just placed an order for ${quantity}x ${product}. Please confirm my delivery at ${address}.`;
    const whatsappLink = `https://wa.me/923492899537?text=${encodeURIComponent(whatsappMsg)}`;

    res.status(201).json({ 
      message: 'Order received successfully!', 
      order: savedOrder,
      whatsappLink 
    });
  } catch (error) {
    console.error('❌ Order Error:', error.message);
    res.status(500).json({ error: 'Failed to process order. Please contact support via WhatsApp.' });
  }
});

// 2. Get all orders (Protected)
app.get('/api/orders', verifyToken, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders.' });
  }
});

// 3. Update Order Status (Protected)
app.put('/api/orders/:id', verifyToken, async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    );
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order.' });
  }
});

// --- Contact Routes ---

// 1. Submit a contact form (Public)
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Please fill in all fields.' });
    }

    // Attempt to save to DB if connected
    let savedContact = { _id: Date.now(), name, email, subject, message, createdAt: new Date() };
    if (mongoose.connection.readyState === 1) {
      const newContact = new Contact({ name, email, subject, message });
      savedContact = await newContact.save();
    }

    // Send email notification to admin
    sendContactEmail(savedContact).catch(err => console.error('Contact email failed:', err));

    res.status(201).json({ message: 'Message sent successfully. We will get back to you soon!' });
  } catch (error) {
    console.error('❌ Contact Error:', error.message);
    res.status(500).json({ error: 'Failed to send message. Please try again or call us directly.' });
  }
});

// 2. Get all contact messages (Protected)
app.get('/api/contact', verifyToken, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages.' });
  }
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔗 Health check available at: http://localhost:${PORT}/api/health`);
});

// --- Graceful Shutdown ---
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

async function shutdown(signal) {
  console.log(`\n🛑 ${signal} received. Starting graceful shutdown...`);
  
  server.close(() => {
    console.log('📡 HTTP server closed.');
  });

  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.close();
    console.log('📦 MongoDB connection closed.');
  }

  console.log('👋 Shutdown complete. Goodbye!');
  process.exit(0);
}
