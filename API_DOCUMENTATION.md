# API Documentation - Gadgets Bot

## 🎯 Overview

This document details all bot commands, callback actions, and API interactions for the Gadgets Bot system.

---

## 📋 Bot Commands

### /start

**Description:** Initialize bot and greet user

**Flow:**
```
/start
  ↓
Check if user registered
  ├─ No: Show language selection keyboard
  └─ Yes: Load saved language → Show main menu
```

**Response (New User):**
```
Techno botga Xush kelibsiz.
O'zingiz uchun qulay tilni tanlang:

Hello.
Choose a language that suits you:

Здравствуйте.
Выберите подходящий вам язык:

[🇺🇿 Uzbek] [🇷🇺 Russian] [🇬🇧 English]
```

**Response (Returning User):**
```
Kerakli bo'limni tanlang:
(Select the required section)

[📢 Post Ad]
[📜 View Ads]
[📞 Contact Admin]
[⚙️ Settings]
```

---

## 🎮 Action Callbacks

### Language Selection

#### Action: `uz`
- **Triggered By:** Uzbek language button
- **Process:**
  1. Check if user exists in database
  2. If not: Create user with language='uz'
  3. Set `ctx.session.lang = 'uz'`
  4. Enter 'Register' scene
- **Response:** Ask for fullname

#### Action: `ru`
- **Triggered By:** Russian language button
- **Process:** Same as `uz` with language='ru'
- **Response:** Ask for fullname in Russian

#### Action: `en`
- **Triggered By:** English language button
- **Process:** Same as `uz` with language='en'
- **Response:** Ask for fullname in English

---

### Main Menu Actions

#### Action: `postAd`
- **Triggered By:** "📢 Post Ad" button
- **Description:** Initiate device listing creation
- **Response:** Show category selection
```
[📱 Telephones]
[Orqaga 🔙 Back]
```

#### Action: `phones`
- **Triggered By:** "📱 Telephones" button
- **Description:** Select phone category
- **Response:** Show device type selection
```
[iPhone uchun / For iPhone / Для iPhone]
[Android uchun / For Android / Для Android]
[Orqaga 🔙 / Back]
```

#### Action: `iPhone`
- **Triggered By:** "For iPhone" button
- **Description:** Start iPhone listing workflow
- **Scene Entered:** `iPhoneDevice`
- **Response:** Ask iPhone model name

#### Action: `Android`
- **Triggered By:** "For Android" button
- **Description:** Start Android listing workflow
- **Scene Entered:** `AndroidDevice`
- **Response:** Show Android phone brand selection
```
[Samsung] [Redmi] [Oppo] [Mi]
[Realme] [Infinix] [Poco] [Tecno]
[Orqaga 🔙]
```

#### Action: `settings`
- **Triggered By:** "⚙️ Settings" button
- **Description:** Access user preferences
- **Response:** Settings menu
```
[Language]
[Phone Number]
[Back]
```

#### Action: `contactAdmin`
- **Triggered By:** "📞 Contact Admin" button
- **Description:** Show admin contact link
- **Response:** Message with admin contact button

---

## 📱 Device Listing Scenes

### iPhone Device Scene: `iPhoneDevice`

**Steps:**
1. Ask for iPhone model (e.g., "iPhone 13 Pro")
2. Validate with regex: `/^iPhone\s*\d{1,2}\s*(Pro|Max|mini)?$/`
3. Store in `ctx.session.iphoneInfo.model`
4. Move to memory scene

**Sample Conversation:**
```
Bot: Which iPhone model?
User: iPhone 13 Pro
Bot: ✅ Model saved
```

### iPhone Memory Scene: `askMemoryOfiPhone`

**Input:** RAM/Storage (e.g., "4/64", "6/128")
**Validation:** `/^\d{1,2}\/\d{2,3}GB$/`
**Storage:** `ctx.session.iphoneInfo.memory`

### iPhone Delivery Scene: `AskisDeliveryValidForIphone`

**Question:** Yetkazib berish bormi? (Is there delivery?)
**Options:** Yes | No
**Storage:** `ctx.session.iphoneInfo.delivery` (boolean)

### iPhone Price Scene: `AskiPhonePrice`

**Question:** Telefon narxini kiriting (Enter phone price)
**Validation:** Numeric value
**Storage:** `ctx.session.iphoneInfo.price`

### iPhone Exchange Scene: `AskIsExchangeValid`

**Question:** Telefonni almashtira olasizmi? (Can you exchange?)
**Options:** Yes | No
**Storage:** `ctx.session.iphoneInfo.exchange` (boolean)

### iPhone Documents Scene: `AskIsDocumentsValid`

