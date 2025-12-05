# Database Schema - Gadgets Bot

## 📋 Overview

The database is built on PostgreSQL with Prisma ORM for type-safe database access. This document provides comprehensive schema documentation.

---

## 📊 Database Structure

### Entity Relationship Diagram

```
┌─────────────────────────┐
│        users            │
├─────────────────────────┤
│ PK: id (UUID)           │
│    tg_id (VARCHAR)      │ ◄─── Unique Telegram ID
│    fullname (VARCHAR)   │
│    username (VARCHAR)   │
│    phone_number         │
│    lang (VARCHAR)       │ ◄─── uz | ru | en
│    created_at           │
│    updated_at           │
└─────────────────────────┘

┌─────────────────────────┐
│        phones           │
├─────────────────────────┤
│ PK: id (VARCHAR)        │
│    model (VARCHAR)      │
│    price (INTEGER)      │
│    memory (VARCHAR)     │
│    region (VARCHAR)     │
│    delivery (BOOLEAN)   │
│    exchange (BOOLEAN)   │
│    document (BOOLEAN)   │
│    phone_number         │
│    battery (VARCHAR)    │
│    condition (VARCHAR)  │
│    images (JSON[])      │ ◄─── Telegram file_ids
│    other_info (TEXT)    │
│    created_at           │
│    updated_at           │
└─────────────────────────┘

┌─────────────────────────┐
│        admin            │
├─────────────────────────┤
│ PK: id (UUID)           │
│    tg_id (VARCHAR)      │ ◄─── Unique Telegram ID
│    fullname (VARCHAR)   │
│    username (VARCHAR)   │
│    created_at           │
│    updated_at           │
└─────────────────────────┘
```

---

## 🔍 Detailed Table Specifications

### Users Table

**Purpose:** Store registered user profiles and preferences

**SQL Definition:**
```sql
CREATE TABLE "users" (
    "id" UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
    "tg_id" VARCHAR(30) UNIQUE,
    "fullname" VARCHAR(24),
    "username" VARCHAR(40),
    "phone_number" VARCHAR(25),
    "lang" VARCHAR(2) DEFAULT 'uz',
    "created_at" TIMESTAMP DEFAULT NOW(),
    "updated_at" TIMESTAMP DEFAULT NOW()
);
```

**Prisma Definition:**
```prisma
model User {
  id          String  @default(dbgenerated("GEN_RANDOM_UUID()")) @map("id") @db.Uuid
  telegramId  String? @unique @map("tg_id") @db.VarChar(30)
  fullname    String? @map("fullname") @db.VarChar(24)
  username    String? @map("username") @db.VarChar(40)
  phoneNumber String? @map("phone_number") @db.VarChar(25)
  language    String? @map("lang") @db.VarChar(2)
  
  createdAt DateTime? @default(now()) @map("created_at") @db.Timestamp
  updatedAt DateTime? @updatedAt @map("updated_at") @db.Timestamp

  @@id([id])
  @@map("users")
}
```

**Field Definitions:**

| Field | Type | Constraints | Purpose |
|-------|------|-------------|---------|
| `id` | UUID | PRIMARY KEY | Unique user identifier (auto-generated) |
| `tg_id` | VARCHAR(30) | UNIQUE | Telegram user ID for lookup |
| `fullname` | VARCHAR(24) | Nullable | User's display name |
| `username` | VARCHAR(40) | Nullable | Telegram username (without @) |
| `phone_number` | VARCHAR(25) | Nullable | Contact phone number |
| `lang` | VARCHAR(2) | DEFAULT 'uz' | Language preference (uz/ru/en) |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Registration timestamp |
| `updated_at` | TIMESTAMP | AUTO UPDATE | Last modified timestamp |

**Sample Records:**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "tg_id": "123456789",
  "fullname": "Ismoil Muhiddini",
  "username": "ismoil_dev",
  "phone_number": "+998901234567",
  "lang": "uz",
  "created_at": "2025-12-05T10:30:00Z",
  "updated_at": "2025-12-05T10:30:00Z"
}

