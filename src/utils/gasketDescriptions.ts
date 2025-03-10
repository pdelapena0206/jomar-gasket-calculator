import { GasketDescription } from '../types';

export const gasketDescriptions: { [key: string]: GasketDescription } = {
  "BA U": {
    description: "BA-U es una plancha de fibra comprimida de alta calidad, fabricada con fibras de aramida y fibras inorgánicas especiales, unidas con NBR. Diseñada para aplicaciones universales.",
    features: [
      "Excelente resistencia química",
      "Alta resistencia mecánica",
      "Buena adaptabilidad a irregularidades de las bridas",
      "Fácil manipulación y corte"
    ],
    applications: [
      "Agua",
      "Vapor saturado",
      "Aceites",
      "Gases",
      "Soluciones salinas",
      "Ácidos y bases débiles"
    ],
    specifications: {
      maxTemp: "400°C",
      maxPressure: "100 bar",
      ph: "2-13"
    }
  },
  "BA R": {
    description: "BA-R es una plancha de fibra comprimida premium, fabricada con fibras de aramida y fibras inorgánicas especiales, unidas con NBR. Ofrece mayor resistencia química y térmica que BA-U.",
    features: [
      "Superior resistencia química",
      "Excelente resistencia térmica",
      "Alta resistencia mecánica",
      "Muy buena adaptabilidad"
    ],
    applications: [
      "Vapor sobrecalentado",
      "Aceites térmicos",
      "Hidrocarburos",
      "Gases industriales",
      "Ácidos y bases concentrados"
    ],
    specifications: {
      maxTemp: "450°C",
      maxPressure: "140 bar",
      ph: "1-14"
    }
  },
  "BA E": {
    description: "BA-E es una plancha de fibra comprimida económica, fabricada con fibras de aramida y fibras inorgánicas, unidas con NBR. Ideal para aplicaciones generales.",
    features: [
      "Buena resistencia química",
      "Resistencia mecánica adecuada",
      "Buena relación calidad-precio",
      "Fácil instalación"
    ],
    applications: [
      "Agua caliente y fría",
      "Vapor de baja presión",
      "Aceites minerales",
      "Gases no agresivos"
    ],
    specifications: {
      maxTemp: "350°C",
      maxPressure: "80 bar",
      ph: "3-12"
    }
  },
  "BA CF": {
    description: "BA-CF es una plancha de fibra comprimida con alto contenido de fibras de carbono, unidas con NBR. Especialmente diseñada para servicios corrosivos.",
    features: [
      "Excelente resistencia a la corrosión",
      "Alta conductividad térmica",
      "Buena resistencia mecánica",
      "Resistente a altas temperaturas"
    ],
    applications: [
      "Ácidos concentrados",
      "Productos químicos agresivos",
      "Cloro y derivados",
      "Aplicaciones criogénicas"
    ],
    specifications: {
      maxTemp: "400°C",
      maxPressure: "120 bar",
      ph: "0-14"
    }
  },
  "BA C": {
    description: "BA-C es una plancha de fibra comprimida con alto contenido de fibras de carbono y grafito, unidas con NBR. Diseñada para servicios altamente corrosivos.",
    features: [
      "Máxima resistencia a la corrosión",
      "Excelente conductividad térmica",
      "Alta resistencia química",
      "Buena resistencia mecánica"
    ],
    applications: [
      "Ácidos muy concentrados",
      "Productos químicos muy agresivos",
      "Aplicaciones con cloro",
      "Servicios criogénicos"
    ],
    specifications: {
      maxTemp: "450°C",
      maxPressure: "130 bar",
      ph: "0-14"
    }
  },
  "BA 55": {
    description: "BA-55 es una plancha de fibra comprimida estándar, fabricada con fibras de aramida y fibras minerales, unidas con NBR. Adecuada para aplicaciones generales.",
    features: [
      "Buena resistencia química",
      "Resistencia mecánica estándar",
      "Económica",
      "Versátil"
    ],
    applications: [
      "Agua",
      "Vapor de baja presión",
      "Aceites minerales",
      "Gases no corrosivos"
    ],
    specifications: {
      maxTemp: "350°C",
      maxPressure: "70 bar",
      ph: "4-11"
    }
  },
  "BA 202": {
    description: "BA-202 es una plancha de fibra comprimida económica, fabricada con fibras minerales y unida con NBR. Ideal para aplicaciones básicas.",
    features: [
      "Resistencia química básica",
      "Buena compresibilidad",
      "Muy económica",
      "Fácil manipulación"
    ],
    applications: [
      "Agua fría",
      "Aire comprimido",
      "Gases no agresivos",
      "Aplicaciones de baja presión"
    ],
    specifications: {
      maxTemp: "300°C",
      maxPressure: "50 bar",
      ph: "5-10"
    }
  },
  "SF": {
    description: "GRAFILIT SF es una plancha de grafito flexible reforzado con inserto de acero inoxidable 316 perforado. Diseñada para aplicaciones de alta temperatura y presión donde se requiere excelente sellabilidad.",
    features: [
      "Excelente sellabilidad",
      "Alta resistencia a la temperatura",
      "Buena resistencia química",
      "Fácil manipulación y corte",
      "No envejece ni se endurece",
      "Resistente a la oxidación"
    ],
    applications: [
      "Vapor sobrecalentado",
      "Aceites térmicos",
      "Productos químicos agresivos",
      "Aplicaciones de alta temperatura",
      "Industria petroquímica",
      "Centrales eléctricas"
    ],
    specifications: {
      maxTemp: "550°C",
      maxPressure: "100 bar",
      ph: "0-14"
    }
  },
  "SL": {
    description: "GRAFILIT SL es una plancha de grafito flexible laminado con inserto de lámina lisa de acero inoxidable 316. Ofrece mayor resistencia mecánica y mejor manipulación que el grafito puro.",
    features: [
      "Alta resistencia mecánica",
      "Excelente sellabilidad",
      "Resistente a altas temperaturas",
      "Muy buena resistencia química",
      "Fácil instalación",
      "No contamina los fluidos"
    ],
    applications: [
      "Vapor de alta presión",
      "Fluidos corrosivos",
      "Industria química",
      "Refinerías",
      "Plantas de generación eléctrica",
      "Procesos criogénicos"
    ],
    specifications: {
      maxTemp: "550°C",
      maxPressure: "120 bar",
      ph: "0-14"
    }
  },
  "SP": {
    description: "GRAFILIT SP es una plancha de grafito flexible premium con inserto de acero inoxidable 316 y tratamiento antiadherente. Diseñada para las condiciones más exigentes de temperatura y presión.",
    features: [
      "Máxima resistencia mecánica",
      "Superior sellabilidad",
      "Excelente resistencia química",
      "Tratamiento antiadherente",
      "Alta pureza del grafito",
      "No contamina ni mancha"
    ],
    applications: [
      "Vapor sobrecalentado de alta presión",
      "Productos químicos altamente agresivos",
      "Aplicaciones criogénicas",
      "Industria nuclear",
      "Procesos con altas exigencias de pureza",
      "Ciclos térmicos severos"
    ],
    specifications: {
      maxTemp: "550°C",
      maxPressure: "140 bar",
      ph: "0-14"
    }
  },
  "3500": {
    description: "GYLON® Style 3500 es un material de junta de PTFE de alto rendimiento, formulado con PTFE relleno con sílice. Su proceso patentado reduce la fluencia y la relajación bajo carga, lo que garantiza un sello eficaz incluso en bridas irregulares o dañadas.",
    features: [
      "Excelente resistencia química frente a la mayoría de los medios agresivos",
      "Alta compresibilidad y adaptabilidad a diferentes superficies", 
      "Mínima fluencia y relajación bajo carga",
      "Sello efectivo incluso en bridas con acabados irregulares",
      "Fácil identificación mediante codificación de color"
    ],
    applications: [
      "Ácidos fuertes (excepto el fluorhídrico para servicios de oxígeno – usar Style 3502)",
      "Solventes, hidrocarburos, agua y vapor",
      "Cloro y compuestos clorados", 
      "Aplicaciones criogénicas y procesos que requieren alta pureza",
      "Industria química y petroquímica, especialmente en bridas con superficies no uniformes"
    ],
    specifications: {
      maxTemp: "260°C",
      maxPressure: "83 bar",
      ph: "0-14"
    }
  },
  "3504": {
    description: "GYLON® Style 3504 es una junta de PTFE elaborada con PTFE reforzado con microesferas de aluminosilicato, diseñada para aplicaciones con concentraciones moderadas de ácidos y caústicos.",
    features: [
      "Resistencia química adecuada para medios de agresividad moderada",
      "Mayor compresibilidad para adaptarse a flanges con variaciones superficiales",
      "Baja fluencia y relajación bajo carga",
      "Sello confiable en condiciones de baja a moderada presión",
      "Cumple con normativas FDA y otras certificaciones"
    ],
    applications: [
      "Ácidos y caústicos de concentración moderada",
      "Solventes, hidrocarburos y refrigerantes",
      "Aplicaciones criogénicas",
      "Industria química, petroquímica y de procesamiento de alimentos y bebidas",
      "Bridas con acabados superficiales irregulares"
    ],
    specifications: {
      maxTemp: "260°C",
      maxPressure: "55 bar", 
      ph: "0-14"
    }
  },
  "3510": {
    description: "GYLON® Style 3510 es una junta de PTFE de alto rendimiento, compuesta de PTFE relleno con sulfato de bario. Está especialmente diseñada para ofrecer un sello extremadamente ajustado en aplicaciones que implican caústicos fuertes.",
    features: [
      "Excelente resistencia en ambientes con caústicos y químicos tóxicos",
      "Baja compresibilidad para un sello preciso",
      "Mínima fluencia y relajación",
      "Alta retención de torque en los pernos",
      "Certificada conforme a normativas FDA, ABS y USDA"
    ],
    applications: [
      "Caústicos fuertes y ácidos moderados",
      "Cloro, gases, agua, vapor e hidrocarburos",
      "Aplicaciones criogénicas",
      "Entornos donde se requiere un sello extremadamente ajustado"
    ],
    specifications: {
      maxTemp: "260°C",
      maxPressure: "83 bar",
      ph: "0-14"
    }
  },
  "3545": {
    description: "GYLON® Style 3545 es una junta de PTFE microcelular diseñada para aplicaciones de baja carga de perno. Su construcción en 'sándwich' combina capas exteriores altamente comprimibles con un núcleo de PTFE rígido.",
    features: [
      "Altamente comprimible y adaptable a flanges con baja carga de perno",
      "Núcleo rígido que reduce la fluencia y el flujo en frío",
      "Excelente sellabilidad en superficies irregulares",
      "Buen rendimiento en retención de torque",
      "Estabilidad dimensional"
    ],
    applications: [
      "Bridas con baja resistencia a la compresión",
      "Ácidos fuertes y caústicos",
      "Hidrocarburos y cloro",
      "Aplicaciones criogénicas",
      "Equipos revestidos o de vidrio"
    ],
    specifications: {
      maxTemp: "260°C",
      maxPressure: "83 bar",
      ph: "0-14"
    }
  },
  "1100": {
    description: "SC-1100 es una plancha de PTFE expandido con estructura multidireccional, diseñada para aplicaciones generales. Ofrece una excelente combinación de propiedades mecánicas y químicas a un precio competitivo.",
    features: [
      "Estructura multidireccional que proporciona mayor resistencia",
      "Buena compresibilidad y recuperación",
      "Excelente sellabilidad",
      "Resistente a la mayoría de los productos químicos",
      "Fácil manipulación e instalación"
    ],
    applications: [
      "Servicios generales en industria química",
      "Agua y vapor",
      "Hidrocarburos y solventes",
      "Ácidos y bases diluidos",
      "Aplicaciones de baja a media presión"
    ],
    specifications: {
      maxTemp: "-200°C a 260°C",
      maxPressure: "40 bar",
      ph: "0-14"
    },
    dataSheet: "https://www.guarniflon.com/images/guarniflon/download/pdf/sc_serie.pdf"
  },
  "1200": {
    description: "SC-1200 es una plancha de PTFE expandido de alta calidad con estructura multidireccional mejorada, diseñada para aplicaciones más exigentes donde se requiere mayor resistencia mecánica.",
    features: [
      "Mayor resistencia mecánica que SC-1100",
      "Excelente resistencia química",
      "Alta compresibilidad y recuperación",
      "Muy buena sellabilidad",
      "Certificado para uso con oxígeno"
    ],
    applications: [
      "Industria química y petroquímica",
      "Servicios con oxígeno",
      "Vapor de media presión",
      "Ácidos y bases concentrados",
      "Aplicaciones críticas"
    ],
    specifications: {
      maxTemp: "-200°C a 260°C",
      maxPressure: "55 bar",
      ph: "0-14"
    },
    dataSheet: "https://www.guarniflon.com/images/guarniflon/download/pdf/sc_serie.pdf"
  },
  "1400": {
    description: "SC-1400 es una plancha de PTFE expandido premium con estructura multidireccional optimizada y alta densidad, diseñada para servicios severos y aplicaciones de alta exigencia.",
    features: [
      "Máxima resistencia mecánica en la serie SC",
      "Superior resistencia a la extrusión",
      "Excelente sellabilidad incluso en bridas irregulares",
      "Alta resistencia química",
      "Certificaciones para industrias reguladas"
    ],
    applications: [
      "Servicios severos en industria química",
      "Vapor de alta presión",
      "Fluidos corrosivos",
      "Aplicaciones criogénicas",
      "Industria farmacéutica y alimentaria"
    ],
    specifications: {
      maxTemp: "-200°C a 260°C",
      maxPressure: "70 bar",
      ph: "0-14"
    },
    dataSheet: "https://www.guarniflon.com/images/guarniflon/download/pdf/sc_serie.pdf"
  },
  "1600": {
    description: "SC-1600 es una plancha de PTFE expandido de máximo rendimiento, con estructura multidireccional reforzada y tratamiento especial para aplicaciones extremas.",
    features: [
      "Máxima resistencia a la extrusión",
      "Excepcional resistencia mecánica",
      "Óptima sellabilidad en condiciones extremas",
      "Resistencia química universal",
      "Cumple con las normativas más exigentes"
    ],
    applications: [
      "Condiciones extremas de presión y temperatura",
      "Industria nuclear",
      "Procesos químicos agresivos",
      "Aplicaciones de ultra-alta pureza",
      "Servicios criogénicos"
    ],
    specifications: {
      maxTemp: "-200°C a 260°C",
      maxPressure: "83 bar",
      ph: "0-14"
    },
    dataSheet: "https://www.guarniflon.com/images/guarniflon/download/pdf/sc_serie.pdf"
  }
};