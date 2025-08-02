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
                        ...(nodeData || {}), // Copy all properties from nodeData
                        name: nodo.nombre,
                        itemStyle: { color: (nodeData && nodeData.color && nodeData.color !== '') ? nodeData.color : '#888' },
                        description: nodeData ? nodeData.descripcion : '',
                        tipo: nodeData ? nodeData.tipo : nodo.tipo,
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

                            // La dirección del flujo la determina el NODO PADRE
                            if (value < 0 || (padreNode && padreNode.flow === 'sink')) {
                                // Si el padre es un sink (consumidor), el flujo va del hijo hacia el padre
                                source = hijo["Nodo Hijo"];
                                target = padre["Nodo Padre"];
                            } else {
                                // Comportamiento por defecto: el padre es una fuente, el flujo va del padre al hijo
                                source = padre["Nodo Padre"];
                                target = hijo["Nodo Hijo"];
                            }
                            links.push({
                                source: source,
                                target: target,
                                value: Math.abs(value),
                                lineStyle: { color: config.energeticColors[hijo["Nodo Hijo"]] || '#888' } // Asignar color del energético
                            });
                        }
                    }
                });
            }
        });

        // 3. Calcular el valor neto de cada nodo (entrada - salida) y adjuntar inflow/outflow
        const nodeInflow = new Map();
        const nodeOutflow = new Map();

        links.forEach(link => {
            nodeInflow.set(link.target, (nodeInflow.get(link.target) || 0) + link.value);
            nodeOutflow.set(link.source, (nodeOutflow.get(link.source) || 0) + link.value);
        });

        Array.from(nodes.values()).forEach(node => {
            if (!node.esEspaciador) {
                let inflow = nodeInflow.get(node.name) || 0;
                let outflow = nodeOutflow.get(node.name) || 0;

                // Forzar comportamiento de source/sink
                if (node.flow === 'sink') {
                    outflow = 0; // Un sink no tiene salidas
                } else if (node.flow === 'source') {
                    inflow = 0; // Un source no tiene entradas
                }

                node.value = Math.max(inflow, outflow); // El valor del nodo es el mayor de los flujos
                node.inflow = inflow;
                node.outflow = outflow;
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