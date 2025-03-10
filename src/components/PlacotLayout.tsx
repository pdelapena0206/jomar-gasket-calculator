import React, { useEffect, useRef } from 'react';

interface PlacotLayoutProps {
  width: number;
  height: number;
  gaskets: Array<{
    outerDiameter: number;
    innerDiameter: number;
    x: number;
    y: number;
    size?: string;
    price?: number;
    isNested?: boolean;
    parentId?: string;
    rotation?: number;
  }>;
  scale?: number;
  sheetNumber?: number;
}

export function PlacotLayout({ width, height, gaskets, scale = 1, sheetNumber = 1 }: PlacotLayoutProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Define colors for each size
  const sizeColors = {
    '6"': '#059669', // Emerald
    '8"': '#4338ca', // Indigo
    '10"': '#b45309', // Amber
    '12"': '#be185d', // Pink
    '14"': '#6d28d9', // Purple
    '16"': '#0e7490', // Cyan
    '18"': '#9f1239', // Rose
    '20"': '#1e40af', // Blue
    '24"': '#064e3b', // Emerald dark
    default: '#374151' // Gray
  };

  // Create pattern for nested gaskets
  const createPattern = (ctx: CanvasRenderingContext2D, color: string) => {
    const patternCanvas = document.createElement('canvas');
    const patternSize = 10;
    patternCanvas.width = patternSize;
    patternCanvas.height = patternSize;
    const patternCtx = patternCanvas.getContext('2d');
    if (!patternCtx) return null;

    // Fill with base color
    patternCtx.fillStyle = color;
    patternCtx.fillRect(0, 0, patternSize, patternSize);

    // Add diagonal lines
    patternCtx.strokeStyle = '#ffffff';
    patternCtx.lineWidth = 1;
    patternCtx.beginPath();
    patternCtx.moveTo(0, 0);
    patternCtx.lineTo(patternSize, patternSize);
    patternCtx.stroke();

    return ctx.createPattern(patternCanvas, 'repeat');
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set white background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw sheet outline
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, width * scale, height * scale);

    // Group gaskets by size and count occurrences
    const gasketCounts = new Map<string, number>();
    
    // First pass: count gaskets
    gaskets.forEach(gasket => {
      if (!gasket.isNested) {
        const key = `${gasket.outerDiameter}-${gasket.innerDiameter}`;
        gasketCounts.set(key, (gasketCounts.get(key) || 0) + 1);
      }
    });

    // Draw gaskets
    gaskets.forEach(gasket => {
      const x = gasket.x * scale + 10;
      const y = gasket.y * scale + 10;
      const outerRadius = (gasket.outerDiameter / 2) * scale;
      const innerRadius = (gasket.innerDiameter / 2) * scale;
      const rotation = gasket.rotation || 0;

      // Save current context state
      ctx.save();

      // Move to gasket center and apply rotation
      ctx.translate(x, y);
      ctx.rotate((rotation * Math.PI) / 180);

      // Get the gasket's size (either from itself or from its parent)
      let gasketSize = gasket.size;
      if (gasket.isNested && !gasketSize) {
        // Find the original gasket with this size
        const originalGasket = gaskets.find(g => 
          !g.isNested && 
          g.outerDiameter === gasket.outerDiameter && 
          g.innerDiameter === gasket.innerDiameter
        );
        if (originalGasket) {
          gasketSize = originalGasket.size;
        }
      }

      // Extract size number (e.g., "6" from '6"')
      const sizeMatch = gasketSize?.match(/\d+"/);
      const sizeKey = sizeMatch?.[0] as keyof typeof sizeColors;
      const baseColor = sizeColors[sizeKey] || sizeColors.default;

      // Draw solid filled ring
      ctx.beginPath();
      ctx.arc(0, 0, outerRadius, 0, 2 * Math.PI);
      ctx.arc(0, 0, innerRadius, 0, 2 * Math.PI, true);

      if (gasket.isNested) {
        // Create and apply pattern for nested gaskets
        const pattern = createPattern(ctx, baseColor);
        if (pattern) {
          ctx.fillStyle = pattern;
        } else {
          ctx.fillStyle = baseColor;
        }
      } else {
        ctx.fillStyle = baseColor;
      }

      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw size label if it's a parent gasket
      if (gasket.size && !gasket.isNested) {
        const key = `${gasket.outerDiameter}-${gasket.innerDiameter}`;
        const count = gasketCounts.get(key) || 0;
        
        // Calculate text position at the center of the ring
        const labelY = 0;
        
        // Draw size in inches
        ctx.font = `bold ${Math.max(12, 14 * scale)}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(gasket.size, 0, labelY);

        // Remove this size from the count map to avoid showing it again
        gasketCounts.delete(key);
      }

      // Restore context state
      ctx.restore();
    });

    // Draw sheet information
    ctx.fillStyle = 'black';
    ctx.font = `${Math.max(12, 14 * scale)}px Arial`;
    ctx.textAlign = 'left';
    ctx.fillText(`PLANCHA ${sheetNumber}`, 10, height * scale + 30);
    ctx.fillText(`ESCALA: 1:${Math.round(1/scale)}`, 10, height * scale + 50);
    ctx.textAlign = 'right';
    ctx.fillText(
      `DIMENSIONES: ${width.toFixed(0)}mm × ${height.toFixed(0)}mm`, 
      width * scale + 10, 
      height * scale + 30
    );

  }, [width, height, gaskets, scale, sheetNumber]);

  return (
    <canvas
      ref={canvasRef}
      width={width * scale + 20}
      height={height * scale + 60}
      className="border border-gray-300 rounded-lg shadow-sm bg-white"
    />
  );
}