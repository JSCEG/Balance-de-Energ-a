# Plan de Modernización con Tailwind CSS (Alineado a Guía de Estilos GobMX)

Este plan integra Tailwind CSS respetando estrictamente la `GUIA_ESTILOS_WEB.md` proporcionada, asegurando la identidad institucional y la optimización móvil.

## 1. Configuración del Entorno y Recursos
- [ ] **Instalación**: Configurar `tailwindcss` en el proyecto.
- [ ] **Gestión de Tipografías**:
    - Configurar `@font-face` para la familia **Patria** (títulos) usando los archivos locales en `/tipografias`.
    - Importar **Noto Sans** (cuerpo) desde Google Fonts.
- [ ] **Configuración del Tema (`tailwind.config.js`)**:
    - Definir la paleta oficial GobMX:
        - `gobmx-guinda`: `#9B2247`
        - `gobmx-verde`: `#1E5B4F`
        - `gobmx-dorado`: `#A57F2C`
        - `gobmx-gris`: `#98989A`
    - Definir familias tipográficas:
        - `headings`: ['Patria', 'Merriweather', 'serif']
        - `body`: ['Noto Sans', 'sans-serif']

## 2. Migración de `index.html` (Mobile-First)
Reemplazo total de estilos inline y `<style>` por clases de utilidad Tailwind, aplicando las reglas de la guía:

### A. Tipografía y Encabezados
- Aplicar fuente `Patria` y color `gobmx-guinda` a todos los `<h1>` y `<h2>`.
- Aplicar `gobmx-verde` a `<h3>` y `gobmx-dorado` a `<h4>`.

### B. Componentes UI (Estilo "LaTeX")
- **Tarjetas (`.card`)**: Rediseñar con el borde lateral grueso (`border-l-4`) según el tipo:
    - **Importante**: Borde Guinda, fondo Guinda suave (`bg-gobmx-guinda/5`).
    - **Definición**: Borde Verde, fondo Verde suave.
    - **Ejemplo**: Borde Dorado, fondo Dorado suave.
- **Botones**: Estandarizar con colores institucionales y `hover:bg-[#7a1b38]` (para guinda).

### C. Estructura y Responsividad
- **Header**: Simplificar para móviles. Título y logos alineados verticalmente (`flex-col`) en pantallas pequeñas, expandidos (`flex-row`) en escritorio (`md:`).
- **Tablas/Grids**: Asegurar que las tablas de datos tengan scroll horizontal (`overflow-x-auto`) en móviles para no romper el layout.

## 3. Preparación para React
- **Abstracción de Clases**: Usar directivas `@apply` en el CSS de entrada para componentes reutilizables (ej. `.btn-primary`, `.card-definition`), facilitando su posterior conversión a componentes React styled-components o módulos CSS.
- **Limpieza**: Eliminar dependencias de `base-theme.css` en `index.html` para asegurar que el nuevo diseño sea autosuficiente.

## 4. Entregables y Documentación
- [ ] `tailwind.config.js` completo.
- [ ] `index.html` refactorizado.
- [ ] `MIGRATION.md` detallando los tokens de diseño y cómo extender el sistema.
- [ ] Verificación de visualización en móvil (375px), tablet (768px) y desktop (1280px).
