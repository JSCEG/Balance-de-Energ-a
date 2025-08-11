window.dataProcessor = {
    // Determina si un nombre corresponde a un energético específico (no contenedor)
    isSpecificEnergetic(nodeName) {
        const containerKeywords = [
            "Importación", "Exportación", "Producción", "Variación", "Inventarios",
            "Diferencia", "Estadística", "Pérdidas", "Oferta", "Bruta", "Consumo",
            "Propio", "Sector", "Centrales", "Eléctricas", "Coquizadoras", "Hornos",
            "Plantas", "Gas", "Fraccionadoras", "Refinerías", "Despuntadoras",
            "Industrial", "Transporte", "Agropecuario", "Comercial", "Público",
            "Residencial", "Petroquímica", "PEMEX", "Total", "V.I.", "Dif.", "Est.",
        ];
        return !containerKeywords.some((k) => nodeName && nodeName.includes(k));
    },

    // Color correcto por energético (con degradado a genérico si no hay match)
    getEnergeticColor(nodeName, nodeData, config) {
        if (this.isSpecificEnergetic(nodeName) && config.energeticColors[nodeName]) {
            return config.energeticColors[nodeName];
        }
        if (nodeData && nodeData["Nodo Hijo"] && this.isSpecificEnergetic(nodeData["Nodo Hijo"])) {
            const c = config.energeticColors[nodeData["Nodo Hijo"]];
            if (c) return c;
        }
        if (config.energeticColors[nodeName]) return config.energeticColors[nodeName];
        return "#888";
    },

    processSankeyData(data, year, config) {
        const y = String(year);
        const nodes = new Map();
        const links = [];

        // 1) Registrar nodos definidos en la config (soporta espaciadores)
        config.columnas.forEach((col, colIdx) => {
            let nodosCol = [];
            if (Array.isArray(col.nodos) && col.nodos.length) {
                nodosCol = col.nodos.filter((n) => n.visible !== false);
            } else if (col.mostrar === "Hijo" && col.filtroTipo) {
                (data.Datos || []).forEach((padre) => {
                    (padre["Nodos Hijo"] || []).forEach((hijo) => {
                        if (hijo.tipo === col.filtroTipo) {
                            nodosCol.push({ nombre: hijo["Nodo Hijo"], tipo: "Hijo", padre: padre["Nodo Padre"] });
                        }
                    });
                });
            }

            nodosCol.forEach((nodo) => {
                if (!nodes.has(nodo.nombre)) {
                    const nodeData = this.findNodeData(data, nodo.nombre, nodo.tipo);
                    const nodeConfig = {
                        ...(nodeData || {}), // <- FIX: spread correcto (antes había un error de sintaxis)
                        name: nodo.nombre,
                        description: nodeData ? nodeData.descripcion : "",
                        tipo: nodeData ? nodeData.tipo : nodo.tipo,
                        padre: nodo.padre || null,
                        columna: colIdx,
                        depth: nodo.depth !== undefined ? nodo.depth : colIdx,
                        flow: nodo.flow || "default",
                        esEspaciador: Boolean(nodo.esEspaciador),
                    };

                    if (nodeConfig.esEspaciador) {
                        Object.assign(nodeConfig, {
                            itemStyle: { color: "rgba(0,0,0,0)", borderColor: "rgba(0,0,0,0)", borderWidth: 0, opacity: 0 },
                            label: { show: false },
                            silent: true,
                            value: nodo.valorEspaciador || 0.1, // ocupa espacio vertical
                        });
                    } else {
                        nodeConfig.itemStyle = { color: this.getEnergeticColor(nodo.nombre, nodeData, config) };
                    }

                    nodes.set(nodo.nombre, nodeConfig);
                }
            });
        });

        // 2) Construir enlaces a partir de los datos (respeta dirección por source/sink y signos)
        (data.Datos || []).forEach((padre) => {
            const padreNode = nodes.get(padre["Nodo Padre"]);
            if (!padreNode) return;

            (padre["Nodos Hijo"] || []).forEach((hijo) => {
                if (!nodes.has(hijo["Nodo Hijo"])) return;
                const raw = hijo[y];
                const value = typeof raw === "number" ? raw : Number(raw);
                if (!value || Number.isNaN(value) || value === 0) return;

                let source, target;
                if (value < 0 || (padreNode && padreNode.flow === "sink")) {
                    source = hijo["Nodo Hijo"]; // entra al padre
                    target = padre["Nodo Padre"];
                } else {
                    source = padre["Nodo Padre"]; // sale del padre
                    target = hijo["Nodo Hijo"];
                }

                const energeticName = hijo["Nodo Hijo"];
                const energeticColor = this.getEnergeticColor(energeticName, hijo, config);

                links.push({
                    source,
                    target,
                    value: Math.abs(value),
                    lineStyle: { color: energeticColor, opacity: 0.7 },
                });
            });
        });

        // 3) Calcular inflows/outflows y fijar value del nodo = max(entrada, salida)
        const nodeInflow = new Map();
        const nodeOutflow = new Map();

        links.forEach((lk) => {
            nodeInflow.set(lk.target, (nodeInflow.get(lk.target) || 0) + lk.value);
            nodeOutflow.set(lk.source, (nodeOutflow.get(lk.source) || 0) + lk.value);
        });

        Array.from(nodes.values()).forEach((node) => {
            if (node.esEspaciador) return;
            let inflow = nodeInflow.get(node.name) || 0;
            let outflow = nodeOutflow.get(node.name) || 0;

            if (node.flow === "sink") outflow = 0; // un sink no expulsa
            else if (node.flow === "source") inflow = 0; // un source no recibe

            node.value = Math.max(inflow, outflow);
            node.inflow = inflow;
            node.outflow = outflow;
        });

        return { nodes: Array.from(nodes.values()), links };
    },

    findNodeData(data, nodeName, nodeType) {
        if (nodeType === "Padre") {
            return (data.Datos || []).find((d) => d["Nodo Padre"] === nodeName) || null;
        }
        for (const padre of data.Datos || []) {
            const match = (padre["Nodos Hijo"] || []).find((h) => h["Nodo Hijo"] === nodeName);
            if (match) return match;
        }
        return null;
    },
};