import { createCanvas } from 'canvas';
import { OptimizedLayout } from '../types';
import { flangeData } from './flangeData';

interface GenerateImageParams {
  width: number;
  height: number;
  outerDiameter: number;
  innerDiameter: number;
  method: 'grid' | 'hexagonal' | 'organic';
  faceType?: 'RF' | 'FF';
  size?: string;
  standard?: 'ANSI' | 'DIN';
}

interface Position {
  x: number;
  y: number;
  rotation: number;
}

function doesGasketFit(
  x: number,
  y: number,
  radius: number,
  positions: Position[],
  width: number,
  height: number
): boolean {
  // Check sheet boundaries
  if (x - radius < 0 || x + radius > width ||
      y - radius < 0 || y + radius > height) {
    return false;
  }
  
  // Check collision with existing gaskets
  for (const pos of positions) {
    const dx = x - pos.x;
    const dy = y - pos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < (radius * 2)) {
      return false;
    }
  }
  
  return true;
}

function findNextPosition(
  width: number,
  height: number,
  radius: number,
  positions: Position[]
): Position | null {
  const step = 1; // 1mm step for precise placement
  
  // Try to place at the top edge first
  if (positions.length === 0) {
    if (doesGasketFit(radius, radius, radius, positions, width, height)) {
      return { x: radius, y: radius, rotation: 0 };
    }
  }
  
  // Then try bottom edge
  if (positions.length === 1) {
    const y = height - radius;
    if (doesGasketFit(radius, y, radius, positions, width, height)) {
      return { x: radius, y, rotation: 0 };
    }
  }
  
  // Scan the entire sheet
  for (let y = radius; y <= height - radius; y += step) {
    for (let x = radius; x <= width - radius; x += step) {
      if (doesGasketFit(x, y, radius, positions, width, height)) {
        return {
          x,
          y,
          rotation: 0
        };
      }
    }
  }
  
  return null;
}

function calculateOptimalPositions(
  width: number,
  height: number,
  outerDiameter: number
): Position[] {
  const positions: Position[] = [];
  const radius = outerDiameter / 2;
  let nextPos: Position | null;
  
  // Keep adding gaskets until no more fit
  while ((nextPos = findNextPosition(width, height, radius, positions)) !== null) {
    positions.push(nextPos);
  }
  
  return positions;
}

function drawBoltHoles(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: string,
  scale: number,
  standard: 'ANSI' | 'DIN' = 'ANSI',
  faceType: 'RF' | 'FF' = 'FF'
) {
  const flangeInfo = flangeData[standard].DIMENSIONES[faceType][size];
  if (!flangeInfo || !flangeInfo.Numero_Perforaciones) return;

  const numBolts = flangeInfo.Numero_Perforaciones;
  const boltCircleDiameter = flangeInfo.Diametro_Circulo_Pernos_mm;
  const boltHoleDiameter = flangeInfo.Diametro_Perforaciones_mm;
  
  if (!boltCircleDiameter || !boltHoleDiameter) return;
  
  // Draw bolt holes
  for (let i = 0; i < numBolts; i++) {
    const angle = (i * 2 * Math.PI) / numBolts;
    const boltX = x + (Math.cos(angle) * boltCircleDiameter * scale) / 2;
    const boltY = y + (Math.sin(angle) * boltCircleDiameter * scale) / 2;
    
    ctx.beginPath();
    ctx.arc(boltX, boltY, (boltHoleDiameter * scale) / 2, 0, 2 * Math.PI);
    ctx.fillStyle = '#1e293b';
    ctx.fill();
  }

  // Draw bolt circle
  ctx.beginPath();
  ctx.setLineDash([5, 5]);
  ctx.arc(x, y, (boltCircleDiameter * scale) / 2, 0, 2 * Math.PI);
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.setLineDash([]);
}

export function generateGasketLayout({
  width,
  height,
  outerDiameter,
  innerDiameter,
  method,
  faceType = 'FF',
  size = '24"',
  standard = 'ANSI'
}: GenerateImageParams): string {
  // Calculate scale to fit 800px max width/height
  const maxPx = 800;
  const scale = Math.min(maxPx / width, maxPx / height);
  const imgWidth = Math.floor(width * scale);
  const imgHeight = Math.floor(height * scale);
  
  const canvas = createCanvas(imgWidth, imgHeight);
  const ctx = canvas.getContext('2d');
  
  // Fill background
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(0, 0, imgWidth, imgHeight);
  
  // Calculate optimal positions
  const positions = calculateOptimalPositions(width, height, outerDiameter);
  
  // Draw gaskets
  positions.forEach(pos => {
    const canvasX = pos.x * scale;
    const canvasY = pos.y * scale;
    const outerRadiusPx = (outerDiameter / 2) * scale;
    const innerRadiusPx = (innerDiameter / 2) * scale;

    // Draw outer ring
    ctx.beginPath();
    ctx.arc(canvasX, canvasY, outerRadiusPx, 0, 2 * Math.PI);
    ctx.arc(canvasX, canvasY, innerRadiusPx, 0, 2 * Math.PI, true);
    ctx.fillStyle = '#e2e8f0';
    ctx.fill();
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Draw bolt holes if FF type
    if (faceType === 'FF' && size) {
      drawBoltHoles(ctx, canvasX, canvasY, size, scale, standard, faceType);
    }
  });
  
  return canvas.toDataURL();
}

export function generateMultiGasketLayout({
  width,
  height,
  layout
}: {
  width: number;
  height: number;
  layout: OptimizedLayout;
}): string {
  const maxPx = 800;
  const scale = Math.min(maxPx / width, maxPx / height);
  const imgWidth = Math.floor(width * scale);
  const imgHeight = Math.floor(height * scale);
  
  const canvas = createCanvas(imgWidth, imgHeight);
  const ctx = canvas.getContext('2d');
  
  // Fill background
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(0, 0, imgWidth, imgHeight);
  
  // Draw gaskets
  layout.positions.forEach(({ x, y, gasket }) => {
    const scaledX = x * scale;
    const scaledY = y * scale;
    const outerRadiusPx = (gasket.outerDiameter / 2) * scale;
    const innerRadiusPx = (gasket.innerDiameter / 2) * scale;
    
    // Draw outer ring
    ctx.beginPath();
    ctx.arc(scaledX, scaledY, outerRadiusPx, 0, 2 * Math.PI);
    ctx.arc(scaledX, scaledY, innerRadiusPx, 0, 2 * Math.PI, true);
    ctx.fillStyle = '#e2e8f0';
    ctx.fill();
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1;
    ctx.stroke();
  });
  
  return canvas.toDataURL();
}