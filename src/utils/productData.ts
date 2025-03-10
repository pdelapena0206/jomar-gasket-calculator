const csvData = `Producto,Formato,Proveedor,Línea,Estilo,Espesor,Precio_CLP,Unidad
"DURLON 9000","60 x 60","DURLON","9000","D9000","1/32",977976,"c/u"
"DURLON 9000","60 x 60","DURLON","9000","D9000","1/16",1629882,"c/u"
"DURLON 9000","60 x 60","DURLON","9000","D9000","1/8",2963376,"c/u"
"TEFLON EXPANDIDO – DONIFLON TEX","60 x 60","DONIT","TEFLON","DONIFLON TEX","1/16",1314900,"c/u"
"TEFLON EXPANDIDO – DONIFLON TEX","60 x 60","DONIT","TEFLON","DONIFLON TEX","1/8",2484000,"c/u"
"TEFLON EXPANDIDO – SEALON HIPRO","60 x 60","SEALON","TEFLON","SEALON HIPRO","1/16",1739340,"c/u"
"TEFLON EXPANDIDO – SEALON HIPRO","60 x 60","SEALON","TEFLON","SEALON HIPRO","1/8",2898000,"c/u"
"TEFLON EXPANDIDO – SEALON HYSEALING","60 x 60","SEALON","TEFLON","SEALON HYSEALING","1/16",585000,"c/u"
"TEFLON EXPANDIDO – SEALON HYSEALING","60 x 60","SEALON","TEFLON","SEALON HYSEALING","1/8",1143000,"c/u"
"TEFLON EXPANDIDO – SEALON HYSEALING","60 x 60","SEALON","TEFLON","SEALON HYSEALING","1/4",2286000,"c/u"
"eSC – 2000","60 x 60","GUARNIFLON","TEFLON EXPANDIDO","ESC 2000","1/16",697500,"c/u"
"eSC – 2000","60 x 60","GUARNIFLON","TEFLON EXPANDIDO","ESC 2000","1/8",1431000,"c/u"
"eSC – 2000","60 x 60","GUARNIFLON","TEFLON EXPANDIDO","ESC 2000","1/4",2862000,"c/u"
"SC – 1100","48 x 40","GUARNIFLON","LINEA SC","1100","1/8",309582,"c/u"
"SC – 1100","48 x 40","GUARNIFLON","LINEA SC","1100","1/16",619164,"c/u"
"SC – 1100","60 x 60","GUARNIFLON","LINEA SC","1100","1/16",1159902,"c/u"
"SC – 1100","48 x 40","GUARNIFLON","LINEA SC","1100","1/8",1238328,"c/u"
"SC – 1100","60 x 40","GUARNIFLON","LINEA SC","1100","1/8",1547910,"c/u"
"SC – 1100","60 x 60","GUARNIFLON","LINEA SC","1100","1/8",2321298,"c/u"
"SC – 1200","60 x 40","GUARNIFLON","LINEA SC","1200","1/8",1934892,"c/u"
"SC – 1400","60 x 60","GUARNIFLON","LINEA SC","1400","1/32",725760,"c/u"
"SC – 1400","60 x 60","GUARNIFLON","LINEA SC","1400","1/16",1209600,"c/u"
"SC – 1600","60 x 60","GUARNIFLON","LINEA SC","1600","1/32",826560,"c/u"
"SC – 1600","60 x 60","GUARNIFLON","LINEA SC","1600","1/16",1378440,"c/u"
"EPDM","40 x 40","JOMAR CAUCHOS","CAUCHOS AGLOMERADOS","EPDM","1/8",71532,"c/u"
"EPDM","40 x 40","JOMAR CAUCHOS","CAUCHOS AGLOMERADOS","EPDM","3/16",107244,"c/u"
"EPDM","40 x 40","JOMAR CAUCHOS","CAUCHOS AGLOMERADOS","EPDM","1/4",143019,"c/u"
"DONIGUM – 120 (SBR ROJO)","55","DONIT","CAUCHOS","SBR ROJO","1/8",66042,"mt"
"DONIGUM – 120 (SBR ROJO)","60 x 60","DONIT","CAUCHOS","SBR ROJO","3/32",57771,"mt"
"DONIGUM – 120 (SBR ROJO)","60 x 60","DONIT","CAUCHOS","SBR ROJO","1/16",34659,"mt"
"DONIT DONIFLON G (60x60)","60 x 60","DONIT","TEFLON","DONIFLON G","1/16",282501,"c/u"
"DONIT DONIFLON G (60x60)","60 x 60","DONIT","TEFLON","DONIFLON G","1/8",519246,"c/u"
"DONIT DONIFLON G (40x60)","40 x 60","DONIT","TEFLON","DONIFLON G","1/8",338994,"c/u"
"GARLOCK 3000","60 x 60","GARLOCK","3000","3000","1/32",161100,"c/u"
"GARLOCK 3000","60 x 60","GARLOCK","3000","3000","1/16",268200,"c/u"
"GARLOCK 3000","60 x 60","GARLOCK","3000","3000","1/8",531000,"c/u"
"GARLOCK 3200/3400","60 x 60","GARLOCK","3000","3200/3400","1/32",169155,"c/u"
"GARLOCK 3200/3400","60 x 60","GARLOCK","3000","3200/3400","1/16",281610,"c/u"
"GARLOCK 3200/3400","60 x 60","GARLOCK","3000","3200/3400","1/8",557550,"c/u"
"GARLOCK 3500","60 x 60","GARLOCK","GYLON","3500","1/16",1836900,"c/u"
"GARLOCK 3500","60 x 60","GARLOCK","GYLON","3500","1/8",3582000,"c/u"
"GARLOCK 3504","60 x 60","GARLOCK","GYLON","3504","1/16",2241000,"c/u"
"GARLOCK 3504","60 x 60","GARLOCK","GYLON","3504","1/8",4482000,"c/u"
"GARLOCK 3510","60 x 60","GARLOCK","GYLON","3510","1/16",2322000,"c/u"
"GARLOCK 3510","60 x 60","GARLOCK","GYLON","3510","1/8",4482000,"c/u"
"GARLOCK 3545","60 x 60","GARLOCK","GYLON","3545","1/16",2286000,"c/u"
"GARLOCK 3545","60 x 60","GARLOCK","GYLON","3545","1/8",4482000,"c/u"
"BA - U TESNIT","60 x 60","DONIT","TESNIT","BA U","1/64",69165,"c/u"
"BA - U TESNIT","60 x 60","DONIT","TESNIT","BA U","0.5 mm (≈1/64)",69165,"c/u"
"BA - U TESNIT","60 x 60","DONIT","TESNIT","BA U","1/32",84771,"c/u"
"BA - U TESNIT","60 x 60","DONIT","TESNIT","BA U","1/16",149796,"c/u"
"BA - U TESNIT","60 x 60","DONIT","TESNIT","BA U","1/8",299529,"c/u"
"BA - U TESNIT","60 x 177","DONIT","TESNIT","BA U","1/16",516789,"c/u"
"BA - U TESNIT","60 x 177","DONIT","TESNIT","BA U","1/8",1027971,"c/u"
"BA - U TESNIT","78.7 x 78.7","DONIT","TESNIT","BA U","1/8",665640,"c/u"
"BA - R TESNIT","60 x 60","DONIT","TESNIT","BA R","1/32",146448,"c/u"
"BA - R TESNIT","60 x 60","DONIT","TESNIT","BA R","1/16",249651,"c/u"
"BA - R TESNIT","60 x 60","DONIT","TESNIT","BA R","3/32",374463,"c/u"
"BA - R TESNIT","60 x 60","DONIT","TESNIT","BA R","1/8",499248,"c/u"
"BA - R 300 TESNIT","39 x 55","DONIT","TESNIT","BA R 300","3/32",276741,"c/u"
"BA - E TESNIT","60 x 60","DONIT","TESNIT","BA - E","1/16",193716,"c/u"
"BA - E TESNIT","60 x 60","DONIT","TESNIT","BA - E","1/8",387423,"c/u"
"BA - CF","60 x 60","DONIT","TESNIT","BA - CF","1/32",167796,"c/u"
"BA - CF","60 x 60","DONIT","TESNIT","BA - CF","1/16",233055,"c/u"
"BA - CF","60 x 60","DONIT","TESNIT","BA - CF","3/32",428814,"c/u"
"BA - CF","60 x 60","DONIT","TESNIT","BA - CF","1/8",559323,"c/u"
"BA - CF","60 x 60","DONIT","TESNIT","BA - CF","3/16",878949,"c/u"
"BA - C","60 x 60","DONIT","TESNIT","BA - C","1/16",233190,"c/u"
"BA - C","60 x 60","DONIT","TESNIT","BA - C","3/32",336807,"c/u"
"BA - C","60 x 60","DONIT","TESNIT","BA - C","1/8",440469,"c/u"
"BA - 55","60 x 60","DONIT","TESNIT","BA - 55","1/64",69255,"c/u"
"BA - 55","60 x 60","DONIT","TESNIT","BA - 55","1/32",72090,"c/u"
"BA - 55","60 x 60","DONIT","TESNIT","BA - 55","1.0 mm (≈1/32)",90990,"c/u"
"BA - 55","60 x 60","DONIT","TESNIT","BA - 55","1/16",108261,"c/u"
"BA - 55","60 x 60","DONIT","TESNIT","BA - 55","3/32",158967,"c/u"
"BA - 55","60 x 60","DONIT","TESNIT","BA - 55","1/8",192015,"c/u"
"BA - 55","60 x 60","DONIT","TESNIT","BA - 55","5.0 mm (≈3/16)",299043,"c/u"
"BA - 55","60 x 60","DONIT","TESNIT","BA - 55","1/4",390168,"c/u"
"BA - 55","60 x 177","DONIT","TESNIT","BA - 55","1/16",373491,"c/u"
"BA - 55","60 x 177","DONIT","TESNIT","BA - 55","1/8",662454,"c/u"
"BA - 55","78.7 x 78.7","DONIT","TESNIT","BA - 55","1/8",426690,"c/u"
"BA - 202","60 x 60","DONIT","TESNIT","BA - 202","1/16",81198,"c/u"
"BA - 202","60 x 60","DONIT","TESNIT","BA - 202","3/32",101484,"c/u"
"PLANIFLON B-58","60 x 60","CARRARA","PLANIFLON","B-58","1/16",1640097,"c/u"
"PLANIFLON B-58","60 x 60","CARRARA","PLANIFLON","B-58","1/8",3280194,"c/u"
"GRAFILIT – SF","40 x 40","DONIT","GRAFILIT","SF","1/32",76869,"c/u"
"GRAFILIT – SF","40 x 40","DONIT","GRAFILIT","SF","1/16",107613,"c/u"
"GRAFILIT – SF","40 x 40","DONIT","GRAFILIT","SF","1/8",215235,"c/u"
"GRAFILIT – SL","40 x 40","DONIT","GRAFILIT","SL","1/32",101466,"c/u"
"GRAFILIT – SL","40 x 40","DONIT","GRAFILIT","SL","1/16",155295,"c/u"
"GRAFILIT – SL","40 x 40","DONIT","GRAFILIT","SL","1/8",262890,"c/u"
"GRAFILIT – SP","40 x 40","DONIT","GRAFILIT","SP","1/32",116847,"c/u"
"GRAFILIT – SP","40 x 40","DONIT","GRAFILIT","SP","1/16",178353,"c/u"
"GRAFILIT – SP","40 x 40","DONIT","GRAFILIT","SP","1/8",289026,"c/u"`;

