import React from 'react';
import { ShieldCheck, Activity, User, ExternalLink } from 'lucide-react';

export default function Navbar({ user, onOpenAuth }) {
  return (
    <header style={{
      height: '70px',
      background: 'rgba(10, 15, 26, 0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-color)',
      padding: '0 28px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      {/* Brand & System Pulse */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, rgba(0,242,254,0.2), rgba(79,172,254,0.2))',
          border: '1px solid rgba(0,242,254,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--primary-cyan)'
        }}>
          <ShieldCheck size={26} />
        </div>
        <div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            TruthGuard <span style={{ color: 'var(--primary-cyan)', fontSize: '0.9rem', fontWeight: 600, padding: '2px 8px', borderRadius: '6px', background: 'rgba(0,242,254,0.1)', border: '1px solid rgba(0,242,254,0.2)' }}>AI ENGINE</span>
          </h1>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Multi-Modal Deepfake & Misinformation Security Platform</p>
        </div>
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* System Online Status */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(0, 230, 118, 0.1)',
          border: '1px solid rgba(0, 230, 118, 0.2)',
          padding: '6px 14px',
          borderRadius: '20px',
          fontSize: '0.8rem',
          color: 'var(--success-green)'
        }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success-green)', boxShadow: '0 0 10px var(--success-green)' }}></span>
          <span>API Connected (v1.0)</span>
        </div>

        {/* API Docs Button */}
        <a 
          href="http://127.0.0.1:8000/docs" 
          target="_blank" 
          rel="noreferrer"
          className="btn-secondary"
          style={{ textDecoration: 'none', padding: '8px 16px', fontSize: '0.85rem' }}
        >
          <span>Swagger Docs</span>
          <ExternalLink size={14} />
        </a>

        {/* User Auth Profile */}
        <button 
          onClick={onOpenAuth}
          className="btn-primary"
          style={{ padding: '8px 16px', fontSize: '0.85rem' }}
        >
          <User size={16} />
          <span>{user ? user.full_name : 'Sign In'}</span>
        </button>
      </div>
    </header>
  );
}
