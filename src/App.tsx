import { useEffect, useState } from 'react';
import ExchangeApp from './components/ExchangeApp';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [view, setView] = useState<'exchange' | 'admin'>('exchange');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const adminMode = urlParams.get('admin') === 'true';
    if (adminMode) {
      setView('admin');
    }
  }, []);

  return (
    <>
      {view === 'exchange' && <ExchangeApp />}
      {view === 'admin' && <AdminDashboard />}
    </>
  );
}

export default App;
