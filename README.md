# Novaex AI Exchange

A modern, AI-powered cryptocurrency token exchange platform with Telegram bot integration and comprehensive admin dashboard.

## Features

- **Token Exchange**: Seamlessly exchange NEX tokens for USDT, BNB, ETH, or TRX
- **Telegram Integration**: Mini-app integration with inline buttons and callback support
- **Admin Dashboard**: Full-featured admin panel for configuration, user management, broadcasts, and analytics
- **Beautiful UI**: Modern, responsive design optimized for mobile
- **Secure**: Row-level security with Supabase
- **Blockchain Integration**: Multi-chain support with payment verification

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Database**: Supabase (PostgreSQL)
- **Backend**: Supabase Edge Functions
- **Hosting**: Vercel
- **Bot**: Telegram Bot API

## Quick Start

### Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Create `.env.local` with your credentials
4. Run dev server: `npm run dev`
5. Access at `http://localhost:5173`

### Deployment

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for complete setup instructions.

## Project Structure

```
src/
├── components/           # React components
│   ├── ExchangeApp.tsx           # Main exchange component
│   ├── AdminDashboard.tsx        # Admin panel
│   ├── exchange/                 # Exchange flow components
│   └── admin/                    # Admin tab components
├── lib/                  # Utility functions
├── types/                # TypeScript type definitions
└── App.tsx               # Main app component

supabase/
└── functions/            # Edge Functions
    └── telegram-bot/     # Telegram bot handler
```

## Environment Variables

```
VITE_SUPABASE_URL              # Supabase project URL
VITE_SUPABASE_ANON_KEY         # Supabase anonymous key
VITE_TELEGRAM_BOT_TOKEN        # Telegram bot token
VITE_TELEGRAM_BOT_USERNAME     # Telegram bot username
VITE_APP_URL                   # App deployment URL
```

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript type checking
```

## License

MIT
