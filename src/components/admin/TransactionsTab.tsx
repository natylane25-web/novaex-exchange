import { useState, useEffect } from 'react';
import { Loader2, Search } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { ExchangeTransaction } from '../../types';

export default function TransactionsTab() {
  const [transactions, setTransactions] = useState<ExchangeTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'confirmed' | 'failed'>('all');

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const { data } = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false });

      setTransactions(data || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.referral_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.telegram_user_id.toString().includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || tx.payment_status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: transactions.length,
    pending: transactions.filter((tx) => tx.payment_status === 'pending').length,
    confirmed: transactions.filter((tx) => tx.payment_status === 'confirmed').length,
    totalValue: transactions.reduce((sum, tx) => sum + tx.usd_value, 0)
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
          <p className="text-sm text-slate-600">Total Transactions</p>
          <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
          <p className="text-sm text-slate-600">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
          <p className="text-sm text-slate-600">Confirmed</p>
          <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
          <p className="text-sm text-slate-600">Total Value</p>
          <p className="text-2xl font-bold text-blue-600">${stats.totalValue.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by referral code or user ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Referral Code</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Token</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="border-b border-slate-200 hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-mono text-sm text-slate-900 break-all">{tx.referral_code}</p>
                      <p className="text-xs text-slate-500">ID: {tx.telegram_user_id}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-slate-900">{tx.nex_amount.toLocaleString()} NEX</p>
                      <p className="text-sm text-slate-600">${tx.usd_value.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{tx.target_token}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        tx.payment_status === 'confirmed'
                          ? 'bg-green-100 text-green-700'
                          : tx.payment_status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {tx.payment_status.charAt(0).toUpperCase() + tx.payment_status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {new Date(tx.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600">No transactions found</p>
          </div>
        )}
      </div>
    </div>
  );
}