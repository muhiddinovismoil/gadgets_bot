# Architecture Overview - Gadgets Bot

## 📐 System Architecture

### High-Level Design

The Gadgets Bot follows a layered, modular architecture built on NestJS with clear separation of concerns:

```
┌───────────────────────────────────────────────────┐
│              Telegram Bot Users                   │
└───────────────────┬─────────────────────────────┘
                    │
        ┌───────────▼───────────┐
        │   Telegraf Middleware  │
        │  - Session Management  │
        │  - Request Routing     │
        └───────────┬───────────┘
                    │
┌───────────────────▼────────────────────┐
│          NestJS Application Module      │
│  - Dependency Injection                │
│  - Module Organization                 │
└───────────────────┬────────────────────┘
                    │
        ┌───────────┴───────────┬──────────────┐
        │                       │              │
   ┌────▼───────┐  ┌────────────▼───┐  ┌────▼──────┐
   │ BotModule   │  │  UserModule    │  │Prisma     │
   ├─────────────┤  ├────────────────┤  │Module     │
   │- Commands   │  │- Scenes        │  ├───────────┤
   │- Callbacks  │  │- Actions       │  │- Service  │
   │- State      │  │- Validation    │  │- DB conn  │
   └────────────┘  └────────────────┘  └──────────┘
                    │
        ┌───────────▼───────────┐
        │   Data Layer (ORM)    │
        │  - Prisma Client      │
        │  - Type Safety        │
        └───────────┬───────────┘
                    │
        ┌───────────▼───────────┐
        │   PostgreSQL Database  │
        │ - Users, Admins, Phones│
        └───────────────────────┘
```

---

## 🔧 Module Structure

### 1. **BotModule** - Core Bot Handler

**Location:** `src/api/bot/`

**Purpose:** Primary entry point for all Telegram bot interactions

**Key Components:**

- **bot.module.ts** - Module configuration and imports
- **bot.service.ts** - Decorated handlers for commands and callbacks

**Handlers:**

```
@Update()
export class BotService {
  @Command('/start')           // Initial greeting
  @Action('uz'|'ru'|'en')     // Language selection
  @Action('ap_*')             // Admin approve callback
  @Action('rj_*')             // Admin reject callback
}
```

**Responsibilities:**
- Route `/start` command
- Handle language selection
- Process admin approval/rejection
- Publish to public channel
- Manage user sessions

**Data Flow:**
```
User Message → Telegraf Middleware → BotService @Command → 
Prisma (User lookup/create) → Response
```

---

### 2. **UserModule** - User Operations

**Location:** `src/api/users/`

**Purpose:** Handle user-specific operations and multi-step conversations

**Sub-Structure:**

```
users/
├── users.module.ts
├── scenes/
│   ├── register.scene.ts
│   ├── iphone.scene.ts
│   ├── android.scene.ts
│   ├── settings.scene.ts
│   └── users.scenes.module.ts
├── actions/
│   ├── users.actions.service.ts
│   └── users.actions.module.ts
└── users.module.ts
```

**Scene Breakdown:**

#### Register Scene
Collects user information during first signup:
- Full name input
- Phone number via contact button

#### iPhone Scene
iPhone device listing workflow:
```
Model → Memory → Delivery? → Price → Exchange? → 
Documents? → Battery % → Region → Images → Condition → Other Info → Confirmation
```

#### Android Scene
Android device listing with brand selection:
```
Brand (Samsung/Redmi/Oppo/etc) → Model → Price → Memory → 
Delivery? → Exchange? → Documents? → Battery → Region → 
Images → Condition → Other Info → Confirmation
```

#### Settings Scene
User preference management:
- Language change
- Phone number update
- Profile settings

**Action Handlers:**
```
@Action('postAd')           // Initiate posting
@Action('phones')           // Select category
@Action('iPhone'|'Android') // Device type
@Action('accept'|'edit')    // Confirm/edit listing
```

**Data Collection Pattern:**
```
Scene Enter → Prompt Message → User Input → Validation → 
Session Storage → Next Scene OR Error Retry
```

---

### 3. **PrismaModule** - Database Layer

**Location:** `src/prisma/`

**Purpose:** Manage PostgreSQL connection and ORM operations

**Files:**
- **prisma.service.ts** - Initializes and exposes Prisma Client
- **prisma.module.ts** - NestJS module configuration

**Key Operations:**
```typescript
// User operations
await prisma.user.findFirst()
await prisma.user.create()
await prisma.user.update()

// Phone listing operations
await prisma.phones.create()
await prisma.phones.findFirst()
await prisma.phones.delete()

// Admin operations
await prisma.admin.findFirst()
```

---

### 4. **CommonModule** - Shared Resources

**Location:** `src/common/`

**Purpose:** Centralize constants, templates, and types

**Structure:**

