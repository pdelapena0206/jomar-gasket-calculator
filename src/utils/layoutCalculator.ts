interface GasketDimensions {
  outerDiameter: number;
  innerDiameter: number;
  quantity: number;
}

interface SheetDimensions {
  width: number;
  height: number;
}

interface LayoutResult {
  positions: Array<{ 
    x: number; 
    y: number; 
    outerDiameter: number; 
    innerDiameter: number;
    isNested: boolean;
  }>;
  sheetsNeeded: number;
  efficiency: number;
  totalArea: number;
  usedArea: number;
  nestedCount: number;
}

export function calculateOptimalLayout(
  gasket: GasketDimensions,
  sheet: SheetDimensions
): LayoutResult {
  const positions: Array<{ x: number; y: number; outerDiameter: number; innerDiameter: number; isNested: boolean }> = [];
  const margin = 5; // 5mm safety margin between gaskets
  
  // Calculate how many gaskets can fit in a hexagonal pattern
  const horizontalSpacing = gasket.outerDiameter + margin;
  const verticalSpacing = (gasket.outerDiameter + margin) * Math.sin(Math.PI / 3);
  
  const rowsPerSheet = Math.floor(sheet.height / verticalSpacing);
  const colsPerSheet = Math.floor(sheet.width / horizontalSpacing);
  
  let nestedCount = 0;
  let remainingGaskets = gasket.quantity;
  let currentSheet = 0;
  const sheetsNeeded = Math.ceil(gasket.quantity / (rowsPerSheet * colsPerSheet));
  
  // Place gaskets in hexagonal pattern
  while (remainingGaskets > 0 && currentSheet < sheetsNeeded) {
    for (let row = 0; row < rowsPerSheet && remainingGaskets > 0; row++) {
      const isOddRow = row % 2 === 1;
      const colOffset = isOddRow ? horizontalSpacing / 2 : 0;
      
      for (let col = 0; col < colsPerSheet && remainingGaskets > 0; col++) {
        const x = col * horizontalSpacing + colOffset + horizontalSpacing / 2;
        const y = row * verticalSpacing + gasket.outerDiameter / 2;
        
        // Check if position is valid (within sheet bounds with margins)
        if (x + gasket.outerDiameter / 2 + margin <= sheet.width &&
            y + gasket.outerDiameter / 2 + margin <= sheet.height) {
          
          // Add main gasket
          positions.push({
            x,
            y,
            outerDiameter: gasket.outerDiameter,
            innerDiameter: gasket.innerDiameter,
            isNested: false
          });
          remainingGaskets--;
          
          // Try to nest smaller gaskets in the center if possible
          if (gasket.innerDiameter >= gasket.outerDiameter * 0.4) { // Only nest if there's enough space
            const nestedDiameter = gasket.innerDiameter * 0.8; // 80% of inner diameter
            if (nestedDiameter >= 20) { // Minimum size check
              positions.push({
                x,
                y,
                outerDiameter: nestedDiameter,
                innerDiameter: nestedDiameter * 0.4,
                isNested: true
              });
              nestedCount++;
            }
          }
        }
      }
    }
    currentSheet++;
  }

  // Calculate efficiency
  const totalArea = sheet.width * sheet.height * sheetsNeeded;
  const mainGasketArea = Math.PI * Math.pow(gasket.outerDiameter / 2, 2) * gasket.quantity;
  const nestedGasketArea = nestedCount > 0 ? 
    Math.PI * Math.pow(gasket.innerDiameter * 0.4, 2) * nestedCount : 0;
  const usedArea = mainGasketArea + nestedGasketArea;
  const efficiency = (usedArea / totalArea) * 100;

  return {
    positions,
    sheetsNeeded,
    efficiency,
    totalArea,
    usedArea,
    nestedCount
  };
}