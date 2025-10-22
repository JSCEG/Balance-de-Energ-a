window.sankeyConfig = {
    "energeticColors": {
        "Carbón mineral": "#475569",
        "Petróleo crudo": "#475569",
        "Condensados": "#475569",
        "Gas natural": "#475569",
        "Energía Nuclear": "#6366F1",
        "Energía Hidráulica": "#16A34A",
        "Energía Geotérmica": "#16A34A",
        "Energía solar": "#16A34A",
        "Energía eólica": "#16A34A",
        "Bagazo de caña": "#16A34A",
        "Leña": "#16A34A",
        "Biogás": "#16A34A",
        "Coque de carbón": "#6B7280",
        "Coque de petróleo": "#6B7280",
        "Gas licuado de petróleo": "#F59E0B",
        "Gasolinas y naftas": "#81C784",
        "Querosenos": "#F59E0B",
        "Diesel": "#F59E0B",
        "Combustóleo": "#F59E0B",
        "Gas natural seco": "#0EA5E9",
        "Otros energéticos": "#F59E0B",
        "Energía eléctrica": "#FDE68A",
        "Producción": "#81C784",
        "Importación EP": "#B90EE2",
        "Importación ES": "#0F766E",
        "Variación de Inventarios EP (+)": "#2DD4BF",
        "Variación de Inventarios ES (+)": "#2DD4BF",
        "Exportación EP": "#083344",
        "Exportación ES": "#083344",
        "Energía No Aprovechada EP": "#0E7490",
        "Energía No Aprovechada ES": "#0E7490",
        "Consumo Propio del Sector EP": "#1D4ED8",
        "Consumo Propio del Sector ES": "#1D4ED8",
        "Diferencia Estadística EP (+)": "#3730A3",
        "Diferencia Estadística ES (+)": "#3730A3",
        "Pérdidas técnicas por transporte, transmisión y distribución EP": "#111827",
        "Pérdidas técnicas por transporte, transmisión y distribución ES": "#111827",
        "Oferta Interna Bruta EP": "#0F766E",
        "Oferta Interna Bruta ES": "#0F766E",
        "Variación de Inventarios EP (-)": "#155E75",
        "Diferencia Estadística EP (-)": "#3730A3",
        "Variación de Inventarios ES (-)": "#155E75",
        "Diferencia Estadística ES (-)": "#3730A3",
        "Coquizadoras y Hornos": "#22C55E",
        "Plantas de Gas y Fraccionadoras": "#22C55E",
        "Refinerías y Despuntadoras": "#22C55E",
        "Centrales Eléctricas": "#14B8A6",
        "Carboeléctrica": "#14B8A6",
        "Térmica Convencional": "#14B8A6",
        "Combustión Interna": "#14B8A6",
        "Turbogás": "#14B8A6",
        "Ciclo Combinado": "#14B8A6",
        "Nucleoeléctrica": "#14B8A6",
        "Cogeneración": "#14B8A6",
        "Geotérmica": "#14B8A6",
        "Eólica": "#14B8A6",
        "Solar Fotovoltaica": "#14B8A6",
        "Industrial": "#0F172A",
        "Transporte": "#0F172A",
        "Agropecuario": "#0F172A",
        "Comercial": "#0F172A",
        "Público": "#0F172A",
        "Residencial": "#0F172A",
        "Petroquímica PEMEX": "#0F172A",
        "Otras ramas económicas": "#0F172A",
        "Oferta Total": "#0F766E",
        "Exportación": "#083344",
        "Energía No Aprovechada": "#0E7490",
        "Total Transformación": "#0F172A",
        "Total Consumo del Sector": "#0F172A",
        "Consumo final total": "#0F172A",
        "Consumo final no energético": "#0F172A",
        "Consumo final energético": "#0F172A",
        "Producción bruta energía secundaria": "#0F766E",
        "Pérdidas en transporte y transmisión por energético": "#111827",
        "Pérdidas en distribución por energético": "#111827",
        "Pérdidas no técnicas por energético": "#111827",
        "Diferencia Estadística": "#3730A3",
        "Pérdidas ES": "#111827",
        "Pérdidas EP": "#111827",
        "V.I. y Dif. Est. EP": "#8DD790",
        "V.I. y Dif. Est. ES": "#3730A3"
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
