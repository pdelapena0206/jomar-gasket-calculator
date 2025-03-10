import React, { useState } from 'react';
import { FileDown } from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface PDFExportProps {
  gasketInfo: {
    manufacturer: string;
    distributor: string;
    line: string;
    style: string;
    format: string;
    thickness: string;
    standard: string;
    faceType: string;
    size: string;
    class: string;
    price: number;
    metrics: {
      gasketCount: number;
      unitPrice: number;
      totalArea: number;
      usedArea: number;
      efficiency: number;
      wasteArea: number;
    };
  };
  layoutRef: React.RefObject<HTMLDivElement>;
  descriptionRef: React.RefObject<HTMLDivElement>;
  metricsRef: React.RefObject<HTMLDivElement>;
}

// Store the last reference number in localStorage
const getNextReferenceNumber = () => {
  const lastRef = localStorage.getItem('lastPdfRef') || '0';
  const nextRef = (parseInt(lastRef) + 1).toString().padStart(4, '0');
  localStorage.setItem('lastPdfRef', nextRef);
  return nextRef;
};

export function PDFExport({ gasketInfo, layoutRef, descriptionRef, metricsRef }: PDFExportProps) {
  const exportToPDF = async () => {
    try {
      // Initialize PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // PDF Configuration
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - (2 * margin);
      let yPos = 30;

      // Header with title
      pdf.setFillColor(30, 41, 59); // Dark blue header
      pdf.rect(0, 0, pageWidth, 50, 'F');

      // Add title
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(24);
      pdf.text('JOMAR', margin, 25);
      pdf.setFontSize(16);
      pdf.text('Cálculo de Empaquetaduras', margin, 35);

      yPos = 70;

      // Document Info Box
      pdf.setDrawColor(200, 200, 200);
      pdf.setFillColor(248, 250, 252);
      pdf.rect(margin, yPos - 10, contentWidth, 35, 'F');
      
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(12);
      const date = new Date().toLocaleDateString('es-CL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      // Generate reference number with author initials
      const refNumber = getNextReferenceNumber();
      const reference = `PDLP-${refNumber}`;
      
      pdf.text(`Fecha: ${date}`, margin + 5, yPos);
      pdf.text(`Referencia: ${reference}`, pageWidth - margin - 60, yPos);
      pdf.text('Creado por: Patricio de la Peña', margin + 5, yPos + 15);

      yPos += 40;

      // Material Parameters Section
      pdf.setFillColor(30, 41, 59);
      pdf.rect(margin, yPos - 8, contentWidth, 12, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(14);
      pdf.text('PARÁMETROS DE MATERIAL', margin + 5, yPos);

      yPos += 10;
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(12);

      const materialParams = [
        ['Marca', gasketInfo.manufacturer],
        ['Distribuidor', gasketInfo.distributor],
        ['Línea', gasketInfo.line],
        ['Estilo', gasketInfo.style],
        ['Formato', gasketInfo.format],
        ['Espesor', gasketInfo.thickness],
        ['Precio', `$${gasketInfo.price.toLocaleString()} CLP`]
      ];

      // Create table for material parameters
      const cellWidth = contentWidth / 2;
      materialParams.forEach(([label, value], index) => {
        const rowY = yPos + (index * 8);
        if (index % 2 === 0) {
          pdf.setFillColor(248, 250, 252);
          pdf.rect(margin, rowY - 5, contentWidth, 8, 'F');
        }
        pdf.text(label, margin + 5, rowY);
        pdf.text(value.toString(), margin + cellWidth, rowY);
      });

      yPos += materialParams.length * 8 + 20;

      // Flange Parameters Section
      pdf.setFillColor(30, 41, 59);
      pdf.rect(margin, yPos - 8, contentWidth, 12, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(14);
      pdf.text('PARÁMETROS DE BRIDA', margin + 5, yPos);

      yPos += 10;
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(12);

      const flangeParams = [
        ['Norma', gasketInfo.standard],
        ['Tipo', gasketInfo.faceType],
        ['Medida', gasketInfo.size],
        ['Clase', gasketInfo.class]
      ];

      // Create table for flange parameters
      flangeParams.forEach(([label, value], index) => {
        const rowY = yPos + (index * 8);
        if (index % 2 === 0) {
          pdf.setFillColor(248, 250, 252);
          pdf.rect(margin, rowY - 5, contentWidth, 8, 'F');
        }
        pdf.text(label, margin + 5, rowY);
        pdf.text(value.toString(), margin + cellWidth, rowY);
      });

      yPos += flangeParams.length * 8 + 20;

      // Metrics Section
      pdf.setFillColor(30, 41, 59);
      pdf.rect(margin, yPos - 8, contentWidth, 12, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(14);
      pdf.text('MÉTRICAS DE APROVECHAMIENTO', margin + 5, yPos);

      yPos += 10;
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(12);

      const metrics = [
        ['Cantidad de empaquetaduras', gasketInfo.metrics.gasketCount.toString()],
        ['Precio unitario', `$${Math.round(gasketInfo.metrics.unitPrice).toLocaleString()} CLP`],
        ['Eficiencia', `${gasketInfo.metrics.efficiency.toFixed(1)}%`],
        ['Área total', `${gasketInfo.metrics.totalArea.toFixed(2)} mm²`],
        ['Área utilizada', `${gasketInfo.metrics.usedArea.toFixed(2)} mm²`],
        ['Área de desperdicio', `${gasketInfo.metrics.wasteArea.toFixed(2)} mm²`]
      ];

      // Create table for metrics
      metrics.forEach(([label, value], index) => {
        const rowY = yPos + (index * 8);
        if (index % 2 === 0) {
          pdf.setFillColor(248, 250, 252);
          pdf.rect(margin, rowY - 5, contentWidth, 8, 'F');
        }
        pdf.text(label, margin + 5, rowY);
        pdf.text(value.toString(), margin + cellWidth, rowY);
      });

      // Add Layout Image on new page
      if (layoutRef.current) {
        pdf.addPage();
        
        // Add header to layout page
        pdf.setFillColor(30, 41, 59);
        pdf.rect(0, 0, pageWidth, 50, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(24);
        pdf.text('JOMAR', margin, 25);
        pdf.setFontSize(16);
        pdf.text('Disposición de Empaquetaduras', margin, 35);

        try {
          const canvas = await html2canvas(layoutRef.current, {
            backgroundColor: '#1e293b',
            scale: 2,
            logging: false,
            useCORS: true
          });
          
          const imgData = canvas.toDataURL('image/png');
          const imgWidth = contentWidth;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          // Center the layout image
          const xPos = margin;
          const yPos = 60;
          pdf.addImage(imgData, 'PNG', xPos, yPos, imgWidth, imgHeight);
        } catch (error) {
          console.error('Error capturing layout:', error);
          pdf.setTextColor(0, 0, 0);
          pdf.setFontSize(12);
          pdf.text('Error al generar la vista previa de disposición', margin, 70);
        }

        // Add footer with reference and author
        pdf.setTextColor(128, 128, 128);
        pdf.setFontSize(10);
        pdf.text('JOMAR - Soluciones en Empaquetaduras', margin, pageHeight - 20);
        pdf.text(`Ref: ${reference}`, margin, pageHeight - 10);
        pdf.text('Patricio de la Peña', pageWidth - margin - 40, pageHeight - 20);
        pdf.text(date, pageWidth - margin - 30, pageHeight - 10);
      }

      // Save the PDF with reference number in filename
      const fileName = `JOMAR-${reference}-${gasketInfo.size.replace('"', '')}.pdf`;
      pdf.save(fileName);

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error al generar el PDF. Por favor intente nuevamente.');
    }
  };

  return (
    <button
      onClick={exportToPDF}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <FileDown className="h-5 w-5 mr-2" />
      Exportar a PDF
    </button>
  );
}