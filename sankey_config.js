// Configuración flexible para el Sankey
// Puedes modificar columnas, nodos, filtros, posiciones y enlaces
window.sankeyConfig = {
    // Configuración general del layout
    layoutConfig: {
        nodeAlign: 'left', // 'left' respeta mejor las posiciones Y manuales
        nodeGap: 15, // Menos espacio = más compacto
        nodeWidth: 15, // Nodos más delgados
        layoutIterations: 0, // 0 = respeta tu orden manual completamente
        curveness: 0.6 // Líneas menos curvas
    },
    columnas: [
        {
            // Columna 1: Padres principales
            nombre: "Origen",
            mostrar: "Padre",
            filtroTipo: "Energía Primaria", // Solo hijos cuyo tipo sea "Energía Primaria"
            alineacionVertical: "abajo",
            nodos: [
                // Puedes agregar más nodos padre aquí si lo deseas
                { nombre: "Importación EP", tipo: "Padre", visible: true, posicion: 0, y: 100, flow: 'source' },
                { nombre: "Variación de Inventarios EP (+)", tipo: "Padre", visible: true, posicion: 1, }, // Default para manejar valores +/- 
                { nombre: "Producción", tipo: "Padre", visible: true, posicion: 2, y: 300, flow: 'source' },
                { nombre: "Diferencia Estadística EP (+)", tipo: "Padre", visible: true, posicion: 3, flow: 'source' },
            ]
        },
        {
            // Columna 2: Hijos de Oferta Interna Bruta EP, solo los de tipo Energía Primaria
            nombre: "Energía Primaria",
            mostrar: "Hijo",
            filtroTipo: "Energía Primaria",
            padre: "Oferta Interna Bruta EP", // Solo hijos cuyo tipo sea "Energía Primaria"
            nodos: [
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
                { nombre: "SPACER_BIG", tipo: "Padre", visible: true, posicion: 0, depth: 2, esEspaciador: true, valorEspaciador: 10000 },
                // Nodos reales posicionados después del espaciador
                { nombre: "Exportación EP", tipo: "Padre", visible: true, posicion: 1, depth: 2, flow: 'sink' },
                { nombre: "Energía No Aprovechada EP", tipo: "Padre", visible: true, posicion: 2, depth: 2, flow: 'sink' },
                { nombre: "Consumo Propio del Sector EP", tipo: "Padre", visible: true, posicion: 3, depth: 2, flow: 'sink' },
                { nombre: "Pérdidas técnicas por transporte, transmisión y distribución EP", tipo: "Padre", visible: true, posicion: 4, depth: 2, flow: 'sink' },
                { nombre: "Variación de Inventarios EP (-)", tipo: "Padre", visible: true, posicion: 4, depth: 2, flow: 'sink' }, // Default para manejar valores +/- 
                { nombre: "Diferencia Estadística EP (-)", tipo: "Padre", visible: true, posicion: 5, depth: 2, flow: 'sink' }, // Default para manejar valores +/- 
            ]
        },
        {
            // Columna 4: Entradas a Transformaciones
            nombre: "Transformaciones",
            mostrar: "Padre",
            filtroTipo: "Energía Primaria",
            alineacionVertical: "abajo",
            nodos: [
                // Un solo espaciador grande para empujar los nodos hacia abajo
                // Nodos reales posicionados después del espaciador
                { nombre: "Coquizadoras y Hornos", tipo: "Padre", visible: true, posicion: 1, depth: 3 },
                { nombre: "Plantas de Gas y Fraccionadoras", tipo: "Padre", visible: true, posicion: 2, depth: 3 },
                { nombre: "Refinerías y Despuntadoras", tipo: "Padre", visible: true, posicion: 3, depth: 3 }

            ]
        },
        {
            // Columna 4: Entradas a Transformaciones Centrales Eléctricas
            nombre: "Transformaciones a Centrales Eléctricas",
            mostrar: "Padre",
            filtroTipo: "Todos",
            alineacionVertical: "abajo",
            nodos: [
                // Un solo espaciador grande para empujar los nodos hacia abajo
                // Nodos reales posicionados después del espaciador
                { nombre: "SPACER_BIG_1", tipo: "Padre", visible: true, posicion: 1, depth: 4, esEspaciador: true, valorEspaciador: 10000 },
                { nombre: "Centrales Eléctricas", tipo: "Padre", visible: true, posicion: 2, depth: 4 },


            ]
        },
        // Energéticos Secundarios
        // {
        //     // Columna: Hijos de Oferta Interna Bruta EP, solo los de tipo Energía Secundaria
        //     nombre: "Energía Secundaria",
        //     mostrar: "Hijo",
        //     filtroTipo: "Energía Secundaria",
        //     padre: "Oferta Interna Bruta EP", // Solo hijos cuyo tipo sea "Energía Secundaria"
        //     nodos: [
        //         // Puedes ajustar el orden y agregar más según tu catálogo
        //         // { nombre: "Coque de carbón", tipo: "Hijo", visible: true, padre: "Oferta Interna Bruta EP", posicion: 0, depth: 5 },
        //         // { nombre: "Coque de petróleo", tipo: "Hijo", visible: true, padre: "Oferta Interna Bruta EP", posicion: 1, depth: 5 },
        //         //  { nombre: "Gas licuado de petróleo", tipo: "Hijo", visible: true, padre: "Oferta Interna Bruta EP", posicion: 2, depth: 5 },
        //         // { nombre: "Gasolinas y naftas", tipo: "Hijo", visible: true, padre: "Oferta Interna Bruta EP", posicion: 3, depth: 5 },
        //         //  { nombre: "Querosenos", tipo: "Hijo", visible: true, padre: "Oferta Interna Bruta EP", posicion: 4, depth: 5 },
        //         //{ nombre: "Diesel", tipo: "Hijo", visible: true, padre: "Oferta Interna Bruta EP", posicion: 5, depth: 5 },
        //         //{ nombre: "Combustóleo", tipo: "Hijo", visible: true, padre: "Oferta Interna Bruta EP", posicion: 6, depth: 5 },
        //         //{ nombre: "Otros energéticos", tipo: "Hijo", visible: true, padre: "Oferta Interna Bruta EP", posicion: 7, depth: 5 },
        //         //{ nombre: "Gas natural seco", tipo: "Hijo", visible: true, padre: "Oferta Interna Bruta EP", posicion: 8, depth: 5 },
        //         // { nombre: "Energía eléctrica", tipo: "Hijo", visible: true, padre: "Oferta Interna Bruta EP", posicion: 9, depth: 5 }
        //         // // ...
        //     ]
        // },
    ],
    enlaces: [
        // Si quieres forzar enlaces explícitos, agrégalos aquí:
        // { source: "Oferta Interna Bruta EP", target: "Carbón mineral" },
        // { source: "Oferta Interna Bruta EP", target: "Petróleo crudo" },
        // ...
        // Si no, se generan automáticos por flujo de datos
    ]
};
