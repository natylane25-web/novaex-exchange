import { ChevronLeft } from 'lucide-react';

interface Props {
  onSelect: (token: 'USDT' | 'BNB' | 'ETH' | 'TRX') => void;
  referralCode: string;
}

const tokens = [
  { name: 'USDT', price: 0.9999, color: 'from-teal-500 to-teal-600' },
  { name: 'BNB', price: 617.46, color: 'from-yellow-500 to-yellow-600' },
  { name: 'ETH', price: 2310.915, color: 'from-slate-600 to-slate-700' },
  { name: 'TRX', price: 0.3306, color: 'from-red-500 to-red-600' }
];

export default function TokenSelector({ onSelect, referralCode }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Select Token</h2>
        <p className="text-sm text-slate-600">Choose which token to exchange your NEX for</p>
      </div>

      <div className="space-y-3">
        {tokens.map((token) => (
          <button
            key={token.name}
            onClick={() => onSelect(token.name as 'USDT' | 'BNB' | 'ETH' | 'TRX')}
            className="w-full bg-white border border-slate-200 rounded-xl p-4 hover:border-blue-400 hover:bg-blue-50 transition-all active:scale-95 text-left"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${token.color}`}></div>
                <div>
                  <p className="font-semibold text-slate-900">{token.name}</p>
                  <p className="text-xs text-slate-500">${token.price.toLocaleString()}</p>
                </div>
              </div>
              <ChevronLeft className="w-5 h-5 text-slate-300 rotate-180" />
            </div>
          </button>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-xs text-blue-700">
          <span className="font-semibold">Referral Code:</span> {referralCode}
        </p>
      </div>
    </div>
  );
}