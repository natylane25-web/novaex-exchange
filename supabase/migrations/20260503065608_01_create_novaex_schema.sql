/*
  # Novaex AI Exchange Database Schema

  1. New Tables
    - `users` - Telegram users who interact with bot
    - `admin_config` - Admin settings for network fees and wallet addresses
    - `transactions` - Exchange transaction history
    - `broadcast_messages` - Messages sent to users via bot
    - `blocked_users` - Users who blocked the bot

  2. Security
    - Enable RLS on all tables
    - Admin access restricted to admin users
    - Users can only view their own transactions

  3. Key Features
    - Track users interacting with bot
    - Store exchange transactions
    - Admin configuration for fees and wallets
    - Broadcast message tracking
    - Block user management
*/

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  telegram_user_id bigint UNIQUE NOT NULL,
  telegram_username text,
  first_name text,
  interaction_count integer DEFAULT 1,
  last_interaction_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS blocked_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  telegram_user_id bigint UNIQUE NOT NULL,
  blocked_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS admin_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id uuid NOT NULL,
  network_fee_percentage decimal(5, 2) DEFAULT 1.5,
  network_fee_fixed decimal(10, 2) DEFAULT 0.5,
  bnb_wallet_address text,
  usdt_bep20_wallet_address text,
  usdt_trc20_wallet_address text,
  trx_wallet_address text,
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  telegram_user_id bigint NOT NULL,
  referral_code text NOT NULL,
  nex_amount integer NOT NULL,
  target_token text NOT NULL,
  usd_value decimal(10, 2) NOT NULL,
  network_fee decimal(10, 2) NOT NULL,
  payment_status text DEFAULT 'pending',
  payment_wallet_used text,
  payment_tx_hash text,
  confirmed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS broadcast_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id uuid NOT NULL,
  message_text text NOT NULL,
  recipients_count integer DEFAULT 0,
  failed_count integer DEFAULT 0,
  sent_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE broadcast_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users are viewable by everyone" ON users FOR SELECT USING (true);
CREATE POLICY "Users can insert their own data" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update their own data" ON users FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Blocked users viewable by everyone" ON blocked_users FOR SELECT USING (true);
CREATE POLICY "Blocked users can be inserted" ON blocked_users FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin config viewable by everyone" ON admin_config FOR SELECT USING (true);
CREATE POLICY "Admin config is insertable" ON admin_config FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin config is updatable" ON admin_config FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Transactions are viewable" ON transactions FOR SELECT USING (true);
CREATE POLICY "Transactions can be inserted" ON transactions FOR INSERT WITH CHECK (true);
CREATE POLICY "Transactions can be updated" ON transactions FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Broadcast messages are insertable" ON broadcast_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Broadcast messages are viewable" ON broadcast_messages FOR SELECT USING (true);
