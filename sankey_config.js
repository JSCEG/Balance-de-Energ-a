// Configuración flexible para el Sankey
// Puedes modificar columnas, nodos, filtros, posiciones y enlaces
window.sankeyConfig = {
    columnas: [
        {
            // Columna 1: Padres principales
            nombre: "Origen",
            mostrar: "Padre",
            filtroTipo: "Energía Primaria", // Solo hijos cuyo tipo sea "Energía Primaria"
            nodos: [
                // Puedes agregar más nodos padre aquí si lo deseas
                { nombre: "Producción", tipo: "Padre", visible: true, posicion: 2 },
                { nombre: "Importación", tipo: "Padre", visible: true, posicion: 0 },
                { nombre: "Variación de Inventarios", tipo: "Padre", visible: true, posicion: 1 },
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
                { nombre: "Carbón mineral", tipo: "Hijo", visible: true, padre: "Oferta Interna Bruta", posicion: 0 },
                { nombre: "Petróleo crudo", tipo: "Hijo", visible: true, padre: "Oferta Interna Bruta", posicion: 1 },
                { nombre: "Condensados", tipo: "Hijo", visible: true, padre: "Oferta Interna Bruta", posicion: 2 },
                { nombre: "Gas natural", tipo: "Hijo", visible: true, padre: "Oferta Interna Bruta", posicion: 3 },
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
