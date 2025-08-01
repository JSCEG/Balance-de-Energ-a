# Guía de Convenciones del Proyecto Sankey

Este documento resume las convenciones y la lógica implementada en el proyecto Sankey para la visualización de flujos de energía.

## 1. Estructura de Datos (`datos.js`)

*   **Valores de Flujo:** Los valores numéricos para cada año (`2010`, `2011`, etc.) representan la magnitud del flujo.
    *   **Valores Positivos:** Indican un flujo estándar (de origen a destino).
    *   **Valores Negativos:** Se utilizan para representar disminuciones o salidas especiales (ej. "Variación de Inventarios" negativa). La visualización invierte automáticamente la dirección del enlace para estos casos.
*   **Colores de Nodos:** La propiedad `color` en cada "Nodo Hijo" se utiliza para colorear los nodos y los enlaces asociados.
    *   Si el valor de `color` es una cadena vacía (`""`), se aplicará un color gris por defecto (`#888`) para asegurar la visibilidad del nodo.

## 2. Configuración del Diagrama (`sankey_config.js`)

Este archivo centraliza la configuración de la estructura y el comportamiento del diagrama de Sankey.

*   **Propiedad `flow` en Nodos Padre:**
    Se ha introducido la propiedad `flow` en la definición de los nodos padre dentro de las columnas para controlar explícitamente la dirección de los enlaces:
    *   `flow: 'source'`: El nodo actúa como una fuente. Los enlaces siempre saldrán de este nodo. (Ej: "Producción", "Importación").
    *   `flow: 'sink'`: El nodo actúa como un sumidero o destino. Los enlaces siempre llegarán a este nodo. (Ej: "Exportación", "Consumo Propio del Sector", "Energía No Aprovechada", "Pérdidas técnicas por transporte, transmisión y distribución").
    *   `flow: 'default'`: El comportamiento del flujo se determina por el signo del valor en `datos.js`. Si el valor es positivo, el flujo es `padre -> hijo`. Si es negativo, el flujo se invierte a `hijo -> padre`. (Ej: "Variación de Inventarios").
    *   Si la propiedad `flow` no se especifica, se asume `default`.

*   **Nodos Espaciadores (`esEspaciador`):**
    Se utilizan nodos "fantasma" con la propiedad `esEspaciador: true` para controlar el posicionamiento vertical de otros nodos en ECharts. Estos nodos son invisibles (`itemStyle: { color: 'transparent' }`, `label: { show: false }`) pero ocupan espacio en el layout gracias a un `valorEspaciador` asignado.

## 3. Procesamiento de Datos (`data_processor.js`)

Este es un nuevo módulo encargado de la lógica de transformación de datos, desacoplando la preparación de datos de la visualización.

*   **Función `processSankeyData`:** Lee los datos de `datos.js` y la configuración de `sankey_config.js` para generar la estructura final de `nodes` y `links` que ECharts necesita.
*   **Lógica de Enlaces:** Determina la dirección de los enlaces basándose en:
    *   La propiedad `flow` del nodo (si está definida como `sink`).
    *   El signo del valor del flujo (si el nodo tiene `flow: 'default'` o no tiene `flow` definido).
*   **Asignación de Colores:** Recupera los colores de `datos.js` y aplica el color por defecto (`#888`) si el color original es una cadena vacía.

## 4. Script Principal (`index.html`)

El archivo `index.html` ahora tiene un rol simplificado:

*   **Inclusión de Módulos:** Carga `datos.js`, `sankey_config.js` y `data_processor.js`.
*   **Orquestación:** Llama a `window.dataProcessor.processSankeyData` para obtener los datos listos para la visualización.
*   **Renderizado:** Pasa los `nodes` y `links` procesados a ECharts para renderizar el diagrama.
*   **Funcionalidades de UI:** Maneja la selección de año, la búsqueda de nodos y las opciones de descarga (PNG/SVG).

## 5. Estilo de Tooltips (Popups)

*   **Formato Compacto:** La propiedad `extraCssText: 'max-width:400px; white-space: normal;'` se ha añadido a la configuración del `tooltip` en `index.html` para asegurar que los popups se muestren en un cuadro compacto con saltos de línea, mejorando la legibilidad.

---
