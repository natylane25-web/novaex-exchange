export interface ExchangeTransaction {
  id: string;
  telegram_user_id: number;
  referral_code: string;
  nex_amount: number;
  target_token: 'USDT' | 'BNB' | 'ETH' | 'TRX';
  usd_value: number;
  network_fee: number;
  payment_status: 'pending' | 'confirmed' | 'failed';
  payment_wallet_used: string;
  payment_tx_hash: string | null;
  confirmed_at: string | null;
  created_at: string;
}

export interface AdminConfig {
  id: string;
  network_fee_percentage: number;
  network_fee_fixed: number;
  bnb_wallet_address: string;
  usdt_bep20_wallet_address: string;
  usdt_trc20_wallet_address: string;
  trx_wallet_address: string;
}

export interface User {
  id: string;
  telegram_user_id: number;
  telegram_username: string;
  first_name: string;
  interaction_count: number;
  last_interaction_at: string;
  created_at: string;
}

export interface TelegramUser {
  id: number;
  is_bot: boolean;
  first_name: string;
  username?: string;
}