```
common/
├── constants/
│   ├── admin/
│   │   ├── keyboard.ts      # Admin UI buttons
│   │   └── message.ts       # Admin messages
│   ├── general/
│   │   ├── keyboard.ts      # Main menu, navigation
│   │   ├── message.ts       # System messages
│   │   └── regex.ts         # Input validation patterns
│   └── users/
│       ├── keyboard.ts      # User action buttons
│       ├── message.ts       # User prompts/confirmations
│       ├── regex.ts         # Device input validation
│       ├── android/
│       │   ├── keyboard.ts
│       │   ├── message.ts
│       │   ├── func/        # Android-specific logic
│       │   └── template/    # Android listing template
│       └── iphones/
│           ├── keyboard.ts
│           ├── message.ts
│           ├── regex/       # iPhone validation patterns
│           └── template/    # iPhone listing template
├── types/
│   ├── context.type.ts      # Telegraf Context extension
│   └── index.ts
└── index.ts                 # Barrel exports
```

**Key Exports:**
```typescript
// Messages
startMessage, mainMessage, askName, ...

// Keyboards
selectLangKeys, usersMenuKeys, adsCategoryKeys, ...

// Regex Patterns
iPhoneModelRegex, PhoneMemoryRegex, PhonePriceRegex, ...

// Templates
androidTemplate(), iPhoneTemplate()

// Types
ContextType - Extended Telegraf Context with session
```

---

## 🔄 Data Flow Patterns

### 1. User Registration Flow

```
/start
  ↓
Check if user exists in DB
  ├─ Yes: Load language → Show main menu
  └─ No: Show language selection
       ↓
Select language (uz|ru|en)
  ↓
Create user record in DB
  ↓
Enter Register scene
  ├─ Ask fullname
  ├─ Store in session & DB
  ├─ Ask phone number (contact button)
  └─ Store in DB
       ↓
Show main menu
```

### 2. Device Listing Flow

```
Click "📢 Post Ad"
  ↓
Select category (Phones)
  ↓
Select device type (iPhone | Android)
  ├─ iPhone: Ask model → memory → specs → images → confirm
  └─ Android: Ask brand → model → specs → images → confirm
       ↓
Store phone record in DB (pending)
  ↓
Send to ADMIN_CHANNEL
  ├─ Format with inline images
  ├─ Add approve/reject buttons
  └─ Store message IDs in callback data
       ↓
[Admin Review]
  ├─ Approve: Publish to PUBLIC_CHANNEL → Delete admin messages
  └─ Reject: Delete from DB → Delete admin messages
```

### 3. Image Collection Pattern

```
Scene: Image Upload
  ↓
Initialize: ctx.session.images = []
  ↓
Loop: For each photo
  ├─ Receive photo
  ├─ Extract file_id (Telegram ID)
  ├─ Store in session array
  └─ Ask for more? (up to 6 total)
       ↓
Validate: At least 1 image
  ├─ Yes: Continue
  └─ No: Retry
       ↓
Store images array in phone record
```

---

## 🗄️ Data Model

### Entity Relationships

```
┌─────────────┐
│   Users     │
├─────────────┤
│ id (UUID)   │
│ tg_id       │ ◄─── Telegram User ID
│ fullname    │
│ username    │
│ phone       │
│ lang        │ ◄─── uz | ru | en
└─────────────┘

┌──────────────┐
│   Phones     │
├──────────────┤
│ id (UUID)    │
│ model        │ ◄─── Device model name
│ price        │
│ memory       │ ◄─── RAM/Storage
│ region       │
│ delivery     │ ◄─── Boolean
│ exchange     │
│ document     │
│ phone_number │ ◄─── Seller contact
│ battery      │
│ condition    │
│ images[]     │ ◄─── Telegram file_ids
│ other_info   │
└──────────────┘

┌─────────────┐
│   Admin     │
├─────────────┤
│ id (UUID)   │
│ tg_id       │
│ fullname    │
│ username    │
└─────────────┘
```

---

## 🔐 State Management

### Session State Structure

```typescript
interface SessionState {
  // Language preference (uz | ru | en)
  lang: string;
  
  // Current device info being collected
  iphoneInfo?: {
    model: string;
    price: string;
    memory: string;
    delivery: boolean;
    exchange: boolean;
    document: boolean;
    condition: string;
    region: string;
    battery: string;
    otherInfo: string;
    images: string[]; // Telegram file_ids
  };
  
  androidInfo?: {
    // Similar structure
  };
  
  // Edit mode flag
  isEditing: boolean;
  
  // Image collection
  images: string[];
  
  // Temporary data
  tempData?: Record<string, any>;
}
```

**Lifecycle:**
- Created on user message
- Persisted across scenes using telegraf session middleware
- Cleared after final confirmation or cancellation

---

## 🔌 Telegram Integration Points

### Middlewares

