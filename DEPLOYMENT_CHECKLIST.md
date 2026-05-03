# Deployment Checklist - Novaex AI Exchange

## Pre-Deployment

### GitHub Setup
- [ ] Code pushed to GitHub repository
- [ ] Repository is public (if desired)
- [ ] .gitignore configured properly

### Supabase Setup
- [ ] Project created
- [ ] Database schema applied
- [ ] Credentials copied

### Telegram Setup
- [ ] Bot created with @BotFather
- [ ] Bot token saved
- [ ] Bot username saved

## Deployment Day

### Vercel Setup
- [ ] GitHub repository imported
- [ ] Environment variables added:
  - [ ] VITE_SUPABASE_URL
  - [ ] VITE_SUPABASE_ANON_KEY
  - [ ] VITE_TELEGRAM_BOT_TOKEN
  - [ ] VITE_TELEGRAM_BOT_USERNAME
  - [ ] VITE_APP_URL
- [ ] Deployment successful

### Telegram Webhook
- [ ] Webhook URL set
- [ ] Webhook verified
- [ ] /start command tested

### Admin Configuration
- [ ] Network fees set
- [ ] Wallet addresses configured
- [ ] Settings saved

## Testing

### Exchange Flow
- [ ] Referral code entry
- [ ] Token selection
- [ ] Amount selection
- [ ] Confirmation
- [ ] Payment form
- [ ] Verification
- [ ] Success message

### Admin Dashboard
- [ ] Users tab shows data
- [ ] Transactions tab shows data
- [ ] Broadcast sends successfully
- [ ] Configuration saves

### Telegram Bot
- [ ] /start command works
- [ ] Exchange button opens mini-app
- [ ] Airdrop button shows message
- [ ] Help button links to YouTube

## Post-Launch

- [ ] Monitor Vercel dashboard
- [ ] Monitor Supabase logs
- [ ] Check bot webhook status
- [ ] Have team available for issues
