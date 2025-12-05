# Installation & Setup Guide - Gadgets Bot

## 🚀 Quick Start

Complete installation from scratch in 10 minutes.

---

## 📋 Prerequisites

Before starting, ensure you have installed:

### System Requirements
- **Node.js** 18.x or higher (LTS 20.x recommended)
- **npm** 9.x or **pnpm** 8.x (pnpm recommended for faster installation)
- **PostgreSQL** 13+ (local or managed service like AWS RDS)
- **Git** for version control
- **Telegram Account** (to create bot and channels)

### Verify Installations

```bash
# Check Node.js version
node --version    # Should be v18.0.0 or higher

# Check npm/pnpm version
npm --version     # Should be 9.0.0+
pnpm --version    # Should be 8.0.0+

# Check PostgreSQL
psql --version    # Should be 13+
```

---

## 🔑 Prepare Credentials

### 1. Create Telegram Bot

**Steps:**
1. Open Telegram and search for **@BotFather**
2. Send `/newbot` command
3. Enter bot name (e.g., "Gadgets Bot")
4. Enter bot username (e.g., "gadgets_bot_123")
5. @BotFather sends you the token

**Save this:** Your **BOT_TOKEN** (keep it secret!)

```
BOT_TOKEN: 123456789:ABCDEFGhijklmnopqrstuvwxyzABCDEF
BOT_USERNAME: gadgets_bot_123
```

### 2. Create Telegram Channels

**Admin Channel** (for listing reviews):
1. Create a **Private Channel**
2. Name it "Gadgets Bot Admin"
3. Add yourself and any admins
4. Send a message, forward to @userinfobot
5. Get the channel ID (should look like: -1001234567890)

**Public Channel** (for published listings):
1. Create a **Public Channel**
2. Name it "Tech Bozor" or similar
3. Add bot as administrator
4. Get the channel ID from @userinfobot

```
ADMIN_CHANNEL_ID: -1001234567890
PUBLIC_CHANNEL_ID: -1001234567891
```

### 3. PostgreSQL Credentials

If using **local PostgreSQL:**
```
Host: localhost
Port: 5432
User: postgres (or your username)
Password: (your password)
Database: gadgets_bot_db
```

If using **managed service (RDS, Heroku Postgres, etc.):**
```
Host: your-db-host.aws.com
Port: 5432
User: your_username
Password: your_secure_password
Database: gadgets_bot_db
```

---

## 📥 Installation Steps

### Step 1: Clone Repository

```bash
# Clone the repository
git clone https://github.com/muhiddinovismoil/gadgets_bot.git

# Navigate into directory
cd gadgets_bot

# Verify you're on main branch
git branch
# Output: * main
```

### Step 2: Install Dependencies

```bash
# Using pnpm (recommended)
pnpm install

# OR using npm
npm install

# Verify installation
pnpm list @nestjs/core  # Should show installed version
```

**Installation Time:** 2-3 minutes depending on internet speed

**Expected Output:**
```
added 250 packages in 2m 45s
```

### Step 3: Setup PostgreSQL Database

#### Local PostgreSQL

```bash
# Connect to PostgreSQL
psql -U postgres

# In psql prompt, create database
CREATE DATABASE gadgets_bot_db;

# Exit psql
\q

# Verify database created
psql -l | grep gadgets_bot_db
```

#### Cloud-Managed Database (Skip if using local)

Database should already be created. Just verify connection.

### Step 4: Create Environment File

Create `.env` file in project root:

```bash
touch .env
```

Edit `.env` with your credentials:

```bash
# Telegram Configuration
BOT_TOKEN=YOUR_BOT_TOKEN_HERE
BOT_USERNAME=your_bot_username

# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/gadgets_bot_db

# Telegram Channels
ADMIN_CHANNEL_ID=-1001234567890
PUBLIC_CHANNEL_ID=-1001234567891

# Server
API_PORT=3000
NODE_ENV=development
```

**⚠️ IMPORTANT:** Never commit `.env` to Git. It's already in `.gitignore`.

### Step 5: Run Database Migrations

```bash
# Apply Prisma migrations
pnpm prisma migrate dev --name init

# This will:
# 1. Create tables (users, phones, admin)
# 2. Generate Prisma Client
# 3. Set up indexes
```

