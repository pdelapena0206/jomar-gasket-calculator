export interface Product {
  producto: string;
  formato: string;
  proveedor: string;
  linea: string;
  estilo: string;
  espesor: string;
  precio_clp: number;
  unidad: string;
}

export interface ProductData {
  products: Product[];
  providers: { [key: string]: string[] };
  lines: { [key: string]: string[] };
  styles: { [key: string]: { [key: string]: string[] } };
}

export interface GasketItem {
  standard: 'ANSI' | 'DIN';
  faceType: 'RF' | 'FF';
  size: string;
  class: string;
  quantity: number;
  innerDiameter: number;
  outerDiameter: number;
  isNested?: boolean;
  parentId?: string;
  id: string;
  price?: number;
  area?: number;
  parentSheet?: number;
}

export interface OptimizedLayout {
  positions: Array<{
    x: number;
    y: number;
    gasket: GasketItem;
  }>;
  efficiency: number;
  totalArea: number;
  usedArea: number;
  recycledArea: number;
  recyclingEfficiency: number;
  nestedGaskets: GasketItem[];
  sheetsNeeded: number;
  sheets: Array<{
    positions: Array<{
      x: number;
      y: number;
      gasket: GasketItem;
    }>;
  }>;
}

export interface SheetDimensions {
  width: number;
  height: number;
}

export interface GasketDescription {
  description: string;
  features: string[];
  applications: string[];
  specifications: {
    maxTemp: string;
    maxPressure: string;
    ph: string;
  };
  dataSheet?: string;
}