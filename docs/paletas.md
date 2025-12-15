# Propuesta de paletas de color para el ecosistema Sankey

Este documento resume las paletas incluidas en el `personalizador.html` y en `sankey_config.js`. Cada paleta puede activarse desde la pestaña **Colores** del personalizador y sirve como referencia para entregar los cambios visuales del proyecto.

## Panorama general
- **Institucional SENER** (predeterminada): respeta la identidad cromatica Pantone definida para el balance energetico.
- **Cadena fosil y transformacion**: enfatiza hidrocarburos y procesos termicos con gradientes calidos y azules para salidas o perdidas.
- **Transicion energetica limpia**: resalta renovables y eficiencia con verdes y azules vivos, manteniendo fosiles en neutros.
- **Energeticos diferenciados**: asigna un color unico por energetico y flujo clave para facilitar analisis tematico.

## Institucional SENER (predeterminada)
- **Archivo fuente**: `sankey_config.js` (`window.sankeyConfig.energeticColors`).
- **Uso recomendado**: materiales oficiales y cualquier publicacion externa.
- **Principios**:
  - Tonos Pantone para primarios fosiles (negros, rojos vino) y renovables (verdes profundos, beige).
  - Mismos colores heredados en derivados y flujos para preservar continuidad.

### Muestra de grupos clave
| Grupo | Nodos destacados | Hex base |
| --- | --- | --- |
| Primarios fosiles | Carbon mineral, Petroleo crudo, Condensados, Gas natural | `#171B1E`, `#621333`, `#9C2348`, `#002F2A` |
| Primarios renovables | Energia hidraulica, Energia solar, Energia eolica, Bagazo de cana, Biogas | `#1E5B4F`, `#E7D295`, `#002F2A`, `#A6802D`, `#1E5B4F` |
| Secundarios derivados | Gasolinas y naftas, Diesel, Gas licuado de petroleo, Energia electrica | `#E7D295`, `#9C2348`, `#A6802D`, `#E7D295` |
| Flujos y balances | Produccion, Importacion EP/ES, Exportacion EP/ES, Diferencias | `#9C2348`, `#621333`, `#A6802D`, `#002F2A`, `#98989A`, `#E7D295`, `#1E5B4F` |
| Transformacion | Coquizadoras y Hornos, Plantas de Gas, Refinerias, Centrales Electricas | `#002F2A`, `#98989A`, `#171B1E`, `#9C2348` |
| Sectores demanda | Industrial, Transporte, Agropecuario, Comercial, Residencial | `#621333`, `#A6802D`, `#E7D295`, `#1E5B4F`, `#98989A` |

## Cadena fosil y transformacion
- **Archivo fuente**: `personalizador.js` (`paletteDefinitions[1]`).
- **Uso recomendado**: tableros internos orientados a hidrocarburos, reportes de refinacion y transformacion.
- **Concepto**: paleta por categorias con naranjas y rojos saturados para la cadena termica; azules profundos para perdidas/exportaciones; verdes para renovables de soporte.

| Categoria | Color |
| --- | --- |
| Primario fosil | `#B2502C` |
| Renovable | `#2F855A` |
| Nuclear | `#6B46C1` |
| Secundario solido | `#57534E` |
| Secundario liquido | `#F97316` |
| Secundario gas | `#0284C7` |
| Electricidad | `#FACC15` |
| Transformaciones | `#B91C1C` |
| Centrales | `#9D174D` |
| Sectores consumo | `#1D4ED8` |
| Perdidas | `#475569` |
| Diferencias | `#5B21B6` |

## Transicion energetica limpia
- **Archivo fuente**: `personalizador.js` (`paletteDefinitions[2]`).
- **Uso recomendado**: historias de descarbonizacion, escenarios Net Zero, materiales didacticos sobre renovables.
- **Concepto**: contrasta fosiles en grises/azules oscuros con verdes y turquesas brillantes para renovables y eficiencia; amarillos suaves para electricidad.