**Expected Output:**
```
PostgreSQL database "gadgets_bot_db" created at "postgresql://postgres@localhost:5432"
✔ Prisma schema loaded from prisma/schema.prisma
✔ Datasource "db": PostgreSQL database "gadgets_bot_db" at "postgresql://postgres@localhost:5432"
✔ Database created, tables created ✔ 

✨ Migration applied successfully
✅ Generated Prisma Client
```

### Step 6: Start Development Server

```bash
# Start in watch mode (auto-reload on file changes)
pnpm run start:dev

# Keep this terminal open
```

**Expected Output:**
```
[Nest] 12345  - 12/05/2025, 10:30:00 AM     LOG [NestFactory] Starting Nest application...
[Nest] 12345  - 12/05/2025, 10:30:01 AM     LOG [InstanceLoader] PrismaModule dependencies initialized
[Nest] 12345  - 12/05/2025, 10:30:01 AM     LOG [InstanceLoader] BotModule dependencies initialized
[Nest] 12345  - 12/05/2025, 10:30:02 AM   DEBUG BOT IS RUNNING ON: 05-12-2025 https://t.me/your_bot_username
[Nest] 12345  - 12/05/2025, 10:30:02 AM   DEBUG SERVER IS RUNNING ON PORT: 05-12-2025 3000
[Nest] 12345  - 12/05/2025, 10:30:02 AM     LOG [NestApplication] Nest application successfully started
```

### Step 7: Test Bot

Open a new terminal window and test:

```bash
# Test bot connectivity
curl -s https://api.telegram.org/bot${BOT_TOKEN}/getMe | json_pp

# Should output something like:
# {
#   "ok" : true,
#   "result" : {
#     "id" : 123456789,
#     "is_bot" : true,
#     "first_name" : "Your Bot Name",
#     "username" : "your_bot_username"
#   }
# }
```

**Test in Telegram:**
1. Open Telegram
2. Search for your bot by username
3. Send `/start`
4. Bot should respond with language selection

---

## 🔧 Build for Production

### Step 1: Build

```bash
# Compile TypeScript to JavaScript
pnpm run build

# Output directory: dist/
# Verify build succeeded
ls -la dist/
```

### Step 2: Run Production Build

```bash
# Start production server
pnpm run start:prod

# or with Node directly
node dist/main.js
```

---

## 🗄️ Database Management

### View Database (Prisma Studio)

```bash
# Open web UI to view/edit database
pnpm prisma studio

# Opens at http://localhost:5555
```

### Reset Database (⚠️ Deletes all data)

```bash
# WARNING: This deletes everything!
pnpm prisma migrate reset

# Confirm by typing 'y'
# Database will be recreated from schema
```

### Manual Database Operations

```bash
# Connect to database directly
psql gadgets_bot_db

# List all tables
\dt

# View users
SELECT * FROM "users";

# Count phone listings
SELECT COUNT(*) FROM "phones";

# Exit
\q
```

---

## 🐛 Troubleshooting

### Bot Not Responding

**Problem:** Bot doesn't respond to `/start` command

**Solutions:**

1. **Check bot token:**
```bash
echo $BOT_TOKEN
# Should output your token, not empty
```

2. **Test bot connectivity:**
```bash
curl -s https://api.telegram.org/bot${BOT_TOKEN}/getMe | json_pp
# Should return bot info
```

3. **Check logs:**
```bash
# Look for errors in terminal where you ran pnpm run start:dev
# Search for ERROR or WARN messages
```

4. **Verify Telegram channels:**
```bash
# Make sure ADMIN_CHANNEL_ID and PUBLIC_CHANNEL_ID are correct
echo $ADMIN_CHANNEL_ID
echo $PUBLIC_CHANNEL_ID
```

### Database Connection Failed

**Problem:** "ECONNREFUSED" or "could not connect" error

**Solutions:**

1. **Verify PostgreSQL is running:**
```bash
# macOS
brew services list | grep postgres

# Linux
systemctl status postgresql

# Windows
# Check Services app for PostgreSQL
```

2. **Verify connection string:**
```bash
# Check .env file
cat .env | grep DATABASE_URL

# Test connection
psql "postgresql://user:password@localhost:5432/gadgets_bot_db"
```

