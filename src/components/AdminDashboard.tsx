import { useState } from 'react';

type Tab = 'config' | 'users' | 'broadcast' | 'transactions';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('config');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <img src="/IMG_20260503_020142_857.jpg" alt="Novaex AI" className="w-8 h-8 rounded-full" />
            <h1 className="text-2xl font-bold text-slate-900">Admin Panel</h1>
            <span className="ml-auto text-sm text-slate-500">Novaex AI Exchange</span>
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-slate-200 sticky top-16 z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-8 overflow-x-auto">
            {[
              { id: 'config', label: 'Configuration' },
              { id: 'users', label: 'Users' },
              { id: 'broadcast', label: 'Broadcast' },
              { id: 'transactions', label: 'Transactions' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`px-4 py-4 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="text-center text-slate-600 py-12">
          <p>Admin dashboard components loading...</p>
        </div>
      </div>
    </div>
  );
}