import { useState, useEffect } from 'react';
import { Loader2, CheckCircle } from 'lucide-react';

interface Props {
  onComplete: () => void;
  token: string;
}

export default function PaymentVerification({ onComplete, token }: Props) {
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setConfirmed(true);
      setTimeout(onComplete, 1500);
    }, 10000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (confirmed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <CheckCircle className="w-16 h-16 text-green-500" />
        <h2 className="text-2xl font-bold text-slate-900">Payment Confirmed</h2>
        <p className="text-slate-600">Your NEX tokens are being exchanged to {token}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Verifying Payment</h2>
        <p className="text-sm text-slate-600">Scanning blockchain for your transaction</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-12 shadow-sm flex flex-col items-center justify-center min-h-64">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
        <p className="text-center text-slate-600 font-medium">Processing your payment...</p>
        <p className="text-center text-sm text-slate-500 mt-2">This may take a few moments</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-xs text-blue-700">
          Do not close this window. We're verifying your transaction on the blockchain.
        </p>
      </div>
    </div>
  );
}