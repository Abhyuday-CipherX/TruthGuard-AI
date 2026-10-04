import React, { useEffect, useRef } from 'react';

export default function SpectrogramCanvas({ matrix, isSynthetic }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!matrix || matrix.length === 0 || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const rows = matrix.length;
    const cols = matrix[0].length;

    canvas.width = 640;
    canvas.height = 200;

    const cellW = canvas.width / cols;
    const cellH = canvas.height / rows;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const val = matrix[r][c]; // 0.0 to 1.0
        // Cyan / Purple / Red spectral gradient
        const hue = isSynthetic 
          ? 330 - (val * 120) // Red to purple
          : 180 + (val * 100); // Cyan to blue
          
        const lightness = 15 + (val * 65);
        ctx.fillStyle = `hsl(${hue}, 90%, ${lightness}%)`;
        ctx.fillRect(c * cellW, (rows - 1 - r) * cellH, cellW, cellH);
      }
    }
  }, [matrix, isSynthetic]);

  return (
    <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)', background: '#040711' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '180px', display: 'block' }} />
    </div>
  );
}
