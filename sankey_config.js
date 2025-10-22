window.sankeyConfig = {
    "energeticColors": {
        "Carbón mineral": "#171B1E",
        "Petróleo crudo": "#621333",
        "Condensados": "#9C2348",
        "Gas natural": "#002F2A",
        "Energía Nuclear": "#98989A",
        "Energía Hidráulica": "#1E5B4F",
        "Energía Geotérmica": "#9C2348",
        "Energía solar": "#E7D295",
        "Energía eólica": "#002F2A",
        "Bagazo de caña": "#A6802D",
        "Leña": "#621333",
        "Biogás": "#1E5B4F",
        "Coque de carbón": "#171B1E",
        "Coque de petróleo": "#002F2A",
        "Gas licuado de petróleo": "#A6802D",
        "Gasolinas y naftas": "#E7D295",
        "Querosenos": "#98989A",
        "Diesel": "#9C2348",
        "Combustóleo": "#621333",
        "Gas natural seco": "#1E5B4F",
        "Otros energéticos": "#002F2A",
        "Energía eléctrica": "#E7D295",
        "Producción": "#9C2348",
        "Importación EP": "#621333",
        "Importación ES": "#A6802D",
        "Variación de Inventarios EP (+)": "#E7D295",
        "Variación de Inventarios ES (+)": "#1E5B4F",
        "Exportación EP": "#002F2A",
        "Exportación ES": "#98989A",
        "Energía No Aprovechada EP": "#171B1E",
        "Energía No Aprovechada ES": "#9C2348",
        "Consumo Propio del Sector EP": "#621333",
        "Consumo Propio del Sector ES": "#A6802D",
        "Diferencia Estadística EP (+)": "#E7D295",
        "Diferencia Estadística ES (+)": "#1E5B4F",
        "Pérdidas técnicas por transporte, transmisión y distribución EP": "#002F2A",
        "Pérdidas técnicas por transporte, transmisión y distribución ES": "#98989A",
        "Oferta Interna Bruta EP": "#171B1E",
        "Oferta Interna Bruta ES": "#9C2348",
        "Variación de Inventarios EP (-)": "#621333",
        "Diferencia Estadística EP (-)": "#A6802D",
        "Variación de Inventarios ES (-)": "#E7D295",
        "Diferencia Estadística ES (-)": "#1E5B4F",
        "Coquizadoras y Hornos": "#002F2A",
        "Plantas de Gas y Fraccionadoras": "#98989A",
        "Refinerías y Despuntadoras": "#171B1E",
        "Centrales Eléctricas": "#9C2348",
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
        "Industrial": "#621333",
        "Transporte": "#A6802D",
        "Agropecuario": "#E7D295",
        "Comercial": "#1E5B4F",
        "Público": "#002F2A",
        "Residencial": "#98989A",
        "Petroquímica PEMEX": "#171B1E",
        "Otras ramas económicas": "#9C2348",
        "Oferta Total": "#98989A",
        "Exportación": "#171B1E",
        "Energía No Aprovechada": "#002F2A",
        "Total Transformación": "#1E5B4F",
        "Total Consumo del Sector": "#A6802D",
        "Consumo final total": "#621333",
        "Consumo final no energético": "#9C2348",
        "Consumo final energético": "#E7D295",
        "Producción bruta energía secundaria": "#98989A",
        "Pérdidas en transporte y transmisión por energético": "#171B1E",
        "Pérdidas en distribución por energético": "#002F2A",
        "Pérdidas no técnicas por energético": "#1E5B4F",
        "Diferencia Estadística": "#A6802D",
        "Pérdidas ES": "#621333",
        "Pérdidas EP": "#9C2348",
        "V.I. y Dif. Est. EP": "#E7D295",
        "V.I. y Dif. Est. ES": "#98989A"
    },
    "efficiencyColors": {
        "efficient": "#38a169",
        "warning": "#dd6b20",
        "critical": "#e53e3e"
    },
    "layoutConfig": {
        "nodeAlign": "left",
        "nodeGap": 15,
        "nodeWidth": 30,
        "layoutIterations": 0,
        "curveness": 0.7
    },
    "columnWidths": {
        "0": 15,
        "1": 35,
        "2": 30,
        "3": 25,
        "4": 1,
        "5": 20
    },
    "colorBy": "child",
    "categoryColors": {
        "Fuentes Primarias": "#2E7D32",
        "Fuentes Secundarias": "#1565C0",
        "Energéticos Primarios": "#388E3C",
        "Energéticos Secundarios": "#1976D2",
        "Transformación": "#F57C00",
        "Sectores de Consumo": "#D32F2F",
        "Pérdidas y Exportaciones": "#7B1FA2",
        "Otros": "#616161"
    },
    "decalEnabled": true,
    "linkMinValue": 0,
    "flowPolicy": "bySign",
    "normalizeBy": "year",
    "curvenessAuto": false,
    "columnas": [
        {
            "nombre": "Origen",
            "mostrar": "Padre",
            "filtroTipo": "Energía Primaria",
            "alineacionVertical": "abajo",
            "nodos": [
                {
                    "nombre": "SPACER_BIG_IEP_1",
                    "tipo": "Padre",
                    "visible": true,
                    "posicion": 0,
                    "esEspaciador": true,
                    "valorEspaciador": 300
                },
                {
                    "nombre": "Importación EP",
                    "tipo": "Padre",
                    "visible": true,
                    "posicion": 0,
                    "y": 100,
                    "flow": "source"
                },
                {
                    "nombre": "V.I. y Dif. Est. EP",
                    "tipo": "Padre",
                    "visible": true,
                    "posicion": 3,
                    "flow": "source"
                },
                {
                    "nombre": "SPACER_BIG_IEP",
                    "tipo": "Padre",
                    "visible": true,
                    "posicion": 0,
                    "esEspaciador": true,
                    "valorEspaciador": 2000
                },
                {
                    "nombre": "Producción",
                    "tipo": "Padre",
                    "visible": true,
                    "posicion": 2,
                    "y": 300,
                    "flow": "source"
                }
            ]
        },
        {
            "nombre": "Energía Primaria",
            "mostrar": "Hijo",
            "filtroTipo": "Energía Primaria",
            "padre": "Oferta Interna Bruta EP",
            "nodos": [
                {
                    "nombre": "SPACER_BIG_EPP",
                    "tipo": "Padre",
                    "visible": true,
                    "posicion": 0,
                    "esEspaciador": true,
                    "valorEspaciador": 2500
                },
                {
                    "nombre": "Petróleo crudo",
                    "tipo": "Hijo",
                    "visible": true,
                    "padre": "Oferta Interna Bruta EP",
                    "posicion": 0
                },
                {
                    "nombre": "Gas natural",
                    "tipo": "Hijo",
                    "visible": true,
                    "padre": "Oferta Interna Bruta EP",
                    "posicion": 1
                },
                {
                    "nombre": "Carbón mineral",
                    "tipo": "Hijo",
                    "visible": true,
                    "padre": "Oferta Interna Bruta EP",
                    "posicion": 2
                },
                {
                    "nombre": "Condensados",
                    "tipo": "Hijo",
                    "visible": true,
                    "padre": "Oferta Interna Bruta EP",
                    "posicion": 3
                },
                {
                    "nombre": "Energía Nuclear",
                    "tipo": "Hijo",
                    "visible": true,
                    "padre": "Oferta Interna Bruta EP",
                    "posicion": 4
                },
                {
                    "nombre": "Energía Hidráulica",
                    "tipo": "Hijo",
                    "visible": true,
                    "padre": "Oferta Interna Bruta EP",
                    "posicion": 5
                },
                {
                    "nombre": "Energía Geotérmica",
                    "tipo": "Hijo",
                    "visible": true,
                    "padre": "Oferta Interna Bruta EP",
                    "posicion": 6
                },
                {
                    "nombre": "Energía solar",
                    "tipo": "Hijo",
                    "visible": true,
                    "padre": "Oferta Interna Bruta EP",
                    "posicion": 7
                },
                {
                    "nombre": "Energía eólica",
                    "tipo": "Hijo",
                    "visible": true,
                    "padre": "Oferta Interna Bruta EP",
                    "posicion": 8
                },
                {
                    "nombre": "Bagazo de caña",
                    "tipo": "Hijo",
                    "visible": true,
                    "padre": "Oferta Interna Bruta EP",
                    "posicion": 9
                },
                {
                    "nombre": "Leña",
                    "tipo": "Hijo",
                    "visible": true,
                    "padre": "Oferta Interna Bruta EP",
                    "posicion": 10
                },
                {
                    "nombre": "Biogás",
                    "tipo": "Hijo",
                    "visible": true,
                    "padre": "Oferta Interna Bruta EP",
                    "posicion": 11
                }
            ]
        },
        {
            "nombre": "Salidas de Energía Primaria",
            "mostrar": "Padre",
            "filtroTipo": "Energía Primaria",
            "alineacionVertical": "abajo",
            "nodos": [
                {
                    "nombre": "SPACER_BIG",
                    "tipo": "Padre",
                    "visible": true,
                    "posicion": 0,
                    "depth": 2,
                    "esEspaciador": true,
                    "valorEspaciador": 15500
                },
                {
                    "nombre": "Exportación EP",
                    "tipo": "Padre",
                    "visible": true,
                    "posicion": 1,
                    "depth": 2,
                    "flow": "sink"
                },
                {
                    "nombre": "Energía No Aprovechada EP",
                    "tipo": "Padre",
                    "visible": true,
                    "posicion": 2,
                    "depth": 2,
                    "flow": "sink"
                },
                {
                    "nombre": "Consumo Propio del Sector EP",
                    "tipo": "Padre",
                    "visible": true,
                    "posicion": 3,
                    "depth": 2,
                    "flow": "sink"
                },
                {
                    "nombre": "Pérdidas técnicas por transporte, transmisión y distribución EP",
                    "tipo": "Padre",
                    "visible": true,
                    "posicion": 4,
                    "depth": 2,
                    "flow": "sink"
                },
                {
                    "nombre": "Variación de Inventarios EP (-)",
                    "tipo": "Padre",
                    "visible": true,
                    "posicion": 4,
                    "depth": 2,
                    "flow": "sink"
                },
                {
                    "nombre": "Diferencia Estadística EP (-)",
                    "tipo": "Padre",
                    "visible": true,
                    "posicion": 5,
                    "depth": 2,
                    "flow": "sink"
                }
            ]
        },
        {
            "nombre": "Transformaciones",
            "mostrar": "Padre",
            "filtroTipo": "Energía Primaria",
            "alineacionVertical": "abajo",
            "nodos": [
                {
                    "nombre": "SPACER_BIG_3",
                    "tipo": "Padre",
                    "visible": true,
                    "posicion": 0,
                    "esEspaciador": true,
                    "valorEspaciador": 7500
                },
                {
                    "nombre": "Coquizadoras y Hornos",
                    "tipo": "Padre",
                    "visible": true,
                    "posicion": 1,
                    "depth": 3
                },
                {
                    "nombre": "Plantas de Gas y Fraccionadoras",
                    "tipo": "Padre",
                    "visible": true,
                    "posicion": 2,
                    "depth": 3
                },
                {
                    "nombre": "Refinerías y Despuntadoras",
                    "tipo": "Padre",
                    "visible": true,
                    "posicion": 3,
                    "depth": 3
                }
            ]
        },
        {
            "nombre": "Origen Energía Secundaria",
            "mostrar": "Padre",
            "filtroTipo": "Energía Secundaria",
            "alineacionVertical": "abajo",
            "nodos": [
                {
                    "nombre": "SPACER_BIG_4",
                    "tipo": "Padre",
                    "visible": true,
                    "posicion": 0,
                    "esEspaciador": true,
                    "valorEspaciador": 1000
                },
                {
                    "nombre": "V.I. y Dif. Est. ES",
                    "tipo": "Padre",
                    "visible": true,
                    "posicion": 1,
                    "flow": "source"
                },
                {
                    "nombre": "Importación ES",
                    "tipo": "Padre",
                    "visible": true,
                    "posicion": 0,
                    "flow": "source"
                }
            ]
        },
        {
            "nombre": "Energía Secundaria",
            "mostrar": "Hijo",
            "filtroTipo": "Energía Secundaria",
            "padre": "Oferta Interna Bruta EP",
            "nodos": [
                {
                    "nombre": "SPACER_BIG_5",
                    "tipo": "Padre",
                    "visible": true,
                    "posicion": 0,
                    "esEspaciador": true,
                    "valorEspaciador": 4000
                },
                {
                    "nombre": "Coque de carbón",
                    "tipo": "Hijo",
                    "visible": true,
                    "padre": "Oferta Interna Bruta EP",
                    "posicion": 0,
                    "depth": 5
                },
                {
                    "nombre": "Coque de petróleo",
                    "tipo": "Hijo",
                    "visible": true,
                    "padre": "Oferta Interna Bruta EP",
                    "posicion": 1,
                    "depth": 5
                },
                {
                    "nombre": "Gas licuado de petróleo",
                    "tipo": "Hijo",
                    "visible": true,
                    "padre": "Oferta Interna Bruta EP",
                    "posicion": 2,
                    "depth": 5
                },
                {
                    "nombre": "Gasolinas y naftas",
                    "tipo": "Hijo",
                    "visible": true,
                    "padre": "Oferta Interna Bruta EP",
                    "posicion": 3,
                    "depth": 5
                },
                {
                    "nombre": "Querosenos",
                    "tipo": "Hijo",
                    "visible": true,
                    "padre": "Oferta Interna Bruta EP",
                    "posicion": 4,
                    "depth": 5
                },
                {
                    "nombre": "Diesel",
                    "tipo": "Hijo",
                    "visible": true,
                    "padre": "Oferta Interna Bruta EP",
                    "posicion": 5,
                    "depth": 5
                },
                {
                    "nombre": "Combustóleo",
                    "tipo": "Hijo",
                    "visible": true,
                    "padre": "Oferta Interna Bruta EP",
                    "posicion": 6,
                    "depth": 5
                },
                {
                    "nombre": "Otros energéticos",
                    "tipo": "Hijo",
                    "visible": true,
                    "padre": "Oferta Interna Bruta EP",
                    "posicion": 7,
                    "depth": 5
                },
                {
                    "nombre": "Gas natural seco",
                    "tipo": "Hijo",
                    "visible": true,
                    "padre": "Oferta Interna Bruta EP",
                    "posicion": 8,
                    "depth": 5
                },
                {
                    "nombre": "SPACER_BIG_5B",
                    "tipo": "Padre",
                    "visible": true,
                    "posicion": 9,
                    "esEspaciador": true,
                    "valorEspaciador": 3000
                }
            ]
        },
        {
            "nombre": "Transformaciones a Centrales Eléctricas",
            "mostrar": "Padre",
            "filtroTipo": "Todos",
            "alineacionVertical": "abajo",
            "nodos": [
                {
                    "nombre": "SPACER_BIG_7",
                    "tipo": "Padre",
                    "visible": true,
                    "posicion": 1,
                    "esEspaciador": true,
                    "valorEspaciador": 11500
                },
                {
                    "nombre": "Centrales Eléctricas",
                    "tipo": "Padre",
                    "visible": true,
                    "posicion": 2
                }
            ]
        },
        {
            "nombre": "Energía Secundaria",
            "mostrar": "Hijo",
            "filtroTipo": "Energía Secundaria",
            "padre": "Oferta Interna Bruta EP",
            "nodos": [
                {
                    "nombre": "SPACER_BIG_E",
                    "tipo": "Padre",
                    "visible": true,
                    "posicion": 0,
                    "esEspaciador": true,
                    "valorEspaciador": 11500
                },
                {
                    "nombre": "Energía eléctrica",
                    "tipo": "Hijo",
                    "visible": true,
                    "padre": "Oferta Interna Bruta EP",
                    "posicion": 9
                }
            ]
        },
        {
            "nombre": "Salidas de Energía Secundaria",
            "mostrar": "Padre",
            "filtroTipo": "Energía Secundaria",
            "alineacionVertical": "abajo",
            "nodos": [
                {
                    "nombre": "SPACER_BIG_ES",
                    "tipo": "Padre",
                    "visible": true,
                    "posicion": 0,
                    "esEspaciador": true,
                    "valorEspaciador": 16000
                },
                {
                    "nombre": "Exportación ES",
                    "tipo": "Padre",
                    "visible": true,
                    "posicion": 1,
                    "flow": "sink"
                },
                {
                    "nombre": "Energía No Aprovechada ES",
                    "tipo": "Padre",
                    "visible": true,
                    "posicion": 2,
                    "flow": "sink"
                },
                {
                    "nombre": "Consumo Propio del Sector ES",
                    "tipo": "Padre",
                    "visible": true,
                    "posicion": 3,
                    "flow": "sink"
                },
                {
                    "nombre": "Pérdidas técnicas por transporte, transmisión y distribución ES",
                    "tipo": "Padre",
                    "visible": true,
                    "posicion": 4,
                    "flow": "sink"
                },
                {
                    "nombre": "Variación de Inventarios ES (-)",
                    "tipo": "Padre",
                    "visible": true,
                    "posicion": 4,
                    "flow": "sink"
                },
                {
                    "nombre": "Diferencia Estadística ES (-)",
                    "tipo": "Padre",
                    "visible": true,
                    "posicion": 5,
                    "flow": "sink"
                }
            ]
        },
        {
            "nombre": "Sectores de Consumo",
            "mostrar": "Padre",
            "filtroTipo": "Energía Secundaria",
            "alineacionVertical": "abajo",
            "nodos": [
                {
                    "nombre": "SPACER_BIG_sect",
                    "tipo": "Padre",
                    "visible": true,
                    "posicion": 0,
                    "esEspaciador": true,
                    "valorEspaciador": 3500
                },
                {
                    "nombre": "Industrial",
                    "tipo": "Padre",
                    "visible": true,
                    "posicion": 0,
                    "flow": "sink"
                },
                {
                    "nombre": "Transporte",
                    "tipo": "Padre",
                    "visible": true,
                    "posicion": 1,
                    "flow": "sink"
                },
                {
                    "nombre": "Agropecuario",
                    "tipo": "Padre",
                    "visible": true,
                    "posicion": 2,
                    "flow": "sink"
                },
                {
                    "nombre": "Comercial",
                    "tipo": "Padre",
                    "visible": true,
                    "posicion": 3,
                    "flow": "sink"
                },
                {
                    "nombre": "Público",
                    "tipo": "Padre",
                    "visible": true,
                    "posicion": 4,
                    "flow": "sink"
                },
                {
                    "nombre": "Residencial",
                    "tipo": "Padre",
                    "visible": true,
                    "posicion": 5,
                    "flow": "sink"
                },
                {
                    "nombre": "Consumo final no energético",
                    "tipo": "Padre",
                    "visible": true,
                    "posicion": 7,
                    "flow": "sink"
                }
            ]
        }
    ],
    "enlaces": [],
    "columnLabels": []
};