**Question:** Telefonni document va karobkasi bormi? (Documents & box?)
**Options:** Yes | No
**Storage:** `ctx.session.iphoneInfo.document` (boolean)

### iPhone Battery Scene: `AskConditionOfBattery`

**Question:** Batareyasi holatini kiriting (Battery condition %)
**Storage:** `ctx.session.iphoneInfo.battery`

### iPhone Region Scene: `AskRegionOfPhone`

**Question:** Regionini kiriting (Enter region)
**Storage:** `ctx.session.iphoneInfo.region`

### iPhone Images Scene: `AskingImages`

**Process:**
1. Ask for images (up to 6)
2. Validate at least 1 image
3. Store Telegram file_ids in `ctx.session.iphoneInfo.images[]`

### iPhone Confirmation Scene: `ConfirmingIphoneData`

**Display:**
```
Model: iPhone 13 Pro
Price: 6,500,000
Memory: 256GB
Region: Tashkent
Delivery: Yes
Exchange: Yes
Documents: Yes
Battery: 92%
Images: [1/6]
Other Info: No scratches

[✅ Accept] [✏️ Edit]
```

---

### Android Device Scene: `AndroidDevice`

**Android Brands:** Samsung, Redmi, Oppo, Mi, Realme, Infinix, Poco, Tecno

**Process:** Similar to iPhone but brand-specific

**Sub-scenes:**
- `SamsungScene` - Samsung model selection
- `RedmiScene` - Redmi model selection
- `OppoScene` - Oppo model selection
- `MiScene` - Xiaomi model selection
- `RealmeScene` - Realme model selection
- `InfinixScene` - Infinix model selection
- `PocoScene` - Poco model selection
- `TecnoScene` - Tecno model selection

---

## 🔐 Admin Actions

### Approve Callback: `ap_*`

**Format:** `ap_<shortId>_<adminMessageId>_<confirmationMessageId>`

**Example:** `ap_a1b2c3d4_123456_123457`

**Process:**
1. Parse callback data
2. Find phone record by shortId prefix
3. Format phone info with images
4. Send media group to PUBLIC_CHANNEL
5. Delete admin notification messages
6. Send confirmation to admin

**Response:**
```
✅ Tasdiqlandi va kanalga yuklandi!
(Approved and published to channel!)
```

**Published Format:**
```
[Image 1]
🔹 Model: iPhone 13 Pro
💰 Price: 6,500,000 UZS
💾 Memory: 256GB
🌎 Region: Tashkent
📍 Delivery: ✅
🔄 Exchange: ✅
📄 Documents: ✅
🔋 Battery: 92%
📞 Contact: +998901234567

[Additional Info]
No scratches, original box included

---

[Image 2] [Image 3] ... [Image 6]
```

### Reject Callback: `rj_*`

**Format:** `rj_<shortId>_<adminMessageId>_<confirmationMessageId>`

**Process:**
1. Parse callback data
2. Find phone record by shortId
3. Delete phone from database
4. Delete admin messages
5. Send confirmation

**Response:**
```
❌ Rad etildi va o'chirildi!
(Rejected and deleted!)
```

---

## 📤 Telegram API Calls

### Message Types

#### Text Messages
```typescript
ctx.reply(text, {
  reply_markup: keyboard,
  parse_mode: 'HTML'
})
```

#### Media Messages
```typescript
ctx.replyWithPhoto(file_id, {
  caption: text,
  parse_mode: 'HTML'
})
```

#### Media Groups (Multiple Images)
```typescript
ctx.telegram.sendMediaGroup(channelId, [
  { type: 'photo', media: file_id1, caption: text },
  { type: 'photo', media: file_id2 },
  ...
])
```

#### Button Responses
```typescript
ctx.answerCbQuery(message, {
  show_alert: false
})
```

---

## 🔄 Data Flow Examples

### Example 1: Complete Device Listing

```
User: /start
Bot: Show language buttons
User: Clicks 🇺🇿 Uzbek
Bot: Save lang='uz', show register form
User: Types "John Doe"
Bot: Save fullname, ask phone number
User: Sends contact
Bot: Save phone, show main menu
User: Clicks "📢 Post Ad"
Bot: Show category selection
User: Clicks "📱 Telephones"
Bot: Show device type (iPhone/Android)
User: Clicks "iPhone"
Bot: Ask for iPhone model
User: Types "iPhone 13 Pro"
Bot: Ask for memory
User: Types "256GB"
Bot: Ask delivery question
User: Clicks Yes
Bot: Ask price
User: Types "6500000"
[... Continue through all fields ...]
User: Confirms with ✅ Accept
Bot: Save to phones table, send to admin channel
Admin: Receives message with approve/reject buttons
Admin: Clicks ✅ Approve
Bot: Publishes to public channel, deletes admin messages
```