3. **Start PostgreSQL:**
```bash
# macOS
brew services start postgresql

# Linux
sudo systemctl start postgresql

# Windows
# Start PostgreSQL from Services app
```

### Port 3000 Already in Use

**Problem:** "Error: listen EADDRINUSE :::3000"

**Solutions:**

1. **Kill process on port 3000:**
```bash
# macOS/Linux
lsof -i :3000
# Find PID, then:
kill -9 <PID>

# OR use different port
API_PORT=3001 pnpm run start:dev
```

2. **Windows:**
```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Prisma Migration Issues

**Problem:** "Migration failed" or "schema drift"

**Solutions:**

1. **Check migration status:**
```bash
pnpm prisma migrate status
```

2. **Reset and apply fresh:**
```bash
pnpm prisma migrate reset
```

3. **Manual migration:**
```bash
pnpm prisma migrate deploy
```

---

## 📋 Post-Installation Checklist

After installation, verify everything:

- [ ] Node.js and pnpm installed and correct versions
- [ ] PostgreSQL running and accessible
- [ ] Bot token created from @BotFather
- [ ] Admin and public channels created with correct IDs
- [ ] `.env` file created with all credentials
- [ ] Database migrations applied successfully
- [ ] Development server starts without errors
- [ ] Bot responds to `/start` command in Telegram
- [ ] Prisma Studio accessible at http://localhost:5555
- [ ] No compilation errors in terminal

---

## 🚀 Next Steps

### Development Workflow

```bash
# Terminal 1: Start dev server
pnpm run start:dev

# Terminal 2: Run tests (optional)
pnpm run test:watch

# Terminal 3: Run Prisma Studio (optional)
pnpm prisma studio
```

### Code Formatting

```bash
# Format all code
pnpm run format

# Lint for errors
pnpm run lint
```

### Creating a Feature

1. Create feature branch: `git checkout -b feature/new-feature`
2. Make changes
3. Test thoroughly
4. Format code: `pnpm run format`
5. Commit: `git commit -m "Add new feature"`
6. Push: `git push origin feature/new-feature`
7. Create Pull Request

---

## 🌐 Deployment

### Heroku Deployment

```bash
# Login to Heroku
heroku login

# Create new app
heroku create your-app-name

# Add PostgreSQL addon
heroku addons:create heroku-postgresql:hobby-dev

# Set environment variables
heroku config:set BOT_TOKEN=your_token
heroku config:set BOT_USERNAME=your_username
heroku config:set ADMIN_CHANNEL_ID=your_id
heroku config:set PUBLIC_CHANNEL_ID=your_id

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

### Docker Deployment

```bash
# Build Docker image
docker build -t gadgets-bot:latest .

# Run container
docker run -p 3000:3000 \
  -e BOT_TOKEN=your_token \
  -e DATABASE_URL=your_db_url \
  -e ADMIN_CHANNEL_ID=your_id \
  -e PUBLIC_CHANNEL_ID=your_id \
  gadgets-bot:latest
```

### VPS Deployment (Ubuntu)

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install nodejs

# Install pnpm
npm install -g pnpm

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib

# Clone repository
git clone https://github.com/muhiddinovismoil/gadgets_bot.git
cd gadgets_bot

# Install dependencies
pnpm install

# Create .env
nano .env
# Add your credentials

# Run migrations
pnpm prisma migrate deploy

# Build
pnpm run build

# Start with PM2
pnpm install -g pm2
pm2 start dist/main.js --name gadgets-bot
pm2 save
pm2 startup
```

---

## 📚 Documentation

- [README.md](./README.md) - Project overview
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System design
- [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - Bot commands
- [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) - Data models

---

## 🆘 Getting Help

**If you encounter issues:**

1. Check [Troubleshooting](#-troubleshooting) section above
2. Review [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) for data structure issues
3. Check [ARCHITECTURE.md](./ARCHITECTURE.md) for design questions
4. Open [GitHub Issues](https://github.com/muhiddinovismoil/gadgets_bot/issues)
5. Contact via Telegram (once bot is running)

---

## ✅ Installation Complete!

Your Gadgets Bot is now installed and ready to use.

**Next:** Start the development server and begin testing!

```bash
pnpm run start:dev
```

Happy coding! 🚀
