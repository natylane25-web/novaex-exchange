# Troubleshooting Guide

## Common Issues

### Bot Not Responding to /start

**Solution**:
1. Check webhook status: `curl https://api.telegram.org/bot{TOKEN}/getWebhookInfo`
2. Verify bot token in environment variables
3. Check Supabase Edge Function logs

### Mini-App Won't Load

**Solution**:
1. Verify `VITE_APP_URL` is correct
2. Check Supabase credentials
3. Open browser console for errors

### Admin Dashboard Shows No Data

**Solution**:
1. Ensure URL has `?admin=true`
2. Check database RLS policies
3. Make sure users have used `/start` command

### Broadcast Messages Not Sending

**Solution**:
1. Check bot token is valid
2. Verify users exist in database
3. Check for blocked users

## Quick Debugging Checklist

- [ ] Refresh the page
- [ ] Clear browser cache (Ctrl+Shift+Delete)
- [ ] Hard refresh (Ctrl+F5)
- [ ] Check URL is correct
- [ ] Test on different browser
- [ ] Check internet connection

## Check Logs

- Browser console (F12)
- Supabase dashboard
- Vercel deployment logs

## Test Locally

```bash
npm run dev
# Visit http://localhost:5173 for exchange
# Visit http://localhost:5173?admin=true for admin
```

## Get Help

1. Read SETUP_GUIDE.md for detailed steps
2. Check browser console for errors
3. Verify all environment variables are set
4. Test locally first
