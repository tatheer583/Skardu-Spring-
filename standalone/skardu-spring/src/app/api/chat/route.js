import { NextResponse } from 'next/server';

// Skardu Spring brand knowledge base for the assistant
const BRAND_KNOWLEDGE = `
You are the Skardu Spring Intelligent Assistant. You represent Skardu Spring, a premium natural mineral water brand from the Karakoram mountains in Gilgit-Baltistan, Pakistan.

KEY FACTS:
- Water is sourced from glaciers at 2,500m altitude in Skardu, Gilgit-Baltistan
- Naturally filtered through ancient Karakoram rock for over 10,000 years
- pH level: 7.4–7.8 (naturally alkaline)
- Contains essential minerals: Calcium (Ca²⁺), Magnesium (Mg²⁺), Potassium (K⁺), Silica (SiO₂)
- TDS ranges from 95-150 mg/l depending on the product

PRODUCTS & PRICES:
- Artisanal Pure (500ml) — Rs. 60
- Glacial Reserve (1 Liter) — Rs. 100 (Most Popular)
- Mountain Essence (1.5 Liter) — Rs. 140
- Mega Hydrate (5 Liter) — Rs. 350
- Office & Home (10 Liter) — Rs. 600
- Sparkling Glacier (500ml) — Rs. 120

CERTIFICATIONS:
- ISO 9001:2015 Certified
- WHO Compliant
- GB Food Authority Certified
- ALS UK Laboratory Verified
- PSQCA Approved
- HACCP Compliant

DELIVERY:
- Currently delivering in Islamabad, Rawalpindi, Lahore, and Karachi
- Expanding to other cities
- Fast delivery within 24-48 hours in major cities
- Free delivery on orders above Rs. 2,000

SUBSCRIPTION:
- Weekly and monthly plans available
- 10-15% discount on subscriptions
- Flexible cancellation

SUSTAINABILITY:
- 100% recyclable BPA-free bottles
- Bottle Return Program for 19-liter jars
- Zero-impact sourcing
- Supporting local Skardu communities

CONTACT:
- Email: info@skarduspring.com
- WhatsApp: +92 349 2899537
- Website: skarduspring.com

TONE: Be warm, professional, helpful, and knowledgeable. You are passionate about water purity and the natural heritage of Skardu. Keep responses concise but informative. Always suggest visiting the shop page for ordering.
`;

