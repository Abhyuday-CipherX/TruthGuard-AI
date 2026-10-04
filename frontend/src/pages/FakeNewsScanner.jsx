import React, { useState } from 'react';
import { Newspaper, Image, ShieldAlert, ShieldCheck, Cpu, RefreshCw, AlertTriangle } from 'lucide-react';

export default function FakeNewsScanner() {
  const [headline, setHeadline] = useState('');
  const [articleText, setArticleText] = useState('');
  const [loadingText, setLoadingText] = useState(false);
  const [textResult, setTextResult] = useState(null);

  // OCR meme state
  const [memeFile, setMemeFile] = useState(null);
  const [memePreview, setMemePreview] = useState(null);
  const [loadingOcr, setLoadingOcr] = useState(false);
  const [ocrResult, setOcrResult] = useState(null);

  const handleAnalyzeText = async () => {
    if (!articleText && !headline) return;
    setLoadingText(true);

    try {
      const response = await fetch('/api/v1/detect/text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: articleText, headline: headline })
      });
      const data = await response.json();
      if (data.success) {
        setTextResult(data.data);
      }
    } catch (err) {
      console.error('Text scan error:', err);
    } finally {
      setLoadingText(false);
    }
  };

  const handleOcrUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setMemeFile(file);
    setMemePreview(URL.createObjectURL(file));
    setLoadingOcr(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/v1/detect/ocr', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        setOcrResult(data.data);
      }
    } catch (err) {
      console.error('OCR scan error:', err);
    } finally {
      setLoadingOcr(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>Fake News & OCR Meme Studio</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Evaluate article sensationalism, emotional bias, clickbait triggers, and extract embedded text directly from viral memes or news graphics using OCR.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Section 1: Article & Text Analyzer */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Newspaper size={18} color="var(--warning-amber)" />
            <span>Article & Headline Veracity Scanner</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input 
              type="text" 
              placeholder="Headline / Title (Optional)"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '10px',
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid var(--border-color)',
                color: '#fff',
                outline: 'none'
              }}
            />

            <textarea 
              rows={6}
              placeholder="Paste article body text, viral claim, or social media post content..."
              value={articleText}
              onChange={(e) => setArticleText(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: '10px',
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid var(--border-color)',
                color: '#fff',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'Inter, sans-serif'
              }}
            />

            <button 
              onClick={handleAnalyzeText} 
              disabled={loadingText}
              className="btn-primary"
              style={{ justifyContent: 'center', padding: '12px' }}
            >
              {loadingText ? <RefreshCw className="spin" size={18} /> : <Cpu size={18} />}
              <span>{loadingText ? 'Analyzing Linguistic Patterns...' : 'Analyze Article Veracity'}</span>
            </button>
          </div>

          {textResult && (
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className={textResult.classification === 'FAKE_NEWS' ? 'badge-danger' : 'badge-success'}>
                  {textResult.classification}
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Score: {textResult.fake_news_probability}</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Sensationalism Index</span>
                  <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--warning-amber)' }}>{textResult.metrics.sensationalism_index}%</p>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Emotional Bias</span>
                  <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--danger-red)' }}>{textResult.metrics.emotional_manipulation_score}%</p>
                </div>
              </div>

              {textResult.metrics.flagged_keywords.length > 0 && (
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Flagged Clickbait Triggers:</span>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {textResult.metrics.flagged_keywords.map((kw, i) => (
                      <span key={i} style={{ background: 'rgba(255, 0, 85, 0.15)', color: 'var(--danger-red)', padding: '2px 8px', borderRadius: '6px', fontSize: '0.75rem' }}>
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Section 2: OCR Meme Screenshot Scanner */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Image size={18} color="var(--primary-cyan)" />
            <span>Meme & Screenshot OCR Scanner</span>
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
            <input type="file" accept="image/*" onChange={handleOcrUpload} style={{ display: 'none' }} />
            <Image size={36} color="var(--primary-cyan)" />
            <div>
              <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>Upload Meme or News Graphic Screenshot</p>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Extracts embedded text for instant NLP truth check</p>
            </div>
          </label>

          {loadingOcr && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', color: 'var(--primary-cyan)', padding: '20px' }}>
              <RefreshCw className="spin" size={20} />
              <span>Extracting text from image via OCR...</span>
            </div>
          )}

          {ocrResult && !loadingOcr && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--primary-cyan)', fontWeight: 700 }}>EXTRACTED MEME TEXT (OCR):</span>
                <p style={{ fontSize: '0.88rem', color: '#fff', background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '8px', marginTop: '4px' }}>
                  "{ocrResult.extracted_text}"
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className={ocrResult.veracity_analysis.classification === 'FAKE_NEWS' ? 'badge-danger' : 'badge-success'}>
                  {ocrResult.veracity_analysis.classification}
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Fake Score: {ocrResult.veracity_analysis.fake_news_probability}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
