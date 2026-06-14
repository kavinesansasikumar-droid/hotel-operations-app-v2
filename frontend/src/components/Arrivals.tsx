// Sample Mock Data matching your dashboard stats (42 arrivals expected)
const arrivalsData = [
  { id: 1, guestName: "John Doe", roomNo: "102", eta: "02:30 PM", status: "Expected" },
  { id: 2, guestName: "Priya Sharma", roomNo: "305", eta: "03:15 PM", status: "Expected" },
  { id: 3, guestName: "Michael Chang", roomNo: "214", eta: "04:00 PM", status: "Arrived" },
  // Add more mock data or fetch this from your backend endpoint
];

export default function Arrivals() {
  return (
    <div style={{ padding: '24px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>Today's Arrivals</h1>
          <p style={{ color: '#64748b' }}>Overview of guests arriving today</p>
        </div>
      </div>

      {/* Table Container */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ padding: '16px', color: '#475569', fontWeight: '600' }}>Guest Name</th>
              <th style={{ padding: '16px', color: '#475569', fontWeight: '600' }}>Room #</th>
              <th style={{ padding: '16px', color: '#475569', fontWeight: '600' }}>ETA (Estimated Time of Arrival)</th>
              <th style={{ padding: '16px', color: '#475569', fontWeight: '600' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {arrivalsData.map((guest) => (
              <tr key={guest.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '16px', fontWeight: '500', color: '#0f172a' }}>{guest.guestName}</td>
                <td style={{ padding: '16px', color: '#334155' }}>
                  <span style={{ backgroundColor: '#e0f2fe', color: '#0369a1', padding: '4px 8px', borderRadius: '6px', fontSize: '14px' }}>
                    {guest.roomNo}
                  </span>
                </td>
                <td style={{ padding: '16px', color: '#334155' }}>{guest.eta}</td>
                <td style={{ padding: '16px' }}>
                  <span style={{
                    padding: '4px 8px', 
                    borderRadius: '9999px', 
                    fontSize: '12px', 
                    fontWeight: '600',
                    backgroundColor: guest.status === 'Arrived' ? '#dcfce7' : '#fef9c3',
                    color: guest.status === 'Arrived' ? '#15803d' : '#a16207'
                  }}>
                    {guest.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}