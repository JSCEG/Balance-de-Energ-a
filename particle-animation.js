/**
 * Sistema de Animación de Partículas para Diagramas Sankey
 * Implementa partículas que fluyen a través de los enlaces respetando colores de energéticos
 */

class ParticleAnimationSystem {
    constructor(chartInstance, canvasSelector = '#particle-canvas') {
        this.chart = chartInstance;
        this.canvas = document.querySelector(canvasSelector);
        this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
        this.particles = [];
        this.isAnimating = false;
        this.animationId = null;
        this.lastTime = 0;
        
        // Configuración de partículas
        this.config = {
            particleSize: 3,
            particleSpeed: 50, // píxeles por segundo
            particlesPerSecond: 5, // partículas por enlace por segundo
            maxParticlesPerLink: 8,
            fadeInTime: 200, // ms
            fadeOutTime: 300, // ms
            trailLength: 8 // longitud de la estela
        };
        
        this.lastSpawnTime = new Map(); // Para controlar la frecuencia de generación
        
        if (this.canvas) {
            this.setupCanvas();
            this.setupEventListeners();
        }
    }
    
    setupCanvas() {
        // Configurar el canvas para que coincida con el contenedor del chart
        const chartContainer = this.chart.getDom();
        if (chartContainer) {
            const rect = chartContainer.getBoundingClientRect();
            
            // Usar dimensiones mínimas para asegurar visibilidad
            const width = Math.max(rect.width, 800);
            const height = Math.max(rect.height, 600);
            
            this.canvas.width = width;
            this.canvas.height = height;
            
            // Configurar estilo del canvas
            this.canvas.style.width = width + 'px';
            this.canvas.style.height = height + 'px';
            
            console.log('Canvas configured:', width, 'x', height);
        }
    }
    
    setupEventListeners() {
        // Redimensionar canvas cuando cambie el tamaño de la ventana
        window.addEventListener('resize', () => {
            this.setupCanvas();
        });
    }
    
    start() {
        if (this.isAnimating || !this.canvas || !this.ctx) return;
        
        this.isAnimating = true;
        this.lastTime = performance.now();
        
        // Verificar si hay datos reales del Sankey
        const option = this.chart.getOption();
        const hasRealData = option && option.series && option.series[0] && 
                           option.series[0].links && option.series[0].links.length > 0;
        
        if (!hasRealData) {
            // Crear partículas de prueba si no hay datos reales
            this.createTestParticles();
            console.log('Usando partículas de prueba - no se encontraron datos del Sankey');
        } else {
            console.log('Usando datos reales del Sankey para partículas');
        }
        
        this.animate();
    }
    
    createTestParticles() {
        // Crear partículas de prueba para demostrar la funcionalidad
        const testColors = [
            '#772F1A', // Petróleo crudo
            '#15616D', // Gas natural 
            '#36454F', // Carbón mineral
            '#FFD700', // Energía solar
            '#2ca02c'  // Energía eólica
        ];
        
        const chartContainer = this.chart.getDom();
        if (!chartContainer) return;
        
        const rect = chartContainer.getBoundingClientRect();
        const width = Math.max(rect.width, 800);
        const height = Math.max(rect.height, 600);
        
        // Crear múltiples rutas de partículas que simulan flujos de energía
        const routes = [
            // Energía Primaria → Transformaciones
            { startX: width * 0.15, startY: height * 0.3, endX: width * 0.35, endY: height * 0.4 },
            { startX: width * 0.15, startY: height * 0.5, endX: width * 0.35, endY: height * 0.6 },
            
            // Transformaciones → Energía Secundaria
            { startX: width * 0.35, startY: height * 0.4, endX: width * 0.55, endY: height * 0.3 },
            { startX: width * 0.35, startY: height * 0.6, endX: width * 0.55, endY: height * 0.7 },
            
            // Energía Secundaria → Usos Finales
            { startX: width * 0.55, startY: height * 0.3, endX: width * 0.75, endY: height * 0.25 },
            { startX: width * 0.55, startY: height * 0.5, endX: width * 0.75, endY: height * 0.45 },
            { startX: width * 0.55, startY: height * 0.7, endX: width * 0.75, endY: height * 0.65 }
        ];
        
        // Limpiar partículas existentes
        this.particles = [];
        
        // Programar creación escalonada de partículas para cada ruta
        routes.forEach((route, routeIndex) => {
            setTimeout(() => {
                this.createParticleForRoute(route, routeIndex, testColors[routeIndex % testColors.length]);
            }, routeIndex * 300); // Escalonar creación
        });
    }
    
