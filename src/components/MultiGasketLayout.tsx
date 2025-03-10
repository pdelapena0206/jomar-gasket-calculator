import React, { useState, useEffect } from 'react';
import { GasketItem, OptimizedLayout } from '../types';
import { generateMultiGasketLayout } from '../utils/imageGenerator';
import { optimizeGasketLayout } from '../utils/layoutOptimizer';

interface MultiGasketLayoutProps {
  width: number;
  height: number;
  gaskets: GasketItem[];
  sheetPrice: number;
}

export function MultiGasketLayout({
  width,
  height,
  gaskets,
  sheetPrice
}: MultiGasketLayoutProps) {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [layout, setLayout] = useState<OptimizedLayout | null>(null);

  useEffect(() => {
    if (width && height && gaskets.length > 0) {
      // Calculate optimal layout
      const optimizedLayout = optimizeGasketLayout({
        sheetWidth: width,
        sheetHeight: height,
        gaskets
      });
      setLayout(optimizedLayout);

      // Generate layout image
      const url = generateMultiGasketLayout({
        width,
        height,
        layout: optimizedLayout
      });
      setImageUrl(url);
    }
  }, [width, height, gaskets]);

  if (!imageUrl || !layout) return null;

  const totalGaskets = gaskets.reduce((sum, g) => sum + g.quantity, 0) + layout.nestedGaskets.length;
  const unitPrice = totalGaskets > 0 ? sheetPrice / totalGaskets : 0;
  const efficiency = (layout.usedArea / layout.totalArea) * 100;

  return (
    <div className="mt-4">
      <div className="bg-gray-100 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Disposición Optimizada</h4>
        <div className="mb-4">
          <p className="text-sm text-gray-700">Total de empaquetaduras: {totalGaskets}</p>
          <p className="text-sm text-gray-700">
            Empaquetaduras anidadas: {layout.nestedGaskets.length}
          </p>
          <p className="text-sm text-gray-700">
            Precio unitario promedio: ${unitPrice.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })} CLP
          </p>
          <p className="text-sm text-gray-700">
            Eficiencia de aprovechamiento: {efficiency.toFixed(1)}%
          </p>
        </div>
        <img 
          src={imageUrl} 
          alt="Disposición optimizada"
          className="mx-auto border border-gray-300 rounded-lg shadow-sm"
        />
      </div>
    </div>
  );
}