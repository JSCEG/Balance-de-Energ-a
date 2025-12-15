document.addEventListener('DOMContentLoaded', () => {
    const colorPickersTableBody = document.getElementById('color-pickers-table-body');
    const layoutConfigContainer = document.getElementById('layout-config-container');
    const otherConfigContainer = document.getElementById('other-config-container');
    const saveButton = document.getElementById('save-button');
    const paletteOptionsContainer = document.getElementById('palette-options');
    const activePaletteLabel = document.getElementById('active-palette-label');
    const paletteDescription = document.getElementById('palette-description');
    const exportButton = document.getElementById('export-palette-button');
    const paletteButtons = new Map();

    const config = window.sankeyConfig || {};

    const institutionalColors = {
        'Carbón mineral': '#171B1E',
        'Petróleo crudo': '#621333',
        'Condensados': '#9C2348',
        'Gas natural': '#002F2A',
        'Energía Nuclear': '#98989A',
        'Energía Hidráulica': '#1E5B4F',
        'Energía Geotérmica': '#9C2348',
        'Energía solar': '#E7D295',
        'Energía eólica': '#002F2A',
        'Bagazo de caña': '#A6802D',
        'Leña': '#621333',
        'Biogás': '#1E5B4F',
        'Coque de carbón': '#171B1E',
        'Coque de petróleo': '#002F2A',
        'Gas licuado de petróleo': '#A6802D',
        'Gasolinas y naftas': '#E7D295',
        'Querosenos': '#98989A',
        'Diesel': '#9C2348',
        'Combustóleo': '#621333',
        'Gas Seco': '#1E5B4F',
        'Otros energéticos': '#002F2A',
        'Energía eléctrica': '#E7D295',
        'Producción': '#9C2348',
        'Importación EP': '#621333',
        'Importación ES': '#A6802D',
        'Variación de Inventarios EP (+)': '#E7D295',
        'Variación de Inventarios ES (+)': '#1E5B4F',
        'Exportación EP': '#002F2A',
        'Exportación ES': '#98989A',
        'Energía No Aprovechada EP': '#171B1E',
        'Energía No Aprovechada ES': '#9C2348',
        'Consumo Propio del Sector EP': '#621333',
        'Consumo Propio del Sector ES': '#A6802D',
        'Diferencia Estadística EP (+)': '#E7D295',
        'Diferencia Estadística ES (+)': '#1E5B4F',
        'Pérdidas técnicas por transporte, transmisión y distribución EP': '#002F2A',
        'Pérdidas técnicas por transporte, transmisión y distribución ES': '#98989A',
        'Oferta Interna Bruta EP': '#171B1E',
        'Oferta Interna Bruta ES': '#9C2348',
        'Variación de Inventarios EP (-)': '#621333',
        'Diferencia Estadística EP (-)': '#A6802D',
        'Variación de Inventarios ES (-)': '#E7D295',
        'Diferencia Estadística ES (-)': '#1E5B4F',
        'Coquizadoras y Hornos': '#002F2A',
        'Plantas de Gas y Fraccionadoras': '#98989A',
        'Refinerías y Despuntadoras': '#171B1E',
        'Centrales Eléctricas': '#9C2348',
        'Carboeléctrica': '#4B5563',
        'Térmica Convencional': '#615D5D',
        'Combustión Interna': '#7C7C7C',
        'Turbogás': '#5B5B5B',
        'Ciclo Combinado': '#3F3F46',
        'Nucleoeléctrica': '#6B21A8',
        'Cogeneración': '#0EA5E9',
        'Geotérmica': '#B91C1C',
        'Eólica': '#22C55E',
        'Solar Fotovoltaica': '#F59E0B',
        'Industrial': '#621333',
        'Transporte': '#A6802D',
        'Agropecuario': '#E7D295',
        'Comercial': '#1E5B4F',
        'Público': '#002F2A',
        'Residencial': '#98989A',
        'Petroquímica PEMEX': '#171B1E',
        'Otras ramas económicas': '#9C2348',
        'Oferta Total': '#98989A',
        'Exportación': '#171B1E',
        'Energía No Aprovechada': '#002F2A',
        'Total Transformación': '#1E5B4F',
        'Total Consumo del Sector': '#A6802D',
        'Consumo final total': '#621333',
        'Consumo final no energético': '#9C2348',
        'Consumo final energético': '#E7D295',
        'Producción bruta energía secundaria': '#98989A',
        'Pérdidas en transporte y transmisión por energético': '#171B1E',
        'Pérdidas en distribución por energético': '#002F2A',
        'Pérdidas no técnicas por energético': '#1E5B4F',
        'Diferencia Estadística': '#A6802D',
        'Pérdidas ES': '#621333',
        'Pérdidas EP': '#9C2348',
        'V.I. y Dif. Est. EP': '#E7D295',
        'V.I. y Dif. Est. ES': '#98989A'
    };

    const storedColors = { ...(config.energeticColors || {}) };
    const nodeNames = Array.from(new Set([...Object.keys(institutionalColors), ...Object.keys(storedColors)]));
    const currentColors = Object.fromEntries(
        nodeNames.map(name => [name, storedColors[name] ?? institutionalColors[name] ?? '#808080'])
    );
    const newColors = { ...currentColors };
    const pickers = {};
    const colorCells = {};

    let isApplyingPalette = false;

    const customPaletteInfo = {
        id: 'custom',
        name: 'Configuración personalizada',
        summary: 'Colores definidos manualmente.',
        description: 'Has ajustado los colores manualmente. Guarda la configuración o selecciona una paleta predefinida para restaurar un esquema.'
    };

    const nodeCategories = {};
    const assignCategory = (names, category) => {
        names.forEach(name => {
            if (nodeNames.includes(name)) {
                nodeCategories[name] = category;
            }
        });
    };
    assignCategory(['Petróleo crudo', 'Gas natural', 'Carbón mineral', 'Condensados'], 'primarioFosil');
    assignCategory(['Energía Hidráulica', 'Energía Geotérmica', 'Energía solar', 'Energía eólica', 'Bagazo de caña', 'Leña', 'Biogás'], 'primarioRenovable');
    assignCategory(['Energía Nuclear'], 'primarioNuclear');
    assignCategory(['Coque de carbón', 'Coque de petróleo'], 'secSolido');
    assignCategory(['Gas licuado de petróleo', 'Gasolinas y naftas', 'Querosenos', 'Diesel', 'Combustóleo', 'Otros energéticos'], 'secLiquido');
    assignCategory(['Gas Seco'], 'secGas');
    assignCategory(['Energía eléctrica'], 'electricidad');
    assignCategory(['Producción', 'Importación EP', 'Importación ES', 'Oferta Interna Bruta EP', 'Oferta Interna Bruta ES', 'Oferta Total', 'Producción bruta energía secundaria'], 'origenBalance');
    assignCategory(['Variación de Inventarios EP (+)', 'Variación de Inventarios ES (+)'], 'inventarioPos');
    assignCategory(['Variación de Inventarios EP (-)', 'Variación de Inventarios ES (-)'], 'inventarioNeg');
    assignCategory(['Exportación EP', 'Exportación ES', 'Exportación'], 'exportacion');
    assignCategory(['Energía No Aprovechada EP', 'Energía No Aprovechada ES', 'Energía No Aprovechada'], 'noAprovechada');
    assignCategory(['Consumo Propio del Sector EP', 'Consumo Propio del Sector ES'], 'consumoPropio');
    assignCategory([
        'Pérdidas técnicas por transporte, transmisión y distribución EP',
        'Pérdidas técnicas por transporte, transmisión y distribución ES',
        'Pérdidas en transporte y transmisión por energético',
        'Pérdidas en distribución por energético',
        'Pérdidas no técnicas por energético',
        'Pérdidas ES',
        'Pérdidas EP'
    ], 'perdidas');
    assignCategory([
        'Diferencia Estadística EP (+)',
        'Diferencia Estadística ES (+)',
        'Diferencia Estadística EP (-)',
        'Diferencia Estadística ES (-)',
        'Diferencia Estadística',
        'V.I. y Dif. Est. EP',
        'V.I. y Dif. Est. ES'
    ], 'diferencia');
    assignCategory(['Coquizadoras y Hornos', 'Plantas de Gas y Fraccionadoras', 'Refinerías y Despuntadoras'], 'transformaciones');
    assignCategory([
        'Centrales Eléctricas',
        'Carboeléctrica',
        'Térmica Convencional',
        'Combustión Interna',
        'Turbogás',
        'Ciclo Combinado',
        'Nucleoeléctrica',
        'Cogeneración',
        'Geotérmica',
        'Eólica',
        'Solar Fotovoltaica'
    ], 'centrales');
    assignCategory([
        'Industrial',
        'Transporte',
        'Agropecuario',
        'Comercial',
        'Público',
        'Residencial',
        'Consumo final total',
        'Consumo final no energético',
        'Consumo final energético',
        'Total Transformación',
        'Total Consumo del Sector',
        'Petroquímica PEMEX',
        'Otras ramas económicas'
    ], 'sectores');

    const buildPalette = (categoryColors = {}) => {
        const palette = Object.fromEntries(
            nodeNames.map(name => [name, institutionalColors[name] ?? currentColors[name] ?? '#808080'])
        );
        nodeNames.forEach(name => {
            const category = nodeCategories[name];
            if (category && categoryColors[category]) {
                palette[name] = categoryColors[category];
            }
        });
        return palette;
    };

    const normalizeName = (value = '') => value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .trim();

    const defaultNameMap = nodeNames.reduce((acc, name) => {
        acc[normalizeName(name)] = name;
        return acc;
    }, {});
    const energeticosPaletteOverrides = {
        'Carbón mineral': '#2B2B2B',
        'Coque de carbón': '#2B2B2B',
        'Petróleo crudo': '#7B2C2C',
        'Coque de petróleo': '#8B3A3A',
        'Condensados': '#A94442',
        'Gas natural': '#1E5B4F',
        'Gas Seco': '#00796B',
        'Energía Nuclear': '#C0C0C0',
        'Nucleoeléctrica': '#6B21A8',
        'Energía Hidráulica': '#1565C0',
        'Energía Geotérmica': '#B91C1C',
        'Geotérmica': '#B91C1C',
        'Energía solar': '#F6C700',
        'Solar Fotovoltaica': '#F59E0B',
        'Energía eólica': '#22C55E',
        'Eólica': '#22C55E',
        'Bagazo de caña': '#A67C41',
        'Leña': '#8C4A2F',
        'Biogás': '#4CAF50',
        'Gas licuado de petróleo': '#9C27B0',
        'Gasolinas y naftas': '#FF9800',
        'Querosenos': '#A0522D',
        'Diesel': '#C62828',
        'Combustóleo': '#7B2C2C',
        'Otros energéticos': '#3E3E3E',
        'Energía eléctrica': '#FFD54F',
        'Producción bruta energía secundaria': '#DADADA',
        'Producción': '#795548',
        'Importación EP': '#8D6E63',
        'Importación ES': '#A1887F',
        'Variación de Inventarios EP (+)': '#E7D295',
        'Variación de Inventarios ES (+)': '#81C784',
        'Variación de Inventarios EP (-)': '#E7D295',
        'Variación de Inventarios ES (-)': '#81C784',
        'Exportación': '#1976D2',
        'Exportación EP': '#1565C0',
        'Exportación ES': '#42A5F5',
        'Energía No Aprovechada': '#9E9E9E',
        'Energía No Aprovechada EP': '#9E9E9E',
        'Energía No Aprovechada ES': '#BDBDBD',
        'Consumo Propio del Sector EP': '#8D6E63',
        'Consumo Propio del Sector ES': '#A1887F',
        'Diferencia Estadística': '#A6802D',
        'Diferencia Estadística EP (+)': '#A6802D',
        'Diferencia Estadística ES (+)': '#D7CCC8',
        'Diferencia Estadística EP (-)': '#A6802D',
        'Diferencia Estadística ES (-)': '#D7CCC8',
        'Pérdidas técnicas por transporte, transmisión y distribución EP': '#9E9E9E',
        'Pérdidas técnicas por transporte, transmisión y distribución ES': '#BDBDBD',
        'Pérdidas en transporte y transmisión por energético': '#9E9E9E',
        'Pérdidas en distribución por energético': '#BDBDBD',
        'Pérdidas no técnicas por energético': '#757575',
        'Pérdidas EP': '#9E9E9E',
        'Pérdidas ES': '#BDBDBD',
        'Oferta Interna Bruta EP': '#171B1E',
        'Oferta Interna Bruta ES': '#171B1E',
        'Oferta Total': '#98989A',
        'Total Transformación': '#F57C00',
        'Total Consumo del Sector': '#4CAF50',
        'Consumo final total': '#7B1FA2',
        'Consumo final no energético': '#E0E0E0',
        'Consumo final energético': '#FDD835',
        'V.I. y Dif. Est. EP': '#D7CCC8',
        'V.I. y Dif. Est. ES': '#D7CCC8',
        'Transformación': '#F57C00',
        'Coquizadoras y Hornos': '#3F3F46',
        'Plantas de Gas y Fraccionadoras': '#2E7D32',
        'Refinerías y Despuntadoras': '#5D4037',
        'Centrales Eléctricas': '#8E24AA',
        'Carboeléctrica': '#4B5563',
        'Térmica Convencional': '#615D5D',
        'Combustión Interna': '#7C7C7C',
        'Turbogás': '#5B5B5B',
        'Ciclo Combinado': '#3F3F46',
        'Cogeneración': '#0EA5E9',
        'Industrial': '#0D47A1',
        'Transporte': '#F57C00',
        'Agropecuario': '#7CB342',
        'Comercial': '#6A1B9A',
        'Público': '#5D4037',
        'Residencial': '#FFEB3B',
        'Petroquímica PEMEX': '#9C2348',
        'Otras ramas económicas': '#424242'
    };

    const energeticosBase = Object.fromEntries(
        nodeNames.map(name => [name, institutionalColors[name] ?? currentColors[name] ?? '#808080'])
    );
    const energeticosColors = { ...energeticosBase };
    Object.entries(energeticosPaletteOverrides).forEach(([raw, color]) => {
        const target = defaultNameMap[normalizeName(raw)];
        if (target) {
            energeticosColors[target] = color;
        }
    });

    const paletteDefinitions = [
        {
            id: 'institucional',
            name: 'Institucional SENER',
            icon: 'fa-landmark',
            summary: 'Mantiene la identidad cromática oficial.',
            description: 'Paleta oficial que respeta la identidad cromática institucional de SENER.',
            colors: Object.fromEntries(
                nodeNames.map(name => [name, institutionalColors[name] ?? currentColors[name] ?? '#808080'])
            ),
            preview: ['#621333', '#1E5B4F', '#E7D295', '#98989A', '#002F2A']
        },
        {
            id: 'cadena-termica',
            name: 'Cadena fósil y transformación',
            icon: 'fa-fire-flame-curved',
            summary: 'Tonos cálidos para hidrocarburos y procesos térmicos.',
            description: 'Destaca la cadena de hidrocarburos y los procesos térmicos con saturaciones cálidas y azules para pérdidas y salidas.',
            categoryColors: {
                primarioFosil: '#B2502C',
                primarioRenovable: '#2F855A',
                primarioNuclear: '#6B46C1',
                secSolido: '#57534E',
                secLiquido: '#F97316',
                secGas: '#0284C7',
                electricidad: '#FACC15',
                origenBalance: '#9D174D',
                inventarioPos: '#F4A259',
                inventarioNeg: '#C2410C',
                exportacion: '#1E293B',
                noAprovechada: '#7C2D12',
                consumoPropio: '#92400E',
                perdidas: '#475569',
                diferencia: '#5B21B6',
                transformaciones: '#B91C1C',
                centrales: '#9D174D',
                sectores: '#1D4ED8',
                otros: '#64748B'
            }
        },
        {
            id: 'transicion-verde',
            name: 'Transición energética limpia',
            icon: 'fa-leaf',
            summary: 'Resalta renovables y eficiencia energética.',
            description: 'Contrasta energéticos fósiles con neutros profundos y potencia renovables y consumo eficiente con verdes y azules vibrantes.',
            categoryColors: {
                primarioFosil: '#475569',
                primarioRenovable: '#16A34A',
                primarioNuclear: '#6366F1',
                secSolido: '#6B7280',
                secLiquido: '#F59E0B',
                secGas: '#0EA5E9',
                electricidad: '#FDE68A',
                origenBalance: '#0F766E',
                inventarioPos: '#2DD4BF',
                inventarioNeg: '#155E75',
                exportacion: '#083344',
                noAprovechada: '#0E7490',
                consumoPropio: '#1D4ED8',
                perdidas: '#111827',
                diferencia: '#3730A3',
                transformaciones: '#22C55E',
                centrales: '#14B8A6',
                sectores: '#0F172A',
                otros: '#94A3B8'
            }
        },
        {
            id: 'energeticos',
            name: 'Energéticos diferenciados',
            icon: 'fa-gas-pump',
            summary: 'Color dedicado para cada tipo de energético.',
            description: 'Paleta diseñada para identificar rápidamente el tipo de energético (primario o secundario) dentro de la cadena de valor.',
            colors: energeticosColors,
            preview: ['#2B2B2B', '#7B2C2C', '#A94442', '#1E5B4F', '#FFD54F', '#F57C00']
        }
    ];

    paletteDefinitions.forEach(palette => {
        if (!palette.colors) {
            palette.colors = buildPalette(palette.categoryColors || {});
        }
        if (!palette.preview) {
            const source = palette.categoryColors ? Object.values(palette.categoryColors) : Object.values(palette.colors);
            const unique = [...new Set(source)];
            palette.preview = unique.slice(0, 6);
        }
    });

    let currentPaletteId = findMatchingPalette(currentColors);

    renderPaletteOptions();
    updateActivePaletteUI();

    const swatchColors = Array.from(new Set([
        '#621333', '#1E5B4F', '#E7D295', '#002F2A', '#9C2348',
        '#B2502C', '#2F855A', '#0284C7', '#F97316', '#FACC15',
        '#16A34A', '#6366F1', '#0EA5E9', '#FDE68A', '#475569', '#22C55E',
        '#2B2B2B', '#7B2C2C', '#A94442', '#C0C0C0', '#1565C0', '#B91C1C',
        '#F6C700', '#A67C41', '#8C4A2F', '#4CAF50', '#9C27B0', '#FF9800',
        '#C62828', '#FFD54F', '#8E24AA', '#0D47A1', '#F57C00', '#7CB342',
        '#6A1B9A', '#FFEB3B', '#5D4037', '#9E9E9E', '#1976D2', '#BDBDBD',
        '#3E3E3E', '#00796B', '#8B3A3A', '#A0522D', '#DADADA', '#81C784',
        '#795548', '#424242', '#8D6E63', '#A1887F', '#42A5F5', '#A6802D',
        '#757575', '#E0E0E0', '#FDD835', '#7B1FA2', '#171B1E', '#3F3F46',
        '#2E7D32', '#615D5D', '#5B5B5B', '#4B5563', '#7C7C7C', '#D7CCC8'
    ]));
    config.columnas?.forEach(column => {
        column.nodos.forEach(node => {
            const baseColor = currentColors[node.nombre];
            if (!baseColor) {
                return;
            }

            const row = document.createElement('tr');

            const colorCell = document.createElement('td');
            colorCell.style.backgroundColor = baseColor;
            const colorPickerContainer = document.createElement('div');
            colorPickerContainer.classList.add('color-picker');
            colorCell.appendChild(colorPickerContainer);

            const pickr = Pickr.create({
                el: colorPickerContainer,
                theme: 'classic',
                default: baseColor,
                swatches: swatchColors,
                components: {
                    preview: true,
                    opacity: true,
                    hue: true,
                    interaction: {
                        hex: true,
                        rgba: true,
                        hsla: true,
                        hsva: true,
                        cmyk: true,
                        input: true,
                        clear: true,
                        save: true
                    }
                }
            });

            pickers[node.nombre] = pickr;
            colorCells[node.nombre] = colorCell;

            pickr.on('change', color => {
                const hex = color.toHEXA().toString();
                colorCell.style.backgroundColor = hex;
            });

            pickr.on('save', color => {
                const newColor = color.toHEXA().toString();
                newColors[node.nombre] = newColor;
                colorCell.style.backgroundColor = newColor;
                if (!isApplyingPalette) {
                    markCustom();
                }
                pickr.hide();
            });

            pickr.on('clear', () => {
                const fallback = institutionalColors[node.nombre] ?? '#808080';
                newColors[node.nombre] = fallback;
                colorCell.style.backgroundColor = fallback;
                if (!isApplyingPalette) {
                    markCustom();
                }
                pickr.setColor(fallback);
            });

            const columnCell = document.createElement('td');
            columnCell.textContent = column.nombre;

            const nodeCell = document.createElement('td');
            nodeCell.textContent = node.nombre;

            const typeCell = document.createElement('td');
            typeCell.textContent = node.tipo || '';

            row.appendChild(colorCell);
            row.appendChild(columnCell);
            row.appendChild(nodeCell);
            row.appendChild(typeCell);

            colorPickersTableBody?.appendChild(row);
        });
    });

    Object.entries(config.layoutConfig || {}).forEach(([key, value]) => {
        const layoutInputWrapper = document.createElement('div');
        layoutInputWrapper.classList.add('form-group', 'row');

        const label = document.createElement('label');
        label.textContent = key;
        label.classList.add('col-sm-4', 'col-form-label');

        const inputWrapper = document.createElement('div');
        inputWrapper.classList.add('col-sm-8');

        const input = document.createElement('input');
        input.type = (typeof value === 'number') ? 'number' : 'text';
        input.value = value;
        input.dataset.name = key;
        input.classList.add('form-control');

        inputWrapper.appendChild(input);
        layoutInputWrapper.appendChild(label);
        layoutInputWrapper.appendChild(inputWrapper);
        layoutConfigContainer?.appendChild(layoutInputWrapper);
    });
    const colorByWrapper = document.createElement('div');
    colorByWrapper.classList.add('form-group', 'row');
    const colorByLabel = document.createElement('label');
    colorByLabel.textContent = 'Color By';
    colorByLabel.classList.add('col-sm-4', 'col-form-label');
    const colorBySelectWrapper = document.createElement('div');
    colorBySelectWrapper.classList.add('col-sm-8');
    const colorBySelect = document.createElement('select');
    colorBySelect.dataset.name = 'colorBy';
    colorBySelect.classList.add('form-control');
    ['child', 'parent', 'category'].forEach(option => {
        const opt = document.createElement('option');
        opt.value = option;
        opt.textContent = option;
        if (option === config.colorBy) {
            opt.selected = true;
        }
        colorBySelect.appendChild(opt);
    });
    colorBySelectWrapper.appendChild(colorBySelect);
    colorByWrapper.appendChild(colorByLabel);
    colorByWrapper.appendChild(colorBySelectWrapper);
    otherConfigContainer?.appendChild(colorByWrapper);

    const decalEnabledWrapper = document.createElement('div');
    decalEnabledWrapper.classList.add('form-group', 'row');
    const decalEnabledLabel = document.createElement('label');
    decalEnabledLabel.textContent = 'Decal Enabled';
    decalEnabledLabel.classList.add('col-sm-4', 'col-form-label');
    const decalEnabledCheckboxWrapper = document.createElement('div');
    decalEnabledCheckboxWrapper.classList.add('col-sm-8');
    const decalEnabledCheckbox = document.createElement('input');
    decalEnabledCheckbox.type = 'checkbox';
    decalEnabledCheckbox.checked = Boolean(config.decalEnabled);
    decalEnabledCheckbox.dataset.name = 'decalEnabled';
    decalEnabledCheckbox.classList.add('form-check-input');
    decalEnabledCheckboxWrapper.appendChild(decalEnabledCheckbox);
    decalEnabledWrapper.appendChild(decalEnabledLabel);
    decalEnabledWrapper.appendChild(decalEnabledCheckboxWrapper);
    otherConfigContainer?.appendChild(decalEnabledWrapper);

    saveButton?.addEventListener('click', () => {
        const newConfig = { ...config };
        newConfig.energeticColors = { ...newColors };

        const layoutInputs = layoutConfigContainer?.querySelectorAll('input') || [];
        const newLayoutConfig = {};
        layoutInputs.forEach(input => {
            newLayoutConfig[input.dataset.name] = (input.type === 'number') ? parseFloat(input.value) : input.value;
        });
        newConfig.layoutConfig = newLayoutConfig;

        newConfig.colorBy = otherConfigContainer?.querySelector('select[data-name="colorBy"]')?.value || config.colorBy;
        newConfig.decalEnabled = !!otherConfigContainer?.querySelector('input[data-name="decalEnabled"]')?.checked;

        fetch('/save-config', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newConfig)
        })
            .then(response => response.text())
            .then(message => {
                alert(message);
            })
            .catch(error => {
                console.error('Error al guardar la configuración:', error);
                alert('Error al guardar la configuración.');
            });
    });

    exportButton?.addEventListener('click', () => {
        if (typeof XLSX === 'undefined') {
            alert('No fue posible cargar el exportador de Excel. Verifica tu conexión.');
            return;
        }
        const meta = getActivePaletteMeta();
        const rows = collectPaletteRows();
        if (!rows.length) {
            alert('No hay colores disponibles para exportar.');
            return;
        }

        const header = [
            ['Paleta', meta.name],
            ['Generado', new Date().toLocaleString()],
            [],
            ['Columna', 'Nodo', 'Tipo', 'Color Hex']
        ];
        const dataRows = rows.map(item => [item.column || '-', item.node, item.type || '-', item.color]);
        const worksheet = XLSX.utils.aoa_to_sheet([...header, ...dataRows]);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Paleta');

        const filename = `paleta-${slugify(meta.name)}-${timestampString()}.xlsx`;
        XLSX.writeFile(workbook, filename);
    });
    function renderPaletteOptions() {
        if (!paletteOptionsContainer) return;
        paletteButtons.clear();
        paletteOptionsContainer.innerHTML = '';

        paletteDefinitions.forEach(palette => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'palette-option';
            button.dataset.paletteId = palette.id;
            if (palette.id === currentPaletteId) {
                button.classList.add('is-active');
            }

            const title = document.createElement('div');
            title.className = 'palette-option-title';
            const icon = document.createElement('i');
            icon.className = `fa-solid ${palette.icon || 'fa-palette'}`;
            title.appendChild(icon);
            const titleText = document.createElement('span');
            titleText.textContent = palette.name;
            title.appendChild(titleText);
            button.appendChild(title);

            if (palette.preview?.length) {
                const preview = document.createElement('div');
                preview.className = 'palette-preview';
                palette.preview.slice(0, 6).forEach(color => {
                    const swatch = document.createElement('span');
                    swatch.className = 'palette-swatch';
                    swatch.style.backgroundColor = color;
                    preview.appendChild(swatch);
                });
                button.appendChild(preview);
            }

            if (palette.summary) {
                const summary = document.createElement('div');
                summary.className = 'palette-option-description';
                summary.textContent = palette.summary;
                button.appendChild(summary);
            }

            button.addEventListener('click', () => applyPalette(palette.id));
            paletteOptionsContainer.appendChild(button);
            paletteButtons.set(palette.id, button);
        });
    }

    function applyPalette(paletteId) {
        const palette = paletteDefinitions.find(item => item.id === paletteId);
        if (!palette) return;
        const paletteColors = palette.colors || {};

        isApplyingPalette = true;
        nodeNames.forEach(name => {
            const color = paletteColors[name] ?? institutionalColors[name] ?? currentColors[name] ?? '#808080';
            newColors[name] = color;
            if (colorCells[name]) {
                colorCells[name].style.backgroundColor = color;
            }
            if (pickers[name]) {
                pickers[name].setColor(color);
            }
        });
        isApplyingPalette = false;

        currentPaletteId = paletteId;
        updateActivePaletteUI();
    }

    function updateActivePaletteUI() {
        paletteButtons.forEach((button, id) => {
            button.classList.toggle('is-active', id === currentPaletteId);
        });

        const meta = getActivePaletteMeta();
        if (activePaletteLabel) {
            activePaletteLabel.textContent = meta.name;
        }
        if (paletteDescription) {
            paletteDescription.textContent = meta.description || '';
        }
    }

    function findMatchingPalette(referenceColors) {
        for (const palette of paletteDefinitions) {
            const matches = nodeNames.every(name => {
                const paletteColor = (palette.colors?.[name] || '').toLowerCase();
                const referenceColor = (referenceColors[name] || '').toLowerCase();
                return paletteColor === referenceColor;
            });
            if (matches) {
                return palette.id;
            }
        }
        return customPaletteInfo.id;
    }

    function markCustom() {
        if (currentPaletteId !== customPaletteInfo.id) {
            currentPaletteId = customPaletteInfo.id;
            updateActivePaletteUI();
        }
    }

    function getActivePaletteMeta() {
        if (currentPaletteId === customPaletteInfo.id) {
            return { id: customPaletteInfo.id, name: customPaletteInfo.name, description: customPaletteInfo.description };
        }
        const palette = paletteDefinitions.find(item => item.id === currentPaletteId);
        if (palette) {
            return { id: palette.id, name: palette.name, description: palette.description };
        }
        return { id: customPaletteInfo.id, name: customPaletteInfo.name, description: customPaletteInfo.description };
    }

    function collectPaletteRows() {
        const rows = [];
        const seenNames = new Set();

        config.columnas?.forEach(column => {
            column.nodos.forEach(node => {
                const color = newColors[node.nombre] ?? institutionalColors[node.nombre] ?? '#808080';
                if (!color) return;
                rows.push({
                    column: column.nombre,
                    node: node.nombre,
                    type: node.tipo || '',
                    color
                });
                seenNames.add(node.nombre);
            });
        });

        Object.entries(newColors).forEach(([name, color]) => {
            if (seenNames.has(name)) return;
            rows.push({
                column: '',
                node: name,
                type: '',
                color
            });
        });

        rows.sort((a, b) => a.node.localeCompare(b.node, undefined, { sensitivity: 'base' }));
        return rows;
    }

    function slugify(value = '') {
        return value
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
            || 'paleta';
    }

    function timestampString() {
        const now = new Date();
        const pad = (n) => n.toString().padStart(2, '0');
        return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}`;
    }
});
