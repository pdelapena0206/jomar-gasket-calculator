import React, { useState } from 'react';
import { 
  Calculator, 
  Box, 
  FileSpreadsheet, 
  CircleDot, 
  Gauge, 
  Ruler, 
  Settings, 
  PlusCircle,
  Pipette,
  CircleDashed,
  Layers,
  Combine
} from 'lucide-react';
import { GasketLayout } from './components/GasketLayout';
import { TeflonCalculator } from './components/TeflonCalculator';
import { PlacotCalculator } from './components/PlacotCalculator';
import { GasketDescription } from './components/GasketDescription';
import { productData } from './utils/productData';
import { flangeData } from './utils/flangeData';
import { parseFormatDimensions } from './utils/dimensionUtils';

function App() {
  const [activeTab, setActiveTab] = useState('calculator');
  const [selectedProvider, setSelectedProvider] = useState('');
  const [selectedLine, setSelectedLine] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('');
  const [selectedThickness, setSelectedThickness] = useState('');

  // Flange-specific state
  const [selectedStandard, setSelectedStandard] = useState<'ANSI' | 'DIN'>('ANSI');
  const [selectedFaceType, setSelectedFaceType] = useState<'RF' | 'FF'>('RF');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

  // Layout parameters
  const [sheetDimensions, setSheetDimensions] = useState<{ width: number; height: number } | null>(null);

  // Get current product price
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

  // Reset thickness when format changes and update dimensions
  React.useEffect(() => {
    setSelectedThickness('');
    if (selectedFormat) {
      const dimensions = parseFormatDimensions(selectedFormat);
      setSheetDimensions(dimensions);
    } else {
      setSheetDimensions(null);
    }
  }, [selectedFormat]);

  // Reset flange-specific fields when standard changes
  React.useEffect(() => {
    setSelectedSize('');
    setSelectedClass('');
  }, [selectedStandard]);

  const getSelectedDiameters = () => {
    if (!selectedSize || !selectedClass) return null;
    return {
      inner: flangeData[selectedStandard].DIMENSIONES[selectedFaceType][selectedSize].ID,
      outer: flangeData[selectedStandard].DIMENSIONES[selectedFaceType][selectedSize][selectedClass]
    };
  };

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Navigation */}
      <nav className="bg-dark-800 shadow-lg border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-20">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <img 
                  src="/jomar-30-logo.png"
                  alt="JOMAR 30 AÑOS"
                  className="h-16 w-auto"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="border-b border-dark-700 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('calculator')}
              className={`${
                activeTab === 'calculator'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <Combine className="h-5 w-5 mr-2" />
              PARÁMETROS EMPAQUETADURAS
            </button>
            <button
              onClick={() => setActiveTab('teflon')}
              className={`${
                activeTab === 'teflon'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <Box className="h-5 w-5 mr-2" />
              TEFLONMATO
            </button>
            <button
              onClick={() => setActiveTab('placot')}
              className={`${
                activeTab === 'placot'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <FileSpreadsheet className="h-5 w-5 mr-2" />
              PLACOTEM
            </button>
          </nav>
        </div>

        {/* Content Sections */}
        <div className="bg-dark-800 shadow rounded-lg p-6">
          {activeTab === 'calculator' && (
            <div className="space-y-6">
              {/* Material Selection Section */}
              <div className="bg-dark-700/50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-100 mb-4 flex items-center">
                  <Layers className="h-5 w-5 mr-2 text-indigo-400" />
                  SELECCIÓN DE MATERIAL
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
                      <Box className="h-4 w-4 mr-1 text-gray-400" />
                      PROVEEDOR
                    </label>
                    <select 
                      value={selectedProvider}
                      onChange={(e) => setSelectedProvider(e.target.value)}
                      className="block w-full rounded-md border border-dark-600 bg-dark-800 py-2 pl-3 pr-10 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-gray-300"
                    >
                      <option value="">Seleccionar...</option>
                      {Object.keys(productData.providers).map(provider => (
                        <option key={provider} value={provider}>{provider}</option>
                      ))}
                    </select>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
                      <Layers className="h-4 w-4 mr-1 text-gray-400" />
                      LÍNEA
                    </label>
                    <select 
                      value={selectedLine}
                      onChange={(e) => setSelectedLine(e.target.value)}
                      className="block w-full rounded-md border border-dark-600 bg-dark-800 py-2 pl-3 pr-10 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-gray-300"
                    >
                      <option value="">Seleccionar...</option>
                      {selectedProvider && productData.providers[selectedProvider].map(line => (
                        <option key={line} value={line}>{line}</option>
                      ))}
                    </select>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
                      <Settings className="h-4 w-4 mr-1 text-gray-400" />
                      ESTILO
                    </label>
                    <select 
                      value={selectedStyle}
                      onChange={(e) => setSelectedStyle(e.target.value)}
                      className="block w-full rounded-md border border-dark-600 bg-dark-800 py-2 pl-3 pr-10 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-gray-300"
                    >
                      <option value="">Seleccionar...</option>
                      {selectedLine && productData.lines[selectedLine].map(style => (
                        <option key={style} value={style}>{style}</option>
                      ))}
                    </select>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
                      <Ruler className="h-4 w-4 mr-1 text-gray-400" />
                      FORMATO
                    </label>
                    <select 
                      value={selectedFormat}
                      onChange={(e) => setSelectedFormat(e.target.value)}
                      className="block w-full rounded-md border border-dark-600 bg-dark-800 py-2 pl-3 pr-10 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-gray-300"
                    >
                      <option value="">Seleccionar...</option>
                      {selectedStyle && productData.styles[selectedLine]?.[selectedStyle]?.map(format => (
                        <option key={format} value={format}>{format}</option>
                      ))}
                    </select>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
                      <Ruler className="h-4 w-4 mr-1 text-gray-400" />
                      ESPESOR
                    </label>
                    <select 
                      value={selectedThickness}
                      onChange={(e) => setSelectedThickness(e.target.value)}
                      className="block w-full rounded-md border border-dark-600 bg-dark-800 py-2 pl-3 pr-10 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-gray-300"
                    >
                      <option value="">Seleccionar...</option>
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
                </div>

                {selectedThickness && (
                  <div className="mt-4 p-4 bg-dark-800/50 rounded-md">
                    <p className="text-sm font-medium text-gray-100 flex items-center">
                      <Gauge className="h-4 w-4 mr-1 text-gray-400" />
                      PRECIO PLANCHA: ${getCurrentPrice().toLocaleString()} CLP
                    </p>
                  </div>
                )}
              </div>

              {selectedStyle && (
                <GasketDescription style={selectedStyle} />
              )}

              {/* Flange Parameters Section */}
              <div className="bg-dark-700/50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-100 mb-4 flex items-center">
                  <CircleDot className="h-5 w-5 mr-2 text-indigo-400" />
                  PARÁMETROS DE BRIDA
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
                      <Settings className="h-4 w-4 mr-1 text-gray-400" />
                      NORMA
                    </label>
                    <select 
                      value={selectedStandard}
                      onChange={(e) => setSelectedStandard(e.target.value as 'ANSI' | 'DIN')}
                      className="block w-full rounded-md border border-dark-600 bg-dark-800 py-2 pl-3 pr-10 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-gray-300"
                    >
                      <option value="ANSI">ANSI</option>
                      <option value="DIN">DIN</option>
                    </select>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
                      <CircleDot className="h-4 w-4 mr-1 text-gray-400" />
                      TIPO DE CARA
                    </label>
                    <select 
                      value={selectedFaceType}
                      onChange={(e) => setSelectedFaceType(e.target.value as 'RF' | 'FF')}
                      className="block w-full rounded-md border border-dark-600 bg-dark-800 py-2 pl-3 pr-10 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-gray-300"
                    >
                      <option value="RF">RAISED FACE (RF)</option>
                      <option value="FF">FLAT FACE (FF)</option>
                    </select>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
                      <Ruler className="h-4 w-4 mr-1 text-gray-400" />
                      MEDIDA
                    </label>
                    <select 
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="block w-full rounded-md border border-dark-600 bg-dark-800 py-2 pl-3 pr-10 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-gray-300"
                    >
                      <option value="">Seleccionar...</option>
                      {Object.keys(flangeData[selectedStandard].DIMENSIONES[selectedFaceType]).map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
                      <Gauge className="h-4 w-4 mr-1 text-gray-400" />
                      {selectedStandard === 'ANSI' ? 'CLASE' : 'PN'}
                    </label>
                    <select 
                      value={selectedClass}
                      onChange={(e) => setSelectedClass(e.target.value)}
                      className="block w-full rounded-md border border-dark-600 bg-dark-800 py-2 pl-3 pr-10 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-gray-300"
                    >
                      <option value="">Seleccionar...</option>
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
                </div>

                {selectedSize && selectedClass && (
                  <div className="mt-4 p-4 bg-dark-800/50 rounded-md">
                    <p className="text-sm font-medium text-gray-100 flex items-center">
                      <CircleDot className="h-4 w-4 mr-1 text-gray-400" />
                      DIÁMETRO INTERIOR (ID): {flangeData[selectedStandard].DIMENSIONES[selectedFaceType][selectedSize].ID} mm
                    </p>
                    <p className="text-sm font-medium text-gray-100 flex items-center mt-2">
                      <CircleDot className="h-4 w-4 mr-1 text-gray-400" />
                      DIÁMETRO EXTERIOR: {flangeData[selectedStandard].DIMENSIONES[selectedFaceType][selectedSize][selectedClass]} mm
                    </p>
                  </div>
                )}
              </div>

              {/* Layout Preview Section */}
              {sheetDimensions && getSelectedDiameters() && (
                <div className="bg-dark-700/50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-100 mb-4 flex items-center">
                    <Layers className="h-5 w-5 mr-2 text-indigo-400" />
                    VISTA PREVIA DE DISPOSICIÓN
                  </h3>
                  <div className="text-sm text-gray-300 mb-4">
                    <p className="flex items-center">
                      <Ruler className="h-4 w-4 mr-1" />
                      DIMENSIONES DE LA PLANCHA: {sheetDimensions.width.toFixed(1)} x {sheetDimensions.height.toFixed(1)} mm
                    </p>
                  </div>
                  <GasketLayout
                    width={sheetDimensions.width}
                    height={sheetDimensions.height}
                    outerDiameter={getSelectedDiameters()!.outer}
                    innerDiameter={getSelectedDiameters()!.inner}
                    sheetPrice={getCurrentPrice()}
                    faceType={selectedFaceType}
                    size={selectedSize}
                    standard={selectedStandard}
                  />
                </div>
              )}

              {/* Action buttons */}
              <div className="flex justify-end space-x-4">
                <button 
                  onClick={() => {
                    setSelectedProvider('');
                    setSelectedLine('');
                    setSelectedStyle('');
                    setSelectedFormat('');
                    setSelectedThickness('');
                    setSelectedStandard('ANSI');
                    setSelectedFaceType('RF');
                    setSelectedSize('');
                    setSelectedClass('');
                    setSheetDimensions(null);
                  }}
                  className="bg-dark-700 py-2 px-4 border border-dark-600 rounded-md shadow-sm text-sm font-medium text-gray-300 hover:bg-dark-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center"
                >
                  <Pipette className="h-4 w-4 mr-2" />
                  LIMPIAR
                </button>
                <button className="bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center">
                  <Calculator className="h-4 w-4 mr-2" />
                  CALCULAR
                </button>
              </div>
            </div>
          )}

          {activeTab === 'teflon' && (
            <TeflonCalculator />
          )}

          {activeTab === 'placot' && (
            <PlacotCalculator />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;