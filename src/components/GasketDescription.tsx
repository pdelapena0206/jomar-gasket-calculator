import React from 'react';
import { Thermometer, Gauge, FlaskRound as Flask, CheckCircle2, Target, Wrench, Info, FileDown } from 'lucide-react';
import { gasketDescriptions } from '../utils/gasketDescriptions';

interface GasketDescriptionProps {
  style: string;
}

export function GasketDescription({ style }: GasketDescriptionProps) {
  const description = gasketDescriptions[style];

  if (!description) {
    return null;
  }

  return (
    <div className="bg-dark-700/50 p-4 rounded-lg border border-dark-600 mt-4">
      <div className="flex justify-between items-start mb-4">
        <h4 className="text-sm font-medium text-gray-100 flex items-center">
          <Info className="h-4 w-4 mr-2 text-indigo-400" />
          INFORMACIÓN TÉCNICA - {style}
        </h4>
        {description.dataSheet && (
          <a 
            href={description.dataSheet}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-2 rounded-md border border-indigo-600 text-sm font-medium text-indigo-400 hover:bg-indigo-600/10 hover:text-indigo-300 transition-colors duration-200"
          >
            <FileDown className="h-4 w-4 mr-2" />
            Descargar Ficha Técnica
          </a>
        )}
      </div>

      <div className="space-y-4">
        {/* Description */}
        <div className="text-sm text-gray-300">
          {description.description}
        </div>

        {/* Specifications */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-dark-900/50 p-3 rounded-lg border border-dark-600">
            <div className="flex items-center text-gray-300 mb-1">
              <Thermometer className="h-4 w-4 mr-2 text-indigo-400" />
              Temperatura Máxima
            </div>
            <div className="text-lg font-semibold text-gray-100">
              {description.specifications.maxTemp}
            </div>
          </div>

          <div className="bg-dark-900/50 p-3 rounded-lg border border-dark-600">
            <div className="flex items-center text-gray-300 mb-1">
              <Gauge className="h-4 w-4 mr-2 text-indigo-400" />
              Presión Máxima
            </div>
            <div className="text-lg font-semibold text-gray-100">
              {description.specifications.maxPressure}
            </div>
          </div>

          <div className="bg-dark-900/50 p-3 rounded-lg border border-dark-600">
            <div className="flex items-center text-gray-300 mb-1">
              <Flask className="h-4 w-4 mr-2 text-indigo-400" />
              Rango pH
            </div>
            <div className="text-lg font-semibold text-gray-100">
              {description.specifications.ph}
            </div>
          </div>
        </div>

        {/* Features and Applications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center text-gray-100 mb-2">
              <CheckCircle2 className="h-4 w-4 mr-2 text-indigo-400" />
              Características
            </div>
            <ul className="space-y-1">
              {description.features.map((feature, index) => (
                <li key={index} className="text-sm text-gray-300 flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center text-gray-100 mb-2">
              <Target className="h-4 w-4 mr-2 text-indigo-400" />
              Aplicaciones
            </div>
            <ul className="space-y-1">
              {description.applications.map((application, index) => (
                <li key={index} className="text-sm text-gray-300 flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  {application}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}