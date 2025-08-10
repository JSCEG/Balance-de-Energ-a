// Enhanced ECharts stub for development with basic Sankey functionality
window.echarts = {
    init: function(dom, theme, opts) {
        const chart = {
            _dom: dom,
            _option: null,
            _listeners: {},
            
            setOption: function(option, notMerge) {
                this._option = { ...option };
                console.log('Chart option set:', option);
                
                // Simulate basic rendering with some delays
                setTimeout(() => {
                    this._simulateRendering();
                }, 100);
            },
            
            _simulateRendering: function() {
                // Simular algunos datos básicos para testing
                if (this._option && this._option.series && this._option.series[0]) {
                    const series = this._option.series[0];
                    if (series.data) {
                        // Simular posiciones de nodos
                        series.data.forEach((node, index) => {
                            node._position = {
                                x: 100 + (index % 4) * 200,
                                y: 100 + Math.floor(index / 4) * 150
                            };
                        });
                    }
                }
            },
            
            resize: function() {
                console.log('Chart resized');
            },
            
            dispose: function() {
                console.log('Chart disposed');
            },
            
            on: function(eventName, handler) {
                if (!this._listeners[eventName]) {
                    this._listeners[eventName] = [];
                }
                this._listeners[eventName].push(handler);
                console.log('Event listener added:', eventName);
            },
            
            dispatchAction: function(action) {
                console.log('Action dispatched:', action);
            },
            
            getOption: function() {
                return this._option || {};
            },
            
            getDom: function() {
                return this._dom;
            },
            
            convertToPixel: function(finder, value) {
                // Simular conversión de coordenadas
                return [value[0] * 2, value[1] * 2];
            },
            
            convertFromPixel: function(finder, pixel) {
                // Simular conversión inversa
                return [pixel[0] / 2, pixel[1] / 2];
            },
            
            getDataURL: function(opts) {
                return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
            },
            
            clear: function() {
                console.log('Chart cleared');
            },
            
            showLoading: function(opts) {
                console.log('Loading shown');
            },
            
            hideLoading: function() {
                console.log('Loading hidden');
            }
        };
        
        console.log('ECharts enhanced stub initialized');
        return chart;
    }
};