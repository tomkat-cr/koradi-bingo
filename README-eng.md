# Koradi Bingo - Art that Heals

![Koradi Bingo](./client/src/assets/koradi-logo.png)

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-green.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/react-18.2.0-blue.svg)
![Express](https://img.shields.io/badge/express-4.19.2-lightgrey.svg)

A full-stack donation bingo platform designed to raise funds for Fundación Koradi's rehabilitation program. This interactive web application combines the excitement of bingo with social impact, aiming to raise COP $21,100,000 - $24,100,000 to improve living conditions for 25 young people in rehabilitation.

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Development Mode](#development-mode)
  - [Production Mode](#production-mode)
  - [Available Make Commands](#available-make-commands)
- [API Endpoints](#api-endpoints)
- [Bold Configuration](#bold-configuration)
- [Stripe Webhook Setup](#stripe-webhook-setup)
- [Secure Server Configuration](#secure-server-configuration)
- [Project Structure](#project-structure)
- [License](#license)
- [Contributing](#contributing)
- [Credits](#credits)

## Description

Koradi Bingo is a modern, real-time bingo platform that enables participants to purchase bingo cards or make direct donations to support young people in rehabilitation. The platform features live number drawing, automatic winner verification, real-time progress tracking, and secure payment processing through Stripe.

The project embodies the mission "Arte que Sana" (Art that Heals) by combining technology with social impact, creating an engaging way for the community to contribute to a meaningful cause.

### Terminology notes

- **Fundación Koradi**: Official organization name in Spanish. In configs, `ORG_NAME` is kept as "Fundación Koradi".
- **Art that Heals**: English translation of the Spanish slogan "Arte que Sana".
- **COP amounts**: Prices and goals are in COP (Colombian Pesos). Example: `BINGO_PRICE=30000` equals COP $30,000.

## Features

- 🎯 **Real-time Bingo Game**: Live number drawing with Socket.IO for instant updates
- 💳 **Secure Payments**: Stripe integration for bingo cards (COP $30,000) and free donations
- 🏆 **Automatic Winner Detection**: Smart algorithm validates bingo wins (horizontal, vertical, diagonal)
- 📊 **Live Progress Tracking**: Real-time donation progress toward fundraising goal
- 📱 **Responsive Design**: Mobile-friendly interface with Koradi's visual identity
- 🔐 **Admin Panel**: Staff tools for managing draws and monitoring claims
- 🎫 **Unique Bingo Cards**: Algorithmically generated cards following standard B-I-N-G-O rules
- 🌐 **Multi-language Support**: Designed for Spanish-speaking audience
- ⚡ **Real-time Notifications**: Instant updates for number draws and bingo claims

## Technologies

### Backend
- **Node.js** (≥18.0.0) - Runtime environment
- **Express.js** (4.19.2) - Web framework
- **MongoDB** with Mongoose (8.3.1) - Database and ODM
- **Socket.IO** (4.7.5) - Real-time communication
- **Stripe** (14.0.0) - Payment processing
- **CORS** (2.8.5) - Cross-origin resource sharing

### Frontend
- **React** (18.2.0) - UI framework
- **Vite** (5.3.3) - Build tool and dev server
- **Socket.IO Client** (4.7.5) - Real-time client

### Development Tools
- **Nodemon** (3.0.3) - Development server auto-restart
- **Morgan** (1.10.0) - HTTP request logger
- **Concurrently** (8.2.2) - Run multiple commands
- **Make** - Build automation

## Getting Started

### Prerequisites

Before running this project, make sure you have the following installed:

- **Docker** (to run the server and MongoDB locally)
- **Node.js** (version 18.0.0 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **Bold Account** (for payment processing from Colombia)
- **Stripe Account** (for payment processing from the US)
- **Git** (to clone the repository)
- **Make** (to run the Makefile)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/otobonh/koradi-bingo.git
cd koradi-bingo
```

2. **Install all dependencies (server and client)**
```bash
npm install
```

3. **Set up environment variables**

Create `.env` files in the client and server directories:

**Client `.env`:**
```bash
VITE_APP_DOMAIN_NAME=localhost
VITE_API_BASE_URL=http://${VITE_APP_DOMAIN_NAME}:4000
VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key_here
VITE_BOLD_PUBLIC_KEY=pk_test_your_bold_public_key_here
VITE_BINGO_PRICE=${BINGO_PRICE:-30000}
VITE_DEBUG=0
```

**Server `.env`:**
```bash
SERVER_DEBUG=1
PORT=4000
APP_DOMAIN_NAME=localhost
MONGO_DATABASE=koradi_bingo
MONGO_USERNAME=root
MONGO_PASSWORD=example
MONGO_URI=mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@mongo:27017
CORS_ORIGIN=http://${APP_DOMAIN_NAME}
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
BOLD_PRIVATE_KEY=pk_test_your_bold_private_key_here
APP_NAME="Koradi Bingo"
ORG_NAME="Fundación Koradi"
GOAL_MIN=21100000
GOAL_MAX=24100000
BINGO_PRICE=30000
ADMIN_USERNAME=username
ADMIN_PASSWORD=password
```

4. **Start MongoDB**

Make sure MongoDB is running on your system or configure MongoDB Atlas connection.

## Usage

### Development Mode

* With Docker and local MongoDB

**Start client, server and mongoDB simultaneously:**
```bash
make run
```

**Restart services:**
```bash
make restart
```

**Stop services:**
```bash
make down
```

* With Vite, NodeJS and MongoDB Atlas

**Start both client and server simultaneously:**
```bash
npm run dev
```

**Or start them separately:**

**Start the server:**
```bash
cd server
make dev
```

**Start the client (in another terminal):**
```bash
cd client
make dev
```

### Production Mode

**Build the client:**
```bash
cd client
make build
```

**Start the server:**
```bash
cd server
make start
```

**Enter the system**

- Load your preferred web browser
- Go to [http://localhost](http://localhost)


### Available Make Commands

**Root commands:**
```bash
make run                # Run in development mode
make up                 # Run in production mode
make down               # Stop services
make restart            # Restart services (docker-compose restart)
make hard-restart       # Restart services from scratch
make logs               # Show logs
make logs-f             # Follow logs
make clean-docker       # Clean docker
make status             # Show Docker services status
make install            # Install dependencies for all projects (server and client)
make build              # Build the client
make start              # Start the server
make dev                # Start the client
make clean              # Clean dependencies for all projects (server and client)
make list-scripts       # List available scripts
make ssl-certs-creation # Create SSL certificates
```

**Server commands:**
```bash
cd server
make install     # Install dependencies
make run         # Run in development mode
make dev         # Alias for run
make start       # Run in production mode
make clean       # Clean node_modules and package-lock.json
make reinstall   # Clean and reinstall dependencies
make help        # Show available commands
```

**Client commands:**
```bash
cd client
make install       # Install dependencies
make build         # Build for production
make run           # Run in development mode
make dev           # Alias for run
make preview       # Preview production build
make clean         # Clean node_modules, package-lock.json, and dist
make reinstall     # Clean and reinstall dependencies
make build-preview # Build and preview production version
make help          # Show available commands
```

### API Endpoints

- `GET /api/health` - Health check
- `GET /api/progress` - Get donation progress
- `POST /api/checkout` - Create Stripe checkout session
- `GET /api/my-card` - Get user's bingo card
- `POST /api/claim-bingo` - Claim bingo win
- `GET /api/draw/state` - Get current draw state
- `GET /api/live-url` - Get live stream URL
- `POST /api/bold-hash` - Generate Bold hash
- `POST /api/admin/draw/next` - Draw next number (admin)
- `POST /api/admin/draw/reset` - Reset draw (admin)
- `POST /api/admin/login` - Admin login
- `POST /api/admin/set-live-url` - Set live stream URL (admin)

### Bold Configuration

Configure your Bold account at https://bold.co.

Then extract your Bold credentials and add them to the client and server `.env` files.

In `client/.env`:
```env
# Bold public key
VITE_BOLD_PUBLIC_KEY=pk_test_your_bold_public_key_here
```

In `server/.env`:
```env
# Bold private key
BOLD_PRIVATE_KEY=pk_test_your_bold_private_key_here
```

### Stripe Webhook Setup

Set up your Stripe account at https://stripe.com.

Then extract your Stripe credentials and add them to the client and server `.env` files.

In `client/.env`:
```env
# Stripe public key
VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key_here
```

In `server/.env`:
```env
# Stripe secret key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
# Stripe webhook secret
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

Configure your Stripe webhook endpoint to point to:
```
https://yourdomain.com/api/stripe/webhook
```

Events to listen for:
- `checkout.session.completed`

### Secure Server Configuration

Configure your local server to use SSL so you can test payment features, since some payment APIs and JavaScript features (for example `crypto`) require a secure server.

You can use the `make ssl-certs-creation` script to create SSL certificates in the `server/ssl` directory.

Add an entry to your `/etc/hosts` file with the following content:

```bash
sudo nano /etc/hosts
```

Add the following line:

```
127.0.0.1 koradibingo.dev
```

Then set the following variables in the client and server `.env` files:

In `client/.env`:
```env
VITE_APP_DOMAIN_NAME=koradibingo.dev
VITE_API_BASE_URL=https://${VITE_APP_DOMAIN_NAME}
```

In `server/.env`:
```env
APP_DOMAIN_NAME=koradibingo.dev
CORS_ORIGIN=https://${APP_DOMAIN_NAME}
```

## Project Structure

```
koradi-bingo/
├── README.md
├── LICENSE
├── package.json              # Workspace manager (npm workspaces)
├── .env.example
├── server/                   # Backend (Express + MongoDB + Socket.IO)
│   ├── Makefile
│   ├── package.json
│   ├── webhookTest.http
│   └── src/
│       ├── server.js         # Main server file
│       ├── config/
│       │   ├── db.js         # MongoDB connection
│       │   └── env.js        # Environment configuration
│       ├── models/
│       │   ├── User.js       # User schema
│       │   ├── BingoCard.js  # Bingo card schema
│       │   ├── Donation.js   # Donation schema
│       │   └── DrawState.js  # Draw state schema
│       ├── services/
│       │   ├── bingo.js      # Bingo logic and card generation
│       │   └── payments.js   # Stripe payment processing
│       ├── routes/
│       │   ├── public.js     # Public API routes
│       │   └── admin.js      # Admin API routes
│       └── utils/
│           └── logger.js     # Logging utility
├── client/                   # Frontend (React + Vite)
│   ├── Makefile
│   ├── package.json
│   ├── index.html
│   └── src/
│       ├── main.jsx          # React entry point
│       ├── App.jsx           # Main App component
│       ├── api.js            # API client
│       ├── styles.css        # Global styles
│       ├── components/       # React components
│       └── assets/           # Static assets
└── deploy/                   # Deployment configuration
    ├── docker-compose.yml
    └── nginx.conf
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please make sure to update tests as appropriate and follow the existing code style.

## Credits

This project is developed and maintained by [Omar Tobon](https://omartobon.com). For more information or to contribute to the project, visit [Koradi Bingo](https://github.com/otobonh/koradi-bingo).

---

**Koradi Foundation - Art that Heals** 🎨✨  
*Supporting young people in rehabilitation through the healing power of art and community.*