{
  "id": "550e8400-e29b-41d4-a716-446655440002",
  "tg_id": "987654321",
  "fullname": "John Doe",
  "username": "johndoe",
  "phone_number": "+998901234568",
  "lang": "en",
  "created_at": "2025-12-04T15:00:00Z",
  "updated_at": "2025-12-04T15:00:00Z"
}
```

**Indexes:**
```sql
CREATE UNIQUE INDEX users_tg_id_key ON users(tg_id);
```

---

### Phones Table

**Purpose:** Store device listings submitted by users

**SQL Definition:**
```sql
CREATE TABLE "phones" (
    "id" VARCHAR(36) PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
    "model" VARCHAR(40),
    "price" INTEGER,
    "memory" VARCHAR(30),
    "region" VARCHAR(30),
    "delivery" BOOLEAN,
    "exchange" BOOLEAN,
    "document" BOOLEAN,
    "phone_number" VARCHAR(25),
    "battery" VARCHAR(35),
    "condition" VARCHAR(35),
    "images" JSON[] DEFAULT '{}',
    "other_info" TEXT,
    "created_at" TIMESTAMP DEFAULT NOW(),
    "updated_at" TIMESTAMP DEFAULT NOW()
);
```

**Prisma Definition:**
```prisma
model Phones {
  id            String   @default(dbgenerated("GEN_RANDOM_UUID()")) @map("id")
  model         String?  @db.VarChar(40)
  price         Int?     @db.Integer
  memory        String?  @db.VarChar(30)
  region        String?  @db.VarChar(30)
  delivery      Boolean? @db.Boolean
  exchange      Boolean? @db.Boolean
  document      Boolean? @db.Boolean
  phoneNumber   String?  @map("phone_number") @db.VarChar(25)
  batteryHealth String?  @map("battery") @db.VarChar(35)
  condition     String?  @db.VarChar(35)
  images        Json[]   @default([])
  otherInfo     String?  @db.Text

  createdAt DateTime? @default(now()) @map("created_at") @db.Timestamp
  updatedAt DateTime? @updatedAt @map("updated_at") @db.Timestamp

  @@id([id])
  @@map("phones")
}
```

**Field Definitions:**

| Field | Type | Constraints | Purpose |
|-------|------|-------------|---------|
| `id` | VARCHAR(36) | PRIMARY KEY | Unique listing ID (UUID) |
| `model` | VARCHAR(40) | Nullable | Device model name (e.g., "iPhone 13 Pro") |
| `price` | INTEGER | Nullable | Price in local currency |
| `memory` | VARCHAR(30) | Nullable | RAM/Storage (e.g., "4/64", "6/128") |
| `region` | VARCHAR(30) | Nullable | Geographic region (e.g., "Tashkent") |
| `delivery` | BOOLEAN | Nullable | Delivery available flag |
| `exchange` | BOOLEAN | Nullable | Trade-in/exchange accepted |
| `document` | BOOLEAN | Nullable | Original documents included |
| `phone_number` | VARCHAR(25) | Nullable | Seller's contact phone |
| `battery` | VARCHAR(35) | Nullable | Battery health percentage (e.g., "92%") |
| `condition` | VARCHAR(35) | Nullable | Device condition description |
| `images` | JSON[] | DEFAULT '{}' | Array of Telegram file_ids |
| `other_info` | TEXT | Nullable | Additional details |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Listing creation time |
| `updated_at` | TIMESTAMP | AUTO UPDATE | Last modification time |

**Sample Record:**

```json
{
  "id": "f7e8d9c0-b1a2-4c3d-8e9f-0a1b2c3d4e5f",
  "model": "iPhone 13 Pro",
  "price": 6500000,
  "memory": "256GB",
  "region": "Tashkent",
  "delivery": true,
  "exchange": true,
  "document": true,
  "phone_number": "+998901234567",
  "battery": "92%",
  "condition": "Excellent - No scratches",
  "images": [
    "AgACAgIAAxkBAAIBCWZiCt...",
    "AgACAgIAAxkBAAIBCWZiCt...",
    "AgACAgIAAxkBAAIBCWZiCt..."
  ],
  "other_info": "Original box included, barely used",
  "created_at": "2025-12-05T11:45:00Z",
  "updated_at": "2025-12-05T11:45:00Z"
}