| Categoria | Color |
| --- | --- |
| Primario fosil | `#475569` |
| Primario renovable | `#16A34A` |
| Nuclear | `#6366F1` |
| Secundario liquido | `#F59E0B` |
| Secundario gas | `#0EA5E9` |
| Electricidad | `#FDE68A` |
| Transformaciones | `#22C55E` |
| Centrales | `#14B8A6` |
| Sectores consumo | `#0F172A` |
| Perdidas | `#111827` |
| Diferencias | `#3730A3` |

## Energeticos diferenciados
- **Archivo fuente**: `personalizador.js` (`paletteDefinitions[3]`, overrides resueltos con normalizacion de nombres).
- **Uso recomendado**: analisis tematico por energetico, sesiones de toma de decisiones donde se necesite distinguir rapidamente cada flujo.
- **Concepto**: color unico por energetico y flujo clave, basado en la propuesta `window.sankeyColorsNuevo`.

### Primarios y secundarios
| Elemento | Color |
| --- | --- |
| Carbon mineral, Coque de carbon | `#2B2B2B` |
| Petroleo crudo | `#7B2C2C` |
| Condensados | `#A94442` |
| Gas natural | `#1E5B4F` |
| Energia nuclear | `#C0C0C0` |
| Energia hidraulica | `#1565C0` |
| Energia geotermica / Geotermica | `#B91C1C` |
| Energia solar / Solar fotovoltaica | `#F6C700` / `#F59E0B` |
| Energia eolica / Eolica | `#22C55E` |
| Bagazo de cana | `#A67C41` |
| Lena | `#8C4A2F` |
| Biogas | `#4CAF50` |
| Gas licuado de petroleo | `#9C27B0` |
| Gasolinas y naftas | `#FF9800` |
| Querosenos | `#A0522D` |
| Diesel | `#C62828` |
| Combustoleo | `#7B2C2C` |
| Gas Seco | `#00796B` |
| Energia electrica | `#FFD54F` |

### Flujos, perdidas y totales
| Elemento | Color |
| --- | --- |
| Produccion | `#795548` |
| Importacion EP / ES | `#8D6E63` / `#A1887F` |
| Exportacion EP / ES / Total | `#1565C0`, `#42A5F5`, `#1976D2` |
| Energia no aprovechada EP / ES | `#9E9E9E`, `#BDBDBD` |
| Consumo propio EP / ES | `#8D6E63`, `#A1887F` |
| Diferencia estadistica EP / ES | `#A6802D`, `#D7CCC8` |
| Perdidas tecnicas / distribucion / no tecnicas | `#9E9E9E`, `#BDBDBD`, `#757575` |
| Oferta interna bruta EP / ES | `#171B1E`, `#171B1E` |
| Total transformacion / consumo | `#F57C00`, `#4CAF50` |
| Consumo final total / energetico / no energetico | `#7B1FA2`, `#FDD835`, `#E0E0E0` |
| V.I. y Dif. Est. EP / ES | `#D7CCC8` |

### Transformaciones y demanda
| Elemento | Color |
| --- | --- |
| Coquizadoras y Hornos | `#3F3F46` |
| Plantas de Gas y Fraccionadoras | `#2E7D32` |
| Refinerias y Despuntadoras | `#5D4037` |
| Centrales electricas | `#8E24AA` |
| Carboelectrica / Termica convencional / Turbogas | `#4B5563`, `#615D5D`, `#5B5B5B` |
| Combustion interna | `#7C7C7C` |
| Cogeneracion | `#0EA5E9` |
| Industrial / Transporte / Agropecuario / Comercial / Publico / Residencial | `#0D47A1`, `#F57C00`, `#7CB342`, `#6A1B9A`, `#5D4037`, `#FFEB3B` |
| Petroquimica PEMEX / Otras ramas | `#9C2348`, `#424242` |

## Implementacion y uso
1. **Seleccion**: abrir `personalizador.html`, pestaña **Colores**, elegir la tarjeta de paleta deseada.
2. **Ajustes finos**: modificar colores individuales con Pickr si se necesita resaltar nodos especificos; esto marcara la paleta como personalizada.
3. **Guardado**: presionar **Guardar Cambios** para persistir la configuracion en `sankey_config.js` via `server.js`.

Estas paletas permiten documentar los criterios visuales entregados y facilitan revertir o comparar esquemas durante revisiones con las areas interesadas.
