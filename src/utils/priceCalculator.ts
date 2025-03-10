interface CalculateGasketCountParams {
  sheetWidth: number;
  sheetHeight: number;
  outerDiameter: number;
  size?: string;
}

export function calculateHexagonalGasketCount({
  sheetWidth,
  sheetHeight,
  outerDiameter,
  size
}: CalculateGasketCountParams): number {
  const minSpacing = 2; // 2mm minimum spacing
  const radius = outerDiameter / 2;
  let count = 0;
  let positions: Array<{x: number, y: number}> = [];
  
  // Start from top-left corner
  let y = radius + minSpacing;
  
  while (y + radius <= sheetHeight - minSpacing) {
    let x = radius + minSpacing;
    
    while (x + radius <= sheetWidth - minSpacing) {
      // Check if position is valid
      let canPlace = true;
      
      for (const pos of positions) {
        const dx = x - pos.x;
        const dy = y - pos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < outerDiameter + minSpacing) {
          canPlace = false;
          break;
        }
      }
      
      if (canPlace) {
        positions.push({x, y});
        count++;
      }
      
      // Move to next potential position
      x += minSpacing;
    }
    
    y += minSpacing;
  }
  
  return count;
}

export function calculateUnitPrice(sheetPrice: number, gasketCount: number): number {
  return gasketCount > 0 ? sheetPrice / gasketCount : 0;
}