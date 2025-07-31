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
                { nombre: "Importación", tipo: "Padre", visible: true, posicion: 0, y: 100 },
                { nombre: "Variación de Inventarios", tipo: "Padre", visible: true, posicion: 1, y: 200 },
                { nombre: "Producción", tipo: "Padre", visible: true, posicion: 2, y: 300 },
            ]
        },
        {
            // Columna 2: Hijos de Oferta Interna Bruta, solo los de tipo Energía Primaria
            nombre: "Energía Primaria",
            mostrar: "Hijo",
            filtroTipo: "Energía Primaria",
            padre: "Oferta Interna Bruta", // Solo hijos cuyo tipo sea "Energía Primaria"
            nodos: [
                // Si dejas vacío, se autollenará con todos los hijos de Oferta Interna Bruta que sean tipo "Energía Primaria"
                // O puedes forzar el orden así:
                { nombre: "Petróleo crudo", tipo: "Hijo", visible: true, padre: "Oferta Interna Bruta", posicion: 0 },
                { nombre: "Gas natural", tipo: "Hijo", visible: true, padre: "Oferta Interna Bruta", posicion: 1 },
                { nombre: "Carbón mineral", tipo: "Hijo", visible: true, padre: "Oferta Interna Bruta", posicion: 2 },
                { nombre: "Condensados", tipo: "Hijo", visible: true, padre: "Oferta Interna Bruta", posicion: 3 },
                { nombre: "Energía Nuclear", tipo: "Hijo", visible: true, padre: "Oferta Interna Bruta", posicion: 4 },
                { nombre: "Energía Hidráulica", tipo: "Hijo", visible: true, padre: "Oferta Interna Bruta", posicion: 5 },
                { nombre: "Geoenergía", tipo: "Hijo", visible: true, padre: "Oferta Interna Bruta", posicion: 6 },
                { nombre: "Energía solar", tipo: "Hijo", visible: true, padre: "Oferta Interna Bruta", posicion: 7 },
                { nombre: "Energía eólica", tipo: "Hijo", visible: true, padre: "Oferta Interna Bruta", posicion: 8 },
                { nombre: "Bagazo de caña", tipo: "Hijo", visible: true, padre: "Oferta Interna Bruta", posicion: 9 },
                { nombre: "Leña", tipo: "Hijo", visible: true, padre: "Oferta Interna Bruta", posicion: 10 },
                { nombre: "Biogás", tipo: "Hijo", visible: true, padre: "Oferta Interna Bruta", posicion: 11 }
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
                { nombre: "Exportación", tipo: "Padre", visible: true, posicion: 1, depth: 2 },
                { nombre: "Energía No Aprovechada", tipo: "Padre", visible: true, posicion: 2, depth: 2 },
                { nombre: "Consumo Propio del Sector", tipo: "Padre", visible: true, posicion: 3, depth: 2 },
                { nombre: "Pérdidas técnicas por transporte, transmisión y distribución", tipo: "Padre", visible: true, posicion: 4, depth: 2 },
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
                { nombre: "Refinerías y Despuntadoras", tipo: "Padre", visible: true, posicion: 3, depth: 3 },

            ]
        }
    ],
    enlaces: [
        // Si quieres forzar enlaces explícitos, agrégalos aquí:
        // { source: "Oferta Interna Bruta", target: "Carbón mineral" },
        // { source: "Oferta Interna Bruta", target: "Petróleo crudo" },
        // ...
        // Si no, se generan automáticos por flujo de datos
    ]
};
