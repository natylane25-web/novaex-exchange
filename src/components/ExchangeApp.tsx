import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { AdminConfig } from '../types';
import ReferralCodeForm from './exchange/ReferralCodeForm';
import TokenSelector from './exchange/TokenSelector';
import AmountSelector from './exchange/AmountSelector';
import ConfirmationReceipt from './exchange/ConfirmationReceipt';
import PaymentForm from './exchange/PaymentForm';
import PaymentVerification from './exchange/PaymentVerification';
import SuccessMessage from './exchange/SuccessMessage';

type ExchangeStep = 'referral' | 'token' | 'amount' | 'confirmation' | 'payment' | 'verification' | 'success';

export default function ExchangeApp() {
  const [step, setStep] = useState<ExchangeStep>('referral');
  const [referralCode, setReferralCode] = useState('');
  const [selectedToken, setSelectedToken] = useState<'USDT' | 'BNB' | 'ETH' | 'TRX' | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [adminConfig, setAdminConfig] = useState<AdminConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminConfig();
  }, []);

  const fetchAdminConfig = async () => {
    try {
      const { data } = await supabase
        .from('admin_config')
        .select('*')
        .limit(1)
        .maybeSingle();

      setAdminConfig(data);
    } catch (error) {
      console.error('Error fetching admin config:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReferralSubmit = (code: string) => {
    setReferralCode(code);
    setStep('token');
  };

  const handleTokenSelect = (token: 'USDT' | 'BNB' | 'ETH' | 'TRX') => {
    setSelectedToken(token);
    setStep('amount');
  };

  const handleAmountSelect = async (amount: number) => {
    setSelectedAmount(amount);

    const { data: transaction } = await supabase
      .from('transactions')
      .insert({
        referral_code: referralCode,
        nex_amount: amount,
        target_token: selectedToken,
        usd_value: amount * 0.1,
        network_fee: adminConfig?.network_fee_fixed || 0.5,
        payment_status: 'pending'
      })
      .select()
      .single();

    if (!transaction) {
      console.error('Failed to create transaction');
    }

    setStep('confirmation');
  };

  const handleConfirmPayment = () => {
    setStep('payment');
  };

  const handlePaymentSubmit = () => {
    setStep('verification');
  };

  const handleVerificationComplete = () => {
    setStep('success');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 pb-6">
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <img src="/IMG_20260503_020142_857.jpg" alt="Novaex AI" className="w-8 h-8 rounded-full" />
            <h1 className="text-xl font-bold text-slate-900">Novaex AI</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        {step === 'referral' && <ReferralCodeForm onSubmit={handleReferralSubmit} />}
        {step === 'token' && <TokenSelector onSelect={handleTokenSelect} referralCode={referralCode} />}
        {step === 'amount' && selectedToken && (
          <AmountSelector
            token={selectedToken}
            onSelect={handleAmountSelect}
            onBack={() => setStep('token')}
          />
        )}
        {step === 'confirmation' && selectedToken && selectedAmount && (
          <ConfirmationReceipt
            referralCode={referralCode}
            amount={selectedAmount}
            token={selectedToken}
            usdValue={selectedAmount * 0.1}
            networkFee={adminConfig?.network_fee_fixed || 0.5}
            onConfirm={handleConfirmPayment}
            onBack={() => setStep('amount')}
          />
        )}
        {step === 'payment' && selectedToken && (
          <PaymentForm
            token={selectedToken}
            networkFee={adminConfig?.network_fee_fixed || 0.5}
            walletAddresses={{
              BNB: adminConfig?.bnb_wallet_address || '',
              USDT_BEP20: adminConfig?.usdt_bep20_wallet_address || '',
              USDT_TRC20: adminConfig?.usdt_trc20_wallet_address || '',
              TRX: adminConfig?.trx_wallet_address || ''
            }}
            onSubmit={handlePaymentSubmit}
            onBack={() => setStep('confirmation')}
          />
        )}
        {step === 'verification' && (
          <PaymentVerification
            onComplete={handleVerificationComplete}
            token={selectedToken!}
          />
        )}
        {step === 'success' && selectedToken && selectedAmount && (
          <SuccessMessage
            token={selectedToken}
            amount={selectedAmount}
            usdValue={selectedAmount * 0.1}
          />
        )}
      </div>
    </div>
  );
}
