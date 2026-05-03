import { CheckCircle, Home } from 'lucide-react';

interface Props {
  token: string;
  amount: number;
  usdValue: number;
}

export default function SuccessMessage({ token, amount, usdValue }: Props) {
  const handleRestart = () => {
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <div className="relative">
          <CheckCircle className="w-20 h-20 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Exchange Successful</h2>
        <p className="text-slate-600 text-center">Your NEX tokens have been successfully exchanged</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="border-b border-slate-200 pb-4">
          <p className="text-xs text-slate-500 mb-1">Received Token</p>
          <p className="text-2xl font-bold text-slate-900">{token}</p>
        </div>

        <div className="border-b border-slate-200 pb-4">
          <p className="text-xs text-slate-500 mb-1">Original Amount</p>
          <p className="font-semibold text-slate-900">{amount.toLocaleString()} NEX</p>
          <p className="text-sm text-slate-600">${usdValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-700 font-medium">
            Your {token} tokens will arrive in your wallet shortly. Transaction is now being processed on the blockchain.
          </p>
        </div>
      </div>

      <button
        onClick={handleRestart}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2 active:scale-95"
      >
        <Home className="w-4 h-4" />
        Start New Exchange
      </button>
    </div>
  );
}