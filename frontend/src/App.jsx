import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useParams } from 'react-router-dom';

// ==========================================
// LOGIN PAGE COMPONENT WITH VALIDATION
// ==========================================
function LoginPage({ onLogin, isDarkMode }) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // VALIDATION: Checking for specific User ID and Password
    if (userId === '2818636' && password === '1234') {
      onLogin('Kavinesan'); // Logs in as Kavinesan upon successful match
    } else {
      alert('❌ Invalid User ID or Password! Please try again.');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: isDarkMode ? '#0f172a' : '#f4f6f9',
      fontFamily: 'Segoe UI, system-ui, sans-serif'
    }}>
      <div style={{
        backgroundColor: isDarkMode ? '#1e293b' : '#fff',
        padding: '40px',
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px',
        border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ 
            backgroundColor: '#1e3a8a', 
            border: '1px solid #3b82f6', 
            color: '#fff', 
            width: '48px', 
            height: '48px', 
            borderRadius: '12px', 
            display: 'inline-flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            fontWeight: 'bold', 
            fontSize: '24px',
            marginBottom: '16px'
          }}>
            M
          </div>
          <h2 style={{ color: isDarkMode ? '#fff' : '#1e293b', margin: 0, fontSize: '20px', fontWeight: '700' }}>MURUGAN HOTEL</h2>
          <p style={{ color: isDarkMode ? '#94a3b8' : '#64748b', fontSize: '13px', margin: '4px 0 0 0' }}>Sign in to continue to Operations</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: isDarkMode ? '#cbd5e1' : '#475569' }}>User ID</label>
            <input 
              type="text" 
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter User ID"
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                border: isDarkMode ? '1px solid #334155' : '1px solid #cbd5e1',
                backgroundColor: isDarkMode ? '#0f172a' : '#fff',
                color: isDarkMode ? '#fff' : '#1e293b',
                outline: 'none',
                fontSize: '14px'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: isDarkMode ? '#cbd5e1' : '#475569' }}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                border: isDarkMode ? '1px solid #334155' : '1px solid #cbd5e1',
                backgroundColor: isDarkMode ? '#0f172a' : '#fff',
                color: isDarkMode ? '#fff' : '#1e293b',
                outline: 'none',
                fontSize: '14px'
              }}
            />
          </div>

          <button 
            type="submit"
            style={{
              backgroundColor: '#2563eb',
              color: '#fff',
              border: 'none',
              padding: '12px',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '14px',
              cursor: 'pointer',
              marginTop: '8px',
              transition: 'background 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#1d4ed8'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#2563eb'}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

// ==========================================
// SETTINGS PAGE WITH DARK MODE & SUPPORT
// ==========================================
function SettingsPage({ isDarkMode, setIsDarkMode }) {
  return (
    <div style={{ 
      backgroundColor: isDarkMode ? '#1e293b' : '#fff', 
      padding: '28px', 
      borderRadius: '16px', 
      border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0', 
      boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
      transition: 'all 0.2s'
    }}>
      <h2 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: '700', color: isDarkMode ? '#fff' : '#1e293b' }}>
        System Settings
      </h2>
      <p style={{ margin: '0 0 24px 0', fontSize: '13px', color: isDarkMode ? '#94a3b8' : '#64748b' }}>
        Configure user dashboard choices and backend terminal pathways.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* DARK MODE PANEL BLOCK */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '16px 20px', 
          backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc', 
          borderRadius: '12px',
          border: isDarkMode ? '1px solid #334155' : '1px solid #f1f5f9'
        }}>
          <div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: isDarkMode ? '#fff' : '#334155' }}>Dark Mode Theme</div>
            <div style={{ fontSize: '12px', color: isDarkMode ? '#64748b' : '#94a3b8', marginTop: '2px' }}>Adjust environment workspace visibility rules</div>
          </div>
          
          <div 
            onClick={() => setIsDarkMode(!isDarkMode)}
            style={{
              width: '50px',
              height: '26px',
              backgroundColor: isDarkMode ? '#2563eb' : '#cbd5e1',
              borderRadius: '999px',
              padding: '3px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: isDarkMode ? 'flex-end' : 'flex-start',
              transition: 'background-color 0.2s'
            }}
          >
            <div style={{
              width: '20px',
              height: '20px',
              backgroundColor: '#fff',
              borderRadius: '50%',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
              transition: 'all 0.2s'
            }} />
          </div>
        </div>

        {/* TECHNICAL HELP SUPPORT ACCESS SECTION */}
        <div style={{ 
          padding: '20px', 
          backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc', 
          borderRadius: '12px',
          border: isDarkMode ? '1px solid #334155' : '1px solid #f1f5f9'
        }}>
          <div style={{ fontSize: '14px', fontWeight: '600', color: isDarkMode ? '#fff' : '#334155' }}>💡 Need Technical Assistance?</div>
          <p style={{ fontSize: '12px', color: isDarkMode ? '#94a3b8' : '#64748b', margin: '4px 0 16px 0' }}>
            If you encounter errors inside the operational sync loops or n8n networks, contact our localized IT support.
          </p>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            backgroundColor: isDarkMode ? '#1e293b' : '#eff6ff', 
            padding: '14px 16px', 
            borderRadius: '8px',
            border: isDarkMode ? '1px solid #2563eb' : '1px solid #bfdbfe'
          }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: isDarkMode ? '#3b82f6' : '#1e40af' }}>IT Support Executive</div>
              <div style={{ fontSize: '15px', fontWeight: '600', color: isDarkMode ? '#fff' : '#1e293b', marginTop: '2px' }}>Kavin</div>
            </div>
            
            <a 
              href="tel:9360253629" 
              style={{
                backgroundColor: '#2563eb',
                color: '#fff',
                textDecoration: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '600',
                boxShadow: '0 2px 4px rgba(37,99,235,0.2)',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#1d4ed8'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#2563eb'}
            >
              📞 Call 9360253629
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// INTERNAL HOTEL CHAT SUBSYSTEM COMPONENT
// ==========================================
function HotelChatSystem() {
  const staffUsers = [
    { id: 'kavinesan', name: 'Kavinesan', role: 'Front Office', avatar: 'SK' },
    { id: 'priya', name: 'Priya Nair', role: 'Housekeeping', avatar: 'PN' },
    { id: 'arvind', name: 'Arvind Singh', role: 'Maintenance', avatar: 'AS' }
  ];

  const [currentUser, setCurrentUser] = useState(staffUsers[0]);
  const [typedMessage, setTypedMessage] = useState('');
  const chatEndRef = useRef(null);

  const [conversations, setConversations] = useState([
    { senderId: 'priya', senderName: 'Priya Nair', role: 'Housekeeping', text: 'Room 305 is cleaned and ready for check-in.', timestamp: '08:40 AM' },
    { senderId: 'kavinesan', senderName: 'Kavinesan', role: 'Front Office', text: 'Great work Priya! Mr. Ramesh Kumar has arrived at reception.', timestamp: '08:42 AM' },
    { senderId: 'arvind', senderName: 'Arvind Singh', role: 'Maintenance', text: 'Hey team, I am checking the AC issue reported in Room 205 now.', timestamp: '09:12 AM' }
  ]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversations]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!typedMessage.trim()) return;

    const rightNow = new Date();
    const cleanTimestamp = rightNow.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    const newMsg = {
      senderId: currentUser.id,
      senderName: currentUser.name,
      role: currentUser.role,
      text: typedMessage,
      timestamp: cleanTimestamp
    };

    setConversations([...conversations, newMsg]);
    setTypedMessage('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 140px)', backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
      <div style={{ padding: '16px 24px', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#1e293b' }}>🏨 Internal Operations Team Chat Loop</h2>
          <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#64748b' }}>Simulate real-time communications across operational department logins</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#fff', padding: '6px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
          <label htmlFor="user-select" style={{ fontSize: '12px', fontWeight: '600', color: '#475569' }}>🎭 View As Login:</label>
          <select 
            id="user-select"
            value={currentUser.id} 
            onChange={(e) => setCurrentUser(staffUsers.find(u => u.id === e.target.value))}
            style={{ border: 'none', outline: 'none', fontSize: '13px', fontWeight: '700', color: '#1e40af', cursor: 'pointer', backgroundColor: 'transparent' }}
          >
            {staffUsers.map(user => (
              <option key={user.id} value={user.id}>{user.name} ({user.role})</option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ flex: 1, padding: '24px', overflowY: 'auto', backgroundColor: '#f1f5f9', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {conversations.map((msg, idx) => {
          const isOwnMessage = msg.senderId === currentUser.id;

          return (
            <div key={idx} style={{ display: 'flex', justifyContent: isOwnMessage ? 'flex-end' : 'flex-start', width: '100%' }}>
              <div style={{ display: 'flex', flexDirection: isOwnMessage ? 'row-reverse' : 'row', gap: '12px', maxWidth: '70%' }}>
                
                <div style={{ 
                  width: '36px', 
                  height: '36px', 
                  borderRadius: '50%', 
                  backgroundColor: isOwnMessage ? '#2563eb' : '#0f172a', 
                  color: '#fff', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontWeight: '700', 
                  fontSize: '12px',
                  flexShrink: 0,
                  boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                }}>
                  {staffUsers.find(u => u.id === msg.senderId)?.avatar || 'ST'}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px', justifyContent: isOwnMessage ? 'flex-end' : 'flex-start' }}>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: '#334155' }}>{msg.senderName}</span>
                    <span style={{ fontSize: '10px', color: '#64748b', backgroundColor: '#e2e8f0', padding: '2px 6px', borderRadius: '4px' }}>{msg.role}</span>
                  </div>
                  
                  <div style={{ 
                    padding: '12px 16px', 
                    borderRadius: '14px', 
                    borderTopLeftRadius: !isOwnMessage ? '0' : '14px',
                    borderTopRightRadius: isOwnMessage ? '0' : '14px',
                    backgroundColor: isOwnMessage ? '#2563eb' : '#fff', 
                    color: isOwnMessage ? '#fff' : '#1e293b',
                    fontSize: '14px',
                    lineHeight: '1.4',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                  }}>
                    {msg.text}
                    <div style={{ textAlign: 'right', fontSize: '10px', opacity: 0.7, marginTop: '4px', color: isOwnMessage ? '#fff' : '#64748b' }}>
                      {msg.timestamp}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={handleSendMessage} style={{ padding: '16px', backgroundColor: '#fff', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '12px' }}>
        <input 
          type="text" 
          value={typedMessage}
          onChange={(e) => setTypedMessage(e.target.value)}
          placeholder={`Type a message as ${currentUser.name}...`}
          style={{ flex: 1, padding: '14px 18px', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', transition: 'border 0.2s' }}
          onFocus={(e) => e.target.style.borderColor = '#2563eb'}
          onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
        />
        <button 
          type="submit" 
          style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '0 24px', borderRadius: '10px', fontWeight: '600', fontSize: '14px', cursor: 'pointer', transition: 'background 0.2s' }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#1d4ed8'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#2563eb'}
        >
          Send Message 🚀
        </button>
      </form>
    </div>
  );
}

// ==========================================
// DYNAMIC N8N DATA LIST PAGE COMPONENT
// ==========================================
function DynamicListPage() {
  const { category } = useParams(); 
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataFromN8N = async () => {
      setLoading(true);
      setError(null);
      try {
        const n8nWebhookUrl = 'https://YOUR_N8N_INSTANCE.com/webhook/hotel-data';
        
        const response = await fetch('https://your_n8n_instance.com/webhook/hotel-data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: category }), 
        });

        if (!response.ok) throw new Error('Failed to retrieve system operations ledger data.');
        const data = await response.json();
        setTableData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDataFromN8N();
  }, [category]);

  const readableTitle = category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

  if (loading) return <div style={{ padding: '24px', color: '#64748b' }}>⏳ Fetching live updates for {readableTitle} from n8n network telemetry...</div>;
  if (error) return <div style={{ padding: '24px', color: '#ef4444' }}>❌ operational connectivity pipeline error: {error}</div>;

  return (
    <div style={{ backgroundColor: '#fff', padding: '28px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
      <h2 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '700', color: '#1e293b' }}>{readableTitle} Subsystem Ledger</h2>
      {tableData.length === 0 ? (
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>No active records logged inside this sector for today.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', textAlign: 'left' }}>
          <thead>
            <tr style={{ color: '#64748b', borderBottom: '2px solid #e2e8f0' }}>
              {Object.keys(tableData[0]).map((key) => (
                <th key={key} style={{ padding: '12px 8px', textTransform: 'uppercase', fontSize: '12px', fontWeight: '700' }}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                {Object.values(row).map((val, i) => (
                  <td key={i} style={{ padding: '14px 8px', color: '#334155' }}>{typeof val === 'object' ? JSON.stringify(val) : String(val)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// ==========================================
// STATIC DASHBOARD DISPLAY HOMEPAGE
// ==========================================
function DashboardHome() {
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '24px' }}>
        <div style={{ backgroundColor: '#2563eb', padding: '24px', borderRadius: '16px', color: '#fff', boxShadow: '0 4px 6px -1px rgba(37,99,235,0.2)' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', opacity: 0.8, letterSpacing: '0.5px' }}>OCCUPANCY</div>
          <div style={{ fontSize: '32px', fontWeight: '700', margin: '8px 0' }}>82%</div>
          <div style={{ fontSize: '12px', opacity: 0.9 }}>66 / 80 Rooms Booked</div>
        </div>
        <NavLink to="/data/arrivals" style={{ textDecoration: 'none', backgroundColor: '#10b981', padding: '24px', borderRadius: '16px', color: '#fff', boxShadow: '0 4px 6px -1px rgba(16,185,129,0.2)' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', opacity: 0.8, letterSpacing: '0.5px' }}>TODAY ARRIVALS (CLICK TO SYNC)</div>
          <div style={{ fontSize: '32px', fontWeight: '700', margin: '8px 0' }}>42</div>
          <div style={{ fontSize: '12px', opacity: 0.9 }}>Expected Total: 48</div>
        </NavLink>
        <div style={{ backgroundColor: '#f97316', padding: '24px', borderRadius: '16px', color: '#fff', boxShadow: '0 4px 6px -1px rgba(249,115,22,0.2)' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', opacity: 0.8, letterSpacing: '0.5px' }}>TODAY DEPARTURES</div>
          <div style={{ fontSize: '32px', fontWeight: '700', margin: '8px 0' }}>30</div>
          <div style={{ fontSize: '12px', opacity: 0.9 }}>Expected Checkouts: 32</div>
        </div>
        <div style={{ backgroundColor: '#8b5cf6', padding: '24px', borderRadius: '16px', color: '#fff', boxShadow: '0 4px 6px -1px rgba(139,92,246,0.2)' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', opacity: 0.8, letterSpacing: '0.5px' }}>TODAY REVENUE</div>
          <div style={{ fontSize: '32px', fontWeight: '700', margin: '8px 0' }}>₹ 1,75,000</div>
          <div style={{ fontSize: '12px', opacity: 0.9 }}>ADR: ₹ 4,200</div>
        </div>
      </div>

      <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '13px', fontWeight: '700', color: '#475569', letterSpacing: '0.5px' }}>ROOM STATUS OVERVIEW</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
          <div style={{ backgroundColor: '#f0fdf4', padding: '14px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '20px' }}>🔒</span>
            <div><div style={{ fontSize: '16px', fontWeight: '700', color: '#166534' }}>66</div><div style={{ fontSize: '12px', color: '#64748b' }}>Occupied</div></div>
          </div>
          <div style={{ backgroundColor: '#f0f9ff', padding: '14px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '20px' }}>✨</span>
            <div><div style={{ fontSize: '16px', fontWeight: '700', color: '#075985' }}>18</div><div style={{ fontSize: '12px', color: '#64748b' }}>Vacant Clean</div></div>
          </div>
          <div style={{ backgroundColor: '#fff7ed', padding: '14px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '20px' }}>🧹</span>
            <div><div style={{ fontSize: '16px', fontWeight: '700', color: '#9a3412' }}>12</div><div style={{ fontSize: '12px', color: '#64748b' }}>Vacant Dirty</div></div>
          </div>
          <div style={{ backgroundColor: '#fef2f2', padding: '14px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '20px' }}>🔴</span>
            <div><div style={{ fontSize: '16px', fontWeight: '700', color: '#991b1b' }}>04</div><div style={{ fontSize: '12px', color: '#64748b' }}>Out of Order</div></div>
          </div>
          <div style={{ backgroundColor: '#f8fafc', padding: '14px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '20px' }}>✅</span>
            <div><div style={{ fontSize: '16px', fontWeight: '700', color: '#334155' }}>00</div><div style={{ fontSize: '12px', color: '#64748b' }}>Reserved</div></div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
            <h4 style={{ margin: 0, fontSize: '14px', color: '#1e293b' }}>TODAY ARRIVALS</h4>
            <NavLink to="/data/arrivals" style={{ fontSize: '12px', color: '#2563eb', fontWeight: '600', textDecoration: 'none' }}>View All →</NavLink>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: '8px 4px' }}>Guest</th>
                <th style={{ padding: '8px 4px' }}>Room</th>
                <th style={{ padding: '8px 4px' }}>ETA</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}><td style={{ padding: '10px 4px', fontWeight: '500' }}>Mr. Ramesh Kumar</td><td style={{ padding: '10px 4px' }}>305</td><td style={{ padding: '10px 4px', color: '#10b981' }}>10:30 AM</td></tr>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}><td style={{ padding: '10px 4px', fontWeight: '500' }}>Ms. Priya Nair</td><td style={{ padding: '10px 4px' }}>412</td><td style={{ padding: '10px 4px', color: '#10b981' }}>11:45 AM</td></tr>
              <tr><td style={{ padding: '10px 4px', fontWeight: '500' }}>Mr. Arvind Singh</td><td style={{ padding: '10px 4px' }}>208</td><td style={{ padding: '10px 4px', color: '#10b981' }}>12:15 PM</td></tr>
            </tbody>
          </table>
        </div>

        <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
            <h4 style={{ margin: 0, fontSize: '14px', color: '#1e293b' }}>TODAY DEPARTURES</h4>
            <NavLink to="/data/departures" style={{ fontSize: '12px', color: '#f97316', fontWeight: '600', textDecoration: 'none' }}>View All →</NavLink>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: '8px 4px' }}>Guest</th>
                <th style={{ padding: '8px 4px' }}>Room</th>
                <th style={{ padding: '8px 4px' }}>Checkout</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}><td style={{ padding: '10px 4px', fontWeight: '500' }}>Mr. Suresh Babu</td><td style={{ padding: '10px 4px' }}>204</td><td style={{ padding: '10px 4px', color: '#ef4444' }}>09:00 AM</td></tr>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}><td style={{ padding: '10px 4px', fontWeight: '500' }}>Ms. Anitha Rao</td><td style={{ padding: '10px 4px' }}>310</td><td style={{ padding: '10px 4px', color: '#ef4444' }}>10:00 AM</td></tr>
              <tr><td style={{ padding: '10px 4px', fontWeight: '500' }}>Mr. Vivek Menon</td><td style={{ padding: '10px 4px' }}>409</td><td style={{ padding: '10px 4px', color: '#ef4444' }}>11:00 AM</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
            <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>VIP IN-HOUSE</h4>
            <NavLink to="/data/inhouse" style={{ fontSize: '12px', color: '#2563eb', fontWeight: '600', textDecoration: 'none' }}>View All →</NavLink>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: '8px 4px' }}>Guest Name</th>
                <th style={{ padding: '8px 4px' }}>Room</th>
                <th style={{ padding: '8px 4px' }}>Since</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '12px 4px', fontWeight: '500' }}>👑 Mr. R. Chandran</td>
                <td style={{ padding: '12px 4px' }}>506</td>
                <td style={{ padding: '12px 4px', color: '#64748b' }}>2 Days</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '12px 4px', fontWeight: '500' }}>👑 Mr. Karthikeyan</td>
                <td style={{ padding: '12px 4px' }}>408</td>
                <td style={{ padding: '12px 4px', color: '#64748b' }}>1 Day</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '12px 4px', fontWeight: '500' }}>👑 Mr. Sundar Raj</td>
                <td style={{ padding: '12px 4px' }}>302</td>
                <td style={{ padding: '12px 4px', color: '#64748b' }}>1 Day</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 4px', fontWeight: '500' }}>👑 Mr. Global Corp. Group</td>
                <td style={{ padding: '12px 4px' }}>Floor 4</td>
                <td style={{ padding: '12px 4px', color: '#64748b' }}>3 Days</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
            <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>RECENT ALERTS</h4>
            <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>Live Logs</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', backgroundColor: '#fef2f2', borderRadius: '8px', border: '1px solid #fee2e2' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '16px' }}>⚠️</span>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#991b1b' }}>Room 205 – AC not working</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Maintenance</div>
                </div>
              </div>
              <span style={{ fontSize: '11px', color: '#64748b' }}>09:10 AM</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', backgroundColor: '#fff7ed', borderRadius: '8px', border: '1px solid #ffedd5' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '16px' }}>🧃</span>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#c2410c' }}>Room 412 – Mini bar empty</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Housekeeping</div>
                </div>
              </div>
              <span style={{ fontSize: '11px', color: '#64748b' }}>08:55 AM</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', backgroundColor: '#f0fdf4', borderRadius: '8px', border: '1px solid #dcfce7' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '16px' }}>✅</span>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#166534' }}>Room 305 – Cleaned & Ready</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Housekeeping</div>
                </div>
              </div>
              <span style={{ fontSize: '11px', color: '#64748b' }}>08:40 AM</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', backgroundColor: '#eff6ff', borderRadius: '8px', border: '1px solid #dbeafe' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '16px' }}>ℹ️</span>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e40af' }}>VIP Arrival – Mr. Ramesh Kumar</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Front Office</div>
                </div>
              </div>
              <span style={{ fontSize: '11px', color: '#64748b' }}>08:30 AM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================================================
// NEW: LOGOUT CONFIRMATION DIALOG BOX COMPONENT (YES / NO)
// ========================================================
function LogoutConfirmModal({ onConfirm, onCancel, isDarkMode }) {
  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.55)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      fontFamily: 'Segoe UI, system-ui, sans-serif'
    }}>
      <div style={{
        backgroundColor: isDarkMode ? '#1e293b' : '#fff',
        padding: '32px',
        borderRadius: '16px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
        width: '90%',
        maxWidth: '380px',
        textAlign: 'center',
        border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0'
      }}>
        <div style={{ fontSize: '38px', marginBottom: '12px' }}>🚪</div>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '700', color: isDarkMode ? '#fff' : '#1e293b' }}>
          Confirm Logout
        </h3>
        <p style={{ margin: '0 0 24px 0', fontSize: '14px', color: isDarkMode ? '#94a3b8' : '#64748b', lineHeight: '1.4' }}>
          Are you sure you want to logout.
        </p>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={onConfirm}
            style={{
              flex: 1,
              backgroundColor: '#ef4444',
              color: '#fff',
              border: 'none',
              padding: '12px',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#dc2626'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#ef4444'}
          >
            Yes, Logout
          </button>
          
          <button 
            onClick={onCancel}
            style={{
              flex: 1,
              backgroundColor: isDarkMode ? '#334155' : '#e2e8f0',
              color: isDarkMode ? '#fff' : '#334155',
              border: 'none',
              padding: '12px',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = isDarkMode ? '#475569' : '#cbd5e1'}
            onMouseOut={(e) => e.target.style.backgroundColor = isDarkMode ? '#334155' : '#e2e8f0'}
          >
            No, Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// CORE APP ENTRY POINT
// ==========================================
function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Manage operational user login session state context pointers
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  // NEW: State to control visibility of confirmation pop up
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const clockTimer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); 

    return () => clearInterval(clockTimer);
  }, []);

  const handleLogin = (loggedUserName) => {
    setUsername(loggedUserName);
    setIsLoggedIn(true);
  };

  // Intercept the link click event to trigger the confirmation modal first
  const handleTriggerLogoutPopup = (e) => {
    e.preventDefault(); 
    setShowLogoutModal(true);
  };

  // Run when user confirms they want to leave
  const confirmLogoutAction = () => {
    setShowLogoutModal(false);
    setIsLoggedIn(false);
    setUsername('');
  };

  // Run when user decides to stay on dashboard
  const cancelLogoutAction = () => {
    setShowLogoutModal(false);
  };

  const formattedDate = currentTime.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long'
  }); 

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }); 

  const mainMenuItems = [
    { name: 'Dashboard', icon: '📊', path: '/' },
    { name: 'Arrivals', icon: '🛬', path: '/data/arrivals' },
    { name: 'Departures', icon: '🛫', path: '/data/departures' },
    { name: 'In House', icon: '🏨', path: '/data/inhouse' },
    { name: 'Room Status', icon: '🧹', path: '/data/roomstatus' },
    { name: 'Housekeeping', icon: '✨', path: '/data/housekeeping' },
    { name: 'Maintenance', icon: '🛠️', path: '/data/maintenance' },
    { name: 'Reports', icon: '📈', path: '/data/reports' }
  ];

  const accountMenuItems = [
    { name: 'Chat', icon: '💬', path: '/data/chat' },
    { name: 'Settings', icon: '⚙️', path: '/data/settings' },
    { name: 'Logout', icon: '🚪', path: '#', onClick: handleTriggerLogoutPopup }
  ];

  // Intercept view to render Login Page if session state is logged out
  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} isDarkMode={isDarkMode} />;
  }

  return (
    <Router>
      <div style={{ 
        display: 'flex', 
        minHeight: '100vh', 
        backgroundColor: isDarkMode ? '#0f172a' : '#f4f6f9', 
        fontFamily: 'Segoe UI, system-ui, sans-serif',
        transition: 'background-color 0.2s'
      }}>
        
        {/* NEW: Render the overlay pop up safely when state is true */}
        {showLogoutModal && (
          <LogoutConfirmModal 
            onConfirm={confirmLogoutAction} 
            onCancel={cancelLogoutAction} 
            isDarkMode={isDarkMode} 
          />
        )}

        {/* SIDEBAR NAVIGATION PANEL */}
        <div style={{ width: '260px', backgroundColor: '#0f172a', color: '#94a3b8', padding: '24px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px', paddingLeft: '8px' }}>
              <div style={{ backgroundColor: '#1e3a8a', border: '1px solid #3b82f6', color: '#fff', width: '36px', height: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px' }}>F</div>
              <div>
                <h2 style={{ color: '#fff', margin: 0, fontSize: '15px', fontWeight: '700', letterSpacing: '0.5px' }}> HOTEL</h2>
              </div>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {mainMenuItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.path === '/'} 
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    width: '100%',
                    padding: '11px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: '14px',
                    textDecoration: 'none',
                    fontWeight: isActive ? '600' : '500',
                    backgroundColor: isActive ? '#1e40af' : 'transparent',
                    color: isActive ? '#fff' : '#94a3b8',
                    transition: 'all 0.2s',
                    boxSizing: 'border-box'
                  })}
                >
                  <span style={{ fontSize: '16px' }}>{item.icon}</span>
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>

          <div>
            <div style={{ fontSize: '11px', fontWeight: '700', color: '#475569', letterSpacing: '1px', paddingLeft: '16px', marginBottom: '8px', textTransform: 'uppercase' }}>Account</div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {accountMenuItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={item.onClick || null}
                  style={({ isActive }) => {
                    const isLogout = item.name === 'Logout';
                    return {
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      width: '100%',
                      padding: '11px 16px',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontSize: '14px',
                      textDecoration: 'none',
                      fontWeight: (isActive && !isLogout) ? '600' : '500',
                      backgroundColor: (isActive && !isLogout) ? '#1e40af' : 'transparent',
                      color: isLogout ? '#f87171' : (isActive ? '#fff' : '#94a3b8'),
                      transition: 'all 0.2s',
                      boxSizing: 'border-box'
                    };
                  }}
                >
                  <span style={{ fontSize: '16px' }}>{item.icon}</span>
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>

        {/* RIGHT MAIN CORE DISPLAY WORKSPACE CONTAINER */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflowY: 'auto' }}>
          
          <header style={{ 
            backgroundColor: isDarkMode ? '#1e293b' : '#fff', 
            borderBottom: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0', 
            padding: '18px 32px', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            transition: 'all 0.2s'
          }}>
            <div>
              <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: isDarkMode ? '#fff' : '#1e293b' }}>Murugan Hotel, Chennai</h1>
              <span style={{ fontSize: '13px', color: isDarkMode ? '#94a3b8' : '#64748b', marginTop: '2px', display: 'inline-block' }}>Good Morning, {username} 👋 Here's what's happening in your hotel today.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '14px', color: isDarkMode ? '#cbd5e1' : '#334155', fontWeight: '500' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>📅 {formattedDate}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>⏰ {formattedTime}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#fff', fontSize: '13px' }}>SK</div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: '600', color: isDarkMode ? '#fff' : '#334155', fontSize: '13px' }}>{username}</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>Front Office</div>
                </div>
              </div>
            </div>
          </header>

          <main style={{ padding: '32px', flex: 1 }}>
            <Routes>
              <Route path="/" element={<DashboardHome />} />
              <Route path="/data/chat" element={<HotelChatSystem />} />
              <Route path="/data/:category" element={<DynamicListPage />} />
              <Route path="/data/settings" element={<SettingsPage isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
            </Routes>
          </main>
        </div>

      </div>
    </Router>
  );
}

export default App;