// Smart rule-based response system
function generateResponse(message) {
  const msg = message.toLowerCase();

  // Pricing queries
  if (msg.includes('price') || msg.includes('cost') || msg.includes('rate') || msg.includes('kitna')) {
    return "Here are our current prices:\n\n• **Artisanal Pure (500ml)** — Rs. 60\n• **Glacial Reserve (1L)** — Rs. 100 ⭐ Most Popular\n• **Mountain Essence (1.5L)** — Rs. 140\n• **Mega Hydrate (5L)** — Rs. 350\n• **Office & Home (10L)** — Rs. 600\n• **Sparkling Glacier (500ml)** — Rs. 120\n\nYou can order directly from our [Shop page](/shop). Free delivery on orders above Rs. 2,000!";
  }

  // Source queries
  if (msg.includes('source') || msg.includes('where') || msg.includes('origin') || msg.includes('glacier') || msg.includes('karakoram') || msg.includes('skardu')) {
    return "Our water is sourced from pristine glaciers at **2,500 meters altitude** in the heart of the **Karakoram mountains**, Skardu, Gilgit-Baltistan. Every drop has been naturally filtered through ancient volcanic and mineral-rich rock for over **10,000 years**, making it one of the purest waters on Earth. Visit our [Source page](/source) to learn more about our extraordinary journey!";
  }

  // Delivery queries
  if (msg.includes('deliver') || msg.includes('shipping') || msg.includes('area') || msg.includes('city') || msg.includes('ship')) {
    return "We currently deliver to **Islamabad, Rawalpindi, Lahore, and Karachi** with 24-48 hour delivery times. We're rapidly expanding to more cities! 🚚\n\n• **Free delivery** on orders above Rs. 2,000\n• Standard delivery: Rs. 150\n• Same-day delivery available in Islamabad/Rawalpindi\n\nOrder from our [Shop page](/shop) and we'll have pure mountain water at your doorstep!";
  }

  // Quality/certification queries
  if (msg.includes('certif') || msg.includes('quality') || msg.includes('safe') || msg.includes('test') || msg.includes('pure') || msg.includes('lab')) {
    return "Absolutely! Skardu Spring meets the highest international standards:\n\n✅ **ISO 9001:2015** Certified\n✅ **WHO** Compliant\n✅ **GB Food Authority** Certified\n✅ **ALS UK** Lab Verified\n✅ **PSQCA** Approved\n✅ **HACCP** Compliant\n\nEvery batch is independently tested. You can view our certificates on our [Certifications section](/#certifications).";
  }

  // Subscription queries
  if (msg.includes('subscri') || msg.includes('regular') || msg.includes('monthly') || msg.includes('weekly')) {
    return "Yes, we offer flexible **subscription plans** for hassle-free hydration! 💧\n\n• **Weekly delivery** — Never run out\n• **Monthly plans** — Budget-friendly\n• **10-15% discount** vs. one-time orders\n• **Flexible cancellation** — No lock-in\n\nPerfect for homes and offices. Contact us on WhatsApp (+92 349 2899537) to set up your plan!";
  }

  // Mineral/health queries
  if (msg.includes('mineral') || msg.includes('health') || msg.includes('ph') || msg.includes('alkaline') || msg.includes('calcium') || msg.includes('magnesium')) {
    return "Our water is naturally rich in essential minerals:\n\n🦴 **Calcium (Ca²⁺)** — Supports bone health\n⚡ **Magnesium (Mg²⁺)** — Boosts energy & muscle function\n❤️ **Potassium (K⁺)** — Heart health\n💎 **Silica (SiO₂)** — Skin & hair vitality\n\npH level: **7.4–7.8** (naturally alkaline)\nTDS: **95-150 mg/l**\n\nLearn more on our [Science section](/#science)!";
  }

  // Bulk/business queries
  if (msg.includes('bulk') || msg.includes('wholesale') || msg.includes('business') || msg.includes('office') || msg.includes('distributor')) {
    return "We'd love to supply your business! 🏢\n\n• **Office packs** start at Rs. 600 (10L)\n• **Custom bulk pricing** for hotels, restaurants & corporates\n• **Distributor partnerships** available across Pakistan\n\nFor business inquiries, please reach out:\n📧 info@skarduspring.com\n📱 WhatsApp: +92 349 2899537\n\nOr fill out our [Contact Form](/#contact)!";
  }

  // Greeting
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey') || msg.includes('assalam') || msg.includes('salam')) {
    return "Hello! Welcome to Skardu Spring! 💧\n\nI'm here to help you with anything — whether it's about our products, pricing, delivery, or our glacial source. What would you like to know?";
  }

  // Thank you
  if (msg.includes('thank') || msg.includes('shukri')) {
    return "You're welcome! It's my pleasure to help. 😊\n\nIf you have any more questions, I'm always here. Stay hydrated with nature's purest water! 💧";
  }

  // Order query
  if (msg.includes('order') || msg.includes('buy') || msg.includes('purchase') || msg.includes('kharid')) {
    return "Ordering is easy! 🛒\n\n1. Visit our [Shop page](/shop)\n2. Choose your products\n3. Add to cart\n4. Proceed to checkout\n5. Select your payment method (COD, JazzCash, EasyPaisa, Bank Transfer)\n\nWe deliver within 24-48 hours in major cities. Free delivery on orders above Rs. 2,000!";
  }

  // Default response
  return "Thank you for your interest in Skardu Spring! I'm happy to help with questions about our products, pricing, delivery, water quality, or subscriptions.\n\nHere are some things I can help with:\n• 💰 Check our pricing\n• 🏔️ Learn about our glacial source\n• 🚚 Delivery information\n• ✅ Quality certifications\n• 📦 Bulk & business orders\n\nFeel free to ask anything, or visit our [Shop page](/shop) to explore our collection!";
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { message, history } = body;

    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: 'Please enter a message.' },
        { status: 400 }
      );
    }

    // Check if OpenAI API key is available
    const apiKey = process.env.OPENAI_API_KEY;

    if (apiKey) {
      // Use OpenAI for intelligent responses
      try {
        const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: BRAND_KNOWLEDGE },
              ...(history || []).slice(-6).map(m => ({
                role: m.role === 'bot' ? 'assistant' : 'user',
                content: m.content,
              })),
              { role: 'user', content: message },
            ],
            max_tokens: 500,
            temperature: 0.7,
          }),
        });

        const data = await openAIResponse.json();
        if (data.choices && data.choices[0]) {
          return NextResponse.json({ response: data.choices[0].message.content });
        }
      } catch (aiError) {
        console.error('OpenAI error, falling back to rule-based:', aiError);
      }
    }

    // Fall back to rule-based responses
    const response = generateResponse(message);
    return NextResponse.json({ response });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { response: "I'm having a brief moment of reflection! 💧 In the meantime, you can explore our products at the [Shop page](/shop) or reach us on WhatsApp at +92 349 2899537." },
      { status: 200 }
    );
  }
}
