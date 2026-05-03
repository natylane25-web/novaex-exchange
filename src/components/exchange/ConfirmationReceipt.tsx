import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  referralCode: string;
  amount: number;
  token: 'USDT' | 'BNB' | 'ETH' | 'TRX';
  usdValue: number;
  networkFee: number;
  onConfirm: () => void;
  onBack: () => void;
}

export default function ConfirmationReceipt({
  referralCode,
  amount,
  token,
  usdValue,
  networkFee,
  onConfirm,
  onBack
}: Props) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors active:scale-95"
        >
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Review Order</h2>
          <p className="text-sm text-slate-600">Confirm your exchange details</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="border-b border-slate-200 pb-4">
          <p className="text-xs text-slate-500 mb-1">Referral Code</p>
          <p className="font-semibold text-slate-900 break-all">{referralCode}</p>
        </div>

        <div className="border-b border-slate-200 pb-4">
          <p className="text-xs text-slate-500 mb-1">Amount to Exchange</p>
          <p className="font-semibold text-slate-900">{amount.toLocaleString()} NEX</p>
          <p className="text-sm text-slate-600">${usdValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </div>

        <div className="border-b border-slate-200 pb-4">
          <p className="text-xs text-slate-500 mb-1">Receiving Token</p>
          <p className="font-semibold text-slate-900">{token}</p>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
          <p className="text-xs text-orange-700">
            <span className="font-semibold">Network Fee:</span> ${networkFee.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      <button
        onClick={onConfirm}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2 active:scale-95"
      >
        Proceed to Payment
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}