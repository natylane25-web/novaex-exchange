import { ChevronLeft } from 'lucide-react';

interface Props {
  token: 'USDT' | 'BNB' | 'ETH' | 'TRX';
  onSelect: (amount: number) => void;
  onBack: () => void;
}

const amounts = [10000, 20000, 50000];
const NEX_PRICE = 0.1;

export default function AmountSelector({ token, onSelect, onBack }: Props) {
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
          <h2 className="text-2xl font-bold text-slate-900">Select Amount</h2>
          <p className="text-sm text-slate-600">Choose how much NEX to exchange</p>
        </div>
      </div>

      <div className="space-y-3">
        {amounts.map((amount) => (
          <button
            key={amount}
            onClick={() => onSelect(amount)}
            className="w-full bg-white border border-slate-200 rounded-xl p-4 hover:border-blue-400 hover:bg-blue-50 transition-all active:scale-95 text-left"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-slate-900">{amount.toLocaleString()} NEX</span>
              <ChevronLeft className="w-5 h-5 text-slate-300 rotate-180" />
            </div>
            <span className="text-sm text-slate-500">
              ${(amount * NEX_PRICE).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </button>
        ))}
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
        <p className="text-xs text-slate-600 mb-2">
          <span className="font-semibold text-slate-900">Exchange Rate:</span> 1 NEX = ${NEX_PRICE}
        </p>
        <p className="text-xs text-slate-500">You'll receive {token} tokens</p>
      </div>
    </div>
  );
}