```typescript
session()
  ↓ Stores ctx.session

Custom middleware
  ↓ Ensures ctx.session exists

Global exception handling
  ↓ Catches and logs errors
```

### Update Handlers

```
@Update() - Decorator marks class as update handler
  ├─ @Command() - Slash commands (/start)
  ├─ @Hears() - Text matching
  ├─ @On() - Event type (text, photo, contact)
  ├─ @Action() - Button callbacks
  ├─ @SceneEnter() - Scene lifecycle
  └─ @Ctx() - Inject context
```

### Callback Query Format

Approval callback:
```
ap_<shortId>_<adminMessageId>_<confirmationMessageId>
```

Rejection callback:
```
rj_<shortId>_<adminMessageId>_<confirmationMessageId>
```

---

## 🎨 Template Engine

### Android Template

```typescript
androidTemplate(phoneData): string
  ├─ Format model name
  ├─ Format price with currency
  ├─ Display memory/storage
  ├─ Show region
  ├─ Delivery/Exchange/Document status
  ├─ Battery health percentage
  ├─ Condition description
  ├─ Contact phone number
  └─ Additional info
```

### iPhone Template

Similar structure with iPhone-specific formatting

---

## ⚙️ Configuration

### Environment Loading

```typescript
// src/config/index.ts
export const config = {
  BOT_TOKEN: process.env.BOT_TOKEN!,
  BOT_USERNAME: process.env.BOT_USERNAME!,
  DATABASE_URL: process.env.DATABASE_URL!,
  ADMIN_CHANNEL_ID: process.env.ADMIN_CHANNEL_ID!,
  PUBLIC_CHANNEL_ID: process.env.PUBLIC_CHANNEL_ID!,
  API_PORT: process.env.API_PORT || 3000,
};
```

### Telegraf Configuration

```typescript
// src/config/telegram.config.ts
{
  token: config.BOT_TOKEN,
  middlewares: [
    session(),
    // Global middleware setup
  ]
}
```

---

## 🚀 Execution Flow

### On Application Start

```
1. NestFactory.create(AppModule)
2. ├─ Initialize modules in order
3. ├─ PrismaModule → Connect to DB
4. ├─ BotModule → Initialize Telegraf
5. ├─ UserModule → Register scenes
6. └─ Inject dependencies
7. app.listen(3000)
8. Logger output: BOT_RUNNING_ON...
```

### On User Message

```
User sends message
  ↓
Telegraf receives update
  ↓
Session middleware → Load/create session
  ↓
Route to handler
  ├─ Command (@Command) ?
  ├─ Button action (@Action) ?
  ├─ Scene handler (@On) ?
  └─ Other ?
       ↓
Handler executes
  ├─ Database query (Prisma)
  ├─ Session manipulation
  └─ Send response
       ↓
Response delivered to Telegram API
  ↓
User receives message
```

---

## 📈 Scalability Considerations

### Current Architecture Limitations

- **Polling Mode:** Waits for updates, less efficient at scale
- **Single-Process:** No horizontal scaling
- **In-Memory Sessions:** Lost on restart
- **Direct DB Calls:** No caching layer

### Future Improvements

1. **Webhook Mode:** Replace polling with event-driven webhook
2. **Message Queue:** RabbitMQ/Kafka for async operations
3. **Redis:** Session persistence and caching
4. **Database Connection Pooling:** Handle concurrent requests
5. **Microservices:** Split into separate services
6. **Load Balancing:** Distribute across multiple instances

---

## 🧪 Testing Architecture

### Unit Tests
```
BotService.spec.ts
├─ Command handlers
├─ Database interactions
└─ Response formatting

SceneService.spec.ts
├─ State transitions
├─ Input validation
└─ Session management
```

### E2E Tests
```
Bot flow simulation
├─ User registration
├─ Device listing submission
├─ Admin approval/rejection
└─ Database state verification
```

---

## 📝 Development Best Practices

1. **Type Safety:** Use TypeScript strict mode
2. **Dependency Injection:** Use NestJS DI system
3. **Error Handling:** Wrap DB calls in try-catch
4. **Logging:** Use NestJS Logger service
5. **Validation:** Regex patterns in constants
6. **Session Cleanup:** Clear on logout/completion
7. **Database Transactions:** Use Prisma transactions for consistency

---

## 🔍 Code Organization Principles

1. **Single Responsibility:** Each module has one clear purpose
2. **Dependency Inversion:** Inject dependencies, don't create them
3. **DRY (Don't Repeat):** Use CommonModule for shared resources
4. **Barrel Exports:** Use index.ts for cleaner imports
5. **Type Safety:** Leverage TypeScript interfaces
6. **Constants Over Magic Numbers:** Define in common/constants

This architecture provides a solid foundation for a scalable, maintainable Telegram bot application with clear separation of concerns and room for growth.
