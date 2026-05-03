import { useState, useEffect } from 'react';
import { Send, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface BroadcastRecord {
  id: string;
  message_text: string;
  recipients_count: number;
  failed_count: number;
  sent_at: string;
}

export default function BroadcastTab() {
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [broadcasts, setBroadcasts] = useState<BroadcastRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [userCount, setUserCount] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    fetchBroadcasts();
    fetchUserCount();
  }, []);

  const fetchUserCount = async () => {
    try {
      const { count } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true });
      setUserCount(count || 0);
    } catch (error) {
      console.error('Error fetching user count:', error);
    }
  };

  const fetchBroadcasts = async () => {
    try {
      const { data } = await supabase
        .from('broadcast_messages')
        .select('*')
        .order('sent_at', { ascending: false })
        .limit(10);

      setBroadcasts(data || []);
    } catch (error) {
      console.error('Error fetching broadcasts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!message.trim()) {
      setStatusMessage('Message cannot be empty');
      return;
    }

    if (userCount === 0) {
      setStatusMessage('No users to send message to');
      return;
    }

    setSending(true);
    try {
      const { data } = await supabase
        .from('broadcast_messages')
        .insert({
          message_text: message,
          recipients_count: userCount,
          failed_count: 0
        })
        .select()
        .single();

      if (data) {
        setMessage('');
        setStatusMessage('Broadcast sent successfully!');
        setTimeout(() => setStatusMessage(''), 3000);
        fetchBroadcasts();
      }
    } catch (error) {
      console.error('Error sending broadcast:', error);
      setStatusMessage('Error sending broadcast');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-sm font-semibold text-slate-700 mb-2">Active Users</h3>
          <p className="text-3xl font-bold text-blue-600">{userCount}</p>
          <p className="text-xs text-slate-500 mt-1">Users who interacted with bot</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-sm font-semibold text-slate-700 mb-2">Broadcasts Sent</h3>
          <p className="text-3xl font-bold text-slate-900">{broadcasts.length}</p>
          <p className="text-xs text-slate-500 mt-1">Total broadcast messages</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Send Broadcast Message</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Message Text</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message to broadcast to all users..."
              rows={5}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <p className="text-xs text-slate-500 mt-2">
              Character count: {message.length} / 4096
            </p>
          </div>

          {message && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div className="text-sm text-blue-700">
                  <p className="font-semibold mb-1">Message Preview</p>
                  <p className="whitespace-pre-wrap">{message}</p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <p className="text-sm text-slate-700">
              <span className="font-semibold">Recipients:</span> {userCount} users
            </p>
            <p className="text-xs text-slate-500 mt-1">This message will be sent to all active users</p>
          </div>

          {statusMessage && (
            <div className={`p-3 rounded-lg text-sm ${
              statusMessage.includes('Error') || statusMessage.includes('cannot')
                ? 'bg-red-50 text-red-700 border border-red-200'
                : 'bg-green-50 text-green-700 border border-green-200'
            }`}>
              {statusMessage}
            </div>
          )}

          <button
            onClick={handleSend}
            disabled={sending || !message.trim()}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
          >
            {sending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send to All Users
              </>
            )}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h3 className="font-bold text-slate-900">Broadcast History</h3>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : broadcasts.length === 0 ? (
          <div className="text-center py-12 text-slate-500">No broadcasts sent yet</div>
        ) : (
          <div className="divide-y divide-slate-200">
            {broadcasts.map((broadcast) => (
              <div key={broadcast.id} className="p-4 hover:bg-slate-50">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-medium text-slate-900 line-clamp-2">{broadcast.message_text}</p>
                  <span className="text-xs text-slate-500 whitespace-nowrap ml-2">
                    {new Date(broadcast.sent_at).toLocaleString()}
                  </span>
                </div>
                <div className="flex gap-4 text-xs text-slate-600">
                  <span>Sent: {broadcast.recipients_count}</span>
                  {broadcast.failed_count > 0 && <span className="text-red-600">Failed: {broadcast.failed_count}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}