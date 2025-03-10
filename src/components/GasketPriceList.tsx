import React from 'react';
import { DollarSign, Ruler } from 'lucide-react';

interface GasketPriceListProps {
  mainGaskets: Array<{
    size: string;
    innerDiameter: number;
    outerDiameter: number;
    price: number;
    area?: number;
    isNested?: boolean;
  }>;
  nestedGaskets?: Array<{
    size: string;
    innerDiameter: number;
    outerDiameter: number;
    price: number;
    area?: number;
    isNested: boolean;
  }>;
}

function calculateGasketArea(innerDiameter: number, outerDiameter: number): number {
  return Math.PI * (Math.pow(outerDiameter/2, 2) - Math.pow(innerDiameter/2, 2));
}

function formatArea(areaInMm2: number): string {
  return `${Math.round(areaInMm2).toLocaleString()} mm²`;
}

export function GasketPriceList({ mainGaskets }: GasketPriceListProps) {
  const consolidateGaskets = (gaskets: typeof mainGaskets) => {
    const consolidated = new Map<string, {
      size: string;
      innerDiameter: number;
      outerDiameter: number;
      price: number;
      isNested?: boolean;
      count: number;
      area: number;
      unitArea: number;
    }>();

    gaskets.forEach(gasket => {
      if (!gasket.isNested) {
        const key = `${gasket.size}-${gasket.innerDiameter}-${gasket.outerDiameter}`;
        const area = gasket.area || calculateGasketArea(gasket.innerDiameter, gasket.outerDiameter);
        const unitArea = area / (gasket.count || 1);
        
        if (!consolidated.has(key)) {
          consolidated.set(key, { 
            ...gasket, 
            count: 1, 
            area,
            unitArea
          });
        } else {
          const existing = consolidated.get(key)!;
          existing.count++;
        }
      }
    });

    return Array.from(consolidated.values());
  };

  const consolidatedMain = consolidateGaskets(mainGaskets);
  const allGaskets = consolidatedMain.sort((a, b) => b.outerDiameter - a.outerDiameter);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-dark-700">
        <thead className="bg-dark-800">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Tipo
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Medida
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Cantidad
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Ø Interior
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Ø Exterior
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Área Total
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Área Unitaria
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
              Precio Unitario
            </th>
          </tr>
        </thead>
        <tbody className="bg-dark-800 divide-y divide-dark-700">
          {allGaskets.map((gasket, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                Principal
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {gasket.size}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {gasket.count}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {gasket.innerDiameter.toFixed(1)} mm
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {gasket.outerDiameter.toFixed(1)} mm
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {formatArea(gasket.area)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {formatArea(gasket.unitArea)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-right">
                ${Math.round(gasket.price).toLocaleString()} CLP
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}