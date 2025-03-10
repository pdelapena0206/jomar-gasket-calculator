import React, { useState } from 'react';
import { 
  AlertCircle, 
  Calculator, 
  DollarSign,
  Ruler,
  Scale,
  CircleDot
} from 'lucide-react';

interface TeflonCalculatorProps {
  // Add props if needed
}

export function TeflonCalculator({}: TeflonCalculatorProps) {
  // Constants
  const EXCHANGE_RATE = 900;
  const PURE_TEFLON_COST_USD = 78.4;
  const CHARGED_TEFLON_COST_USD = 100.8;
  const PURE_TEFLON_COST_CLP = PURE_TEFLON_COST_USD * EXCHANGE_RATE;
  const CHARGED_TEFLON_COST_CLP = CHARGED_TEFLON_COST_USD * EXCHANGE_RATE;

  // State
  const [outerDiameter, setOuterDiameter] = useState('');
  const [innerDiameter, setInnerDiameter] = useState('');
  const [length, setLength] = useState('');
  const [results, setResults] = useState({
    purePriceCLP: 0,
    purePriceUSD: 0,
    chargedPriceCLP: 0,
    chargedPriceUSD: 0
  });
  const [error, setError] = useState('');

  const calculateTeflon = () => {
    try {
      const outer = parseFloat(outerDiameter);
      const inner = parseFloat(innerDiameter);
      const len = parseFloat(length);

      // Validation
      if (isNaN(outer) || isNaN(inner) || isNaN(len)) {
        throw new Error("Por favor, ingrese valores numéricos válidos.");
      }

      if (inner > outer) {
        throw new Error("El diámetro interior no puede ser mayor que el diámetro exterior.");
      }

      // Calculate volume (mm³)
      const volume = (Math.PI / 4) * (Math.pow(outer, 2) - Math.pow(inner, 2)) * len;

      // Convert volume to weight (kg)
      const density = 2.2; // g/cm³
      const weightKg = (volume * density) / (1000 * 1000);

      // Calculate prices
      const purePriceUSD = weightKg * PURE_TEFLON_COST_USD;
      const chargedPriceUSD = weightKg * CHARGED_TEFLON_COST_USD;
      const purePriceCLP = purePriceUSD * EXCHANGE_RATE;
      const chargedPriceCLP = chargedPriceUSD * EXCHANGE_RATE;

      setResults({
        purePriceCLP,
        purePriceUSD,
        chargedPriceCLP,
        chargedPriceUSD
      });
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error en el cálculo');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-dark-700/50 p-6 rounded-lg shadow-lg border border-dark-600">
        <h2 className="text-xl font-semibold text-gray-100 mb-6 flex items-center">
          <CircleDot className="h-6 w-6 mr-2 text-indigo-400" />
          CÁLCULO VALORES TEFLÓN (BOCINA - BARRA) DISPONIBLES EN BODEGA
        </h2>

        {/* Input Section */}
        <div className="bg-dark-800/50 p-4 rounded-lg border border-dark-700 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
                <Ruler className="h-4 w-4 mr-1 text-gray-400" />
                Ø EXTERIOR (MM)
              </label>
              <input
                type="number"
                value={outerDiameter}
                onChange={(e) => setOuterDiameter(e.target.value)}
                className="block w-full rounded-md border border-dark-600 bg-dark-800 py-2 px-3 text-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-300"
                placeholder="Ingrese diámetro exterior"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
                <Ruler className="h-4 w-4 mr-1 text-gray-400" />
                Ø INTERIOR (MM)
              </label>
              <input
                type="number"
                value={innerDiameter}
                onChange={(e) => setInnerDiameter(e.target.value)}
                className="block w-full rounded-md border border-dark-600 bg-dark-800 py-2 px-3 text-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-300"
                placeholder="Ingrese diámetro interior"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
                <Ruler className="h-4 w-4 mr-1 text-gray-400" />
                LARGO (MM)
              </label>
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="block w-full rounded-md border border-dark-600 bg-dark-800 py-2 px-3 text-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-300"
                placeholder="Ingrese largo"
              />
            </div>
          </div>
        </div>

        {/* Constants Section */}
        <div className="bg-dark-800/50 p-4 rounded-lg mb-6 border border-dark-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-sm text-gray-300 flex items-center">
              <DollarSign className="h-4 w-4 mr-1 text-gray-400" />
              KILO TEFLÓN PURO: US$ {PURE_TEFLON_COST_USD.toFixed(2)} / ${PURE_TEFLON_COST_CLP.toLocaleString()} CLP
            </div>
            <div className="text-sm text-gray-300 flex items-center">
              <DollarSign className="h-4 w-4 mr-1 text-gray-400" />
              KILO TEFLÓN C/CARGA: US$ {CHARGED_TEFLON_COST_USD.toFixed(2)} / ${CHARGED_TEFLON_COST_CLP.toLocaleString()} CLP
            </div>
          </div>
        </div>

        {/* Calculate Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={calculateTeflon}
            className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            <Calculator className="h-5 w-5 mr-2" />
            CALCULAR
          </button>
        </div>

        {/* Results Section */}
        <div className="bg-dark-800/50 p-4 rounded-lg mb-6 border border-dark-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-dark-900/50 p-4 rounded-lg border border-dark-600">
              <div className="text-sm font-semibold mb-2 text-gray-300 flex items-center">
                <Scale className="h-4 w-4 mr-1 text-gray-400" />
                TEFLÓN PURO
              </div>
              <div className="text-lg font-bold text-indigo-400">
                ${results.purePriceCLP.toLocaleString(undefined, { maximumFractionDigits: 0 })} CLP
              </div>
              <div className="text-sm text-gray-400">
                US$ {results.purePriceUSD.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </div>
            </div>
            <div className="bg-dark-900/50 p-4 rounded-lg border border-dark-600">
              <div className="text-sm font-semibold mb-2 text-gray-300 flex items-center">
                <Scale className="h-4 w-4 mr-1 text-gray-400" />
                TEFLÓN CON CARGA
              </div>
              <div className="text-lg font-bold text-indigo-400">
                ${results.chargedPriceCLP.toLocaleString(undefined, { maximumFractionDigits: 0 })} CLP
              </div>
              <div className="text-sm text-gray-400">
                US$ {results.chargedPriceUSD.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-300">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Warnings */}
        <div className="bg-dark-800/50 p-4 rounded-lg border border-dark-700 space-y-2">
          <div className="flex items-center text-red-400 text-sm">
            <AlertCircle className="h-4 w-4 mr-2" />
            CHEQUEAR INVENTARIOS AL COTIZAR.
          </div>
          <div className="flex items-center text-blue-400 text-sm">
            <AlertCircle className="h-4 w-4 mr-2" />
            EN CASO DE BARRA CONSIDERE DIÁMETRO INTERIOR "0".
          </div>
        </div>
      </div>
    </div>
  );
}