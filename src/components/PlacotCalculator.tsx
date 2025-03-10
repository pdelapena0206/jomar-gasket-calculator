import React, { useState } from 'react';
import { 
  AlertCircle, 
  Calculator, 
  Box, 
  Layers, 
  Settings, 
  Ruler, 
  CircleDot, 
  Gauge, 
  PlusCircle, 
  Trash2, 
  LayoutGrid,
  FileSpreadsheet,
  DollarSign,
  BarChart,
  Combine
} from 'lucide-react';
import { productData } from '../utils/productData';
import { flangeData } from '../utils/flangeData';
import { PlacotLayout } from './PlacotLayout';
import { optimizeGasketLayout } from '../utils/layoutOptimizer';
import { parseFormatDimensions } from '../utils/dimensionUtils';
import { GasketRecord } from './GasketRecord';
import { GasketPriceList } from './GasketPriceList';
import { GasketItem } from '../types';

interface LayoutSheet {
  gaskets: Array<{
    outerDiameter: number;
    innerDiameter: number;
    x: number;
    y: number;
    isNested?: boolean;
    size?: string;
    price?: number;
  }>;
  sheetNumber: number;
}

interface GasketRecordType {
  id: string;
  provider: string;
  line: string;
  style: string;
  standard: 'ANSI' | 'DIN';
  faceType: 'RF' | 'FF';
  size: string;
  class: string;
  quantity: number;
}

// Constants
const SHEET_AREA_M2 = 2.25; // 60" x 60" sheet area in m²

