# Skardu Spring

A premium e-commerce platform for Skardu Spring, featuring a modern frontend, a robust backend, and a standalone version.

## Project Structure

- `skardu-spring/`: Main frontend application built with Next.js.
- `backend/`: Node.js backend server with Express and MongoDB.
- `standalone/`: A static, lightweight version of the website.
- `start-all.ps1`: PowerShell script to start both frontend and backend services.

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- MongoDB (running locally or a cloud instance)

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd skardu-spring
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   # Install root dependencies (if any)
   npm install

   # Install frontend dependencies
   cd skardu-spring
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. Set up environment variables:
   - Create `.env` files in both `skardu-spring/` and `backend/` based on `.env.example` (if provided) or your specific configuration.

### Running the Project

You can use the provided script to start everything:

```powershell
./start-all.ps1
```

Or start them individually:

**Frontend:**
```bash
cd skardu-spring
npm run dev
```

**Backend:**
```bash
cd backend
npm start
```

## Features

- Modern, responsive design.
- Full e-commerce functionality (cart, checkout).
- Admin dashboard for product management.
- Integrated AI assistant features.
- Multi-component architecture.

## License

MIT