export function parseProductData(): ProductData {
  const lines = csvData.split('\n');
  const headers = lines[0].split(',');
  const products: Product[] = [];
  const providers: { [key: string]: string[] } = {};
  const productLines: { [key: string]: string[] } = {};
  const styles: { [key: string]: { [key: string]: string[] } } = {};

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(val => val.replace(/^"|"$/g, ''));
    const product: Product = {
      producto: values[0],
      formato: values[1],
      proveedor: values[2],
      linea: values[3],
      estilo: values[4],
      espesor: values[5],
      precio_clp: parseInt(values[6]),
      unidad: values[7]
    };
    products.push(product);

    // Build providers structure
    if (!providers[product.proveedor]) {
      providers[product.proveedor] = [];
    }
    if (!providers[product.proveedor].includes(product.linea)) {
      providers[product.proveedor].push(product.linea);
    }

    // Build lines structure
    if (!productLines[product.linea]) {
      productLines[product.linea] = [];
    }
    if (!productLines[product.linea].includes(product.estilo)) {
      productLines[product.linea].push(product.estilo);
    }

    // Build styles structure
    if (!styles[product.linea]) {
      styles[product.linea] = {};
    }
    if (!styles[product.linea][product.estilo]) {
      styles[product.linea][product.estilo] = [];
    }
    if (!styles[product.linea][product.estilo].includes(product.formato)) {
      styles[product.linea][product.estilo].push(product.formato);
    }
  }

  return { products, providers, lines: productLines, styles };
}

export const productData = parseProductData();