### Example 2: Admin Approval Workflow

```
New phone listing created
  ↓
Trigger admin notification
  ├─ Format phone data
  ├─ Send images as media group
  ├─ Add inline buttons with callback data
  └─ Store message IDs for cleanup
       ↓
Admin receives in admin channel
  ├─ Views formatted phone info
  ├─ Sees approve/reject buttons
  └─ Makes decision
       ↓
Admin clicks button
  ├─ Callback query processed
  ├─ Database updated
  ├─ Media published OR deleted
  └─ Admin messages cleaned up
       ↓
Confirmation sent to admin
User sees their listing (if approved)
```

---

## 📊 Request/Response Examples

### /start Command

**Request:**
```json
{
  "update_id": 123456789,
  "message": {
    "message_id": 1,
    "from": {
      "id": 987654321,
      "first_name": "John",
      "username": "johndoe"
    },
    "text": "/start"
  }
}
```

**Response (New User):**
```
Text: Language selection message
Keyboard: 3 buttons (UZ, RU, EN)
```

---

### Action Button Click

**Request (Callback):**
```json
{
  "callback_query": {
    "id": "1234567890",
    "from": {
      "id": 987654321,
      "username": "johndoe"
    },
    "data": "ap_a1b2c3d4_123456_123457"
  }
}
```

**Response:**
```
Answer: ✅ Tasdiqlandi va kanalga yuklandi!
Actions:
  1. Publish media group to PUBLIC_CHANNEL
  2. Delete admin messages
  3. Update database
```

---

## 🛡️ Error Handling

### Invalid Input

**Example:** User enters invalid iPhone model
```
User: Types "invalid"
Bot: "Xato format! Masalan: iPhone 13 Pro"
     (Wrong format! Example: iPhone 13 Pro)
Response: Show same prompt again
```

### Database Errors

**Process:**
```
try {
  await prisma.phones.create(...)
} catch (error) {
  logger.error(error)
  ctx.reply("Xatolik yuz berdi!") (Error occurred!)
  return
}
```

### Network Errors

**Telegram API Timeouts:**
- Retry logic implemented
- User notified if critical operation fails
- Transaction rollback on partial failures

---

## 🔌 Integration Points

### With Telegram Bot API

| Operation | Method | Returns |
|-----------|--------|---------|
| Get updates | `getUpdates()` | Update[] |
| Send message | `sendMessage()` | Message |
| Edit message | `editMessageText()` | Message |
| Delete message | `deleteMessage()` | true |
| Send media group | `sendMediaGroup()` | Message[] |
| Answer callback | `answerCallbackQuery()` | true |

### With PostgreSQL

| Operation | Query | Returns |
|-----------|-------|---------|
| Create user | INSERT | User record |
| Find user | SELECT | User or null |
| Update user | UPDATE | Updated user |
| Create phone | INSERT | Phone record |
| Find phone | SELECT | Phone or null |
| Delete phone | DELETE | Count |

---

## 📱 Supported Device Types

### iPhone Models Regex
```
Pattern: ^iPhone\s*\d{1,2}\s*(Pro|Max|mini)?$
Examples: 
  - iPhone 13 Pro
  - iPhone 14 Max
  - iPhone 12 mini
  - iPhone 13
```

### Android Brands
- Samsung
- Redmi
- Oppo
- Mi (Xiaomi)
- Realme
- Infinix
- Poco
- Tecno

### Common Validations

**Price:** Must be numeric
**Memory:** Format like "4/64", "6/128", "8/256"
**Battery:** Percentage (0-100%)
**Phone Number:** International format starting with +998

---

## 🚀 Rate Limiting (Future)

Currently: No rate limiting
Recommended implementation:
- 10 messages per 10 seconds per user
- 5 listing submissions per hour per user
- 100 image uploads per day per user

---

## 🔐 Security Considerations

1. **Telegram IDs:** Verified by Telegram API
2. **Channel Access:** Only admin/public channels allowed
3. **Input Validation:** Regex patterns prevent injection
4. **Database Constraints:** Unique constraints on tg_id
5. **Admin Verification:** Approve/reject restricted to admin channel

---

## 📈 Future API Enhancements

- [ ] Webhook mode instead of polling
- [ ] REST API for third-party integrations
- [ ] GraphQL API for complex queries
- [ ] Real-time WebSocket updates
- [ ] File upload optimization
- [ ] Search and filter API
- [ ] User ratings API
- [ ] Admin analytics API

This comprehensive API documentation provides all details needed for understanding and using the Gadgets Bot system.
