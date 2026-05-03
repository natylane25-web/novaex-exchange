# Novaex AI Exchange - Complete Setup Guide

## Overview

This guide will walk you through setting up the Novaex AI Exchange platform with Telegram bot integration and admin dashboard.

## Prerequisites

1. **GitHub Account** - For version control
2. **Vercel Account** - For hosting (free tier available)
3. **Supabase Account** - For database (free tier available)
4. **Telegram Account** - For bot creation
5. **Node.js 18+** - For local development

## Step 1: Create a Telegram Bot

### 1.1 Create Your Bot

1. Open Telegram and search for **@BotFather**
2. Send `/newbot` command
3. Follow the prompts:
   - Bot name: `Novaex AI Exchange`
   - Bot username: `novaex_exchange_bot`
4. Save the **Bot Token**

### 1.2 Set Bot Commands

Send `/setcommands` to @BotFather and enter:
```
start - Start the exchange
help - Get help
```

## Step 2: Set Up Supabase

### 2.1 Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign in or create an account
3. Click "New Project"
4. Fill in details and wait for initialization

### 2.2 Get Your Credentials

1. Go to **Project Settings** → **API**
2. Copy:
   - Project URL (VITE_SUPABASE_URL)
   - anon public key (VITE_SUPABASE_ANON_KEY)

## Step 3: Deploy to Vercel

### 3.1 Connect Vercel to GitHub

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select the GitHub repository
4. Click "Import"

### 3.2 Configure Environment Variables

In Vercel project settings, add:

```
VITE_SUPABASE_URL = https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY = your_key_here
VITE_TELEGRAM_BOT_TOKEN = your_bot_token
VITE_TELEGRAM_BOT_USERNAME = @your_bot_name
VITE_APP_URL = https://your-vercel-domain.vercel.app
```

### 3.3 Deploy

Click "Deploy" and wait for completion.

## Step 4: Configure Telegram Webhook

### 4.1 Set Webhook

Run in terminal (replace with your values):

```bash
curl -X POST \
  https://api.telegram.org/bot{BOT_TOKEN}/setWebhook \
  -H 'Content-Type: application/json' \
  -d '{
    "url": "https://[project].supabase.co/functions/v1/telegram-bot",
    "allowed_updates": ["message", "callback_query"]
  }'
```

### 4.2 Verify Webhook

```bash
curl https://api.telegram.org/bot{BOT_TOKEN}/getWebhookInfo
```

## Step 5: Configure Admin Settings

### 5.1 Access Admin Dashboard

1. Visit: `https://your-domain.vercel.app?admin=true`
2. Go to **Configuration** tab
3. Set:
   - Network fees
   - Wallet addresses
4. Click "Save Configuration"

## Step 6: Test Everything

### 6.1 Test Telegram Bot

1. Open Telegram and find your bot
2. Send `/start`
3. Verify you see welcome message and 3 buttons

### 6.2 Test Exchange Flow

1. Click exchange button
2. Follow the 7-step flow
3. Verify all information displays correctly

### 6.3 Test Admin Dashboard

1. Visit admin panel
2. Check Users tab
3. Check Broadcast tab
4. Check Transactions tab

## Production Checklist

- [ ] All accounts created
- [ ] Repository on GitHub
- [ ] Deployed to Vercel
- [ ] Environment variables set
- [ ] Webhook configured
- [ ] Admin settings saved
- [ ] Bot tested and responding
- [ ] Exchange flow tested
- [ ] Admin dashboard checked
- [ ] Mobile view tested

## Support

If something breaks, see TROUBLESHOOTING.md for solutions.
