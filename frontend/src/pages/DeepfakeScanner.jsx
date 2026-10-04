import React, { useState } from 'react';
import { Upload, Eye, ShieldAlert, ShieldCheck, Cpu, RefreshCw, Users } from 'lucide-react';
import HeatmapCanvas from '../components/HeatmapCanvas';

export default function DeepfakeScanner() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleScan = async () => {
    if (!selectedFile) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('/api/v1/detect/image', {
        method: 'POST',
        body: formData,
      });
      const resData = await response.json();
      if (resData.success) {
        setResult(resData.data);
      }
    } catch (err) {
      console.error('Scan error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>Image & Video Deepfake Studio</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Upload single or group photos to run multi-face detection, RGB Bayer channel noise covariance analysis, 2D FFT spectral frequency, and Grad-CAM heatmaps.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Upload Panel */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Upload size={18} color="var(--primary-cyan)" />
            <span>Upload Media</span>
          </h3>

          <label style={{
            border: '2px dashed var(--border-color)',
            borderRadius: '16px',
            padding: '40px 20px',
            textAlign: 'center',
            cursor: 'pointer',
            background: 'rgba(255, 255, 255, 0.02)',
            transition: 'all 0.25s ease',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px'
          }}>
            <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
            <Eye size={40} color="var(--primary-cyan)" />
            <div>
              <p style={{ fontSize: '0.95rem', fontWeight: 600, color: '#fff' }}>Click or Drag Image to Upload</p>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>Supports Single & Multi-Person Group Photos</p>
            </div>
          </label>

          {imagePreview && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ borderRadius: '12px', overflow: 'hidden', maxHeight: '300px' }}>
                <img src={imagePreview} alt="Preview" style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }} />
              </div>
              <button 
                onClick={handleScan} 
                disabled={loading}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
              >
                {loading ? <RefreshCw className="spin" size={18} /> : <Cpu size={18} />}
                <span>{loading ? 'Analyzing Neural & Spectral Artifacts...' : 'Run Deepfake Detection'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Forensic Results Panel */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>Forensic Evidence Output</h3>

          {!result && !loading && (
            <div style={{ height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)', textAlign: 'center', gap: '12px' }}>
              <Eye size={48} opacity={0.3} />
              <p style={{ fontSize: '0.9rem' }}>Upload an image on the left to view deepfake spatial metrics and Grad-CAM visual heatmaps.</p>
            </div>
          )}

          {loading && (
            <div style={{ height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', color: 'var(--primary-cyan)' }}>
              <RefreshCw className="spin" size={40} />
              <p style={{ fontSize: '0.95rem', fontWeight: 600 }}>Executing Multi-Face RGB Covariance & Spectral Inspections...</p>
            </div>
          )}

          {result && !loading && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Status Header */}
              <div style={{
                padding: '16px 20px',
                borderRadius: '12px',
                background: result.classification === 'DEEPFAKE' ? 'rgba(255, 0, 85, 0.12)' : 'rgba(0, 230, 118, 0.12)',
                border: result.classification === 'DEEPFAKE' ? '1px solid rgba(255, 0, 85, 0.3)' : '1px solid rgba(0, 230, 118, 0.3)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {result.classification === 'DEEPFAKE' ? <ShieldAlert size={28} color="var(--danger-red)" /> : <ShieldCheck size={28} color="var(--success-green)" />}
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: result.classification === 'DEEPFAKE' ? 'var(--danger-red)' : 'var(--success-green)' }}>
                      {result.classification === 'DEEPFAKE' ? 'FLAGGED AS SYNTHETIC DEEPFAKE' : 'VERIFIED AS AUTHENTIC MEDIA'}
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Confidence Score: {result.confidence_percentage}%</p>
                  </div>
                </div>
              </div>

              {/* Heatmap Visual Overlay */}
              <div>
                <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff', marginBottom: '8px' }}>
                  Grad-CAM Artifact Heatmap & Multi-Face Overlay:
                </p>
                <HeatmapCanvas 
                  imageSrc={imagePreview} 
                  heatmapMatrix={result.gradcam_heatmap}
                  allFaces={result.all_faces}
                  faceBbox={result.face_bbox}
                  isFake={result.classification === 'DEEPFAKE'}
                />
              </div>

              {/* Technical Breakdown Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Faces Recognized</span>
                  <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary-cyan)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Users size={18} />
                    <span>{result.analysis_details.faces_found_count}</span>
                  </p>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>RGB Channel Noise Covariance</span>
                  <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>{result.analysis_details.rgb_channel_covariance}</p>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>FFT Frequency Score</span>
                  <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>{result.analysis_details.fft_frequency_score}</p>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Resolution</span>
                  <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>{result.analysis_details.resolution}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
