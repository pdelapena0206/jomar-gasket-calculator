import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { productData } from '../utils/productData';
import { flangeData } from '../utils/flangeData';
import { parseFormatDimensions } from '../utils/dimensionUtils';
import { GasketItem } from '../types';
import { MultiGasketLayout } from './MultiGasketLayout';

export function MultiGasketCalculator() {
  const [selectedProvider, setSelectedProvider] = useState('');
  const [selectedLine, setSelectedLine] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('');
  const [selectedThickness, setSelectedThickness] = useState('');
  const [gasketList, setGasketList] = useState<GasketItem[]>([]);
  const [sheetDimensions, setSheetDimensions] = useState<{ width: number; height: number } | null>(null);

  // Reset dependent fields when provider changes
  useEffect(() => {
    setSelectedLine('');
    setSelectedStyle('');
    setSelectedFormat('');
    setSelectedThickness('');
  }, [selectedProvider]);

  // Reset dependent fields when line changes
  useEffect(() => {
    setSelectedStyle('');
    setSelectedFormat('');
    setSelectedThickness('');
  }, [selectedLine]);

  // Reset dependent fields when style changes
  useEffect(() => {
    setSelectedFormat('');
    setSelectedThickness('');
  }, [selectedStyle]);

  // Update dimensions when format changes
  useEffect(() => {
    setSelectedThickness('');
    if (selectedFormat) {
      const dimensions = parseFormatDimensions(selectedFormat);
      setSheetDimensions(dimensions);
    } else {
      setSheetDimensions(null);
    }
  }, [selectedFormat]);

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

  const addGasket = () => {
    setGasketList([...gasketList, {
      standard: 'ANSI',
      faceType: 'RF',
      size: '',
      class: '',
      quantity: 1,
      innerDiameter: 0,
      outerDiameter: 0
    }]);
  };

  const removeGasket = (index: number) => {
    setGasketList(gasketList.filter((_, i) => i !== index));
  };

  const updateGasket = (index: number, updates: Partial<GasketItem>) => {
    const newList = [...gasketList];
    newList[index] = { ...newList[index], ...updates };

    // Update diameters if size and class are selected
    if (updates.size || updates.class || updates.standard || updates.faceType) {
      const gasket = newList[index];
      if (gasket.size && gasket.class) {
        const dimensions = flangeData[gasket.standard].DIMENSIONES[gasket.faceType][gasket.size];
        newList[index] = {
          ...gasket,
          innerDiameter: dimensions.ID,
          outerDiameter: dimensions[gasket.class]
        };
      }
    }

    setGasketList(newList);
  };

  return (
    <div className="space-y-6">
      {/* Material Selection */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Selección de Material</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Proveedor
            </label>
            <select 
              value={selectedProvider}
              onChange={(e) => setSelectedProvider(e.target.value)}
              className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="">Seleccionar...</option>
              {Object.keys(productData.providers).map(provider => (
                <option key={provider} value={provider}>{provider}</option>
              ))}
            </select>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Línea
            </label>
            <select 
              value={selectedLine}
              onChange={(e) => setSelectedLine(e.target.value)}
              className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="">Seleccionar...</option>
              {selectedProvider && productData.providers[selectedProvider].map(line => (
                <option key={line} value={line}>{line}</option>
              ))}
            </select>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estilo
            </label>
            <select 
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="">Seleccionar...</option>
              {selectedLine && productData.lines[selectedLine].map(style => (
                <option key={style} value={style}>{style}</option>
              ))}
            </select>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Formato
            </label>
            <select 
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="">Seleccionar...</option>
              {selectedStyle && productData.styles[selectedLine]?.[selectedStyle]?.map(format => (
                <option key={format} value={format}>{format}</option>
              ))}
            </select>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Espesor
            </label>
            <select 
              value={selectedThickness}
              onChange={(e) => setSelectedThickness(e.target.value)}
              className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
          <div className="mt-4 p-4 bg-gray-100 rounded-md">
            <p className="text-sm font-medium text-gray-900">
              Precio plancha: ${getCurrentPrice().toLocaleString()} CLP
            </p>
          </div>
        )}
      </div>

      {/* Gasket List */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Lista de Empaquetaduras</h3>
          <button
            onClick={addGasket}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="h-4 w-4 mr-1" />
            Agregar
          </button>
        </div>

        <div className="space-y-4">
          {gasketList.map((gasket, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Norma
                  </label>
                  <select
                    value={gasket.standard}
                    onChange={(e) => updateGasket(index, { standard: e.target.value as 'ANSI' | 'DIN' })}
                    className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm"
                  >
                    <option value="ANSI">ANSI</option>
                    <option value="DIN">DIN</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de Cara
                  </label>
                  <select
                    value={gasket.faceType}
                    onChange={(e) => updateGasket(index, { faceType: e.target.value as 'RF' | 'FF' })}
                    className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm"
                  >
                    <option value="RF">Raised Face (RF)</option>
                    <option value="FF">Flat Face (FF)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Medida
                  </label>
                  <select
                    value={gasket.size}
                    onChange={(e) => updateGasket(index, { size: e.target.value })}
                    className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm"
                  >
                    <option value="">Seleccionar...</option>
                    {Object.keys(flangeData[gasket.standard].DIMENSIONES[gasket.faceType]).map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {gasket.standard === 'ANSI' ? 'Clase' : 'PN'}
                  </label>
                  <select
                    value={gasket.class}
                    onChange={(e) => updateGasket(index, { class: e.target.value })}
                    className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm"
                  >
                    <option value="">Seleccionar...</option>
                    {gasket.standard === 'ANSI'
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cantidad
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={gasket.quantity}
                    onChange={(e) => updateGasket(index, { quantity: parseInt(e.target.value) || 1 })}
                    className="block w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    onClick={() => removeGasket(index)}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Eliminar
                  </button>
                </div>
              </div>

              {gasket.size && gasket.class && (
                <div className="mt-2 text-sm text-gray-600">
                  <p>Diámetro Interior: {gasket.innerDiameter} mm</p>
                  <p>Diámetro Exterior: {gasket.outerDiameter} mm</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Layout Preview */}
      {sheetDimensions && gasketList.length > 0 && gasketList.every(g => g.size && g.class) && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Vista Previa de Disposición</h3>
          <div className="text-sm text-gray-600 mb-4">
            <p>Dimensiones de la plancha: {sheetDimensions.width.toFixed(1)} x {sheetDimensions.height.toFixed(1)} mm</p>
          </div>
          <MultiGasketLayout
            width={sheetDimensions.width}
            height={sheetDimensions.height}
            gaskets={gasketList}
            sheetPrice={getCurrentPrice()}
          />
        </div>
      )}
    </div>
  );
}