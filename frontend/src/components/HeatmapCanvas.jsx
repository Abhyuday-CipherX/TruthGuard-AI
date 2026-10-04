import React, { useEffect, useRef } from 'react';

export default function HeatmapCanvas({ imageSrc, heatmapMatrix, allFaces, faceBbox, isFake }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!imageSrc || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      // 1. Draw base image
      ctx.drawImage(img, 0, 0);

      // 2. Draw Grad-CAM Heatmap overlay if matrix provided
      if (heatmapMatrix && heatmapMatrix.length > 0) {
        const rows = heatmapMatrix.length;
        const cols = heatmapMatrix[0].length;
        const cellW = canvas.width / cols;
        const cellH = canvas.height / rows;

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const val = heatmapMatrix[r][c];
            if (val > 0.2) {
              const alpha = Math.min(val * 0.65, 0.75);
              ctx.fillStyle = isFake 
                ? `rgba(255, 0, 85, ${alpha})` 
                : `rgba(0, 242, 254, ${alpha * 0.35})`;
              ctx.fillRect(c * cellW, r * cellH, cellW, cellH);
            }
          }
        }
      }

      // 3. Draw OpenCV Face Bounding Boxes for ALL detected faces
      const facesToDraw = (allFaces && allFaces.length > 0) 
        ? allFaces 
        : (faceBbox ? [{ bbox: faceBbox, is_fake: isFake }] : []);

      facesToDraw.forEach((item, index) => {
        const bbox = item.bbox || item;
        const faceIsFake = item.is_fake !== undefined ? item.is_fake : isFake;

        if (bbox && bbox.width > 0) {
          ctx.strokeStyle = faceIsFake ? '#ff0055' : '#00f2fe';
          ctx.lineWidth = Math.max(3, canvas.width / 220);
          ctx.setLineDash([8, 6]);
          ctx.strokeRect(bbox.x, bbox.y, bbox.width, bbox.height);

          // Bbox Label
          ctx.fillStyle = faceIsFake ? '#ff0055' : '#00f2fe';
          ctx.font = 'bold 15px Inter, sans-serif';
          const label = faceIsFake ? `FACE #${index + 1}: FLAGGED` : `FACE #${index + 1}: VERIFIED`;
          ctx.fillText(label, bbox.x, Math.max(22, bbox.y - 8));
        }
      });
    };
  }, [imageSrc, heatmapMatrix, allFaces, faceBbox, isFake]);

  return (
    <div style={{ position: 'relative', width: '100%', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: 'auto', display: 'block' }} />
    </div>
  );
}
