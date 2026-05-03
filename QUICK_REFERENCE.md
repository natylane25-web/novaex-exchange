# Novaex AI Exchange - Quick Reference

## Accessing Your App

| Location | URL |
|----------|-----|
| Exchange | `https://your-domain.vercel.app` |
| Admin | `https://your-domain.vercel.app?admin=true` |
| Local Dev | `http://localhost:5173` |

## Telegram Bot Commands

```
/start              # Launch bot with exchange buttons
```

## Admin Panel Overview

### Configuration Tab
- Set network fees
- Configure wallet addresses

### Users Tab
- View all users
- Search and delete users

### Broadcast Tab
- Send messages to users
- View broadcast history

### Transactions Tab
- View exchange transactions
- Filter by status

## Environment Variables

```bash
VITE_SUPABASE_URL              # Supabase project URL
VITE_SUPABASE_ANON_KEY         # Supabase anonymous key
VITE_TELEGRAM_BOT_TOKEN        # Telegram bot token
VITE_TELEGRAM_BOT_USERNAME     # Telegram bot username
VITE_APP_URL                   # App deployment URL
```

## Common Commands

```bash
# Local development
npm run dev

# Build for production
npm run build

# Type checking
npm run typecheck

# Linting
npm run lint
```

## Telegram Webhook Commands

```bash
# Set webhook
curl -X POST https://api.telegram.org/bot{TOKEN}/setWebhook \
  -H 'Content-Type: application/json' \
  -d '{"url": "https://[project].supabase.co/functions/v1/telegram-bot"}'

# Check webhook status
curl https://api.telegram.org/bot{TOKEN}/getWebhookInfo
```

## Database Quick Access

### View Users
```sql
SELECT * FROM users ORDER BY created_at DESC;
```

### View Transactions
```sql
SELECT * FROM transactions ORDER BY created_at DESC;
```

### View Config
```sql
SELECT * FROM admin_config LIMIT 1;
```

## Support Resources

- **START_HERE.md** - Getting started
- **SETUP_GUIDE.md** - Detailed setup
- **TROUBLESHOOTING.md** - Problem solving
- **README.md** - Project overview
