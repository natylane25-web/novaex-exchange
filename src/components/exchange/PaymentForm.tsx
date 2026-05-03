import { useState } from 'react';
import { ChevronLeft, Copy, Check } from 'lucide-react';

interface Props {
  token: 'USDT' | 'BNB' | 'ETH' | 'TRX';
  networkFee: number;
  walletAddresses: {
    BNB: string;
    USDT_BEP20: string;
    USDT_TRC20: string;
    TRX: string;
  };
  onSubmit: () => void;
  onBack: () => void;
}

export default function PaymentForm({ token, networkFee, walletAddresses, onSubmit, onBack }: Props) {
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [feeAmount, setFeeAmount] = useState(networkFee);
  const [copied, setCopied] = useState(false);

  const networks: { value: string; label: string; key: keyof typeof walletAddresses }[] = [];

  if (token === 'BNB') {
    networks.push({ value: 'BNB', label: 'BNB (BEP-20)', key: 'BNB' });
  } else if (token === 'USDT') {
    networks.push(
      { value: 'BEP20', label: 'USDT BEP-20 (BSC)', key: 'USDT_BEP20' },
      { value: 'TRC20', label: 'USDT TRC-20 (Tron)', key: 'USDT_TRC20' }
    );
  } else if (token === 'ETH') {
    networks.push({ value: 'ETH', label: 'Ethereum (ERC-20)', key: 'USDT_BEP20' });
  } else if (token === 'TRX') {
    networks.push({ value: 'TRX', label: 'Tron (TRC-20)', key: 'TRX' });
  }

  const handleNetworkSelect = (value: string) => {
    setSelectedNetwork(value);
    const key = networks.find(n => n.value === value)?.key;
    if (key) {
      setWalletAddress(walletAddresses[key] || '');
    }
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = () => {
    if (!selectedNetwork || !walletAddress || !feeAmount) {
      alert('Please complete all fields');
      return;
    }
    onSubmit();
  };

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
          <h2 className="text-2xl font-bold text-slate-900">Payment Details</h2>
          <p className="text-sm text-slate-600">Send network fee to proceed</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-3">
            Select Payment Network
          </label>
          <div className="space-y-2">
            {networks.map((network) => (
              <button
                key={network.value}
                onClick={() => handleNetworkSelect(network.value)}
                className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                  selectedNetwork === network.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                }`}
              >
                <p className="font-medium text-slate-900">{network.label}</p>
              </button>
            ))}
          </div>
        </div>

        {selectedNetwork && (
          <>
            <div className="border-t border-slate-200 pt-4">
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Network Fee Amount
              </label>
              <input
                type="number"
                value={feeAmount}
                onChange={(e) => setFeeAmount(parseFloat(e.target.value))}
                step="0.01"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-slate-500 mt-1">
                Default: ${networkFee.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>

            <div className="border-t border-slate-200 pt-4">
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Wallet Address
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-mono break-all"
                />
                <button
                  onClick={handleCopyAddress}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors active:scale-95"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-green-600" />
                  ) : (
                    <Copy className="w-5 h-5 text-slate-600" />
                  )}
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Copy this address and send the network fee to proceed
              </p>
            </div>
          </>
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!selectedNetwork || !walletAddress || !feeAmount}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold py-3 rounded-lg transition-all active:scale-95"
      >
        Verify Payment
      </button>
    </div>
  );
}