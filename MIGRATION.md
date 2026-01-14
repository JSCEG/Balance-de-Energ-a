# Documentación de Migración a Tailwind CSS

Este documento detalla el proceso de modernización de la interfaz de usuario del Balance Nacional de Energía, migrando de CSS personalizado a **Tailwind CSS**, alineado con la **Guía de Estilos Web Institucional (GobMX)**.

## 1. Configuración del Proyecto

### Instalación
Se ha integrado Tailwind CSS mediante npm.
- **Configuración**: `tailwind.config.js` define la paleta de colores y tipografías institucionales.
- **Entrada CSS**: `src/input.css` contiene las directivas de Tailwind y componentes personalizados.
- **Salida CSS**: `css/output.css` es el archivo compilado que utiliza el navegador.

### Comandos
Para recompilar los estilos después de realizar cambios:
```bash
npm run build:css
```

## 2. Sistema de Diseño (GobMX)

Se han configurado los siguientes tokens de diseño en `tailwind.config.js`:

### Colores
- **Guinda**: `bg-gobmx-guinda` (#9B2247)
- **Verde**: `bg-gobmx-verde` (#1E5B4F)
- **Dorado**: `bg-gobmx-dorado` (#A57F2C)
- **Gris**: `bg-gobmx-gris` (#98989A)

### Tipografía
- **Títulos**: Familia `Patria` (Clase: `font-headings`)
- **Cuerpo**: Familia `Noto Sans` (Clase: `font-body`)

## 3. Componentes Implementados

Se han creado componentes reutilizables en la capa `@layer components` de Tailwind para mantener la consistencia con el estilo "LaTeX" solicitado:

| Componente | Clase Tailwind | Descripción |
|------------|----------------|-------------|
| **Botón Primario** | `.btn-primary` | Fondo guinda, sombra, hover con brillo. |
| **Botón Secundario** | `.btn-secondary` | Fondo verde, sombra. |
| **Tarjeta Base** | `.card` | Borde lateral grueso (5px), sombra. |
| **Tarjeta Importante** | `.card-important` | Borde guinda, fondo rojizo tenue. |
| **Switch Toggle** | `.toggle-switch` | Interruptor animado personalizado. |

## 4. Cambios en `index.html`

- **Header**: Se refactorizó para usar Flexbox con enfoque Mobile-First (`flex-col` en móvil, `md:flex-row` en escritorio). Se eliminaron estilos inline.
- **Controles**: Se reemplazó la estructura de tablas/divs rígidos por Flexbox responsivo (`flex-wrap`).
- **Footer**: Se rediseñó siguiendo los lineamientos de GobMX (fondo verde, borde dorado superior, logos oficiales).
- **Eliminación de CSS Legacy**: Se eliminó el bloque `<style>` de ~2500 líneas, delegando el estilo a `css/output.css`.

## 5. Próximos Pasos (Migración a React)

La estructura actual ya está preparada para React:
1.  **Atomicidad**: Las clases de utilidad facilitan la creación de componentes styled (ej. `const Button = ({className}) => <button class="btn-primary ${className}" ... />`).
2.  **Sin Dependencias Globales**: El diseño no depende de selectores ID complejos ni de la cascada global de `base-theme.css` (aunque se mantiene para compatibilidad con otras páginas).

---
**Nota**: Si se edita `src/input.css`, es obligatorio ejecutar `npm run build:css` para reflejar los cambios.
