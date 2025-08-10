# Sistema de Animación de Partículas para Diagrama Sankey

## Descripción

Este sistema implementa partículas animadas que fluyen a través de los enlaces del diagrama Sankey de energía, proporcionando una visualización dinámica e intuitiva del flujo energético en México.

## Características Principales

### ✨ Partículas Inteligentes
- **Adaptación Automática**: Las partículas se adaptan al grosor de los enlaces
- **Posicionamiento Centrado**: Se mantienen en el centro de enlaces delgados
- **Trayectorias Curvas**: Siguen curvas Bézier para un movimiento más natural

### 🎨 Representación Visual
- **Colores de Energéticos**: Respetan la paleta oficial de energéticos primarios y secundarios
- **Efectos de Glow**: Partículas con resplandor sutil para mejor visibilidad
- **Tamaño Variable**: El tamaño se ajusta según el valor del flujo energético
- **Animaciones Suaves**: Fade-in y fade-out naturales

### 🔄 Sincronización Dinámica
- **Zoom y Pan**: Las partículas siguen las transformaciones de vista
- **Actualizaciones de Datos**: Se adaptan automáticamente a cambios en el diagrama
- **Modo Focus**: Compatible con el sistema de enfoque de nodos

### ⚙️ Control de Usuario
- **Toggle On/Off**: Control simple de activación/desactivación
- **Modo Demo**: Partículas de prueba cuando no hay datos reales
- **Rendimiento Optimizado**: Sistema eficiente para múltiples partículas

## Configuración Técnica

### Parámetros Configurables
```javascript
config: {
    particleSize: 3,              // Tamaño base de partículas (px)
    particleSpeed: 50,            // Velocidad base (px/s)
    particlesPerSecond: 5,        // Frecuencia de generación
    maxParticlesPerLink: 8,       // Máximo por enlace
    fadeInTime: 200,             // Tiempo de aparición (ms)
    fadeOutTime: 300,            // Tiempo de desvanecimiento (ms)
    trailLength: 8               // Longitud de estela
}
```

### Integración con ECharts
- Compatible con ECharts 5.x
- Utiliza canvas HTML5 para renderizado eficiente
- No interfiere con funcionalidad existente del diagrama

## Uso

### Activación
1. Localizar el toggle "Animación de Flujo" en los controles
2. Hacer clic para activar/desactivar
3. Las partículas comenzarán a fluir automáticamente

### Colores por Tipo de Energético

#### Energías Primarias
- **Petróleo crudo**: #772F1A (Marrón)
- **Gas natural**: #15616D (Verde azulado)
- **Carbón mineral**: #36454F (Gris oscuro)
- **Energía solar**: #FFD700 (Amarillo dorado)
- **Energía eólica**: #2ca02c (Verde)

#### Energías Secundarias
- **Gasolinas y naftas**: #FF7F0E (Naranja)
- **Diesel**: #D62728 (Rojo)
- **Gas licuado**: #F4A261 (Naranja claro)
- **Energía eléctrica**: #FCEE0C (Amarillo brillante)

## Arquitectura del Sistema

### Clases Principales
- `ParticleAnimationSystem`: Clase principal del sistema
- `Particle`: Objeto individual de partícula
- `Canvas Manager`: Gestión del lienzo de renderizado

### Flujo de Datos
1. **Extracción**: Lee datos del diagrama Sankey
2. **Procesamiento**: Calcula posiciones y trayectorias
3. **Generación**: Crea partículas con propiedades específicas
4. **Animación**: Loop de renderizado con requestAnimationFrame
5. **Limpieza**: Remoción automática de partículas completadas

## Rendimiento

### Optimizaciones Implementadas
- **Pooling de Objetos**: Reutilización de partículas
- **Culling Inteligente**: Solo renderiza partículas visibles
- **Gestión de Memoria**: Limpieza automática de recursos
- **Frame Rate Adaptativo**: Ajuste dinámico según capacidad del dispositivo

### Métricas de Rendimiento
- Hasta 50+ partículas simultáneas sin degradación
- 60 FPS en navegadores modernos
- Uso de memoria < 10MB adicionales

## Compatibilidad

### Navegadores Soportados
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### Dependencias
- ECharts 5.x
- Canvas HTML5
- ES6+ JavaScript

## Futuras Mejoras

### Características Planeadas
- **Partículas 3D**: Efectos de profundidad
- **Sonido Ambiente**: Audio sutil para flujos
- **Análisis de Flujo**: Visualización de eficiencia en tiempo real
- **Exportación de Video**: Captura de animaciones
- **Temas Personalizables**: Diferentes estilos visuales

### Optimizaciones Futuras
- **WebGL Rendering**: Para mayor rendimiento
- **Web Workers**: Cálculos en hilos separados
- **Instanced Rendering**: Para miles de partículas
- **Compression de Datos**: Reducción de memoria

## Contribución

Para contribuir al sistema de partículas:
1. Mantener compatibilidad con el sistema existente
2. Seguir patrones de código establecidos
3. Documentar nuevas características
4. Probar en múltiples navegadores
5. Optimizar para rendimiento

## Licencia

Este sistema es parte del proyecto Balance Nacional de Energía México y sigue las mismas licencias y términos del proyecto principal.