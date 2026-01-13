# Plan de Implementación - Filtro del Sector Hidrocarburos

## Descripción del Objetivo
Implementar un filtro específico para el "Sector Hidrocarburos" en el diagrama de Sankey. Este filtro permitirá rastrear y visualizar exclusivamente el flujo descendente (aguas abajo) de los nodos "Petróleo crudo", "Gas natural" y "Condensados".

## Cambios Propuestos

### Cambios en la Interfaz de Usuario (UI)
#### [MODIFICAR] [index.html](index.html)
- Agregar un nuevo interruptor (toggle) llamado "Sector Hidrocarburos" en la sección de controles (junto a los otros interruptores).

### Cambios Lógicos y de Cátedráticos
#### [MODIFICAR] [index.html](index.html)
- **Estado**: Agregar una variable de estado `hydrocarbonsFilterActive` (booleana).
- **Lógica de Rastreo (Traversal)**: Implementar la función `traceDownstream(rootNodes)`:
    - Entradas: Arreglo de nodos raíz (['Petróleo crudo', 'Gas natural', 'Condensados']).
    - Lógica: Búsqueda en anchura (BFS) o profundidad (DFS) utilizando `currentLinks` para encontrar todos los nodos alcanzables aguas abajo.
    - Salida: Un conjunto (Set) de nombres de nodos válidos/visibles.
- **Lógica de Filtrado**: Modificar `applyLegendFilter` (o la sección correspondiente en `updateChart`) para:
    - Verificar si `hydrocarbonsFilterActive` es verdadero.
    - Si es verdadero, usar el resultado de `traceDownstream` para filtrar enlaces y nodos (ignorando o anulando los checkboxes de categorías habituales).
    - Si es falso, proceder con la lógica existente de `activeCategories`.
- **Manejador de Eventos**: Agregar un listener para el nuevo interruptor que actualice el estado y llame a `updateChart`.

#### [MODIFICAR] [data_processor.js](data_processor.js)
- (Opcional) Si la lógica de recorrido se vuelve muy compleja, moverla aquí. Por ahora, mantenerla en `index.html` junto con el estado del gráfico parece más sencillo.

## Plan de Verificación

### Verificación Manual
1.  Abrir `index.html` en un navegador.
2.  Localizar el nuevo control "Sector Hidrocarburos".
3.  Activar el interruptor.
4.  Verificar que el diagrama muestre **solo** los flujos que se originan en "Petróleo crudo", "Gas natural" y "Condensados".
5.  Verificar que nodos no relacionados (ej. "Bagazo de caña", "Energía solar" desconectada) desaparezcan o se oculten.
6.  Desactivar el interruptor y confirmar que el diagrama vuelve a su estado original (mostrando todo según los filtros de categorías).
