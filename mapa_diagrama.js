/**
 * Archivo de configuración para el diagrama de Sankey (versión ECharts).
 * Define la estructura, el contenido y la apariencia de las columnas y nodos del diagrama.
 */
const mapaConfiguracion = {
    /**
     * Define las columnas del diagrama.
     * Cada objeto representa una columna y su contenido.
     * 
     * Propiedades:
     * - nombre: (String) Un nombre descriptivo para la columna (uso interno).
     * - depth: (Number) La posición horizontal de la columna, empezando en 0.
     * - posicionVertical: (String) Agrupa los nodos verticalmente. Puede ser 'arriba', 'medio', 'abajo'.
     * - fuenteNodos: (Object) Especifica cómo obtener los nodos para esta columna.
     *   - tipo: (String) El método para obtener los nodos:
     *     - 'lista': Usa una lista explícita de nombres de nodos.
     *     - 'hijosDe': Extrae los nodos hijos de un "Nodo Padre" específico de `datos.js`.
     *     - 'dinamico': Agrupa todos los nodos de un cierto `tipo` (ej. 'Energía Primaria') de `datos.js`.
     *   - nodos: (Array<String>, opcional) La lista de nombres de nodos (si tipo es 'lista').
     *   - padre: (String, opcional) El nombre del "Nodo Padre" (si tipo es 'hijosDe').
     *   - tipoFiltro: (String, opcional) El `tipo` de energético a filtrar (ej. 'Energía Primaria', 'Energía Secundaria', o 'Mixto').
     */
    columnas: [
        {
            nombre: "Fuentes Primarias",
            depth: 0,
            posicionVertical: "medio",
            fuenteNodos: {
                tipo: "lista",
                nodos: ["Producción", "Importación", "Variación de Inventarios"]
            }
        },
        {
            nombre: "Energéticos Primarios",
            depth: 1,
            posicionVertical: "medio",
            fuenteNodos: {
                tipo: "dinamico",
                tipoFiltro: "Energía Primaria"
            }
        },
        {
            nombre: "Transformación",
            depth: 2,
            posicionVertical: "medio",
            fuenteNodos: {
                tipo: "lista",
                nodos: ["Refinerías y Despuntadoras", "Plantas de Gas y Fraccionadoras", "Coquizadoras y Hornos"]
            }
        },
        {
            nombre: "Energéticos Secundarios",
            depth: 3,
            posicionVertical: "medio",
            fuenteNodos: {
                tipo: "dinamico",
                tipoFiltro: "Energía Secundaria"
            }
        },
        {
            nombre: "Consumo Final",
            depth: 4,
            posicionVertical: "medio",
            fuenteNodos: {
                tipo: "hijosDe",
                padre: "Consumo final total",
                tipoFiltro: "Mixto" // Acepta cualquier tipo de energético hijo
            }
        }
    ]
};

window.mapConfig = mapaConfiguracion;