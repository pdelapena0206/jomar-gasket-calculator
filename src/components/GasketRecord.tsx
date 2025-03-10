import React from 'react';
import { Trash2 } from 'lucide-react';

interface GasketRecordProps {
  records: Array<{
    id: string;
    provider: string;
    line: string;
    style: string;
    standard: 'ANSI' | 'DIN';
    faceType: 'RF' | 'FF';
    size: string;
    class: string;
    quantity: number;
  }>;
  onDelete: (id: string) => void;
}

export function GasketRecord({ records, onDelete }: GasketRecordProps) {
  if (records.length === 0) {
    return (
      <div className="text-center text-gray-400 py-4">
        No hay empaquetaduras registradas
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-dark-700">
        <thead className="bg-dark-800">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Proveedor
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Línea
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Estilo
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Norma
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Tipo
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Medida
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Clase/PN
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Cantidad
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-dark-800 divide-y divide-dark-700">
          {records.map((record) => (
            <tr key={record.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{record.provider}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{record.line}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{record.style}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{record.standard}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{record.faceType}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{record.size}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{record.class}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{record.quantity}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                <button
                  onClick={() => onDelete(record.id)}
                  className="text-red-400 hover:text-red-300 transition-colors duration-200"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}