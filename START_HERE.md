# START HERE - Novaex AI Exchange Setup

Welcome! This guide will get you from zero to a fully deployed cryptocurrency exchange platform in simple steps.

## What You're Getting

A complete, production-ready system with:
- ✅ Modern token exchange web app (7-step flow)
- ✅ Admin dashboard with full controls
- ✅ Telegram bot integration
- ✅ Database with user tracking
- ✅ Transaction history
- ✅ Broadcast messaging

## Quick Overview (3 Minutes)

### The Flow

1. **User** clicks bot button → Opens exchange web app
2. **Exchange app** guides user through token exchange
3. **Admin** manages fees, wallets, and users from dashboard
4. **Bot** sends messages to users

### Technologies Used
- React (web app)
- Supabase (database)
- Vercel (hosting)
- Telegram (bot)
- TypeScript (code)

## Step-by-Step Setup (30 Minutes)

### Part 1: Create Accounts (5 minutes)

1. **GitHub** - [github.com/signup](https://github.com/signup)
2. **Supabase** - [supabase.com](https://supabase.com) → Sign up
3. **Vercel** - [vercel.com](https://vercel.com) → Sign in with GitHub
4. **Telegram** - Ensure you have account and bot token

### Part 2: Get Your Credentials (10 minutes)

**From Supabase**:
1. Create new project → `novaex-exchange`
2. Settings → API → Copy:
   - Project URL
   - anon public key

**From Telegram** (@BotFather):
1. `/newbot` → Create new bot
2. Save the bot token
3. Save bot username

### Part 3: Deploy on Vercel (5 minutes)

1. Go to vercel.com
2. Import GitHub repository
3. Add environment variables
4. Deploy

## Next Steps After Deployment

### 1. Set Telegram Webhook (1 minute)
```bash
curl -X POST \
  https://api.telegram.org/bot{YOUR_TOKEN}/setWebhook \
  -H 'Content-Type: application/json' \
  -d '{"url": "https://[project].supabase.co/functions/v1/telegram-bot"}'
```

### 2. Configure Admin (2 minutes)
- Visit: `https://your-domain.vercel.app?admin=true`
- Set network fees
- Add wallet addresses
- Save

### 3. Test Everything (5 minutes)
- Open bot → Click /start
- Click exchange button
- Complete full test flow
- Check admin dashboard

## Support Resources

For detailed instructions:
- **SETUP_GUIDE.md** - Complete step-by-step setup
- **QUICK_REFERENCE.md** - Quick lookup guide
- **TROUBLESHOOTING.md** - Problem solving
- **README.md** - Project overview

**Start with: SETUP_GUIDE.md**
