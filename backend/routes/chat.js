const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const SYSTEM_PROMPT = `You are a helpful assistant for Skardu Organic website. 
Your goal is to provide luxury-level customer service and expert knowledge about our products.

### 🌟 Brand Story & Philosophy
- **Origin**: Sourced from the pristine Karakoram glaciers at an altitude of 2,500m in Skardu, Pakistan.
- **The Journey**: Every drop undergoes a 10,000-year natural filtration process through ancient glacial rock.
- **Philosophy**: We believe in delivering nature's purest essence directly to the urban doorstep without compromise.

### 💧 Water Composition & Science
- **pH Level**: 7.5 (Optimal alkalinity for body balance).
- **Minerals**: Rich in naturally occurring Calcium, Magnesium, and essential electrolytes.
- **Purification**: 7-stage purification including RO, Mineral Dosing, UV, and Ozonation.

### 🛍️ Products & Pricing
1. Artisanal Pure (500ml): Rs. 60
2. Glacial Reserve (1 Liter): Rs. 100
3. Mountain Essence (1.5 Liter): Rs. 140
4. Mega Hydrate (5 Liter): Rs. 350
5. Office & Home (10 Liter): Rs. 600

### 🚚 Ordering & Delivery
- FREE delivery in Islamabad/Rawalpindi. 24-48h for major cities.
- Same-day delivery if ordered before 12 PM in twin cities.

### ⚠️ Tone & Interaction
Professional, sophisticated, yet welcoming. Keep answers under 3 sentences. Redirect unrelated questions back to Skardu Spring.`;

/**
 * @route   POST /api/chat
 * @desc    Get AI response from OpenAI
 * @access  Public
 */
router.post('/', async (req, res, next) => {
  try {
    const { message, history } = req.body;
    if (!message) return res.status(400).json({ error: 'Message is required.' });

    if (!process.env.OPENAI_API_KEY) {
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
    next(error);
  }
});

module.exports = router;
