import React, { useState, useEffect, useRef } from 'react';
import { Ruler, Calculator, LayoutGrid, Gauge } from 'lucide-react';
import { generateGasketLayout } from '../utils/imageGenerator';
import { calculateHexagonalGasketCount, calculateUnitPrice } from '../utils/priceCalculator';
import { PDFExport } from './PDFExport';
import { GasketDescription } from './GasketDescription';

interface GasketLayoutProps {
  width: number;
  height: number;
  outerDiameter: number;
  innerDiameter: number;
  sheetPrice: number;
  faceType: 'RF' | 'FF';
  size: string;
  standard: 'ANSI' | 'DIN';
  provider?: string;
}

export function GasketLayout({
  width,
  height,
  outerDiameter,
  innerDiameter,
  sheetPrice,
  faceType,
  size,
  standard,
  provider = "DONIT"
}: GasketLayoutProps) {
  const [hexImageUrl, setHexImageUrl] = useState<string>('');
  const [gasketCount, setGasketCount] = useState<number>(0);
  const [unitPrice, setUnitPrice] = useState<number>(0);
  const [utilization, setUtilization] = useState({
    totalArea: 0,
    usedArea: 0,
    efficiency: 0,
    wasteArea: 0
  });
  
  const layoutRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (width && height && outerDiameter && innerDiameter) {
      // Generate layout image
      const hexUrl = generateGasketLayout({
        width,
        height,
        outerDiameter,
        innerDiameter,
        method: 'organic',
        faceType,
        size,
        standard
      });
      setHexImageUrl(hexUrl);

      // Calculate number of gaskets
      const count = calculateHexagonalGasketCount({
        sheetWidth: width,
        sheetHeight: height,
        outerDiameter,
        size
      });
      setGasketCount(count);
      setUnitPrice(calculateUnitPrice(sheetPrice, count));

      // Calculate utilization metrics
      const totalArea = width * height;
      const gasketArea = Math.PI * (Math.pow(outerDiameter/2, 2) - Math.pow(innerDiameter/2, 2));
      const totalUsedArea = gasketArea * count;
      const efficiency = (totalUsedArea / totalArea) * 100;
      const wasteArea = totalArea - totalUsedArea;

      setUtilization({
        totalArea,
        usedArea: totalUsedArea,
        efficiency,
        wasteArea
      });
    }
  }, [width, height, outerDiameter, innerDiameter, sheetPrice, faceType, size, standard]);

  if (!hexImageUrl) return null;

  return (
    <div className="mt-4">
      <div className="bg-dark-800/50 p-4 rounded-lg border border-dark-700">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-sm font-medium text-gray-100 flex items-center">
            <LayoutGrid className="h-4 w-4 mr-2 text-indigo-400" />
            Disposición Optimizada
          </h4>
          <PDFExport
            gasketInfo={{
              manufacturer: provider,
              distributor: "JOMAR",
              line: "Empaquetaduras",
              style: "Standard",
              format: `${width}x${height}`,
              thickness: "N/A",
              standard,
              faceType,
              size,
              class: "N/A",
              price: sheetPrice,
              metrics: {
                gasketCount,
                unitPrice,
                ...utilization
              }
            }}
            layoutRef={layoutRef}
            descriptionRef={descriptionRef}
            metricsRef={metricsRef}
          />
        </div>

        {/* Metrics Section */}
        <div ref={metricsRef} className="space-y-4 mb-6">
          {/* Dimensions and Count */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-300 flex items-center">
                <Ruler className="h-4 w-4 mr-2 text-gray-400" />
                Dimensiones totales: {width.toFixed(1)} × {height.toFixed(1)} mm
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-300 flex items-center">
                <Calculator className="h-4 w-4 mr-2 text-gray-400" />
                Cantidad de empaquetaduras: {gasketCount}
              </p>
              <p className="text-sm text-gray-300 mt-1 flex items-center">
                <Calculator className="h-4 w-4 mr-2 text-gray-400" />
                Precio unitario: ${unitPrice.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })} CLP
              </p>
            </div>
          </div>

          {/* Utilization Metrics */}
          <div className="bg-dark-900/50 p-4 rounded-lg border border-dark-600">
            <h5 className="text-sm font-medium text-gray-100 mb-3 flex items-center">
              <Gauge className="h-4 w-4 mr-2 text-indigo-400" />
              Métricas de Aprovechamiento
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-gray-400">Área Total</p>
                <p className="text-sm font-medium text-gray-200">
                  {utilization.totalArea.toLocaleString(undefined, {
                    maximumFractionDigits: 2
                  })} mm²
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Área Utilizada</p>
                <p className="text-sm font-medium text-gray-200">
                  {utilization.usedArea.toLocaleString(undefined, {
                    maximumFractionDigits: 2
                  })} mm²
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Eficiencia</p>
                <p className="text-sm font-medium text-gray-200">
                  {utilization.efficiency.toLocaleString(undefined, {
                    maximumFractionDigits: 1
                  })}%
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Área de Desperdicio</p>
                <p className="text-sm font-medium text-gray-200">
                  {utilization.wasteArea.toLocaleString(undefined, {
                    maximumFractionDigits: 2
                  })} mm²
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Layout Image */}
        <div ref={layoutRef}>
          <img 
            src={hexImageUrl} 
            alt="Disposición optimizada"
            className="mx-auto border border-dark-600 rounded-lg shadow-lg bg-dark-900"
          />
        </div>

        {/* Technical Description */}
        <div ref={descriptionRef} className="mt-6">
          <GasketDescription style="BA U" />
        </div>
      </div>
    </div>
  );
}