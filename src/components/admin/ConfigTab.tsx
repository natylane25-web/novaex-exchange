import { useState, useEffect } from 'react';
import { Save, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { AdminConfig } from '../../types';

export default function ConfigTab() {
  const [config, setConfig] = useState<AdminConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const { data } = await supabase
        .from('admin_config')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (!data) {
        const { data: newConfig } = await supabase
          .from('admin_config')
          .insert({
            network_fee_percentage: 1.5,
            network_fee_fixed: 0.5,
            bnb_wallet_address: '',
            usdt_bep20_wallet_address: '',
            usdt_trc20_wallet_address: '',
            trx_wallet_address: ''
          })
          .select()
          .single();
        setConfig(newConfig);
      } else {
        setConfig(data);
      }
    } catch (error) {
      console.error('Error fetching config:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!config) return;

    setSaving(true);
    try {
      await supabase
        .from('admin_config')
        .update({
          network_fee_percentage: config.network_fee_percentage,
          network_fee_fixed: config.network_fee_fixed,
          bnb_wallet_address: config.bnb_wallet_address,
          usdt_bep20_wallet_address: config.usdt_bep20_wallet_address,
          usdt_trc20_wallet_address: config.usdt_trc20_wallet_address,
          trx_wallet_address: config.trx_wallet_address
        })
        .eq('id', config.id);

      setMessage('Configuration saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving config:', error);
      setMessage('Error saving configuration');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!config) return <div>Error loading configuration</div>;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <h2 className="text-lg font-bold text-slate-900 mb-6">Network Fees</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Fixed Fee (USD)</label>
            <input
              type="number"
              step="0.01"
              value={config.network_fee_fixed}
              onChange={(e) =>
                setConfig({ ...config, network_fee_fixed: parseFloat(e.target.value) })
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-slate-500 mt-1">Network fee charged per transaction</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Percentage Fee (%)</label>
            <input
              type="number"
              step="0.01"
              value={config.network_fee_percentage}
              onChange={(e) =>
                setConfig({ ...config, network_fee_percentage: parseFloat(e.target.value) })
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-slate-500 mt-1">Percentage of transaction amount</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <h2 className="text-lg font-bold text-slate-900 mb-6">Wallet Addresses</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">BNB Wallet Address</label>
            <input
              type="text"
              value={config.bnb_wallet_address}
              onChange={(e) =>
                setConfig({ ...config, bnb_wallet_address: e.target.value })
              }
              placeholder="0x..."
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">USDT BEP-20 Wallet Address</label>
            <input
              type="text"
              value={config.usdt_bep20_wallet_address}
              onChange={(e) =>
                setConfig({ ...config, usdt_bep20_wallet_address: e.target.value })
              }
              placeholder="0x..."
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">USDT TRC-20 Wallet Address</label>
            <input
              type="text"
              value={config.usdt_trc20_wallet_address}
              onChange={(e) =>
                setConfig({ ...config, usdt_trc20_wallet_address: e.target.value })
              }
              placeholder="T..."
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">TRX Wallet Address</label>
            <input
              type="text"
              value={config.trx_wallet_address}
              onChange={(e) =>
                setConfig({ ...config, trx_wallet_address: e.target.value })
              }
              placeholder="T..."
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            />
          </div>
        </div>
      </div>

      {message && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-700">{message}</p>
        </div>
      )}

      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
      >
        {saving ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save className="w-4 h-4" />
            Save Configuration
          </>
        )}
      </button>
    </div>
  );
}