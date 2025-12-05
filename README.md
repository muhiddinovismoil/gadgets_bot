# Gadgets Bot 🤖

> A multilingual Telegram bot for buying and selling used gadgets (iPhones and Android devices) with admin approval workflow

**Version:** 0.0.1 | **License:** UNLICENSED | **Status:** Active Development

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Installation & Setup](#-installation--setup)
- [Bot Commands](#-bot-commands)
- [Database Schema](#-database-schema)
- [API Documentation](#-api-documentation)
- [Environment Variables](#-environment-variables)
- [Development](#-development)
- [Deployment](#-deployment)
- [Future Improvements](#-future-improvements)

---

## 🎯 Overview

**Gadgets Bot** is a comprehensive Telegram bot platform designed to connect buyers and sellers of used electronic devices. The bot provides a seamless marketplace experience with support for three languages (Uzbek, Russian, English) and a robust admin approval system to ensure quality listings.

### Purpose
- Enable users to list used iPhones and Android devices for sale
- Maintain listing integrity through admin review workflow
- Provide multilingual support for diverse user base
- Store device information with validation and rich details

### Target Users
- Individual sellers of used phones
- Device resellers
- Tech enthusiasts in Central Asia
- Admin team managing marketplace moderation

---

## ✨ Key Features

### User Features
- **🌍 Multilingual Support:** Uzbek, Russian, English with seamless language switching
- **📱 Device Listing:** Post iPhones and Android devices with detailed specifications
- **✅ Form Validation:** Real-time validation for device models, memory, price, and contact info
- **📸 Multi-Image Upload:** Support for up to 6 photos per listing
- **⚙️ Settings Management:** Update phone number and language preferences
- **📞 Direct Admin Contact:** Built-in communication channel with moderators
- **📊 Listing Views:** Access to published listings via public channel

### Admin Features
- **🔍 Review Dashboard:** Central channel for pending approvals
- **✅ Approve/Reject:** One-click approval or rejection of listings
- **🗑️ Auto-Cleanup:** Automatic deletion of rejected posts
- **📤 Direct Publishing:** Auto-publish approved listings to public channel
- **📊 Detailed Listings:** View full device information for review

### Technical Features
- **🗄️ PostgreSQL Database:** Persistent data storage with Prisma ORM
- **🔐 Session Management:** User context and state tracking
- **🛡️ Input Validation:** Regex-based validation for all inputs
- **⚡ NestJS Framework:** Enterprise-grade Node.js architecture
- **📦 TypeScript:** Full type safety across codebase

---

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **NestJS 11.0+** - Progressive Node.js framework
- **TypeScript 5.7+** - Strongly-typed JavaScript
- **Express** - HTTP server integration

### Telegram Integration
- **Telegraf 4.16+** - Telegram Bot API client
- **nestjs-telegraf 2.8+** - NestJS Telegraf integration
- **Scenes & Session Management** - Conversation flow handling

### Database
- **PostgreSQL** - Relational database
- **Prisma 6.17+** - Modern ORM for database access
- **Prisma Migrate** - Database schema versioning

### Development Tools
- **ESLint 9.18+** - Code linting
- **Prettier 3.4+** - Code formatting
- **Jest 29.7+** - Unit testing framework

### Build & Deployment
- **SWC** - Fast JavaScript/TypeScript compiler
- **NestJS CLI** - Project scaffolding and build tools
- **pnpm** - Fast package manager

---

## ��️ Architecture

### System Design

```
┌─────────────────────────────────────────────────────────────────┐
│                         Telegram Users                          │
└────────────────────┬────────────────────────────────────────────┘
                     │ (Telegram Bot API)
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Telegraf Middleware                          │
│              (Session, Request Handling)                        │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Bot Service                                │
│     (Command Handlers, State Management)                        │
└────────────────────┬────────────────────────────────────────────┘
                     │
        ┌────────────┴────────────┬──────────────────┐
        ▼                         ▼                  ▼
┌──────────────┐         ┌──────────────┐   ┌──────────────┐
│ User Module  │         │Admin Module  │   │ Scene Manager│
│ (Scenes)     │         │(Validation)  │   │(Flow Control)│
└──────┬───────┘         └──────┬───────┘   └──────┬───────┘
       │                        │                  │
       └────────────┬───────────┴──────────────────┘
                    │
                    ▼
        ┌───────────────────────────────┐
        │    Prisma Service             │
        │  (Database ORM Layer)         │
        └───────────────┬───────────────┘
                        │
                        ▼
        ┌───────────────────────────────┐
        │   PostgreSQL Database         │
        │  (Users, Admins, Phones)      │
        └───────────────────────────────┘
```

### Core Modules

#### 1. BotModule (`src/api/bot/`)
Handles primary bot interactions and command routing

#### 2. UserModule (`src/api/users/`)
Manages user-specific operations with scenes for device listings

#### 3. PrismaModule (`src/prisma/`)
Database abstraction layer with PostgreSQL connection

#### 4. CommonModule (`src/common/`)
Shared utilities, constants, messages, keyboards, and templates

---

## 📦 Installation & Setup

### Prerequisites

- **Node.js** 18+ (recommend 20 LTS)
- **pnpm** 8+ or npm 9+
- **PostgreSQL** 13+ 
- **Telegram Bot Token** (from @BotFather)
- **Telegram Channel IDs** for admin and public feeds

### Step 1: Clone Repository

```bash
git clone https://github.com/muhiddinovismoil/gadgets_bot.git
cd gadgets_bot
```

### Step 2: Install Dependencies

```bash
pnpm install
```

### Step 3: Configure Environment Variables

Create `.env` file in root directory:

```bash
BOT_TOKEN=your_telegram_bot_token_here
BOT_USERNAME=your_bot_username
DATABASE_URL=postgresql://user:password@localhost:5432/gadgets_bot_db
ADMIN_CHANNEL_ID=-1001234567890
PUBLIC_CHANNEL_ID=-1001234567891
API_PORT=3000
NODE_ENV=development
```

### Step 4: Setup Database

```bash
createdb gadgets_bot_db
pnpm prisma migrate dev --name init
```

### Step 5: Start Development Server

```bash
pnpm run start:dev
```

### Step 6: Build for Production

```bash
pnpm run build
pnpm run start:prod
```

---

## 🤖 Bot Commands

| Command | Function |
|---------|----------|
| `/start` | Initialize bot, select language |
| `📢 Post Ad` | Create new device listing |
| `📜 View Ads` | Open public listing channel |
| `⚙️ Settings` | Manage preferences |
| `📞 Contact Admin` | Reach support team |

---

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  tg_id VARCHAR(30) UNIQUE,
  fullname VARCHAR(24),
  username VARCHAR(40),
  phone_number VARCHAR(25),
  lang VARCHAR(2),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### Phones Table
```sql
CREATE TABLE phones (
  id VARCHAR(36) PRIMARY KEY,
  model VARCHAR(40),
  price INTEGER,
  memory VARCHAR(30),
  region VARCHAR(30),
  delivery BOOLEAN,
  exchange BOOLEAN,
  document BOOLEAN,
  phone_number VARCHAR(25),
  battery VARCHAR(35),
  condition VARCHAR(35),
  images JSON[],
  other_info TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### Admins Table
```sql
CREATE TABLE admin (
  id UUID PRIMARY KEY,
  tg_id VARCHAR(30) UNIQUE,
  fullname VARCHAR(24),
  username VARCHAR(40),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

---

## 📡 API Documentation

### Telegram Bot API Endpoints Used

| Method | Purpose |
|--------|---------|
| `sendMessage` | Send text replies |
| `editMessageText` | Update message content |
| `sendMediaGroup` | Send multiple photos |
| `deleteMessage` | Remove message |
| `answerCbQuery` | Response to button clicks |

---

## 🔐 Environment Variables

```bash
BOT_TOKEN              # Telegram bot token from @BotFather
BOT_USERNAME           # Bot username without @
DATABASE_URL           # PostgreSQL connection string
ADMIN_CHANNEL_ID       # Admin review channel ID
PUBLIC_CHANNEL_ID      # Public listing channel ID
API_PORT              # Express server port (default: 3000)
NODE_ENV              # Environment (development/production)
```

---

## 🚀 Development

### Available Scripts

```bash
pnpm run start:dev     # Development with hot reload
pnpm run build         # Build TypeScript
pnpm run start:prod    # Production server
pnpm run lint          # Run ESLint
pnpm run format        # Format code with Prettier
pnpm run test          # Run tests
```

### Project Structure

```
src/
├── api/                    # Bot and API logic
│   ├── app.service.ts      # Application entry point
│   ├── app.module.ts       # Root module
│   ├── bot/                # Bot service
│   └── users/              # User module with scenes
├── common/                 # Shared utilities
│   ├── constants/          # Messages, keyboards, templates
│   ├── types/              # TypeScript types
│   └── index.ts            # Barrel exports
├── config/                 # Configuration files
├── middleware/             # Global middleware
├── prisma/                 # Database layer
└── main.ts                 # Entry point
```

---

## 🌐 Deployment

### Docker Deployment

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN pnpm install --prod
COPY . .
RUN pnpm run build
EXPOSE 3000
CMD ["node", "dist/main"]
```

### Heroku

```bash
heroku login
heroku create your-app-name
heroku config:set BOT_TOKEN=your_token
heroku config:set DATABASE_URL=your_db_url
git push heroku main
```

---

## 🔮 Future Improvements

- **Search & Filtering:** Advanced search by model, price, region
- **Ratings System:** 5-star user reviews
- **Price Alerts:** Notify users of similar listings
- **Redis Caching:** Performance optimization
- **Webhook Mode:** Switch from polling
- **Rate Limiting:** Prevent abuse
- **Admin Dashboard:** Web UI for analytics
- **CI/CD Pipeline:** GitHub Actions

---

## ��‍💻 Author

**Ismoil Muhiddini** - [@muhiddinovismoil](https://github.com/muhiddinovismoil)

---

## 📊 Project Stats

- **Language:** TypeScript
- **Framework:** NestJS 11.0+
- **Database:** PostgreSQL
- **Bot Library:** Telegraf 4.16+
- **Code Quality:** ESLint + Prettier

---

<p align="center">
  Made with ❤️ for the gadgets community
</p>

<p align="center">
  <a href="https://github.com/muhiddinovismoil/gadgets_bot">⭐ Star on GitHub</a> • 
  <a href="https://github.com/muhiddinovismoil/gadgets_bot/fork">🍴 Fork Repository</a>
</p>
