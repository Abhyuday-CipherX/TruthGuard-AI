import React from 'react';
import { LayoutDashboard, Eye, Mic, Newspaper, History, Cpu } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'dashboard', label: 'Overview Analytics', icon: LayoutDashboard },
    { id: 'deepfake', label: 'Image & Video Studio', icon: Eye },
    { id: 'audio', label: 'Synthetic Voice Studio', icon: Mic },
    { id: 'fakenews', label: 'Fake News & Meme OCR', icon: Newspaper },
    { id: 'history', label: 'Forensic Scan Logs', icon: History }
  ];

  return (
    <aside style={{
      width: '260px',
      background: 'rgba(10, 15, 26, 0.65)',
      backdropFilter: 'blur(16px)',
      borderRight: '1px solid var(--border-color)',
      padding: '24px 16px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      minHeight: 'calc(100vh - 70px)'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-dim)', padding: '0 12px 12px 12px', fontWeight: 700 }}>
          CORE MODULES
        </p>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '12px',
                border: 'none',
                background: isActive ? 'linear-gradient(135deg, rgba(0,242,254,0.15), rgba(79,172,254,0.15))' : 'transparent',
                color: isActive ? 'var(--primary-cyan)' : 'var(--text-muted)',
                fontWeight: isActive ? 600 : 500,
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
                transition: 'all 0.2s ease',
                boxShadow: isActive ? 'inset 0 0 0 1px rgba(0,242,254,0.3)' : 'none'
              }}
            >
              <Icon size={20} color={isActive ? 'var(--primary-cyan)' : 'var(--text-muted)'} />
              <span style={{ fontSize: '0.9rem' }}>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* AI Telemetry Info Widget */}
      <div className="glass-card" style={{ padding: '16px', background: 'rgba(0, 242, 254, 0.03)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', color: 'var(--primary-cyan)' }}>
          <Cpu size={18} />
          <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>Active AI Models</span>
        </div>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
          CNN Spatial Seams • 2D FFT Power Spectrum • Mel-Spectrogram STFT • Tesseract OCR
        </p>
      </div>
    </aside>
  );
}
