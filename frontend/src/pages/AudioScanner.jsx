import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Upload, ShieldAlert, ShieldCheck, Cpu, RefreshCw, Volume2 } from 'lucide-react';
import SpectrogramCanvas from '../components/SpectrogramCanvas';

export default function AudioScanner() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Live Speech Recognition state
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [speechRecognition, setSpeechRecognition] = useState(null);

  useEffect(() => {
    // Initialize Web Speech API if supported by browser
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      setSpeechRecognition(recognition);
    }
  }, []);

  const toggleListening = () => {
    if (!speechRecognition) {
      alert('Web Speech API is not supported in this browser. Try Google Chrome or Microsoft Edge.');
      return;
    }
    if (isListening) {
      speechRecognition.stop();
      setIsListening(false);
    } else {
      setTranscript('');
      speechRecognition.start();
      setIsListening(true);
    }
  };

  const handleAudioUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/v1/detect/audio', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        setResult(data.data);
      }
    } catch (err) {
      console.error('Audio scan error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>Synthetic Audio & Live Voice Studio</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Analyze audio waveforms for synthetic voice cloning, pitch jitter, spectral flux, and test live speech microphone recordings in real-time.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Upload & Mic Input Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* File Upload Dropzone */}
          <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Upload size={18} color="var(--accent-purple)" />
              <span>Upload Audio File</span>
            </h3>
            <label style={{
              border: '2px dashed var(--border-color)',
              borderRadius: '16px',
              padding: '30px 20px',
              textAlign: 'center',
              cursor: 'pointer',
              background: 'rgba(255, 255, 255, 0.02)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px'
            }}>
              <input type="file" accept="audio/*" onChange={handleAudioUpload} style={{ display: 'none' }} />
              <Volume2 size={36} color="var(--accent-purple)" />
              <div>
                <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>Upload WAV, MP3, or OGG File</p>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Analyzes STFT Mel-Spectrogram & Pitch Jitter</p>
              </div>
            </label>
          </div>

          {/* Live Mic Voice-to-Text Dynamic Studio */}
          <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mic size={18} color="var(--primary-cyan)" />
              <span>Live Microphone Speech-to-Text Veracity</span>
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Click to record live speech. Transcribes text dynamics in real-time and evaluates truth score.
            </p>

            <button 
              onClick={toggleListening}
              className={isListening ? "pulse-active" : "btn-secondary"}
              style={{
                padding: '14px',
                borderRadius: '12px',
                border: isListening ? '1px solid var(--danger-red)' : '1px solid var(--border-color)',
                background: isListening ? 'rgba(255, 0, 85, 0.2)' : 'rgba(255,255,255,0.05)',
                color: isListening ? 'var(--danger-red)' : '#fff',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
              <span>{isListening ? 'Stop Recording (Listening...)' : 'Start Live Mic Recording'}</span>
            </button>

            {transcript && (
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--primary-cyan)', fontWeight: 700, uppercase: true, marginBottom: '6px' }}>
                  REAL-TIME VOICE TRANSCRIPT:
                </p>
                <p style={{ fontSize: '0.9rem', color: '#fff', fontStyle: 'italic', lineHeight: '1.5' }}>
                  "{transcript}"
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Results Panel */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>Spectral Audio Telemetry</h3>

          {!result && !loading && (
            <div style={{ height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)', textAlign: 'center', gap: '12px' }}>
              <Volume2 size={48} opacity={0.3} />
              <p style={{ fontSize: '0.9rem' }}>Upload an audio file to inspect Mel-Spectrograms & synthetic voice pitch scores.</p>
            </div>
          )}

          {loading && (
            <div style={{ height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', color: 'var(--accent-purple)' }}>
              <RefreshCw className="spin" size={40} />
              <p style={{ fontSize: '0.95rem', fontWeight: 600 }}>Calculating Spectral Flux & STFT Audio Frames...</p>
            </div>
          )}

          {result && !loading && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{
                padding: '16px 20px',
                borderRadius: '12px',
                background: result.classification === 'SYNTHETIC_VOICE' ? 'rgba(255, 0, 85, 0.12)' : 'rgba(0, 230, 118, 0.12)',
                border: result.classification === 'SYNTHETIC_VOICE' ? '1px solid rgba(255, 0, 85, 0.3)' : '1px solid rgba(0, 230, 118, 0.3)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {result.classification === 'SYNTHETIC_VOICE' ? <ShieldAlert size={28} color="var(--danger-red)" /> : <ShieldCheck size={28} color="var(--success-green)" />}
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: result.classification === 'SYNTHETIC_VOICE' ? 'var(--danger-red)' : 'var(--success-green)' }}>
                      {result.classification === 'SYNTHETIC_VOICE' ? 'SYNTHETIC / CLONED VOICE DETECTED' : 'AUTHENTIC HUMAN VOICE'}
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Confidence Score: {result.confidence_percentage}%</p>
                  </div>
                </div>
              </div>

              {/* Spectrogram Visualizer */}
              <div>
                <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff', marginBottom: '8px' }}>
                  Mel-Spectrogram Spectral Grid:
                </p>
                <SpectrogramCanvas 
                  matrix={result.spectrogram_preview_matrix}
                  isSynthetic={result.classification === 'SYNTHETIC_VOICE'}
                />
              </div>

              {/* Metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Spectral Flux Score</span>
                  <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>{result.analysis_details.spectral_flux_score}</p>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Pitch Jitter Score</span>
                  <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>{result.analysis_details.pitch_jitter_score}</p>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Audio Duration</span>
                  <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>{result.audio_duration_seconds} sec</p>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Sample Rate</span>
                  <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>{result.analysis_details.sample_rate} Hz</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
