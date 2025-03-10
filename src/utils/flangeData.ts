export interface FlangeStandard {
  CLASES?: string[];
  PN?: string[];
  DIMENSIONES: {
    RF: { [key: string]: { ID: number } & { [key: string]: number } };
    FF: { [key: string]: { 
      ID: number;
      [key: string]: number;
      Numero_Perforaciones?: number;
      Diametro_Perforaciones_mm?: number;
      Diametro_Circulo_Pernos_mm?: number;
    } };
  };
}

export interface FlangeStandards {
  ANSI: FlangeStandard;
  DIN: FlangeStandard;
}

export const flangeData: FlangeStandards = {
  "ANSI": {
    "CLASES": ["150", "300"],
    "DIMENSIONES": {
      "RF": {
        "1/2\"": {"ID": 21.0, "150": 48.0, "300": 48.0},
        "3/4\"": {"ID": 27.0, "150": 57.0, "300": 57.0},
        "1\"": {"ID": 33.0, "150": 67.0, "300": 67.0},
        "1.25\"": {"ID": 42.0, "150": 76.0, "300": 76.0},
        "1.5\"": {"ID": 49.0, "150": 86.0, "300": 86.0},
        "2\"": {"ID": 60.0, "150": 105.0, "300": 105.0},
        "2.5\"": {"ID": 73.0, "150": 124.0, "300": 124.0},
        "3\"": {"ID": 89.0, "150": 137.0, "300": 137.0},
        "3.5\"": {"ID": 102.0, "150": 162.0, "300": 162.0},
        "4\"": {"ID": 114.0, "150": 175.0, "300": 175.0},
        "5\"": {"ID": 141.0, "150": 197.0, "300": 197.0},
        "6\"": {"ID": 168.0, "150": 222.0, "300": 222.0},
        "8\"": {"ID": 219.0, "150": 279.0, "300": 279.0},
        "10\"": {"ID": 273.0, "150": 340.0, "300": 340.0},
        "12\"": {"ID": 324.0, "150": 410.0, "300": 410.0},
        "14\"": {"ID": 356.0, "150": 451.0, "300": 451.0},
        "16\"": {"ID": 406.0, "150": 514.0, "300": 514.0},
        "18\"": {"ID": 457.0, "150": 549.0, "300": 549.0},
        "20\"": {"ID": 508.0, "150": 607.0, "300": 607.0},
        "24\"": {"ID": 610.0, "150": 718.0, "300": 718.0}
      },
      "FF": {
        "1/2\"": {
          "ID": 21.0,
          "150": 89.0,
          "300": 95.0,
          "Numero_Perforaciones": 4,
          "Diametro_Perforaciones_mm": 16,
          "Diametro_Circulo_Pernos_mm": 60
        },
        "3/4\"": {
          "ID": 27.0,
          "150": 99.0,
          "300": 117.0,
          "Numero_Perforaciones": 4,
          "Diametro_Perforaciones_mm": 16,
          "Diametro_Circulo_Pernos_mm": 70
        },
        "1\"": {
          "ID": 33.0,
          "150": 108.0,
          "300": 124.0,
          "Numero_Perforaciones": 4,
          "Diametro_Perforaciones_mm": 16,
          "Diametro_Circulo_Pernos_mm": 79
        },
        "1.25\"": {
          "ID": 42.0,
          "150": 118.0,
          "300": 133.0,
          "Numero_Perforaciones": 4,
          "Diametro_Perforaciones_mm": 16,
          "Diametro_Circulo_Pernos_mm": 89
        },
        "1.5\"": {
          "ID": 49.0,
          "150": 127.0,
          "300": 155.0,
          "Numero_Perforaciones": 4,
          "Diametro_Perforaciones_mm": 16,
          "Diametro_Circulo_Pernos_mm": 99
        },
        "2\"": {
          "ID": 60.0,
          "150": 152.0,
          "300": 165.0,
          "Numero_Perforaciones": 4,
          "Diametro_Perforaciones_mm": 19,
          "Diametro_Circulo_Pernos_mm": 121
        },
        "2.5\"": {
          "ID": 73.0,
          "150": 178.0,
          "300": 191.0,
          "Numero_Perforaciones": 4,
          "Diametro_Perforaciones_mm": 19,
          "Diametro_Circulo_Pernos_mm": 140
        },
        "3\"": {
          "ID": 89.0,
          "150": 191.0,
          "300": 210.0,
          "Numero_Perforaciones": 4,
          "Diametro_Perforaciones_mm": 19,
          "Diametro_Circulo_Pernos_mm": 152
        },
        "3.5\"": {
          "ID": 102.0,
          "150": 216.0,
          "300": 229.0,
          "Numero_Perforaciones": 8,
          "Diametro_Perforaciones_mm": 19,
          "Diametro_Circulo_Pernos_mm": 178
        },
        "4\"": {
          "ID": 114.0,
          "150": 229.0,
          "300": 254.0,
          "Numero_Perforaciones": 8,
          "Diametro_Perforaciones_mm": 19,
          "Diametro_Circulo_Pernos_mm": 191
        },
        "5\"": {
          "ID": 141.0,
          "150": 254.0,
          "300": 279.0,
          "Numero_Perforaciones": 8,
          "Diametro_Perforaciones_mm": 22,
          "Diametro_Circulo_Pernos_mm": 216
        },
        "6\"": {
          "ID": 168.0,
          "150": 279.0,
          "300": 318.0,
          "Numero_Perforaciones": 8,
          "Diametro_Perforaciones_mm": 22,
          "Diametro_Circulo_Pernos_mm": 241
        },
        "8\"": {
          "ID": 219.0,
          "150": 343.0,
          "300": 381.0,
          "Numero_Perforaciones": 8,
          "Diametro_Perforaciones_mm": 22,
          "Diametro_Circulo_Pernos_mm": 298
        },
        "10\"": {
          "ID": 273.0,
          "150": 406.0,
          "300": 445.0,
          "Numero_Perforaciones": 12,
          "Diametro_Perforaciones_mm": 25,
          "Diametro_Circulo_Pernos_mm": 362
        },
        "12\"": {
          "ID": 324.0,
          "150": 483.0,
          "300": 521.0,
          "Numero_Perforaciones": 12,
          "Diametro_Perforaciones_mm": 25,
          "Diametro_Circulo_Pernos_mm": 432
        },
        "14\"": {
          "ID": 356.0,
          "150": 533.0,
          "300": 584.0,
          "Numero_Perforaciones": 12,
          "Diametro_Perforaciones_mm": 28,
          "Diametro_Circulo_Pernos_mm": 476
        },
        "16\"": {
          "ID": 406.0,
          "150": 597.0,
          "300": 648.0,
          "Numero_Perforaciones": 16,
          "Diametro_Perforaciones_mm": 28,
          "Diametro_Circulo_Pernos_mm": 540
        },
        "18\"": {
          "ID": 457.0,
          "150": 635.0,
          "300": 711.0,
          "Numero_Perforaciones": 16,
          "Diametro_Perforaciones_mm": 32,
          "Diametro_Circulo_Pernos_mm": 578
        },
        "20\"": {
          "ID": 508.0,
          "150": 699.0,
          "300": 775.0,
          "Numero_Perforaciones": 20,
          "Diametro_Perforaciones_mm": 32,
          "Diametro_Circulo_Pernos_mm": 635
        },
        "24\"": {
          "ID": 610.0,
          "150": 813.0,
          "300": 914.0,
          "Numero_Perforaciones": 20,
          "Diametro_Perforaciones_mm": 35,
          "Diametro_Circulo_Pernos_mm": 749
        }
      }
    }
  },
  "DIN": {
    "PN": ["10", "16", "25", "40"],
    "DIMENSIONES": {
      "RF": {
        "DN10": {"ID": 10, "10": 75, "16": 75, "25": 75, "40": 85},
        "DN15": {"ID": 15, "10": 80, "16": 80, "25": 80, "40": 95},
        "DN20": {"ID": 20, "10": 90, "16": 90, "25": 90, "40": 105},
        "DN25": {"ID": 25, "10": 100, "16": 100, "25": 100, "40": 115},
        "DN32": {"ID": 32, "10": 120, "16": 120, "25": 120, "40": 140},
        "DN40": {"ID": 40, "10": 130, "16": 130, "25": 130, "40": 150},
        "DN50": {"ID": 50, "10": 140, "16": 140, "25": 140, "40": 165},
        "DN65": {"ID": 65, "10": 160, "16": 160, "25": 160, "40": 185},
        "DN80": {"ID": 80, "10": 190, "16": 190, "25": 190, "40": 200},
        "DN100": {"ID": 100, "10": 210, "16": 210, "25": 235, "40": 240},
        "DN125": {"ID": 125, "10": 240, "16": 240, "25": 270, "40": 275},
        "DN150": {"ID": 150, "10": 265, "16": 265, "25": 300, "40": 300},
        "DN200": {"ID": 200, "10": 320, "16": 320, "25": 360, "40": 375},
        "DN250": {"ID": 250, "10": 375, "16": 375, "25": 425, "40": 450},
        "DN300": {"ID": 300, "10": 440, "16": 440, "25": 485, "40": 515},
        "DN350": {"ID": 350, "10": 490, "16": 490, "25": 555, "40": 580},
        "DN400": {"ID": 400, "10": 540, "16": 540, "25": 620, "40": 660},
        "DN450": {"ID": 450, "10": 595, "16": 595, "25": 670, "40": 685},
        "DN500": {"ID": 500, "10": 645, "16": 645, "25": 730, "40": 755},
        "DN600": {"ID": 600, "10": 755, "16": 755, "25": 845, "40": 890}
      },
      "FF": {
        "DN10": {"ID": 10, "10": 75, "16": 75, "25": 75, "40": 85},
        "DN15": {"ID": 15, "10": 80, "16": 80, "25": 80, "40": 95},
        "DN20": {"ID": 20, "10": 90, "16": 90, "25": 90, "40": 105},
        "DN25": {"ID": 25, "10": 100, "16": 100, "25": 100, "40": 115},
        "DN32": {"ID": 32, "10": 120, "16": 120, "25": 120, "40": 140},
        "DN40": {"ID": 40, "10": 130, "16": 130, "25": 130, "40": 150},
        "DN50": {"ID": 50, "10": 140, "16": 140, "25": 140, "40": 165},
        "DN65": {"ID": 65, "10": 160, "16": 160, "25": 160, "40": 185},
        "DN80": {"ID": 80, "10": 190, "16": 190, "25": 190, "40": 200},
        "DN100": {"ID": 100, "10": 210, "16": 210, "25": 235, "40": 240},
        "DN125": {"ID": 125, "10": 240, "16": 240, "25": 270, "40": 275},
        "DN150": {"ID": 150, "10": 265, "16": 265, "25": 300, "40": 300},
        "DN200": {"ID": 200, "10": 320, "16": 320, "25": 375, "40": 375},
        "DN250": {"ID": 250, "10": 375, "16": 375, "25": 430, "40": 450},
        "DN300": {"ID": 300, "10": 440, "16": 440, "25": 485, "40": 515},
        "DN350": {"ID": 350, "10": 490, "16": 490, "25": 555, "40": 580},
        "DN400": {"ID": 400, "10": 540, "16": 540, "25": 620, "40": 660},
        "DN450": {"ID": 450, "10": 595, "16": 595, "25": 670, "40": 685},
        "DN500": {"ID": 500, "10": 645, "16": 645, "25": 730, "40": 755},
        "DN600": {"ID": 600, "10": 755, "16": 755, "25": 845, "40": 890}
      }
    }
  }
};