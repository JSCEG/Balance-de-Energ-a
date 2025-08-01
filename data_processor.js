window.dataProcessor = {
    processSankeyData: function(data, year, config) {
        const nodes = new Map();
        const links = [];

        // 1. Construir todos los nodos a partir de la configuración
        config.columnas.forEach((col, colIdx) => {
            let nodosCol = [];
            if (col.nodos && col.nodos.length > 0) {
                nodosCol = col.nodos.filter(n => n.visible !== false);
            } else if (col.mostrar === "Hijo" && col.filtroTipo) {
                data.Datos.forEach(padre => {
                    padre["Nodos Hijo"].forEach(hijo => {
                        if (hijo.tipo === col.filtroTipo) {
                            nodosCol.push({ nombre: hijo["Nodo Hijo"], tipo: "Hijo", padre: padre["Nodo Padre"] });
                        }
                    });
                });
            }

            nodosCol.forEach(nodo => {
                if (!nodes.has(nodo.nombre)) {
                    let nodeData = this.findNodeData(data, nodo.nombre, nodo.tipo);
                    const nodeConfig = {
                        name: nodo.nombre,
                        itemStyle: { color: (nodeData && nodeData.color && nodeData.color !== '') ? nodeData.color : '#888' },
                        description: nodeData ? nodeData.descripcion : '',
                        tipo: nodo.tipo,
                        padre: nodo.padre || null,
                        columna: colIdx,
                        depth: nodo.depth !== undefined ? nodo.depth : colIdx,
                        flow: nodo.flow || 'default',
                        esEspaciador: nodo.esEspaciador || false
                    };

                    // Lógica para espaciadores
                    if (nodeConfig.esEspaciador) {
                        nodeConfig.itemStyle = { color: 'transparent', borderColor: 'transparent' };
                        nodeConfig.label = { show: false };
                        nodeConfig.value = nodo.valorEspaciador || 0.1; // Asignar valor para que ocupe espacio
                    }

                    nodes.set(nodo.nombre, nodeConfig);
                }
            });
        });

        // 2. Crear enlaces basados en el flujo de datos
        data.Datos.forEach(padre => {
            const padreNode = nodes.get(padre["Nodo Padre"]);
            if (padreNode) {
                padre["Nodos Hijo"].forEach(hijo => {
                    if (nodes.has(hijo["Nodo Hijo"])) {
                        const value = hijo[year] || 0;
                        if (value !== 0) {
                            let source, target;
                            const hijoConfig = nodes.get(hijo["Nodo Hijo"]); // Obtener la configuración del nodo hijo

                            // Determinar la dirección del enlace según la propiedad 'flow' del nodo hijo
                            // o si el valor es negativo (para Variación de Inventarios)
                            if (value < 0 || (hijoConfig && hijoConfig.flow === 'sink')) {
                                source = hijo["Nodo Hijo"];
                                target = padre["Nodo Padre"];
                            } else {
                                // Comportamiento por defecto: padre -> hijo
                                source = padre["Nodo Padre"];
                                target = hijo["Nodo Hijo"];
                            }
                            links.push({
                                source: source,
                                target: target,
                                value: Math.abs(value)
                            });
                        }
                    }
                });
            }
        });

        return { nodes: Array.from(nodes.values()), links };
    },

    findNodeData: function(data, nodeName, nodeType) {
        if (nodeType === "Padre") {
            return data.Datos.find(d => d["Nodo Padre"] === nodeName);
        }
        for (const padre of data.Datos) {
            const hijo = padre["Nodos Hijo"].find(h => h["Nodo Hijo"] === nodeName);
            if (hijo) return hijo;
        }
        return null;
    }
};