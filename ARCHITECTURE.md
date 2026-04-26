# Technical Architecture

This document provides a deeper look into the design and technical decisions of the Skardu Spring ecosystem.

## 📁 Directory Structure

```text
root/
├── frontend/           # Next.js Application
│   ├── src/
│   │   ├── app/        # App Router (Pages & API)
│   │   ├── components/ # Reusable UI Components
│   │   └── data/       # Static product/content data
├── backend/            # Node.js Express API
│   ├── routes/         # Modular API endpoints
│   ├── models/         # Mongoose Data Models
│   ├── middleware/     # Auth & Error handling
│   └── services/       # Email & Third-party integrations
└── legacy/             # Deprecated prototypes
```

## 🔐 Security

- **Authentication**: JWT-based stateless authentication for admin routes.
- **Environment Management**: Strict separation of credentials using `.env` files.
- **CORS**: Configurable origin protection to restrict API access.

## 📡 Backend API Design

The backend is built following a **modular route pattern**. Each major feature (Orders, Auth, Chat) has its own router file, making the codebase scalable and easy to maintain.

### Error Handling
A centralized error middleware ensures all API responses follow a consistent format:
```json
{
  "error": "Message here",
  "stack": "🥞"
}
```

## 🎨 Frontend Design System

- **Glassmorphism**: Using backdrop filters and subtle borders to create a "cool, glacial" effect.
- **Responsive**: Fully optimized for mobile, tablet, and desktop using CSS Grid and Flexbox.
- **Animations**: Subtle, performance-optimized entry animations using Framer Motion to enhance the "luxury" feel without sacrificing speed.

## 🤖 AI Integration

The system uses the **OpenAI GPT-3.5 API** with a strictly defined system prompt to act as a "Luxury Concierge." It is designed to be helpful while maintaining brand boundaries.