export function PlacotCalculator() {
  // State for dropdowns
  const [selectedProvider, setSelectedProvider] = useState('');
  const [selectedLine, setSelectedLine] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('');
  const [selectedThickness, setSelectedThickness] = useState('');
  const [selectedStandard, setSelectedStandard] = useState<'ANSI' | 'DIN'>('ANSI');
  const [selectedFaceType, setSelectedFaceType] = useState<'RF' | 'FF'>('RF');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [quantity, setQuantity] = useState('1');

  // State for gasket records
  const [gasketRecords, setGasketRecords] = useState<GasketRecordType[]>([]);

  // State for layout results
  const [layoutResults, setLayoutResults] = useState<{
    sheets: LayoutSheet[];
    efficiency: number;
    sheetsNeeded: number;
    totalPrice: number;
    pricePerM2: number;
    sheetArea: number;
  } | null>(null);

  // Loading state
  const [isCalculating, setIsCalculating] = useState(false);
  const [progress, setProgress] = useState(0);

  // Reset dependent fields when provider changes
  React.useEffect(() => {
    setSelectedLine('');
    setSelectedStyle('');
    setSelectedFormat('');
    setSelectedThickness('');
  }, [selectedProvider]);

  // Reset dependent fields when line changes
  React.useEffect(() => {
    setSelectedStyle('');
    setSelectedFormat('');
    setSelectedThickness('');
  }, [selectedLine]);

  // Reset dependent fields when style changes
  React.useEffect(() => {
    setSelectedFormat('');
    setSelectedThickness('');
  }, [selectedStyle]);

  // Reset dependent fields when standard changes
  React.useEffect(() => {
    setSelectedSize('');
    setSelectedClass('');
  }, [selectedStandard]);

  const getCurrentPrice = () => {
    if (!selectedProvider || !selectedLine || !selectedStyle || !selectedFormat || !selectedThickness) {
      return 0;
    }
    const product = productData.products.find(p => 
      p.proveedor === selectedProvider &&
      p.linea === selectedLine &&
      p.estilo === selectedStyle &&
      p.formato === selectedFormat &&
      p.espesor === selectedThickness
    );
    return product?.precio_clp || 0;
  };

  const addGasketRecord = () => {
    const missingFields = [];
    
    if (!selectedProvider) missingFields.push('Proveedor');
    if (!selectedLine) missingFields.push('Línea');
    if (!selectedStyle) missingFields.push('Estilo');
    if (!selectedFormat) missingFields.push('Formato');
    if (!selectedThickness) missingFields.push('Espesor');
    if (!selectedSize) missingFields.push('Medida');
    if (!selectedClass) missingFields.push('Clase/PN');

    if (missingFields.length > 0) {
      alert(`Por favor complete los siguientes campos:\n${missingFields.join('\n')}`);
      return;
    }

    const newRecord: GasketRecordType = {
      id: Date.now().toString(),
      provider: selectedProvider,
      line: selectedLine,
      style: selectedStyle,
      standard: selectedStandard,
      faceType: selectedFaceType,
      size: selectedSize,
      class: selectedClass,
      quantity: parseInt(quantity) || 1
    };

    setGasketRecords(prev => [...prev, newRecord]);
    setLayoutResults(null);

    // Reset selection fields after adding
    setSelectedSize('');
    setSelectedClass('');
    setQuantity('1');
  };

  const deleteGasketRecord = (id: string) => {
    setGasketRecords(prev => prev.filter(record => record.id !== id));
    setLayoutResults(null);
  };

  const simulateProgress = () => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
      }
    }, 1000);
    return interval;
  };

  const calculateLayout = async () => {
    if (!gasketRecords || gasketRecords.length === 0 || !selectedFormat) {
      alert('Agregue al menos una empaquetadura y seleccione un formato de plancha');
      return;
    }

    const sheetDimensions = parseFormatDimensions(selectedFormat);
    if (!sheetDimensions) {
      alert('Error al procesar las dimensiones del formato seleccionado');
      return;
    }

    try {
      setIsCalculating(true);
      setProgress(0);
      const progressInterval = simulateProgress();

      // Convert records to GasketItems
      const gasketItems: GasketItem[] = gasketRecords.map(record => {
        const dimensions = flangeData[record.standard].DIMENSIONES[record.faceType][record.size];
        if (!dimensions) {
          throw new Error(`No se encontraron dimensiones para la medida ${record.size}`);
        }
        return {
          id: record.id,
          innerDiameter: dimensions.ID,
          outerDiameter: dimensions[record.class],
          quantity: record.quantity,
          size: record.size,
          standard: record.standard,
          faceType: record.faceType,
          class: record.class
        };
      });

      // Simulate calculation time
      await new Promise(resolve => setTimeout(resolve, 10000));

      // Calculate optimal layout for all sheets
      const sheetPrice = getCurrentPrice();
      const allLayouts = optimizeGasketLayout({
        sheetWidth: sheetDimensions.width,
        sheetHeight: sheetDimensions.height,
        gaskets: gasketItems,
        sheetPrice
      });

      // Convert layouts to sheets
      const sheets = allLayouts.sheets.map((sheetLayout, index) => ({
        gaskets: sheetLayout.positions.map(pos => ({
          outerDiameter: pos.gasket.outerDiameter,
          innerDiameter: pos.gasket.innerDiameter,
          x: pos.x,
          y: pos.y,
          isNested: pos.gasket.isNested,
          size: pos.gasket.size,
          price: pos.gasket.price,
          area: pos.gasket.area
        })),
        sheetNumber: index + 1
      }));

      // Calculate total price and price per m²
      const totalPrice = sheetPrice * allLayouts.sheetsNeeded;
      const totalArea = SHEET_AREA_M2 * allLayouts.sheetsNeeded;
      const pricePerM2 = totalPrice / totalArea;

      clearInterval(progressInterval);
      setProgress(100);

      setTimeout(() => {
        setLayoutResults({
          sheets,
          efficiency: allLayouts.efficiency,
          sheetsNeeded: allLayouts.sheetsNeeded,
          totalPrice,
          pricePerM2,
          sheetArea: SHEET_AREA_M2
        });
        setIsCalculating(false);
        setProgress(0);
      }, 500);

    } catch (error) {
      alert(`Error al calcular la disposición: ${error.message}`);
      setIsCalculating(false);
      setProgress(0);
    }
  };

  return (
    <div className="space-y-6">
      {/* Technical Specifications */}
      <div className="bg-dark-700/50 p-4 rounded-lg border border-dark-600">
        <h3 className="text-lg font-medium text-gray-100 mb-4 flex items-center">
          <Settings className="h-5 w-5 mr-2 text-indigo-400" />
          ESPECIFICACIONES TÉCNICAS
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 flex items-center">
              <Box className="h-4 w-4 mr-1 text-gray-400" />
              PROVEEDOR
            </label>
            <select
              value={selectedProvider}
              onChange={(e) => setSelectedProvider(e.target.value)}
              className="mt-1 block w-full rounded-md border-dark-600 bg-dark-800 py-2 pl-3 pr-10 text-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-300"
            >
              <option value="">SELECCIONAR...</option>
              {Object.keys(productData.providers).map(provider => (
                <option key={provider} value={provider}>{provider}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 flex items-center">
              <Layers className="h-4 w-4 mr-1 text-gray-400" />
              LÍNEA
            </label>
            <select
              value={selectedLine}
              onChange={(e) => setSelectedLine(e.target.value)}
              className="mt-1 block w-full rounded-md border-dark-600 bg-dark-800 py-2 pl-3 pr-10 text-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-300"
            >
              <option value="">SELECCIONAR...</option>
              {selectedProvider && productData.providers[selectedProvider].map(line => (
                <option key={line} value={line}>{line}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 flex items-center">
              <Settings className="h-4 w-4 mr-1 text-gray-400" />
              ESTILO
            </label>
            <select
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              className="mt-1 block w-full rounded-md border-dark-600 bg-dark-800 py-2 pl-3 pr-10 text-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-300"
            >
              <option value="">SELECCIONAR...</option>
              {selectedLine && productData.lines[selectedLine]?.map(style => (
                <option key={style} value={style}>{style}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 flex items-center">
              <Ruler className="h-4 w-4 mr-1 text-gray-400" />
              FORMATO
            </label>
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="mt-1 block w-full rounded-md border-dark-600 bg-dark-800 py-2 pl-3 pr-10 text-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-300"
            >
              <option value="">SELECCIONAR...</option>
              {selectedStyle && productData.styles[selectedLine]?.[selectedStyle]?.map(format => (
                <option key={format} value={format}>{format}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 flex items-center">
              <Ruler className="h-4 w-4 mr-1 text-gray-400" />
              ESPESOR
            </label>
            <select
              value={selectedThickness}
              onChange={(e) => setSelectedThickness(e.target.value)}
              className="mt-1 block w-full rounded-md border-dark-600 bg-dark-800 py-2 pl-3 pr-10 text-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-300"
            >
              <option value="">SELECCIONAR...</option>
              {selectedFormat && productData.products
                .filter(p => 
                  p.proveedor === selectedProvider &&
                  p.linea === selectedLine &&
                  p.estilo === selectedStyle &&
                  p.formato === selectedFormat
                )
                .map(p => (
                  <option key={p.espesor} value={p.espesor}>{p.espesor}</option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 flex items-center">
              <Settings className="h-4 w-4 mr-1 text-gray-400" />
              NORMA
            </label>
            <select
              value={selectedStandard}
              onChange={(e) => setSelectedStandard(e.target.value as 'ANSI' | 'DIN')}
              className="mt-1 block w-full rounded-md border-dark-600 bg-dark-800 py-2 pl-3 pr-10 text-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-300"
            >
              <option value="ANSI">ANSI</option>
              <option value="DIN">DIN</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 flex items-center">
              <CircleDot className="h-4 w-4 mr-1 text-gray-400" />
              TIPO
            </label>
            <select
              value={selectedFaceType}
              onChange={(e) => setSelectedFaceType(e.target.value as 'RF' | 'FF')}
              className="mt-1 block w-full rounded-md border-dark-600 bg-dark-800 py-2 pl-3 pr-10 text-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-300"
            >
              <option value="RF">RAISED FACE (RF)</option>
              <option value="FF">FLAT FACE (FF)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 flex items-center">
              <Ruler className="h-4 w-4 mr-1 text-gray-400" />
              MEDIDA
            </label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="mt-1 block w-full rounded-md border-dark-600 bg-dark-800 py-2 pl-3 pr-10 text-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-300"
            >
              <option value="">SELECCIONAR...</option>
              {Object.keys(flangeData[selectedStandard].DIMENSIONES[selectedFaceType]).map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 flex items-center">
              <Gauge className="h-4 w-4 mr-1 text-gray-400" />
              CLASE/PN
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="mt-1 block w-full rounded-md border-dark-600 bg-dark-800 py-2 pl-3 pr-10 text-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-300"
            >
              <option value="">SELECCIONAR...</option>
              {selectedStandard === 'ANSI' 
                ? flangeData.ANSI.CLASES?.map(clase => (
                    <option key={clase} value={clase}>{clase}</option>
                  ))
                : flangeData.DIN.PN?.map(pn => (
                    <option key={pn} value={pn}>{pn}</option>
                  ))
              }
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 flex items-center">
              <BarChart className="h-4 w-4 mr-1 text-gray-400" />
              CANTIDAD
            </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="mt-1 block w-full rounded-md border-dark-600 bg-dark-800 py-2 px-3 text-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-300"
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={addGasketRecord}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            AGREGAR EMPAQUETADURA
          </button>
        </div>
      </div>

      {/* Gasket Records */}
      {gasketRecords.length > 0 && (
        <div className="bg-dark-700/50 p-4 rounded-lg border border-dark-600">
          <h3 className="text-lg font-medium text-gray-100 mb-4 flex items-center">
            <FileSpreadsheet className="h-5 w-5 mr-2 text-indigo-400" />
            EMPAQUETADURAS REGISTRADAS
          </h3>
          <GasketRecord
            records={gasketRecords}
            onDelete={deleteGasketRecord}
          />
        </div>
      )}

      {/* Calculate Button */}
      <div className="flex justify-center">
        <button
          onClick={calculateLayout}
          disabled={isCalculating}
          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
            isCalculating ? 'bg-dark-600 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        >
          <Calculator className="h-5 w-5 mr-2" />
          {isCalculating ? 'CALCULANDO...' : 'CALCULAR'}
        </button>
      </div>

      {/* Loading Progress */}
      {isCalculating && (
        <div className="bg-dark-700/50 p-4 rounded-lg border border-dark-600">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-300">Calculando disposición...</span>
            <span className="text-sm font-medium text-gray-300">{progress}%</span>
          </div>
          <div className="w-full bg-dark-600 rounded-full h-2.5">
            <div 
              className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Results */}
      {layoutResults && (
        <div className="bg-dark-700/50 p-4 rounded-lg border border-dark-600">
          <h3 className="text-lg font-medium text-gray-100 mb-4 flex items-center">
            <BarChart className="h-5 w-5 mr-2 text-indigo-400" />
            RESULTADOS
          </h3>
          
          {/* Sheet Information */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-dark-800/50 p-4 rounded-lg border border-dark-700">
              <h4 className="text-sm font-medium text-gray-100 mb-2 flex items-center">
                <Layers className="h-4 w-4 mr-1 text-gray-400" />
                INFORMACIÓN DE PLANCHA
              </h4>
              <div className="space-y-2">
                <p className="text-sm text-gray-300 flex items-center">
                  <Ruler className="h-4 w-4 mr-1 text-gray-400" />
                  Área por plancha: {layoutResults.sheetArea.toFixed(2)} m²
                </p>
                <p className="text-sm text-gray-300 flex items-center">
                  <DollarSign className="h-4 w-4 mr-1 text-gray-400" />
                  Precio por m²: ${Math.round(layoutResults.pricePerM2).toLocaleString()} CLP/m²
                </p>
                <p className="text-sm text-gray-300 flex items-center">
                  <BarChart className="h-4 w-4 mr-1 text-gray-400" />
                  Planchas necesarias: {layoutResults.sheetsNeeded}
                </p>
                <p className="text-sm text-gray-300 flex items-center">
                  <Gauge className="h-4 w-4 mr-1 text-gray-400" />
                  Eficiencia de uso: {layoutResults.efficiency.toFixed(1)}%
                </p>
              </div>
            </div>

            <div className="bg-dark-800/50 p-4 rounded-lg border border-dark-700">
              <h4 className="text-sm font-medium text-gray-100 mb-2 flex items-center">
                <DollarSign className="h-4 w-4 mr-1 text-gray-400" />
                COSTOS TOTALES
              </h4>
              <div className="space-y-2">
                <p className="text-sm text-gray-300 flex items-center">
                  <DollarSign className="h-4 w-4 mr-1 text-gray-400" />
                  Precio total: ${layoutResults.totalPrice.toLocaleString()} CLP
                </p>
                <p className="text-sm text-gray-300 flex items-center">
                  <Ruler className="h-4 w-4 mr-1 text-gray-400" />
                  Área total: {(layoutResults.sheetArea * layoutResults.sheetsNeeded).toFixed(2)} m²
                </p>
              </div>
            </div>
          </div>

          {/* Price List */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-100 mb-2 flex items-center">
              <FileSpreadsheet className="h-4 w-4 mr-1 text-gray-400" />
              LISTA DE PRECIOS POR EMPAQUETADURA
            </h4>
            <GasketPriceList 
              mainGaskets={layoutResults.sheets.flatMap(sheet => 
                sheet.gaskets.filter(g => !g.isNested)
              )}
            />
          </div>

          {/* Layout Visualization */}
          {layoutResults.sheets.length > 0 && selectedFormat && (
            <div>
              <h4 className="text-sm font-medium text-gray-100 mb-2 flex items-center">
                <LayoutGrid className="h-4 w-4 mr-1 text-gray-400" />
                VISTA PREVIA DE DISPOSICIÓN
              </h4>
              <div className="space-y-4">
                {layoutResults.sheets.map((sheet, index) => (
                  <div key={index} className="bg-dark-800/50 p-4 rounded-lg border border-dark-700">
                    <PlacotLayout
                      width={parseFormatDimensions(selectedFormat)!.width}
                      height={parseFormatDimensions(selectedFormat)!.height}
                      gaskets={sheet.gaskets}
                      scale={0.5}
                      sheetNumber={sheet.sheetNumber}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}