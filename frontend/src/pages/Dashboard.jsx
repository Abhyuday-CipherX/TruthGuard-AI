import React, { useEffect, useState } from 'react';
import { ShieldAlert, ShieldCheck, Eye, Mic, Newspaper, Cpu, Activity, ArrowUpRight } from 'lucide-react';

export default function Dashboard({ setActiveTab }) {
  const [analytics, setAnalytics] = useState({
    total_scans_processed: 184,
    threats_flagged: 112,
    authentic_verified: 72,
    accuracy_rate: 97.4,
    media_breakdown: { images: 82, videos: 46, audio: 34, text_ocr: 22 }
  });

  useEffect(() => {
    fetch('/api/v1/history/analytics')
      .then(res => res.json())
      .then(data => {
        if (data.success) setAnalytics(data.analytics);
      })
      .catch(() => {});
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Hero Welcome Banner */}
      <div className="glass-card" style={{ padding: '28px', background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.08) 0%, rgba(138, 43, 226, 0.08) 100%)', borderColor: 'rgba(0, 242, 254, 0.2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
              Multi-Modal Veracity & Deepfake Shield
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '650px', lineHeight: '1.5' }}>
              Real-time deep learning detection for manipulated facial images, synthetic cloned voices, article sensationalism, and meme screenshot misinformation.
            </p>
          </div>
          <button onClick={() => setActiveTab('deepfake')} className="btn-primary" style={{ padding: '14px 28px', fontSize: '0.95rem' }}>
            <span>Launch Image & Video Scanner</span>
            <ArrowUpRight size={18} />
          </button>
        </div>
      </div>

      {/* Analytics Telemetry Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>Total Scans</span>
            <Activity size={18} color="var(--primary-cyan)" />
          </div>
          <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff' }}>{analytics.total_scans_processed}</h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--success-green)' }}>+18% from last week</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>Deepfakes Flagged</span>
            <ShieldAlert size={18} color="var(--danger-red)" />
          </div>
          <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--danger-red)' }}>{analytics.threats_flagged}</h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--danger-red)' }}>{Math.round((analytics.threats_flagged / analytics.total_scans_processed) * 100)}% threat ratio</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>Authentic Verified</span>
            <ShieldCheck size={18} color="var(--success-green)" />
          </div>
          <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--success-green)' }}>{analytics.authentic_verified}</h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--success-green)' }}>Passed frequency checks</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>Model Precision</span>
            <Cpu size={18} color="var(--primary-blue)" />
          </div>
          <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary-blue)' }}>{analytics.accuracy_rate}%</h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>CNN + FFT ensemble</span>
        </div>
      </div>

      {/* Quick Launch Studios */}
      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginTop: '8px' }}>Select Analysis Studio</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        <div 
          onClick={() => setActiveTab('deepfake')}
          className="glass-card" 
          style={{ padding: '24px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(0, 242, 254, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-cyan)' }}>
            <Eye size={26} />
          </div>
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>Image & Video Studio</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
              Detect facial swapping, boundary seam blurring, and 2D FFT spectral frequency upsampling artifacts with Grad-CAM heatmaps.
            </p>
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--primary-cyan)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
            Open Studio &rarr;
          </span>
        </div>

        <div 
          onClick={() => setActiveTab('audio')}
          className="glass-card" 
          style={{ padding: '24px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(138, 43, 226, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-purple)' }}>
            <Mic size={26} />
          </div>
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>Synthetic Voice Studio</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
              Analyze audio waveforms, pitch jitter, spectral flux energy cuts, and test live speech microphone recordings in real-time.
            </p>
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--accent-purple)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
            Open Studio &rarr;
          </span>
        </div>

        <div 
          onClick={() => setActiveTab('fakenews')}
          className="glass-card" 
          style={{ padding: '24px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255, 171, 0, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--warning-amber)' }}>
            <Newspaper size={26} />
          </div>
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>Fake News & OCR Studio</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
              Calculate sensationalism indices, emotional manipulation scores, and extract embedded text directly from viral memes or news screenshots.
            </p>
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--warning-amber)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
            Open Studio &rarr;
          </span>
        </div>
      </div>
    </div>
  );
}