{
  "id": "a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d",
  "model": "Samsung Galaxy S21",
  "price": 4200000,
  "memory": "8/256",
  "region": "Samarkand",
  "delivery": false,
  "exchange": true,
  "document": false,
  "phone_number": "+998902345678",
  "battery": "85%",
  "condition": "Good - Minor scratches on frame",
  "images": [
    "AgACAgIAAxkBAAIBCWZiCt...",
    "AgACAgIAAxkBAAIBCWZiCt..."
  ],
  "other_info": "Charger not included",
  "created_at": "2025-12-03T09:20:00Z",
  "updated_at": "2025-12-03T09:20:00Z"
}
```

**Image Storage:**

Images are stored as Telegram file_ids (not actual files):
```json
"images": [
  "AgACAgIAAxkBAAIBBWZiFZt_xrbtH2tKo...",
  "AgACAgIAAxkBAAIBBWZiFZt_xrbtH2tKo...",
  "AgACAgIAAxkBAAIBBWZiFZt_xrbtH2tKo..."
]
```

This allows fast retrieval without storage overhead. Telegram handles file storage.

---

### Admin Table

**Purpose:** Store admin user information

**SQL Definition:**
```sql
CREATE TABLE "admin" (
    "id" UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
    "tg_id" VARCHAR(30) UNIQUE,
    "fullname" VARCHAR(24),
    "username" VARCHAR(40),
    "created_at" TIMESTAMP DEFAULT NOW(),
    "updated_at" TIMESTAMP DEFAULT NOW()
);
```

**Prisma Definition:**
```prisma
model Admin {
  id         String  @default(dbgenerated("GEN_RANDOM_UUID()")) @map("id") @db.Uuid
  telegramId String? @unique @map("tg_id") @db.VarChar(30)
  fullname   String? @map("fullname") @db.VarChar(24)
  username   String? @map("username") @db.VarChar(40)

  createdAt DateTime? @default(now()) @map("created_at") @db.Timestamp
  updatedAt DateTime? @updatedAt @map("updated_at") @db.Timestamp

  @@id([id])
  @@map("admin")
}
```

**Field Definitions:**

| Field | Type | Constraints | Purpose |
|-------|------|-------------|---------|
| `id` | UUID | PRIMARY KEY | Unique admin identifier |
| `tg_id` | VARCHAR(30) | UNIQUE | Telegram admin ID |
| `fullname` | VARCHAR(24) | Nullable | Admin display name |
| `username` | VARCHAR(40) | Nullable | Telegram username |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Record creation time |
| `updated_at` | TIMESTAMP | AUTO UPDATE | Last modified time |

**Sample Record:**

```json
{
  "id": "admin001-e29b-41d4-a716-446655440001",
  "tg_id": "111111111",
  "fullname": "Admin User",
  "username": "gadgets_admin",
  "created_at": "2025-01-01T00:00:00Z",
  "updated_at": "2025-01-01T00:00:00Z"
}
```

---

## 🔐 Enum Types

### RateEnum (Currently Unused)

```prisma
enum RateEnum {
  Terrible
  Bad
  Okay
  Good
  Excellent
}
```

**Intended For:** User ratings system (future feature)

---

## 📈 Data Statistics & Queries

### Common Queries

**Find user by Telegram ID:**
```prisma
const user = await prisma.user.findFirst({
  where: { telegramId: "123456789" }
});
```

**Create new user:**
```prisma
const user = await prisma.user.create({
  data: {
    telegramId: "123456789",
    language: "uz",
    fullname: "John Doe",
    username: "johndoe"
  }
});
```

**Get all pending phones:**
```prisma
const phones = await prisma.phones.findMany({
  orderBy: { createdAt: "desc" }
});
```

**Delete phone listing:**
```prisma
await prisma.phones.delete({
  where: { id: "f7e8d9c0-b1a2-4c3d-8e9f-0a1b2c3d4e5f" }
});
```

**Update user language:**
```prisma
await prisma.user.update({
  where: { telegramId: "123456789" },
  data: { language: "ru" }
});
```

---

## 🗂️ Indexes & Performance

### Recommended Indexes

```sql
-- Users table
CREATE UNIQUE INDEX idx_users_tg_id ON "users"("tg_id");
CREATE INDEX idx_users_lang ON "users"("lang");

