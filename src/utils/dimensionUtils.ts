export function parseFormatDimensions(format: string): { width: number; height: number } | null {
  // Handle formats like "60 x 60", "40 x 40", etc.
  const dimensionMatch = format.match(/(\d+)\s*x\s*(\d+)/);
  if (dimensionMatch) {
    const [, width, height] = dimensionMatch;
    // Convert inches to millimeters (1 inch = 25.4 mm)
    return {
      width: parseFloat(width) * 25.4,
      height: parseFloat(height) * 25.4
    };
  }
  
  // Handle formats that might just specify one dimension like "55"
  const singleDimensionMatch = format.match(/^(\d+)$/);
  if (singleDimensionMatch) {
    const dimension = parseFloat(singleDimensionMatch[1]);
    // For single dimensions, assume square format
    return {
      width: dimension * 25.4,
      height: dimension * 25.4
    };
  }
  
  return null;
}