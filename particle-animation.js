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
        
        // Crear algunos enlaces de prueba si no hay datos reales
        this.createTestParticles();
        
        this.animate();
    }
    
    createTestParticles() {
        // Crear partículas de prueba para demostrar la funcionalidad
        const testColors = ['#772F1A', '#15616D', '#36454F', '#FFD700', '#2ca02c'];
        const chartContainer = this.chart.getDom();
        if (!chartContainer) return;
        
        const rect = chartContainer.getBoundingClientRect();
        
        for (let i = 0; i < 5; i++) {
            const particle = {
                linkIndex: i,
                startX: 50 + i * 100,
                startY: 200 + Math.sin(i) * 50,
                endX: 400 + i * 100,
                endY: 300 + Math.cos(i) * 50,
                currentX: 50 + i * 100,
                currentY: 200 + Math.sin(i) * 50,
                progress: 0,
                color: testColors[i % testColors.length],
                opacity: 0,
                size: this.config.particleSize,
                speed: this.config.particleSpeed + (Math.random() - 0.5) * 20,
                createdTime: performance.now() + i * 200, // Escalonar la creación
                linkValue: 100
            };
            this.particles.push(particle);
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
        }
        
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
            size: this.config.particleSize,
            speed: this.config.particleSpeed + (Math.random() - 0.5) * 20, // velocidad con variación
            createdTime: performance.now(),
            linkValue: link.value || 1
        };
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
            
            // Fallback: generar posiciones basadas en la estructura de datos
            const chartContainer = this.chart.getDom();
            if (!chartContainer) return null;
            
            const rect = chartContainer.getBoundingClientRect();
            
            // Usar columna del nodo si está disponible para posicionamiento aproximado
            let x, y;
            
            if (node.columna !== undefined) {
                // Distribuir horizontalmente por columnas
                const numColumns = 8; // aproximado del config
                x = (rect.width / numColumns) * (node.columna + 0.5);
                
                // Posición vertical basada en posición en la columna
                const nodesInColumn = this.getNodesInColumn(node.columna);
                const nodeIndex = nodesInColumn.indexOf(node.name);
                y = (rect.height / (nodesInColumn.length + 1)) * (nodeIndex + 1);
            } else {
                // Posición aleatoria como último recurso
                x = Math.random() * rect.width * 0.8 + rect.width * 0.1;
                y = Math.random() * rect.height * 0.8 + rect.height * 0.1;
            }
            
            return { x, y };
        } catch (error) {
            console.warn('Error getting node position:', error);
            return null;
        }
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
            
            // Actualizar posición
            particle.currentX = particle.startX + (particle.endX - particle.startX) * particle.progress;
            particle.currentY = particle.startY + (particle.endY - particle.startY) * particle.progress;
            
            // Actualizar opacidad (fade in/out)
            const age = currentTime - particle.createdTime;
            if (age < this.config.fadeInTime) {
                particle.opacity = age / this.config.fadeInTime;
            } else if (particle.progress > 0.8) {
                const fadeProgress = (particle.progress - 0.8) / 0.2;
                particle.opacity = 1 - fadeProgress;
            } else {
                particle.opacity = 1;
            }
            
            // Remover partícula si completó el recorrido
            return particle.progress < 1;
        });
    }
    
    drawParticles() {
        if (!this.ctx) return;
        
        if (this.particles.length > 0) {
            console.log('Drawing', this.particles.length, 'particles');
        }
        
        this.particles.forEach((particle, index) => {
            this.ctx.save();
            
            // Configurar estilo de la partícula
            this.ctx.globalAlpha = Math.max(0.1, particle.opacity);
            this.ctx.fillStyle = particle.color;
            this.ctx.shadowColor = particle.color;
            this.ctx.shadowBlur = 4;
            
            // Dibujar partícula como círculo
            this.ctx.beginPath();
            this.ctx.arc(particle.currentX, particle.currentY, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Agregar un punto más visible para debugging
            this.ctx.globalAlpha = 1;
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.currentX, particle.currentY, 1, 0, Math.PI * 2);
            this.ctx.fill();
            
            this.ctx.restore();
        });
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
}

// Exportar para uso global
window.ParticleAnimationSystem = ParticleAnimationSystem;