    createParticleForRoute(route, routeIndex, color) {
        const particle = {
            linkIndex: routeIndex,
            startX: route.startX,
            startY: route.startY,
            endX: route.endX,
            endY: route.endY,
            currentX: route.startX,
            currentY: route.startY,
            progress: 0,
            color: color,
            opacity: 0,
            size: this.config.particleSize,
            speed: this.config.particleSpeed + (Math.random() - 0.5) * 20,
            createdTime: performance.now(),
            linkValue: 100,
            isTestParticle: true
        };
        
        this.particles.push(particle);
        
        // Crear partículas adicionales para esta ruta con retraso
        for (let i = 1; i < this.config.maxParticlesPerLink; i++) {
            setTimeout(() => {
                if (this.isAnimating) {
                    const newParticle = { ...particle };
                    newParticle.createdTime = performance.now();
                    newParticle.progress = 0;
                    newParticle.currentX = route.startX;
                    newParticle.currentY = route.startY;
                    newParticle.opacity = 0;
                    this.particles.push(newParticle);
                }
            }, i * (1000 / this.config.particlesPerSecond));
        }
    }
    
    stop() {
        this.isAnimating = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        this.particles = [];
        this.clearCanvas();
    }
    
    clearCanvas() {
        if (this.ctx && this.canvas) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
    
    animate(currentTime = performance.now()) {
        if (!this.isAnimating) return;
        
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        
        // Limpiar canvas
        this.clearCanvas();
        
        // Obtener enlaces del chart
        const option = this.chart.getOption();
        if (option && option.series && option.series[0] && option.series[0].links) {
            const links = option.series[0].links;
            const nodes = option.series[0].data;
            
            // Generar nuevas partículas
            this.generateParticles(links, nodes, currentTime);
            
            // Actualizar y dibujar partículas existentes
            this.updateParticles(deltaTime);
            this.drawParticles();
        }
        
        this.animationId = requestAnimationFrame((time) => this.animate(time));
    }
    
    generateParticles(links, nodes, currentTime) {
        if (!links || links.length === 0) return;
        
        links.forEach((link, linkIndex) => {
            // Skip spacer nodes
            if (link.source.includes('SPACER') || link.target.includes('SPACER')) {
                return;
            }
            
            // Verificar si es tiempo de generar una nueva partícula para este enlace
            const lastSpawn = this.lastSpawnTime.get(linkIndex) || 0;
            const spawnInterval = 1000 / this.config.particlesPerSecond; // ms entre partículas
            
            if (currentTime - lastSpawn >= spawnInterval) {
                // Contar partículas existentes para este enlace
                const existingParticles = this.particles.filter(p => p.linkIndex === linkIndex);
                
                if (existingParticles.length < this.config.maxParticlesPerLink) {
                    const particle = this.createParticle(link, linkIndex, nodes);
                    if (particle) {
                        this.particles.push(particle);
                        this.lastSpawnTime.set(linkIndex, currentTime);
                    }
                }
            }
        });
    }
    
    createParticle(link, linkIndex, nodes) {
        // Obtener posiciones de los nodos
        const sourceNode = nodes.find(n => n.name === link.source);
        const targetNode = nodes.find(n => n.name === link.target);
        
        if (!sourceNode || !targetNode) return null;
        
        // Convertir coordenadas del chart a coordenadas del canvas
        const sourcePos = this.getNodePosition(sourceNode);
        const targetPos = this.getNodePosition(targetNode);
        
        if (!sourcePos || !targetPos) return null;
        
        // Determinar color del energético (del enlace o del nodo fuente)
        let color = '#888'; // color por defecto
        if (link.lineStyle && link.lineStyle.color) {
            color = link.lineStyle.color;
        } else if (sourceNode.itemStyle && sourceNode.itemStyle.color) {
            color = sourceNode.itemStyle.color;
        } else if (targetNode.itemStyle && targetNode.itemStyle.color) {
            color = targetNode.itemStyle.color;
        }
        
        // Ajustar tamaño de partícula basado en el valor del enlace
        const linkValue = link.value || 1;
        const maxValue = Math.max(...(this.getAllLinks().map(l => l.value || 1)));
        const normalizedValue = linkValue / maxValue;
        const particleSize = this.config.particleSize + (normalizedValue * 2); // Entre 3 y 5 px
        
        return {
            linkIndex,
            startX: sourcePos.x,
            startY: sourcePos.y,
            endX: targetPos.x,
            endY: targetPos.y,
            currentX: sourcePos.x,
            currentY: sourcePos.y,
            progress: 0, // 0 = inicio, 1 = final
            color: color,
            opacity: 0,
            size: particleSize,
            speed: this.config.particleSpeed + (Math.random() - 0.5) * 20, // velocidad con variación
            createdTime: performance.now(),
            linkValue: linkValue,
            sourceNode: link.source,
            targetNode: link.target
        };
    }
    
    getAllLinks() {
        const option = this.chart.getOption();
        if (option && option.series && option.series[0] && option.series[0].links) {
            return option.series[0].links;
        }
        return [];
    }
    
    getNodePosition(node) {
        try {
            // Intentar obtener posición desde datos simulados del chart
            if (node._position) {
                return {
                    x: node._position.x,
                    y: node._position.y
                };
            }
            
            // Usar configuración de Sankey para posicionamiento más preciso
            const chartContainer = this.chart.getDom();
            if (!chartContainer) return null;
            
            const rect = chartContainer.getBoundingClientRect();
            
            // Obtener configuración de columnas desde sankeyConfig
            const sankeyConfig = window.sankeyConfig;
            if (!sankeyConfig || !sankeyConfig.columnas) {
                return this.getFallbackPosition(node, rect);
            }
            
            // Encontrar en qué columna está este nodo
            let nodeColumn = null;
            let nodePosition = null;
            
            sankeyConfig.columnas.forEach((col, colIndex) => {
                if (col.nodos) {
                    const foundNode = col.nodos.find(n => n.nombre === node.name);
                    if (foundNode) {
                        nodeColumn = colIndex;
                        nodePosition = foundNode.posicion || 0;
                    }
                }
            });
            
            if (nodeColumn !== null) {
                // Calcular posición basada en columna
                const numColumns = sankeyConfig.columnas.length;
                const columnWidth = rect.width / numColumns;
                const x = columnWidth * (nodeColumn + 0.5);
                
                // Calcular posición Y basada en la posición en la columna
                const nodesInColumn = this.getNodesInColumn(nodeColumn);
                const maxNodesInColumn = Math.max(8, nodesInColumn.length); // mínimo 8 para espaciado
                const y = (rect.height / (maxNodesInColumn + 1)) * (nodePosition + 1);
                
                return { x, y };
            }
            
            // Fallback si no se encuentra en configuración
            return this.getFallbackPosition(node, rect);
            
        } catch (error) {
            console.warn('Error getting node position:', error);
            return null;
        }
    }
    
    getFallbackPosition(node, rect) {
        // Posición basada en columna del nodo si está disponible
        if (node.columna !== undefined) {
            const numColumns = 8; // aproximado
            const x = (rect.width / numColumns) * (node.columna + 0.5);
            const y = rect.height * 0.3 + Math.random() * rect.height * 0.4;
            return { x, y };
        }
        
        // Última opción: posición semi-aleatoria pero dentro de márgenes
        const x = rect.width * 0.1 + Math.random() * rect.width * 0.8;
        const y = rect.height * 0.2 + Math.random() * rect.height * 0.6;
        return { x, y };
    }
    
    getNodesInColumn(columnIndex) {
        // Obtener todos los nodos en una columna específica
        const option = this.chart.getOption();
        if (!option || !option.series || !option.series[0]) return [];
        
        const nodes = option.series[0].data || [];
        return nodes
            .filter(node => node.columna === columnIndex && !node.esEspaciador)
            .map(node => node.name);
    }
    
    updateParticles(deltaTime) {
        const currentTime = performance.now();
        
        this.particles = this.particles.filter(particle => {
            // Actualizar progreso de la partícula
            const distanceToTravel = Math.sqrt(
                Math.pow(particle.endX - particle.startX, 2) + 
                Math.pow(particle.endY - particle.startY, 2)
            );
            
            const progressIncrement = (particle.speed * deltaTime / 1000) / distanceToTravel;
            particle.progress += progressIncrement;
            
            // Actualizar posición usando curva suave (Bézier cuadrática)
            const t = particle.progress;
            const controlX = (particle.startX + particle.endX) / 2;
            const controlY = Math.min(particle.startY, particle.endY) - 20; // Curva hacia arriba
            
            // Fórmula de curva Bézier cuadrática
            particle.currentX = (1-t)*(1-t)*particle.startX + 2*(1-t)*t*controlX + t*t*particle.endX;
            particle.currentY = (1-t)*(1-t)*particle.startY + 2*(1-t)*t*controlY + t*t*particle.endY;
            
            // Actualizar opacidad (fade in/out)
            const age = currentTime - particle.createdTime;
            if (age < this.config.fadeInTime) {
                particle.opacity = (age / this.config.fadeInTime) * 0.8;
            } else if (particle.progress > 0.7) {
                const fadeProgress = (particle.progress - 0.7) / 0.3;
                particle.opacity = 0.8 * (1 - fadeProgress);
            } else {
                particle.opacity = 0.8;
            }
            
            // Remover partícula si completó el recorrido
            return particle.progress < 1;
        });
        
        // Para partículas de prueba, regenerar automáticamente
        this.regenerateTestParticles(currentTime);
    }
    
    regenerateTestParticles(currentTime) {
        // Solo regenerar si estamos en modo de prueba y hay pocas partículas
        const testParticles = this.particles.filter(p => p.isTestParticle);
        
        if (testParticles.length < 3) {
            // Crear una nueva partícula de prueba
            const testColors = ['#772F1A', '#15616D', '#36454F', '#FFD700', '#2ca02c'];
            const routes = this.getTestRoutes();
            
            if (routes.length > 0) {
                const randomRoute = routes[Math.floor(Math.random() * routes.length)];
                const randomColor = testColors[Math.floor(Math.random() * testColors.length)];
                
                this.createParticleForRoute(randomRoute, Math.random() * 1000, randomColor);
            }
        }
    }
    
    getTestRoutes() {
        const chartContainer = this.chart.getDom();
        if (!chartContainer) return [];
        
        const rect = chartContainer.getBoundingClientRect();
        const width = Math.max(rect.width, 800);
        const height = Math.max(rect.height, 600);
        
        return [
            { startX: width * 0.15, startY: height * 0.3, endX: width * 0.35, endY: height * 0.4 },
            { startX: width * 0.15, startY: height * 0.5, endX: width * 0.35, endY: height * 0.6 },
            { startX: width * 0.35, startY: height * 0.4, endX: width * 0.55, endY: height * 0.3 },
            { startX: width * 0.35, startY: height * 0.6, endX: width * 0.55, endY: height * 0.7 },
            { startX: width * 0.55, startY: height * 0.3, endX: width * 0.75, endY: height * 0.25 },
            { startX: width * 0.55, startY: height * 0.5, endX: width * 0.75, endY: height * 0.45 },
            { startX: width * 0.55, startY: height * 0.7, endX: width * 0.75, endY: height * 0.65 }
        ];
    }
    
    drawParticles() {
        if (!this.ctx) return;
        
        // No imprimir log constantemente para no hacer spam
        // if (this.particles.length > 0) {
        //     console.log('Drawing', this.particles.length, 'particles');
        // }
        
        this.particles.forEach((particle, index) => {
            this.ctx.save();
            
            // Configurar estilo de la partícula
            this.ctx.globalAlpha = Math.max(0.1, particle.opacity);
            
            // Crear gradiente radial para efecto de glow
            const gradient = this.ctx.createRadialGradient(
                particle.currentX, particle.currentY, 0,
                particle.currentX, particle.currentY, particle.size * 2
            );
            gradient.addColorStop(0, particle.color);
            gradient.addColorStop(0.7, particle.color + '80'); // Con transparencia
            gradient.addColorStop(1, 'transparent');
            
            // Dibujar glow exterior
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(particle.currentX, particle.currentY, particle.size * 2, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Dibujar núcleo sólido de la partícula
            this.ctx.globalAlpha = Math.max(0.3, particle.opacity);
            this.ctx.fillStyle = particle.color;
            this.ctx.shadowColor = particle.color;
            this.ctx.shadowBlur = 6;
            this.ctx.beginPath();
            this.ctx.arc(particle.currentX, particle.currentY, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Agregar punto central brillante
            this.ctx.globalAlpha = 1;
            this.ctx.fillStyle = this.lightenColor(particle.color, 0.3);
            this.ctx.shadowBlur = 0;
            this.ctx.beginPath();
            this.ctx.arc(particle.currentX, particle.currentY, particle.size * 0.5, 0, Math.PI * 2);
            this.ctx.fill();
            
            this.ctx.restore();
        });
    }
    
    // Función auxiliar para aclarar colores
    lightenColor(color, amount) {
        // Convertir hex a RGB y aclarar
        const hex = color.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        
        const newR = Math.min(255, r + (255 - r) * amount);
        const newG = Math.min(255, g + (255 - g) * amount);
        const newB = Math.min(255, b + (255 - b) * amount);
        
        return `rgb(${Math.round(newR)}, ${Math.round(newG)}, ${Math.round(newB)})`;
    }
    
    // Método para sincronizar con transformaciones del chart (zoom, pan)
    updateTransform() {
        // Este método se llamará cuando el chart cambie de transformación
        // Necesitaremos recalcular las posiciones de las partículas
        this.setupCanvas();
    }
    
    // Configurar parámetros de animación
    setConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
    }
    
    // Método para obtener información de rendimiento
    getPerformanceInfo() {
        return {
            particleCount: this.particles.length,
            isAnimating: this.isAnimating,
            canvasSize: this.canvas ? `${this.canvas.width}x${this.canvas.height}` : 'No canvas',
            fps: this.calculateFPS()
        };
    }
    
    calculateFPS() {
        // Calcular FPS aproximado basado en el tiempo entre frames
        if (this.lastTime && this.animationId) {
            const now = performance.now();
            const delta = now - this.lastTime;
            return Math.round(1000 / delta);
        }
        return 0;
    }
    
    // Método para activar/desactivar modo debug
    setDebugMode(enabled) {
        this.debugMode = enabled;
        if (enabled) {
            console.log('Particle Animation Debug Mode: ON');
            setInterval(() => {
                console.log('Performance Info:', this.getPerformanceInfo());
            }, 5000);
        }
    }
}

// Exportar para uso global
window.ParticleAnimationSystem = ParticleAnimationSystem;