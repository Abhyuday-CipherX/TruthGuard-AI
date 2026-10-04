import React, { useEffect, useState } from 'react';
import { History, ShieldAlert, ShieldCheck, Download, Filter } from 'lucide-react';

export default function ScanHistory() {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/v1/history/scans')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setScans(data.data);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>Forensic Audit & Scan Database Logs</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Historical audit log of processed images, audio clips, news articles, and video frames.
          </p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '24px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <th style={{ padding: '12px 16px' }}>Media Type</th>
              <th style={{ padding: '12px 16px' }}>Filename / Target</th>
              <th style={{ padding: '12px 16px' }}>Classification</th>
              <th style={{ padding: '12px 16px' }}>Confidence Score</th>
              <th style={{ padding: '12px 16px' }}>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {scans.length === 0 && !loading && (
              <tr>
                <td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: 'var(--text-dim)' }}>
                  No scans recorded yet in database. Perform a scan in one of the Studios to generate logs!
                </td>
              </tr>
            )}

            {scans.map((scan) => {
              const isThreat = ['DEEPFAKE', 'SYNTHETIC_VOICE', 'FAKE_NEWS'].includes(scan.classification);
              return (
                <tr key={scan.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: '0.9rem', color: '#fff' }}>
                  <td style={{ padding: '14px 16px', textTransform: 'uppercase', fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary-cyan)' }}>
                    {scan.media_type}
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: 500 }}>
                    {scan.filename || 'Direct Input Scan'}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span className={isThreat ? 'badge-danger' : 'badge-success'}>
                      {scan.classification}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: 700 }}>
                    {scan.confidence_percentage}%
                  </td>
                  <td style={{ padding: '14px 16px', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                    {new Date(scan.created_at).toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