-- Phones table
CREATE INDEX idx_phones_model ON "phones"("model");
CREATE INDEX idx_phones_region ON "phones"("region");
CREATE INDEX idx_phones_created_at ON "phones"("created_at" DESC);
CREATE INDEX idx_phones_price ON "phones"("price");

-- Admin table
CREATE UNIQUE INDEX idx_admin_tg_id ON "admin"("tg_id");
```

### Query Performance

**Current Scale:** ~1000s of users, ~10000s of listings
**Bottlenecks:** None identified for current load
**Future Optimization:** Add caching layer (Redis) for frequent queries

---

## 🔄 Migration History

### Migration 1: Initial Schema (20250707050537)

Created initial database schema with users, admin, and phones tables.

**Files:**
- `prisma/migrations/20250707050537_init/migration.sql`

### Migration 2: Schema Updates (20251012115643)

Refinements and field adjustments based on feature requirements.

**Files:**
- `prisma/migrations/20251012115643_init/migration.sql`

---

## 📊 Data Integrity

### Constraints

**Unique Constraints:**
- `users.tg_id` - Each user has unique Telegram ID
- `admin.tg_id` - Each admin has unique Telegram ID

**Default Values:**
- `users.lang` - Defaults to 'uz' (Uzbek)
- `users.created_at` - Auto-set to current timestamp
- `phones.created_at` - Auto-set to current timestamp
- `phones.images` - Defaults to empty array

**Auto-Update:**
- `updated_at` - Automatically updated on any modification

---

## 🔐 Data Privacy & Security

### PII (Personally Identifiable Information)

**Stored:**
- Full names
- Telegram usernames
- Phone numbers
- Telegram IDs

**Considerations:**
- Comply with local privacy regulations
- Implement data export feature
- Add data deletion on user request
- Consider encryption for sensitive fields

### Access Control

**Current:** No granular access control (future improvement)

**Recommended:**
- Role-based access control (RBAC)
- Audit logging for admin actions
- IP whitelisting for admin access

---

## 🚀 Scaling Considerations

### Current Limitations

- **No partitioning:** Single table for all listings
- **No replication:** Single database instance
- **No connection pooling:** Basic direct connections

### Future Improvements

1. **Horizontal Partitioning:** Partition phones by region or date
2. **Read Replicas:** Improve read performance
3. **Connection Pooling:** PgBouncer or similar
4. **Caching:** Redis for hot data
5. **Archival:** Move old listings to archive table

---

## 📋 Backup & Recovery

### Backup Strategy

**Recommended:**
```bash
# Daily automated backups
pg_dump gadgets_bot_db > backup_$(date +%Y%m%d).sql

# Compress for storage
gzip backup_$(date +%Y%m%d).sql

# Store in multiple locations
# - Local backup storage
# - Cloud storage (AWS S3, etc.)
# - Off-site backup
```

### Recovery Procedure

```bash
# Restore from backup
psql gadgets_bot_db < backup_20251205.sql

# Or using pg_restore if in custom format
pg_restore -d gadgets_bot_db backup_20251205.custom
```

---

## 🧹 Data Maintenance

### Cleanup Operations

**Delete old listings (90+ days):**
```sql
DELETE FROM "phones" 
WHERE "created_at" < NOW() - INTERVAL '90 days';
```

**Remove inactive users (1+ year):**
```sql
DELETE FROM "users" 
WHERE "updated_at" < NOW() - INTERVAL '1 year';
```

**Validate data integrity:**
```sql
SELECT COUNT(*) FROM "users" WHERE "tg_id" IS NULL;
SELECT COUNT(*) FROM "phones" WHERE "images" = '{}';
```

---

## 📱 Connection String

**Format:**
```
postgresql://[user]:[password]@[host]:[port]/[database]
```

**Example:**
```
postgresql://gadgets_bot:secure_password@localhost:5432/gadgets_bot_db
```

**Environment Variable:**
```
DATABASE_URL=postgresql://user:pass@localhost:5432/gadgets_bot_db
```

This comprehensive schema documentation provides all information needed to understand, maintain, and optimize the Gadgets Bot database.
