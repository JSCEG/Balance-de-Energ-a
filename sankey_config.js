// Configuración flexible para el Sankey
// Puedes modificar columnas, nodos, filtros, posiciones y enlaces
window.sankeyConfig = {
    // === Colores por energético — optimizados para fondo blanco ===
    energeticColors: {
        // Primarios fósiles
        "Carbón mineral": "#475569",         // slate 600 (gris azulado, alta legibilidad)
        "Petróleo crudo": "#6E2C2C",        // marrón petróleo profundo
        "Condensados": "#6B5FA8",           // púrpura petróleo/condensados
        "Gas natural": "#1F7A8C",           // teal profundo (gas)

        // Primarios no fósiles
        "Energía Nuclear": "#7D3C98",       // púrpura nuclear
        "Energía Hidráulica": "#1E88E5",    // azul hidráulica
        "Geoenergía": "#C2185B",            // magenta geotermia
        "Energía solar": "#F59E0B",         // ámbar solar (más oscuro que amarillo puro)
        "Energía eólica": "#2BAE66",        // verde-azulado eólico
        "Bagazo de caña": "#A47149",        // marrón bagazo
        "Leña": "#6B4226",                  // café madera
        "Biogás": "#7CB342",                // verde biogás

        // Sólidos/Coques
        "Coque de carbón": "#111827",       // casi negro
        "Coque de petróleo": "#2C2C2C",     // gris muy oscuro

        // Secundarios derivados del petróleo/gas
        "Gas licuado de petróleo": "#FB8C00", // naranja LPG
        "Gasolinas y naftas": "#F97316",      // naranja vivo gasolinas
        "Querosenos": "#D97706",              // ámbar queroseno
        "Diesel": "#DC2626",                  // rojo diésel
        "Combustóleo": "#7F1D1D",            // rojo vino pesado
        "Gas natural seco": "#2A9D8F",       // teal gas procesado

        // Electricidad (con borde recomendado, ver sección 2)
        "Energía eléctrica": "#FFD60A",      // amarillo eléctrico legible con borde oscuro

        // Contenedores / flujos sistémicos (neutros coherentes)
        "Producción": "#22A06B",
        "Importación EP": "#1D4ED8",
        "Importación ES": "#2563EB",
        "Variación de Inventarios EP (+)": "#B45309",
        "Variación de Inventarios ES (+)": "#D97706",
        "Exportación EP": "#E11D48",
        "Exportación ES": "#F43F5E",
        "Energía No Aprovechada EP": "#8E44AD",
        "Energía No Aprovechada ES": "#9B59B6",
        "Consumo Propio del Sector EP": "#546E7A",
        "Consumo Propio del Sector ES": "#78909C",
        "Diferencia Estadística EP (+)": "#6D4C41",
        "Diferencia Estadística ES (+)": "#8D6E63",
        "Pérdidas técnicas por transporte, transmisión y distribución EP": "#FB923C",
        "Pérdidas técnicas por transporte, transmisión y distribución ES": "#FDBA74",
        "Oferta Interna Bruta EP": "#2E7D32",
        "Oferta Interna Bruta ES": "#1E3A8A",
        "Variación de Inventarios EP (-)": "#EA580C",
        "Diferencia Estadística EP (-)": "#8B5E3C",
        "Variación de Inventarios ES (-)": "#F97316",
        "Diferencia Estadística ES (-)": "#A47149",

        // Transformación — plantas (escala de grises-amarillos técnica, homogénea)
        "Coquizadoras y Hornos": "#6B7280",
        "Plantas de Gas y Fraccionadoras": "#737373",
        "Refinerías y Despuntadoras": "#525252",
        "Centrales Eléctricas": "#A3A21E",
        "Carboeléctrica": "#4B5563",
        "Térmica Convencional": "#615D5D",
        "Combustión Interna": "#7C7C7C",
        "Turbogás": "#5B5B5B",
        "Ciclo Combinado": "#3F3F46",
        "Nucleoeléctrica": "#6B21A8",
        "Cogeneración": "#0EA5E9",
        "Geotérmica": "#B91C1C",
        "Eólica": "#22C55E",
        "Solar Fotovoltaica": "#F59E0B",

        // Demanda por sectores
        "Industrial": "#1F77B4",
        "Transporte": "#D62728",
        "Agropecuario": "#2E7D32",
        "Comercial": "#F97316",
        "Público": "#7C3AED",
        "Residencial": "#EC4899",
        "Petroquímica PEMEX": "#8B0000",
        "Otras ramas económicas": "#6A5ACD",

        // Totales y agregados (neutros discretos)
        "Oferta Total": "#6B7280",
        "Exportación": "#6B7280",
        "Energía No Aprovechada": "#6B7280",
        "Total Transformación": "#6B7280",
        "Total Consumo del Sector": "#6B7280",
        "Consumo final total": "#6B7280",
        "Consumo final no energético": "#6B7280",
        "Consumo final energético": "#6B7280",
        "Producción bruta energía secundaria": "#6B7280",
        "Pérdidas en transporte y transmisión por energético": "#9CA3AF",
        "Pérdidas en distribución por energético": "#A8A29E",
        "Pérdidas no técnicas por energético": "#9E9E9E",
        "Diferencia Estadística": "#8D8D8D",
        "Pérdidas ES": "#8D8D8D",
        "Pérdidas EP": "#8D8D8D",
        "V.I. y Dif. Est. EP": "#8D8D8D",
        "V.I. y Dif. Est. ES": "#8D8D8D",
    },
    // Colores para indicadores de eficiencia
    efficiencyColors: {
        "efficient": "#38a169",    // Verde para eficiente
        "warning": "#dd6b20",      // Naranja para alerta
        "critical": "#e53e3e"      // Rojo para crítico
    },
    // Configuración general del layout
    layoutConfig: {
        nodeAlign: 'justify',
        nodeGap: 10,
        nodeWidth: 22,
        layoutIterations: 0,
        curveness: 0.7
    },
    columnas: [
        {
            // Columna 1: Padres principales
            nombre: "Origen",
            mostrar: "Padre",
            filtroTipo: "Energía Primaria", // Solo hijos cuyo tipo sea "Energía Primaria"
            alineacionVertical: "abajo",
            nodos: [
                { nombre: "SPACER_BIG_IEP", tipo: "Padre", visible: true, posicion: 0, esEspaciador: true, valorEspaciador: 3000 },
                // Puedes agregar más nodos padre aquí si lo deseas
                { nombre: "Importación EP", tipo: "Padre", visible: true, posicion: 0, y: 100, flow: 'source' },
                //{ nombre: "Variación de Inventarios EP (+)", tipo: "Padre", visible: true, posicion: 1, }, // Default para manejar valores +/- 
                { nombre: "Producción", tipo: "Padre", visible: true, posicion: 2, y: 300, flow: 'source' },
                //{ nombre: "Diferencia Estadística EP (+)", tipo: "Padre", visible: true, posicion: 3, flow: 'source' },
                { nombre: "V.I. y Dif. Est. EP", tipo: "Padre", visible: true, posicion: 3, flow: 'source' },
            ]
        },
        {
            // Columna 2: Hijos de Oferta Interna Bruta EP, solo los de tipo Energía Primaria
            nombre: "Energía Primaria",
            mostrar: "Hijo",
            filtroTipo: "Energía Primaria",
            padre: "Oferta Interna Bruta EP", // Solo hijos cuyo tipo sea "Energía Primaria"
            nodos: [
                { nombre: "SPACER_BIG_EPP", tipo: "Padre", visible: true, posicion: 0, esEspaciador: true, valorEspaciador: 2500 },
                // Si dejas vacío, se autollenará con todos los hijos de Oferta Interna Bruta EP que sean tipo "Energía Primaria"
                // O puedes forzar el orden así:
                { nombre: "Petróleo crudo", tipo: "Hijo", visible: true, padre: "Oferta Interna Bruta EP", posicion: 0 },
                { nombre: "Gas natural", tipo: "Hijo", visible: true, padre: "Oferta Interna Bruta EP", posicion: 1 },
                { nombre: "Carbón mineral", tipo: "Hijo", visible: true, padre: "Oferta Interna Bruta EP", posicion: 2 },
                { nombre: "Condensados", tipo: "Hijo", visible: true, padre: "Oferta Interna Bruta EP", posicion: 3 },
                { nombre: "Energía Nuclear", tipo: "Hijo", visible: true, padre: "Oferta Interna Bruta EP", posicion: 4 },
                { nombre: "Energía Hidráulica", tipo: "Hijo", visible: true, padre: "Oferta Interna Bruta EP", posicion: 5 },
                { nombre: "Geoenergía", tipo: "Hijo", visible: true, padre: "Oferta Interna Bruta EP", posicion: 6 },
                { nombre: "Energía solar", tipo: "Hijo", visible: true, padre: "Oferta Interna Bruta EP", posicion: 7 },
                { nombre: "Energía eólica", tipo: "Hijo", visible: true, padre: "Oferta Interna Bruta EP", posicion: 8 },
                { nombre: "Bagazo de caña", tipo: "Hijo", visible: true, padre: "Oferta Interna Bruta EP", posicion: 9 },
                { nombre: "Leña", tipo: "Hijo", visible: true, padre: "Oferta Interna Bruta EP", posicion: 10 },
                { nombre: "Biogás", tipo: "Hijo", visible: true, padre: "Oferta Interna Bruta EP", posicion: 11 }
                // ...
            ]
        },
        {
            // Columna 3: Salidas de Energía Primaria
            nombre: "Salidas de Energía Primaria",
            mostrar: "Padre",
            filtroTipo: "Energía Primaria",
            alineacionVertical: "abajo",
            nodos: [
                // Un solo espaciador grande para empujar los nodos hacia abajo
                { nombre: "SPACER_BIG", tipo: "Padre", visible: true, posicion: 0, depth: 2, esEspaciador: true, valorEspaciador: 12000 },
                // Nodos reales posicionados después del espaciador
                //{ nombre: "Exportación EP", tipo: "Padre", visible: true, posicion: 1, depth: 2, flow: 'sink' },
                //{ nombre: "Energía No Aprovechada EP", tipo: "Padre", visible: true, posicion: 2, depth: 2, flow: 'sink' },
                //{ nombre: "Consumo Propio del Sector EP", tipo: "Padre", visible: true, posicion: 3, depth: 2, flow: 'sink' },
                //{ nombre: "Pérdidas técnicas por transporte, transmisión y distribución EP", tipo: "Padre", visible: true, posicion: 4, depth: 2, flow: 'sink' },
                //{ nombre: "Variación de Inventarios EP (-)", tipo: "Padre", visible: true, posicion: 4, depth: 2, flow: 'sink' }, // Default para manejar valores +/- 
                // { nombre: "Diferencia Estadística EP (-)", tipo: "Padre", visible: true, posicion: 5, depth: 2, flow: 'sink' }, // N/A toso los años de EP en 0 pero queda la configuración lista 
                { nombre: "Pérdidas EP", tipo: "Padre", visible: true, posicion: 1, flow: 'sink' },
            ]
        },
        //Refinerías y Despuntadoras
        {
            // Columna 4: Entradas a Transformaciones
            nombre: "Transformaciones",
            mostrar: "Padre",
            filtroTipo: "Energía Primaria",
            alineacionVertical: "abajo",
            nodos: [
                // Un solo espaciador grande para empujar los nodos hacia abajo
                { nombre: "SPACER_BIG_3", tipo: "Padre", visible: true, posicion: 0, esEspaciador: true, valorEspaciador: 3500 },
                // Nodos reales posicionados después del espaciador
                { nombre: "Coquizadoras y Hornos", tipo: "Padre", visible: true, posicion: 1, depth: 3 },
                { nombre: "Plantas de Gas y Fraccionadoras", tipo: "Padre", visible: true, posicion: 2, depth: 3 },
                { nombre: "Refinerías y Despuntadoras", tipo: "Padre", visible: true, posicion: 3, depth: 3 }

            ]
        },

        {
            // Columna 4: Padres principales
            nombre: "Origen Energía Secundaria",
            mostrar: "Padre",
            filtroTipo: "Energía Secundaria", // Solo hijos cuyo tipo sea "Energía Primaria"
            alineacionVertical: "abajo",
            nodos: [
                { nombre: "SPACER_BIG_4", tipo: "Padre", visible: true, posicion: 0, esEspaciador: true, valorEspaciador: 1000 },
                // Puedes agregar más nodos padre aquí si lo deseas
                { nombre: "Importación ES", tipo: "Padre", visible: true, posicion: 0, flow: 'source' },
                //{ nombre: "Variación de Inventarios ES (+)", tipo: "Padre", visible: true, posicion: 1, flow: 'source' }, // Default para manejar valores +/-         
                //{ nombre: "Diferencia Estadística ES (+)", tipo: "Padre", visible: true, posicion: 3, flow: 'source' },
                { nombre: "V.I. y Dif. Est. ES", tipo: "Padre", visible: true, posicion: 1, flow: 'source' },
            ]
        },
        // Energéticos Secundarios
        {
            // Columna 5: Hijos de Oferta Interna Bruta EP, solo los de tipo Energía Secundaria
            nombre: "Energía Secundaria",
            mostrar: "Hijo",
            filtroTipo: "Energía Secundaria",
            padre: "Oferta Interna Bruta EP", // Solo hijos cuyo tipo sea "Energía Secundaria"
            nodos: [
                { nombre: "SPACER_BIG_5", tipo: "Padre", visible: true, posicion: 0, esEspaciador: true, valorEspaciador: 2000 },
                // Puedes ajustar el orden y agregar más según tu catálogo
                { nombre: "Coque de carbón", tipo: "Hijo", visible: true, padre: "Oferta Interna Bruta EP", posicion: 0, depth: 5 },
                { nombre: "Coque de petróleo", tipo: "Hijo", visible: true, padre: "Oferta Interna Bruta EP", posicion: 1, depth: 5 },
                { nombre: "Gas licuado de petróleo", tipo: "Hijo", visible: true, padre: "Oferta Interna Bruta EP", posicion: 2, depth: 5 },
                { nombre: "Gasolinas y naftas", tipo: "Hijo", visible: true, padre: "Oferta Interna Bruta EP", posicion: 3, depth: 5 },
                { nombre: "Querosenos", tipo: "Hijo", visible: true, padre: "Oferta Interna Bruta EP", posicion: 4, depth: 5 },
                { nombre: "Diesel", tipo: "Hijo", visible: true, padre: "Oferta Interna Bruta EP", posicion: 5, depth: 5 },
                { nombre: "Combustóleo", tipo: "Hijo", visible: true, padre: "Oferta Interna Bruta EP", posicion: 6, depth: 5 },
                { nombre: "Otros energéticos", tipo: "Hijo", visible: true, padre: "Oferta Interna Bruta EP", posicion: 7, depth: 5 },
                { nombre: "Gas natural seco", tipo: "Hijo", visible: true, padre: "Oferta Interna Bruta EP", posicion: 8, depth: 5 },
                // { nombre: "Energía eléctrica", tipo: "Hijo", visible: true, padre: "Oferta Interna Bruta EP", posicion: 9, depth: 5 }
                { nombre: "SPACER_BIG_5B", tipo: "Padre", visible: true, posicion: 9, esEspaciador: true, valorEspaciador: 2000 },
                // // ...
            ]
        },
        //Un comentrio de Cambio de nombre de columna
        {
            // Columna : Entradas a Transformaciones Centrales Eléctricas
            nombre: "Transformaciones a Centrales Eléctricas",
            mostrar: "Padre",
            filtroTipo: "Todos",
            alineacionVertical: "abajo",
            nodos: [
                // Un solo espaciador grande para empujar los nodos hacia abajo
                // Nodos reales posicionados después del espaciador
                { nombre: "SPACER_BIG_7", tipo: "Padre", visible: true, posicion: 1, esEspaciador: true, valorEspaciador: 10000 },
                { nombre: "Centrales Eléctricas", tipo: "Padre", visible: true, posicion: 2, },


            ]
        },
        // Energía Eléctrica
        {
            // Columna 7: Energía Secundaria
            nombre: "Energía Secundaria",
            mostrar: "Hijo",
            filtroTipo: "Energía Secundaria",
            padre: "Oferta Interna Bruta EP", // Solo hijos cuyo tipo sea "Energía Secundaria"
            nodos: [
                { nombre: "SPACER_BIG_E", tipo: "Padre", visible: true, posicion: 0, esEspaciador: true, valorEspaciador: 8000 },
                // Puedes ajustar el orden y agregar más según tu catálogo

                //{ nombre: "Gas natural seco", tipo: "Hijo", visible: true, padre: "Oferta Interna Bruta EP", posicion: 8, depth: 5 },
                { nombre: "Energía eléctrica", tipo: "Hijo", visible: true, padre: "Oferta Interna Bruta EP", posicion: 9, }
                // // ...
            ]
        },

        {
            // Columna 6: Salidas de Energía Secundaria
            nombre: "Salidas de Energía Secundaria",
            mostrar: "Padre",
            filtroTipo: "Energía Secundaria",
            alineacionVertical: "abajo",
            nodos: [
                // Un solo espaciador grande para empujar los nodos hacia abajo
                { nombre: "SPACER_BIG_ES", tipo: "Padre", visible: true, posicion: 0, esEspaciador: true, valorEspaciador: 12000 },
                // Nodos reales posicionados después del espaciador
                // { nombre: "Exportación ES", tipo: "Padre", visible: true, posicion: 1, flow: 'sink' },
                // { nombre: "Energía No Aprovechada ES", tipo: "Padre", visible: true, posicion: 2, flow: 'sink' },
                // { nombre: "Consumo Propio del Sector ES", tipo: "Padre", visible: true, posicion: 3, flow: 'sink' },
                // { nombre: "Pérdidas técnicas por transporte, transmisión y distribución ES", tipo: "Padre", visible: true, posicion: 4, flow: 'sink' },
                // { nombre: "Variación de Inventarios ES (-)", tipo: "Padre", visible: true, posicion: 4, flow: 'sink' }, // Default para manejar valores +/- 
                // { nombre: "Diferencia Estadística ES (-)", tipo: "Padre", visible: true, posicion: 5, flow: 'sink' }, // Default para manejar valores +/- 
                { nombre: "Pérdidas ES", tipo: "Padre", visible: true, posicion: 1, flow: 'sink' },
            ]
        },
        {
            // Columna 5: Padres principales
            nombre: "Sectores de Consumo",
            mostrar: "Padre",
            filtroTipo: "Energía Secundaria", // Solo hijos cuyo tipo sea "Energía Primaria"
            alineacionVertical: "abajo",
            nodos: [
                { nombre: "SPACER_BIG_sect", tipo: "Padre", visible: true, posicion: 0, esEspaciador: true, valorEspaciador: 4000 },
                // Puedes agregar más nodos padre aquí si lo deseas
                { nombre: "Industrial", tipo: "Padre", visible: true, posicion: 0, flow: 'sink' },
                { nombre: "Transporte", tipo: "Padre", visible: true, posicion: 1, flow: 'sink' }, // Default para manejar valores +/-         
                { nombre: "Agropecuario", tipo: "Padre", visible: true, posicion: 2, flow: 'sink' },
                { nombre: "Comercial", tipo: "Padre", visible: true, posicion: 3, flow: 'sink' },
                { nombre: "Público", tipo: "Padre", visible: true, posicion: 4, flow: 'sink' },
                { nombre: "Residencial", tipo: "Padre", visible: true, posicion: 5, flow: 'sink' },

                //{ nombre: "Petroquímica PEMEX", tipo: "Padre", visible: true, posicion: 6, flow: 'sink' },
                //{ nombre: "Otras ramas económicas", tipo: "Padre", visible: true, posicion: 7, flow: 'sink' },

                { nombre: "Consumo final no energético", tipo: "Padre", visible: true, posicion: 7, flow: 'sink' },

            ]
        },


    ],
    enlaces: [
        // Si quieres forzar enlaces explícitos, agrégalos aquí:
        // { source: "Oferta Interna Bruta EP", target: "Carbón mineral" },
        // { source: "Oferta Interna Bruta EP", target: "Petróleo crudo" },
        // ...
        // Si no, se generan automáticos por flujo de datos
    ],
    // Títulos/etiquetas de columnas (ajusta left en % y top en px)
    columnLabels: [
        { id: 'col-ep', text: 'FEP', left: '5%', top: 80 },
        { id: 'col-origen', text: 'Energéticos Primarios', left: '10%', top: 80 },
        { id: 'col-origen', text: 'Energéticos Secundarios', left: '43%', top: 80 },
        { id: 'col-salidas-ep', text: 'Transformaciones', left: '26%', top: 80 },
        // { id: 'col-transform', text: 'Transformaciones', left: '40%', top: 8 },
        // { id: 'col-origen-es', text: 'Origen ES', left: '52%', top: 8 },
        // { id: 'col-es', text: 'Energía Secundaria', left: '64%', top: 8 },
        // { id: 'col-ce', text: 'Centrales Eléctricas', left: '76%', top: 8 },
        // { id: 'col-ee', text: 'Energía Eléctrica', left: '84%', top: 8 },
        // { id: 'col-salidas-es', text: 'Salidas ES', left: '90%', top: 8 },
        { id: 'col-sectores', text: 'Usos Finales', left: '76%', top: 80 },
    ],
};
