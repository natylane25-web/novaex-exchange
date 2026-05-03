import { useState } from 'react';
import { AlertCircle, ChevronRight } from 'lucide-react';

interface Props {
  onSubmit: (code: string) => void;
}

export default function ReferralCodeForm({ onSubmit }: Props) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!code.trim()) {
      setError('Please enter your referral code');
      return;
    }
    if (code.length < 3) {
      setError('Referral code must be at least 3 characters');
      return;
    }
    onSubmit(code);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Exchange NEX</h2>
        <p className="text-sm text-slate-600">Start your token exchange process</p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <label className="block mb-4">
          <div className="flex items-start gap-2 mb-3">
            <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <span className="text-sm font-semibold text-slate-900">
              Enter Your Novaex AI Wallet Referral Code
            </span>
          </div>
          <p className="text-xs text-slate-500 ml-7 mb-3">
            Ensure your referral code is correct. NEX may not be exchanged if the code is invalid.
          </p>
          <input
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setError('');
            }}
            placeholder="Enter your referral code"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 placeholder-slate-400"
          />
        </label>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2 active:scale-95"
        >
          Continue
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}