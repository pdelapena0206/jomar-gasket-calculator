import { GasketItem, OptimizedLayout } from '../types';

interface OptimizeLayoutParams {
  sheetWidth: number;
  sheetHeight: number;
  gaskets: GasketItem[];
  sheetPrice?: number;
}

function calculateGasketArea(gasket: GasketItem): number {
  return Math.PI * (
    Math.pow(gasket.outerDiameter / 2, 2) - 
    Math.pow(gasket.innerDiameter / 2, 2)
  );
}

function calculateGasketPrice(
  gasketArea: number,
  totalSheetArea: number,
  sheetPrice: number,
  isNested: boolean = false
): number {
  // Calculate base price based on area proportion
  const basePrice = (gasketArea / totalSheetArea) * sheetPrice;
  
  // Apply 40% discount for nested gaskets
  return isNested ? basePrice * 0.6 : basePrice;
}

function doesGasketFitInside(outer: GasketItem, inner: GasketItem): boolean {
  // Add 3mm margin for safety
  const margin = 3;
  return inner.outerDiameter + margin <= outer.innerDiameter;
}

function doesGasketOverlap(
  x1: number,
  y1: number,
  r1: number,
  x2: number,
  y2: number,
  r2: number
): boolean {
  const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  const margin = 3; // 3mm margin between gaskets
  return distance < (r1 + r2 + margin);
}

function isWithinSheetBounds(
  x: number,
  y: number,
  radius: number,
  sheetWidth: number,
  sheetHeight: number
): boolean {
  const margin = 3; // 3mm margin from sheet edges
  return (
    x - radius >= margin &&
    x + radius <= sheetWidth - margin &&
    y - radius >= margin &&
    y + radius <= sheetHeight - margin
  );
}

function findBestPosition(
  gasket: GasketItem,
  sheetWidth: number,
  sheetHeight: number,
  placedGaskets: Array<{ x: number; y: number; gasket: GasketItem }>,
  isNested: boolean = false
): { x: number; y: number } | null {
  if (isNested) {
    // For nested gaskets, find a suitable parent gasket
    const parent = placedGaskets.find(p => 
      !p.gasket.isNested && 
      doesGasketFitInside(p.gasket, gasket)
    );
    return parent ? { x: parent.x, y: parent.y } : null;
  }

  const margin = 3; // 3mm margin
  const radius = gasket.outerDiameter / 2;
  const step = margin * 2;
  let bestPosition = null;
  let minDistance = Infinity;

  // Try positions in a grid pattern
  for (let x = margin + radius; x <= sheetWidth - radius - margin; x += step) {
    for (let y = margin + radius; y <= sheetHeight - radius - margin; y += step) {
      // First check if position is within sheet bounds
      if (!isWithinSheetBounds(x, y, radius, sheetWidth, sheetHeight)) {
        continue;
      }

      let isValid = true;

      // Check for overlaps with existing gaskets
      for (const placed of placedGaskets) {
        if (doesGasketOverlap(
          x, y, radius,
          placed.x, placed.y, placed.gasket.outerDiameter/2
        )) {
          isValid = false;
          break;
        }
      }

      if (isValid) {
        // Calculate distance to nearest edge or gasket
        let distance = Math.min(
          x - radius - margin,
          y - radius - margin,
          sheetWidth - (x + radius) - margin,
          sheetHeight - (y + radius) - margin
        );

        for (const placed of placedGaskets) {
          const d = Math.sqrt(
            Math.pow(x - placed.x, 2) + 
            Math.pow(y - placed.y, 2)
          ) - (radius + placed.gasket.outerDiameter/2 + margin);
          distance = Math.min(distance, d);
        }

        if (distance < minDistance && distance >= 0) {
          minDistance = distance;
          bestPosition = { x, y };
        }
      }
    }
  }

  return bestPosition;
}

export function optimizeGasketLayout({
  sheetWidth,
  sheetHeight,
  gaskets,
  sheetPrice = 0
}: OptimizeLayoutParams): OptimizedLayout {
  const sheetArea = sheetWidth * sheetHeight;
  const positions: Array<{ x: number; y: number; gasket: GasketItem }> = [];
  const nestedGaskets: GasketItem[] = [];
  let usedArea = 0;
  let recycledArea = 0;
  let currentSheet = 0;
  let totalSheets = 1;

  // Sort gaskets by outer diameter (largest first)
  const sortedGaskets = [...gaskets].sort((a, b) => b.outerDiameter - a.outerDiameter);
  const remainingGaskets = new Map(sortedGaskets.map(g => [g.id, g.quantity]));

  while (Array.from(remainingGaskets.values()).some(qty => qty > 0)) {
    let madeProgress = false;

    for (const mainGasket of sortedGaskets) {
      const remaining = remainingGaskets.get(mainGasket.id) || 0;
      if (remaining > 0) {
        const position = findBestPosition(
          mainGasket,
          sheetWidth,
          sheetHeight,
          positions.filter(p => p.gasket.parentSheet === currentSheet)
        );

        if (position) {
          madeProgress = true;
          const gasketArea = calculateGasketArea(mainGasket);
          const price = calculateGasketPrice(gasketArea, sheetArea, sheetPrice);

          positions.push({
            x: position.x,
            y: position.y,
            gasket: {
              ...mainGasket,
              price,
              area: gasketArea,
              isNested: false,
              parentSheet: currentSheet
            }
          });

          remainingGaskets.set(mainGasket.id, remaining - 1);
          usedArea += gasketArea;

          // Try to nest smaller gaskets
          for (const smallerGasket of sortedGaskets) {
            if (doesGasketFitInside(mainGasket, smallerGasket)) {
              const remainingSmaller = remainingGaskets.get(smallerGasket.id) || 0;
              if (remainingSmaller > 0) {
                const nestedArea = calculateGasketArea(smallerGasket);
                const nestedPrice = calculateGasketPrice(nestedArea, sheetArea, sheetPrice, true);

                const nestedGasket: GasketItem = {
                  ...smallerGasket,
                  price: nestedPrice,
                  area: nestedArea,
                  isNested: true,
                  parentId: mainGasket.id,
                  parentSheet: currentSheet
                };

                positions.push({
                  x: position.x,
                  y: position.y,
                  gasket: nestedGasket
                });

                nestedGaskets.push(nestedGasket);
                remainingGaskets.set(smallerGasket.id, remainingSmaller - 1);
                recycledArea += nestedArea;
              }
            }
          }
        }
      }
    }

    if (!madeProgress) {
      currentSheet++;
      totalSheets++;
    }
  }

  const efficiency = (usedArea / (sheetArea * totalSheets)) * 100;
  const recyclingEfficiency = (recycledArea / usedArea) * 100;

  // Group positions by sheet
  const sheets = Array.from({ length: totalSheets }, (_, i) => ({
    positions: positions.filter(p => p.gasket.parentSheet === i)
  }));

  return {
    positions,
    sheets,
    efficiency,
    totalArea: sheetArea * totalSheets,
    usedArea,
    recycledArea,
    recyclingEfficiency,
    nestedGaskets,
    sheetsNeeded: totalSheets
  };
}