# 🌊 Skardu Spring Ecosystem
> **Absolute Purity. Born from the Heart of the Karakoram.**

[![Version](https://img.shields.io/badge/version-1.1.0-blue.svg?style=for-the-badge)](https://github.com/tatheer583/skardu-spring)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)

**Skardu Spring** is a world-class, full-stack e-commerce ecosystem dedicated to delivering the crystalline purity of glacial water. This project embodies a "Digital Purity" design philosophy, blending state-of-the-art technology with a luxury aesthetic.

---

## 🎨 Digital Purity: The Design Philosophy

Skardu Spring isn't just a website; it's a digital experience. 
- **Glacial Motion**: Powered by `framer-motion` for fluid, organic transitions.
- **Glassmorphism**: A UI that mimics the transparency and depth of ice.
- **Micro-interactions**: Subtle tactile feedback on every click and hover.

---

## 🏗️ Architecture at a Glance

The ecosystem is architected as a high-performance monorepo:

- **`/frontend`**: Next.js 15+ App Router, optimized for sub-second LCP and premium interactivity.
- **`/backend`**: Modular Express.js API designed for high concurrency and secure data persistence.
- **`/logic`**: Advanced service layers for AI Concierge (OpenAI) and automated logistics.

```mermaid
graph TD
    User((User)) -->|HTTPS| Frontend[Next.js 15 App]
    Frontend -->|Framer Motion| UI[Luxury UI]
    Frontend -->|REST API| Backend[Express.js API]
    Backend -->|Secure| Auth[JWT/Bcrypt]
    Backend -->|Persistence| MongoDB[(MongoDB Atlas)]
    Backend -->|Intelligence| AI[OpenAI GPT-4o]
```

---

## 🚀 Quick Start

### 1. Zero-Config Installation
```bash
npm install && npm run install:all
```

### 2. Environment Configuration
Create a `.env` in both `/frontend` and `/backend` based on provided `.env.example` templates.

### 3. Launch Development Mode
```powershell
./start-all.ps1
```

---

## 🛠️ The Tech Stack

### Frontend Excellence
- **Core**: Next.js 15, React 19
- **Motion**: Framer Motion (Liquid animations)
- **Styling**: Vanilla CSS Modules (Design precision)
- **Slider**: Swiper.js (Premium carousels)

### Backend Robustness
- **Runtime**: Node.js 20+
- **Framework**: Express.js (Modular Routing)
- **Database**: MongoDB / Mongoose (NoSQL)
- **Auth**: JSON Web Tokens (JWT)
- **Services**: OpenAI SDK, Nodemailer

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  <img src="https://img.shields.io/badge/Made%20with%20%E2%9D%A4%20by-Skardu%20Spring%20Team-0A2E5C?style=for-the-badge" alt="Footer">
</p>
