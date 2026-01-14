
>     <script src="https://cdn.jsdelivr.net/npm/echarts@5.5.0/dist/echarts.min.js"></script>
>     <script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"></script>
  
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet">
      <link href="./css/output.css" rel="stylesheet">
      <style>
          .legend-group-column {
              flex: 1;
              min-width: 200px;
              max-width: 250px;
              display: flex;
              flex-direction: column;
              gap: 0.5rem;
          }
  
          .legend-group-title {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              gap: 0.35rem;
              width: 100%;
              border-radius: 6px;
              border: none;
              padding: 0.35rem 0.5rem;
              font-size: 0.65rem;
              font-weight: 800;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              cursor: pointer;
              transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
              box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
          }
  
          .legend-group-title.is-active {
              background: var(--color-guinda);
              color: black;
              box-shadow: 0 4px 6px -1px rgba(106, 28, 50, 0.2), 0 2px 4px -1px rgba(106, 28, 50, 0.1);
              transform: translateY(-1px);
          }
  
          .legend-group-title.is-active:hover {
              background: #7a1b38;
              color: white;
          }
  
          .legend-group-title.is-inactive {
              background: #f3f4f6;
              color: #9ca3af;
              box-shadow: none;
              opacity: 0.8;
          }
  
          .legend-group-title.is-inactive:hover {
              background: #e5e7eb;
              color: #6b7280;
              opacity: 1;
          }
  
          .legend-group-title:focus {
              outline: 2px solid rgba(106, 28, 50, 0.35);
              outline-offset: 2px;
          }
  
          .legend-group-items {
              display: flex;
              flex-direction: column;
              gap: 0.3rem;
          }
  
          #color-legend-container.legend-collapsed .legend-group-items {
              display: none;
          }
  
          #color-legend-container.legend-collapsed #color-legend-content {
              gap: 0.75rem;
          }
      </style>
  </head>
  
  <body class="flex flex-col min-h-screen bg-gray-50 font-body text-gray-800 pt-[240px] md:pt-[180px]">
      <header
          class="fixed top-0 left-0 right-0 z-50 w-full bg-gradient-to-br from-white via-gray-50 to-white text-gray-800 shadow-xl backdrop-blur-lg bg-opacity-95 border-b-2 border-gobmx-guinda/20">
          <div class="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 py-4">
              <img src="img/logo_sener.png" alt="Logo Secretaría de Energía"
                  class="h-14 md:h-20 w-auto object-contain drop-shadow-md hover:scale-105 transition-transform duration-300">
              <div class="text-center md:text-left flex-grow">
                  <h1
                      class="font-headings font-extrabold text-2xl md:text-3xl lg:text-4xl mb-2 bg-gradient-to-r from-gobmx-guinda via-gobmx-guinda/80 to-gobmx-guinda bg-clip-text text-transparent drop-shadow-sm">
                      Balance Nacional de Energía - Año</h1>
                  <p class="font-body text-sm md:text-lg text-gray-600 font-medium tracking-wide">Diagrama de Sankey
                      Interactivo</p>
              </div>
              <img src="img/logo_gob.png" alt="Logo Gobierno de México"
                  class="h-14 md:h-20 w-auto object-contain drop-shadow-md hover:scale-105 transition-transform duration-300">
          </div>
          <div class="flex justify-center gap-3 mt-2 pb-3" role="navigation" aria-label="Accesos rapidos">
              <a class="btn btn-primary bg-gobmx-guinda text-white hover:bg-gobmx-guinda/90 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gobmx-guinda"
                  href="graficos.html">
                  <span class="icon"><i class="fa-solid fa-chart-line"></i></span>
                  Analitica
              </a>
          </div>
          <!-- Navegación interna disponible solo en entornos con backend -->
          <!--
          <nav class="nav-admin" aria-label="Navegación interna">
              <a class="nav-button" href="tablero.html">
                  <span class="icon"><i class="fa-solid fa-table-columns"></i></span>
                  Tablero
              </a>
              <a class="nav-button" href="editor.html">
                  <span class="icon"><i class="fa-solid fa-pen-to-square"></i></span>
                  Editor de datos
              </a>
              <a class="nav-button" href="personalizador.html">
                  <span class="icon"><i class="fa-solid fa-palette"></i></span>
                  Personalizador
              </a>
              <a class="nav-button" href="graficos.html">
                  <span class="icon"><i class="fa-solid fa-chart-line"></i></span>
                  Analítica
              </a>
          </nav>
          -->
      </header>
  
      <!-- Preloader -->
      <div class="preloader hidden" id="preloader">
          <div class="preloader-content">
              <img src="img/mujer.png" alt="Cargando" class="preloader-logo">
              <h3>Balance Nacional de Energía</h3>
              <div class="preloader-message" id="preloader-message">Cargando...</div>
              <div class="preloader-progress">
                  <div class="preloader-progress-bar" id="preloader-progress-bar"></div>
              </div>
          </div>
      </div>
  
  
  
      <div id="color-legend-container"
          class="card bg-white rounded-2xl shadow-lg border-2 border-gray-200 hover:shadow-xl transition-shadow duration-300"
          style="margin-bottom: 1.5rem;">
          <div
              class="flex flex-col xl:flex-row flex-wrap gap-5 items-center justify-between mb-5 p-5 bg-gray-50 backdrop-blur-sm border-2 border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
  
              <!-- Grupo Izquierdo: Datos y Búsqueda -->
              <div class="flex flex-wrap items-center gap-4 w-full xl:w-auto justify-center xl:justify-start">
  
                  <!-- Año -->
                  <div
                      class="flex items-center gap-3 p-2 bg-white rounded-xl border-2 border-gray-300 hover:border-gobmx-guinda/40 hover:shadow-lg transition-all duration-300 group">
                      <div class="relative flex items-center gap-2 tooltip-container">
                          <label for="year-selector" class="text-sm font-semibold text-gray-700 px-1">Año:</label>
                          <div class="relative flex items-center">
                              <select id="year-selector"
                                  class="py-1 pl-2 pr-8 bg-white border border-gray-300 rounded text-sm focus:ring-1 focus:ring-gobmx-guinda focus:border-gobmx-guinda transition-shadow shadow-sm cursor-pointer"></select>
                              <div class="absolute right-2 pointer-events-none text-gobmx-guinda opacity-70">
                                  <i class="fa-regular fa-calendar"></i>
                              </div>
                          </div>
                          <div class="tooltip">Selecciona el año</div>
                      </div>
                  </div>
  
                  <!-- Búsqueda -->
                  <div
                      class="flex items-center gap-2 p-1.5 bg-gray-50 rounded-lg border border-gray-200 hover:bg-white hover:shadow-sm transition group flex-grow md:flex-grow-0">
                      <div class="relative flex items-center gap-2 tooltip-container w-full md:w-64">
                          <div class="relative flex items-center w-full">
                              <input type="text" id="search-input" list="node-list" placeholder="Buscar energético..."
                                  class="w-full py-1 pl-8 pr-8 bg-white border border-gray-300 rounded text-sm focus:ring-1 focus:ring-gobmx-guinda focus:border-gobmx-guinda transition-shadow shadow-sm">
                              <datalist id="node-list"></datalist>
                              <div class="absolute left-2 text-gobmx-guinda pointer-events-none opacity-70">
                                  <i class="fa-solid fa-search"></i>
                              </div>
                              <button id="clear-search"
                                  class="absolute right-2 btn btn-secondary p-1 rounded-full opacity-50 hover:opacity-100"
                                  aria-label="Limpiar búsqueda">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor"
                                      viewBox="0 0 16 16">
                                      <path
                                          d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                                  </svg>
                              </button>
                          </div>
                          <div class="tooltip">Busca energéticos</div>
                      </div>
                  </div>
              </div>
  
              <!-- Grupo Derecho: Controles y Acciones -->
              <div class="flex flex-wrap items-center gap-3 w-full xl:w-auto justify-center xl:justify-end">
  
                  <!-- Toggles Compactos -->
                  <div class="flex flex-wrap items-center gap-x-4 gap-y-2 justify-center px-2">
                      <!-- Zoom -->
                      <div class="tooltip-container">
                          <label class="flex items-center gap-1.5 cursor-pointer">
                              <span class="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Zoom</span>
                              <div class="toggle-switch scale-75 origin-left">
                                  <input type="checkbox" id="zoom-switch">
                                  <span class="toggle-slider"></span>
                              </div>
                          </label>
                          <div class="tooltip">Habilitar zoom</div>
                      </div>
  
                      <!-- Foco -->
                      <div class="tooltip-container">
                          <label class="flex items-center gap-1.5 cursor-pointer">
                              <span class="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Foco</span>
                              <div class="toggle-switch scale-75 origin-left">
                                  <input type="checkbox" id="focus-switch">
                                  <span class="toggle-slider"></span>
                              </div>
                          </label>
                          <div class="tooltip">Mantener selección</div>
                      </div>
  
                      <!-- Alertas -->
                      <div class="tooltip-container">
                          <label class="flex items-center gap-1.5 cursor-pointer">
                              <span class="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Alertas</span>
                              <div class="toggle-switch scale-75 origin-left">
                                  <input type="checkbox" id="alert-switch">
                                  <span class="toggle-slider"></span>
                              </div>
                          </label>
                          <div class="tooltip">Mostrar eficiencia</div>
                      </div>
  
                      <!-- Info -->
                      <div class="tooltip-container">
                          <label class="flex items-center gap-1.5 cursor-pointer">
                              <span class="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Info</span>
                              <div class="toggle-switch scale-75 origin-left">
                                  <input type="checkbox" id="description-switch">
                                  <span class="toggle-slider"></span>
                              </div>
                          </label>
                          <div class="tooltip">Ver descripciones</div>
                      </div>
  
                      <!-- Patrones -->
                      <div class="tooltip-container">
                          <label class="flex items-center gap-1.5 cursor-pointer">
                              <span class="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Textura</span>
                              <div class="toggle-switch scale-75 origin-left">
                                  <input type="checkbox" id="decal-switch">
                                  <span class="toggle-slider"></span>
                              </div>
                          </label>
                          <div class="tooltip">Activar patrones</div>
                      </div>
  
                      <!-- Hidrocarburos -->
                      <div class="tooltip-container">
                          <label class="flex items-center gap-1.5 cursor-pointer">
                              <span class="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Hidro</span>
                              <div class="toggle-switch scale-75 origin-left">
                                  <input type="checkbox" id="hydrocarbons-switch">
                                  <span class="toggle-slider"></span>
                              </div>
                          </label>
                          <div class="tooltip">Filtro Hidrocarburos</div>
                      </div>
                  </div>
  
                  <!-- Separador Vertical (Visible en XL) -->
                  <div class="hidden xl:block h-6 w-px bg-gray-300 mx-1"></div>
  
                  <!-- Botones de Acción -->
                  <div class="flex items-center gap-2">
                      <button id="zoom-reset-btn"
                          class="group btn btn-secondary text-xs px-2 py-1 h-10 w-10 flex items-center justify-center rounded-full border-2 border-gray-300 bg-white text-gray-700 hover:bg-gobmx-guinda hover:text-white hover:border-gobmx-guinda hover:shadow-lg hover:scale-110 transition-all duration-300 tooltip-container"
                          aria-label="Reset Zoom">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor"
                              viewBox="0 0 16 16">
                              <path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                              <path
                                  d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                          </svg>
                          <div class="tooltip">Restaurar vista</div>
                      </button>
  
                      <div
                          class="flex items-center bg-gray-50 rounded-xl p-1.5 gap-2 border-2 border-gray-300 shadow-md hover:shadow-lg transition-all duration-300">
                          <div class="tooltip-container">
                              <button id="exportar"
                                  class="btn btn-secondary text-[10px] font-extrabold px-3 py-1.5 h-8 rounded-full border-2 border-gray-300 bg-white text-gray-700 hover:bg-gobmx-guinda hover:text-white hover:border-gobmx-guinda hover:shadow-lg hover:scale-105 transition-all duration-200">PNG</button>
                              <div class="tooltip">Descargar PNG</div>
                          </div>
                          <div class="tooltip-container">
                              <button id="export-svg"
                                  class="btn btn-secondary text-[10px] font-extrabold px-3 py-1.5 h-8 rounded-full border-2 border-gray-300 bg-white text-gray-700 hover:bg-gobmx-guinda hover:text-white hover:border-gobmx-guinda hover:shadow-lg hover:scale-105 transition-all duration-200">SVG</button>
                              <div class="tooltip">Descargar SVG</div>
                          </div>
                          <div class="tooltip-container">
                              <button id="export-csv"
                                  class="btn btn-secondary text-[10px] font-extrabold px-3 py-1.5 h-8 rounded-full border-2 border-gray-300 bg-white text-gray-700 hover:bg-gobmx-guinda hover:text-white hover:border-gobmx-guinda hover:shadow-lg hover:scale-105 transition-all duration-200">CSV</button>
                              <div class="tooltip">Descargar CSV</div>
                          </div>
                      </div>
  
                  </div>
              </div>
          </div>
          <div class="flex flex-wrap items-center justify-between gap-4 mb-4 px-2">
              <h3 class="text-2xl font-headings font-extrabold flex items-center gap-3 text-gobmx-guinda drop-shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"
                      class="text-gobmx-guinda">
                      <path
                          d="M8.235 1.559a.5.5 0 0 0-.47 0L1.732 4.058a.5.5 0 0 0 0 .884l6.033 2.499a.5.5 0 0 0 .47 0l6.033-2.499a.5.5 0 0 0 0-.884L8.235 1.559zM7.5 9.983V15.5a.5.5 0 0 0 .235.424l6.033 2.499a.5.5 0 0 0 .732-.424V11.983l-6.5 2.683a.5.5 0 0 1-.47 0l-6.5-2.683V17.5a.5.5 0 0 0 .732.424l6.033-2.499A.5.5 0 0 0 8.5 15.5V9.983z" />
                  </svg>
                  Balance Energético por Tipo
              </h3>
              <div class="flex flex-wrap items-center gap-3 text-sm">
                  <span class="text-gray-600 font-medium hidden md:inline">Click para filtrar columnas. Doble click: solo
                      una.</span>
                  <button id="legend-show-all"
                      class="btn btn-secondary text-[10px] font-bold px-3 py-1.5 h-8 rounded-full border-2 border-gray-300 bg-white text-gobmx-guinda hover:bg-gobmx-guinda hover:text-white hover:border-gobmx-guinda hover:shadow-lg transition-all duration-300 transform">
                      Ver todas
                  </button>
                  <button id="legend-toggle-details"
                      class="btn btn-secondary text-[10px] font-bold px-3 py-1.5 h-8 rounded-full border-2 border-gray-300 bg-white text-gray-700 hover:bg-gobmx-guinda hover:text-white hover:border-gobmx-guinda hover:shadow-lg transition-all duration-300 transform">
                      Mostrar elementos
                  </button>
              </div>
          </div>
          <div id="color-legend-content" class="flex flex-row flex-wrap gap-6 text-sm justify-between">
              <!-- Se llenará dinámicamente -->
          </div>
      </div>
  
  
      <div id="chart-container" class="">
          <div id="chart-wrapper">
              <div id="sankey"></div>
              <!-- Overlay de etiquetas (no se reduce el sankey) -->
              <div id="sankey-label-overlay" aria-hidden="true"></div>
          </div>
      </div>
  
      <!-- Sub-Sankey inmediatamente después del Sankey principal -->
      <div id="sub-sankey-container" class="card hidden mt-4 border-2 border-dashed border-gray-200/60">
          <div id="sub-sankey-title" class="text-center mb-4">
              <h3 id="sub-sankey-main-title" class="m-0 text-gobmx-guinda text-xl font-headings text-center">Vista
                  Detallada del Flujo</h3>
              <p id="sub-sankey-subtitle" class="mt-2 text-gray-700 text-base font-bold text-center">
                  Energético Seleccionado</p>
          </div>
          <div id="sub-sankey-chart" style="height: 600px; width: 100%;"></div>
  
          <button id="export-sub-sankey"
              class="btn btn-secondary mt-4 mx-auto flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path
                      d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                  <path
                      d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
              </svg>
              Exportar Sub-Sankey con Leyenda
          </button>
      </div>
  
      <div id="node-details-container" class="mt-6 mb-8 hidden"></div>
  
      <div id="node-details-efficiency" class="mb-6 empty:hidden"></div>
  
      <div class="card-inset bg-red-50/50 border border-red-100 rounded-xl p-5 mb-6 hidden" id="alert-info-container">
          <h4 class="text-red-800 font-bold text-sm mb-4 flex items-center gap-2 uppercase tracking-wide">
              <i class="fas fa-exclamation-triangle"></i> Criterios de Eficiencia
          </h4>
          <!-- Columna de Criterios -->
          <div class="w-full">
              <p class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Criterios de Alerta</p>
              <div class="flex flex-wrap gap-4">
                  <div class="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
                      <div class="w-3 h-3 rounded-full" id="efficient-color-box"></div>
                      <span class="text-xs font-medium text-gray-600"><strong>Eficiente:</strong> Pérdida &lt;
                          25%</span>
                  </div>
                  <div class="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
                      <div class="w-3 h-3 rounded-full" id="warning-color-box"></div>
                      <span class="text-xs font-medium text-gray-600"><strong>Alerta:</strong> 25% - 50%</span>
                  </div>
                  <div class="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
                      <div class="w-3 h-3 rounded-full" id="critical-color-box"></div>
                      <span class="text-xs font-medium text-gray-600"><strong>Crítica:</strong> &ge; 50%</span>
                  </div>
              </div>
          </div>
      </div>
      </div>
      <div id="node-details-values" class="space-y-8"></div>
      </div>
  
      <!-- Modal para el Gráfico Histórico -->
      <div id="historic-chart-modal" class="modal" style="display: none;">
          <div class="modal-content">
              <span class="modal-close-btn">&times;</span>
              <h3 id="historic-chart-title"></h3>
              <div id="historic-chart-container" style="width: 100%; height: 400px; margin-bottom: 1rem;"></div>
              <div class="modal-footer">
                  <p class="projection-note">Nota: Todos los valores se muestran como absolutos. Proyección calculada
                      mediante Regresión Lineal Simple.</p>
                  <button id="download-historic-chart-btn" class="btn">Descargar PNG</button>
              </div>
          </div>
      </div>
  
      <footer class="bg-gobmx-verde text-white pt-12 pb-6 border-t-4 border-gobmx-dorado mt-12">
          <div class="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
              <div class="col-span-1 flex justify-center md:justify-start">
                  <img src="img/logo_gob.png" alt="Gobierno de México"
                      class="h-16 md:h-20 w-auto brightness-0 invert opacity-90">
              </div>
  
              <div class="col-span-1">
                  <h4 class="font-headings font-bold text-lg mb-4 text-white">Enlaces</h4>
                  <ul class="space-y-2 text-sm">
                      <li><a href="https://datos.gob.mx/" target="_blank"
                              class="hover:underline text-white/90 hover:text-white transition">Datos</a></li>
                      <li><a href="https://www.gob.mx/transparencia" target="_blank"
                              class="hover:underline text-white/90 hover:text-white transition">Transparencia</a></li>
                      <li><a href="https://www.gob.mx/pnt" target="_blank"
                              class="hover:underline text-white/90 hover:text-white transition">PNT</a></li>
                      <li><a href="https://www.gob.mx/inai" target="_blank"
                              class="hover:underline text-white/90 hover:text-white transition">INAI</a></li>
                      <li><a href="https://www.gob.mx/alerta" target="_blank"
                              class="hover:underline text-white/90 hover:text-white transition">Alerta</a></li>
                      <li><a href="https://www.gob.mx/denuncia" target="_blank"
                              class="hover:underline text-white/90 hover:text-white transition">Denuncia</a></li>
                  </ul>
              </div>
  
              <div class="col-span-1">
                  <h4 class="font-headings font-bold text-lg mb-4 text-white">¿Qué es gob.mx?</h4>
                  <p class="text-sm text-white/90 mb-4">Es el portal único de trámites, información y participación
                      ciudadana. <a href="https://www.gob.mx/que-es-gobmx" target="_blank"
                          class="font-bold hover:underline">Leer más</a></p>
                  <ul class="space-y-2 text-sm">
                      <li><a href="https://www.gob.mx/en" target="_blank"
                              class="hover:underline text-white/90 hover:text-white transition">English</a></li>
                      <li><a href="https://www.gob.mx/accesibilidad" target="_blank"
                              class="hover:underline text-white/90 hover:text-white transition">Declaración de
                              Accesibilidad</a></li>
                      <li><a href="https://www.gob.mx/terminos" target="_blank"
                              class="hover:underline text-white/90 hover:text-white transition">Términos y Condiciones</a>
                      </li>
                  </ul>
              </div>
  
              <div class="col-span-1">
                  <h4 class="font-headings font-bold text-lg mb-4 text-white">Contacto</h4>
                  <p class="text-sm text-white/90 mb-2">Dudas e información a</p>
                  <a href="mailto:calidad@energia.gob.mx"
                      class="block text-sm font-bold hover:underline mb-6">calidad@energia.gob.mx</a>
  
                  <h5 class="font-bold text-sm mb-3">Síguenos en</h5>
                  <div class="flex gap-4">
                      <a href="https://www.facebook.com/gobmexico" target="_blank"
                          class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition hover:bg-white hover:text-gobmx-verde">
                          <i class="fab fa-facebook-f"></i>
                      </a>
                      <a href="https://twitter.com/GobiernoMX" target="_blank"
                          class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition hover:bg-white hover:text-gobmx-verde">
                          <i class="fab fa-twitter"></i>
                      </a>
                      <a href="https://www.instagram.com/gobiernomx" target="_blank"
                          class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition hover:bg-white hover:text-gobmx-verde">
                          <i class="fab fa-instagram"></i>
                      </a>
                      <a href="https://www.youtube.com/user/GobiernoMexico" target="_blank"
                          class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition hover:bg-white hover:text-gobmx-verde">
                          <i class="fab fa-youtube"></i>
                      </a>
                  </div>
              </div>
          </div>
          <div class="h-2 bg-gradient-to-r from-gobmx-guinda to-gobmx-verde mt-8 opacity-50"></div>
      </footer>
      </div>
      </div>
  
      <!-- Modal para exportar Sub-Sankey con Leyenda -->
      <div id="export-modal" class="modal" style="display: none;">
          <div class="modal-content">
              <div class="modal-header">
                  <h3>Exportar Sub-Sankey con Leyenda</h3>
                  <span class="close" id="close-export-modal">&times;</span>
              </div>
              <div class="modal-body">
                  <div id="export-preview-container" class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <!-- Aquí se generará la vista previa -->
                  </div>
                  <div class="export-options mt-4 text-center">
                      <button id="export-subsankey" class="btn btn-primary">
                          Descargar Sub-Sankey (Ambas versiones)
                      </button>
                  </div>
  
                  <!-- Filtros de Categorías -->
                  <div class="flex flex-col gap-2 w-full xl:w-auto">
                      <div class="text-sm font-semibold text-gray-700">Filtros de Categorías:</div>
                      <div id="legend-container" class="flex flex-wrap gap-2"></div>
                  </div>
              </div>
          </div>
      </div>
  
  
>     <script src="sankey_config.js"></script>
>     <script src="data_processor.js"></script>
>     <script src="datos.js"></script>
>     <script>
          // Funciones para controlar el preloader
          function showPreloader(message = 'Cargando...') {
              const preloader = document.getElementById('preloader');
              const messageEl = document.getElementById('preloader-message');
              const progressBar = document.getElementById('preloader-progress-bar');
  
              // Actualizar mensaje
              messageEl.textContent = message;
  
              // Mostrar preloader
              preloader.classList.remove('hidden');
  
              // Iniciar animación de progreso
              let progress = 0;
              progressBar.style.width = '0%';
  
              const progressInterval = setInterval(() => {
                  progress += Math.random() * 15;
                  if (progress > 90) progress = 90;
                  progressBar.style.width = progress + '%';
              }, 200);
  
              return {
                  complete: () => {
                      clearInterval(progressInterval);
                      progressBar.style.width = '100%';
                      setTimeout(() => {
                          preloader.classList.add('hidden');
                          progressBar.style.width = '0%';
                      }, 300);
                  },
                  updateMessage: (newMessage) => {
                      messageEl.textContent = newMessage;
                  },
                  updateProgress: (value) => {
                      progress = Math.min(90, value);
                      progressBar.style.width = progress + '%';
                  },
                  updateProgress: (value) => {
                      progressBar.style.width = value + '%';
                  }
              };
          }
  
          // Efecto de hover mejorado para cards
          function initializeGlassEffects() {
              const cards = document.querySelectorAll('.card, .card-inset');
              cards.forEach(card => {
                  card.addEventListener('mousemove', function (e) {
                      const rect = card.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
  
                      card.style.setProperty('--x', `${x}px`);
                      card.style.setProperty('--y', `${y}px`);
  
                      // Eliminado el efecto de salto (translateY) en hover
                  });
              });
          }
  
          // Inicializar efectos modernos para botones
          function initializeModernButtons() {
              const buttons = document.querySelectorAll('.btn');
  
              buttons.forEach(button => {
                  // Efecto de sonido visual al hacer clic
                  button.addEventListener('click', function (e) {
                      // Crear efecto ripple personalizado
                      const ripple = document.createElement('span');
                      const rect = button.getBoundingClientRect();
                      const size = Math.max(rect.width, rect.height);
                      const x = e.clientX - rect.left - size / 2;
                      const y = e.clientY - rect.top - size / 2;
  
                      ripple.style.cssText = `
                          position: absolute;
                          width: ${size}px;
                          height: ${size}px;
                          left: ${x}px;
                          top: ${y}px;
                          background: rgba(255, 255, 255, 0.6);
                          border-radius: 50%;
                          transform: scale(0);
                          animation: ripple 0.6s linear;
                          pointer-events: none;
                          z-index: 1;
                      `;
  
                      button.appendChild(ripple);
  
                      // Remover el ripple después de la animación
                      setTimeout(() => {
                          ripple.remove();
                      }, 600);
                  });
  
                  // Efecto de hover mejorado
                  button.addEventListener('mouseenter', function () {
                      this.style.transform = 'translateY(-2px) scale(1.02)';
                  });
  
                  button.addEventListener('mouseleave', function () {
                      this.style.transform = 'translateY(0) scale(1)';
                  });
              });
          }
  
          // Agregar keyframes para el ripple
          const style = document.createElement('style');
          style.textContent = `
              @keyframes ripple {
                  to {
                      transform: scale(4);
                      opacity: 0;
                  }
              }
          `;
          document.head.appendChild(style);
  
          document.addEventListener('DOMContentLoaded', function () {
              initializeGlassEffects();
              initializeModernButtons();
  
              // Inicializar colores de indicadores de eficiencia desde la configuración
              if (window.sankeyConfig && window.sankeyConfig.efficiencyColors) {
                  const efficientBox = document.getElementById('efficient-color-box');
                  const warningBox = document.getElementById('warning-color-box');
                  const criticalBox = document.getElementById('critical-color-box');
  
                  if (efficientBox) efficientBox.style.backgroundColor = window.sankeyConfig.efficiencyColors.efficient;
                  if (warningBox) warningBox.style.backgroundColor = window.sankeyConfig.efficiencyColors.warning;
                  if (criticalBox) criticalBox.style.backgroundColor = window.sankeyConfig.efficiencyColors.critical;
              }
  
              const chartDom = document.getElementById('sankey');
              let sankeyChart = echarts.init(chartDom, null, { renderer: 'canvas' });
              let currentZoomLevel = 1; // Variable para gestionar el zoom
              const yearSelector = document.getElementById('year-selector');
              const searchInput = document.getElementById('search-input');
              const nodeDatalist = document.getElementById('node-list');
              const zoomSwitch = document.getElementById('zoom-switch');
              let zoomEnabled = zoomSwitch.checked;
              const legendContainer = document.getElementById('legend-container');
              const activeCategories = {};
              const categoryCounts = {};
              Object.keys(window.sankeyConfig?.categoryColors || {}).forEach(c => {
                  activeCategories[c] = true;
                  categoryCounts[c] = 0;
              });
              const clearSearchBtn = document.getElementById('clear-search');
              const legendShowAllBtn = document.getElementById('legend-show-all');
              const legendToggleDetailsBtn = document.getElementById('legend-toggle-details');
              const legendCard = document.getElementById('color-legend-container');
  
              const focusSwitch = document.getElementById('focus-switch');
              let focusMode = focusSwitch.checked;
              let focusedNodeIndex = null;
              let currentLegendOrder = null;
              let hydrocarbonsFilterActive = false; // Estado del filtro de Hidrocarburos
              let singleElementFilterActive = false; // Estado del filtro de elemento único
              let activeSingleElement = null; // Nombre del elemento activo para el filtro único
  
              let legendDetailsVisible = false;
  
              const legendGroups = {
                  'FEP (Fuentes de Energía Primaria)': [
                      'Producción', 'Importación EP', 'V.I. y Dif. Est. EP'
                  ],
                  'Energéticos Primarios': [
                      'Petróleo crudo', 'Gas natural', 'Carbón mineral', 'Condensados',
                      'Energía Nuclear', 'Energía Hidráulica', 'Energía Geotérmica', 'Energía solar',
                      'Energía eólica', 'Bagazo de caña', 'Leña', 'Biogás'
                  ],
                  'Salidas de Energía Primaria': [
                      'Exportación EP',
                      'Energía No Aprovechada EP',
                      'Consumo Propio del Sector EP',
                      'Pérdidas técnicas por transporte, transmisión y distribución EP',
                      'Variación de Inventarios EP (-)',
                      'Diferencia Estadística EP (-)',
                      'Pérdidas EP'
                  ],
                  'Transformaciones': [
                      'Coquizadoras y Hornos', 'Plantas de Gas y Fraccionadoras',
                      'Refinerías y Despuntadoras', 'Centrales Eléctricas',
                      'Carboeléctrica', 'Térmica Convencional', 'Combustión Interna',
                      'Turbogás', 'Ciclo Combinado', 'Nucleoeléctrica', 'Cogeneración',
                      'Geotérmica', 'Eólica', 'Solar Fotovoltaica'
                  ],
                  'Entradas de Energía Secundaria': [
                      'Importación ES', 'V.I. y Dif. Est. ES'
                  ],
                  'Energéticos Secundarios': [
                      'Coque de carbón', 'Coque de petróleo', 'Gas licuado de petróleo',
                      'Gasolinas y naftas', 'Querosenos', 'Diesel', 'Combustóleo',
                      'Gas Seco', 'Energía eléctrica', 'Otros energéticos'
                  ],
                  'Salidas de Energía Secundaria': [
                      'Exportación ES',
                      'Energía No Aprovechada ES',
                      'Consumo Propio del Sector ES',
                      'Pérdidas técnicas por transporte, transmisión y distribución ES',
                      'Variación de Inventarios ES (-)',
                      'Diferencia Estadística ES (-)',
                      'Pérdidas ES'
                  ],
                  'Usos Finales': [
                      'Industrial', 'Transporte', 'Agropecuario', 'Comercial',
                      'Público', 'Residencial', 'Petroquímica PEMEX', 'Otras ramas económicas',
                      'Consumo final no energético'
                  ]
              };
              const legendKeyOverrides = {
                  '\u00a0': 'a',
                  '\u00a1': 'i',
                  '\u00a2': 'o',
                  '\u00a3': 'u',
                  '\u00a4': 'n',
                  '\u201a': 'e'
              };
              const normalizeLegendKey = (value = '') => {
                  const cleaned = value
                      .split('')
                      .map(char => legendKeyOverrides[char] || char)
                      .join('')
                      .normalize('NFD')
                      .replace(/[\u0300-\u036f]/g, '')
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, '');
                  return cleaned;
              };
              const legendGroupNames = Object.keys(legendGroups);
              const activeGroupFilters = {};
              const nodeGroupMap = new Map();
              legendGroupNames.forEach(groupName => {
                  activeGroupFilters[groupName] = true;
                  legendGroups[groupName].forEach(nodeName => {
                      nodeGroupMap.set(normalizeLegendKey(nodeName), groupName);
                  });
              });
  
  
              // Verificar que los datos estén cargados
              function waitForData() {
                  return new Promise((resolve) => {
                      const checkData = () => {
                          if (window.energyData && window.energyData.Datos) {
                              resolve(window.energyData);
                          } else {
                              setTimeout(checkData, 100);
                          }
                      };
                      checkData();
                  });
              }
  
              let energyData = null;
              let allNodes = new Map(); // Para guardar la info completa de los nodos
              let currentLinks = []; // Para guardar los enlaces actuales
  
              const formatNumber = (num) => {
                  const formatted = num.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' PJ';
                  return formatted;
              };
  
              const formatNumberForLabel = (num) => {
                  return num.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
              };
  
              // Función auxiliar para convertir hex a rgba
              const hexToRgba = (hex, alpha) => {
                  const r = parseInt(hex.slice(1, 3), 16);
                  const g = parseInt(hex.slice(3, 5), 16);
                  const b = parseInt(hex.slice(5, 7), 16);
                  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
              };
  
              // Función auxiliar para aclarar un color hexadecimal
              const brightenColor = (hex, percent) => {
                  let r = parseInt(hex.slice(1, 3), 16),
                      g = parseInt(hex.slice(3, 5), 16),
                      b = parseInt(hex.slice(5, 7), 16);
  
                  r = Math.min(255, r + (r * percent / 100));
                  g = Math.min(255, g + (g * percent / 100));
                  b = Math.min(255, b + (b * percent / 100));
  
                  return `#${(0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
              };
  
              function getActiveGroupNames() {
                  return legendGroupNames.filter(groupName => activeGroupFilters[groupName]);
              }
  
              function isGroupFilterActive() {
                  const activeGroups = getActiveGroupNames();
                  return activeGroups.length > 0 && activeGroups.length < legendGroupNames.length;
              }
  
              function isNodeInActiveGroup(nodeName, groupFilterActive) {
                  if (!groupFilterActive) return true;
                  const groupName = nodeGroupMap.get(normalizeLegendKey(nodeName));
                  return groupName ? !!activeGroupFilters[groupName] : false;
              }
  
              function setAllGroupsActive() {
                  legendGroupNames.forEach(groupName => {
                      activeGroupFilters[groupName] = true;
                  });
              }
  
              function setSingleGroupActive(groupName) {
                  legendGroupNames.forEach(name => {
                      activeGroupFilters[name] = name === groupName;
                  });
              }
  
              function toggleGroupActive(groupName) {
                  activeGroupFilters[groupName] = !activeGroupFilters[groupName];
                  if (getActiveGroupNames().length === 0) {
                      setAllGroupsActive();
                  }
              }
  
              function updateLegendDetailsState() {
                  if (!legendCard || !legendToggleDetailsBtn) return;
                  legendCard.classList.toggle('legend-collapsed', !legendDetailsVisible);
                  legendToggleDetailsBtn.textContent = legendDetailsVisible ? 'Ocultar elementos' : 'Mostrar elementos';
                  legendToggleDetailsBtn.setAttribute('aria-pressed', legendDetailsVisible ? 'true' : 'false');
              }
  
              function renderLegend() {
                  if (!legendContainer) return;
                  legendContainer.innerHTML = '';
                  Object.entries(window.sankeyConfig.categoryColors || {}).forEach(([cat, color]) => {
                      const btn = document.createElement('button');
                      btn.textContent = cat;
                      btn.style.background = activeCategories[cat] ? color : '#ccc';
                      btn.style.border = 'none';
                      btn.style.padding = '4px 8px';
                      btn.style.cursor = 'pointer';
                      btn.onclick = () => {
                          activeCategories[cat] = !activeCategories[cat];
                          btn.style.background = activeCategories[cat] ? color : '#ccc';
                          updateChart(yearSelector.value);
                      };
                      legendContainer.appendChild(btn);
                  });
              }
  
              // Función para rastrear flujo descendente (aguas abajo)
              // Función para rastrear flujo descendente (aguas abajo) e incluir padres inmediatos
              function traceDownstream(rootNodes, links) {
                  const visited = new Set(rootNodes);
                  const queue = [...rootNodes];
  
                  // Paso extra: Buscar nodos padres inmediatos (upstream) de los rootNodes
                  // Esto es para incluir "Producción" u otros orígenes directos
                  links.forEach(l => {
                      if (rootNodes.includes(l.target)) {
                          visited.add(l.source);
                      }
                  });
  
                  while (queue.length > 0) {
                      const currentNode = queue.shift();
  
                      // Encontrar todos los enlaces donde el nodo actual es fuente
                      const outgoingLinks = links.filter(l => l.source === currentNode);
  
                      outgoingLinks.forEach(link => {
                          if (!visited.has(link.target)) {
                              visited.add(link.target);
                              queue.push(link.target);
                          }
                      });
                  }
                  return visited;
              }
  
              // Función para rastreo bidireccional (upstream + downstream)
              function traceBidirectional(startNode, links) {
                  const visited = new Set();
                  if (!startNode) return visited;
  
                  visited.add(startNode);
  
                  // 1. Downstream (BFS hacia adelante)
                  const queueDown = [startNode];
                  const visitedDown = new Set([startNode]);
  
                  while (queueDown.length > 0) {
                      const current = queueDown.shift();
                      const outgoing = links.filter(l => l.source === current);
                      outgoing.forEach(l => {
                          if (!visitedDown.has(l.target)) {
                              visitedDown.add(l.target);
                              visited.add(l.target);
                              queueDown.push(l.target);
                          }
                      });
                  }
  
                  // 2. Upstream (BFS hacia atrás)
                  const queueUp = [startNode];
                  const visitedUp = new Set([startNode]);
  
                  while (queueUp.length > 0) {
                      const current = queueUp.shift();
                      const incoming = links.filter(l => l.target === current);
                      incoming.forEach(l => {
                          if (!visitedUp.has(l.source)) {
                              visitedUp.add(l.source);
                              visited.add(l.source);
                              queueUp.push(l.source);
                          }
                      });
                  }
  
                  return visited;
              }
              function applyLegendFilter(nodes, links) {
                  const groupFilterActive = isGroupFilterActive();
                  const isVisibleByGroup = (nodeName) => isNodeInActiveGroup(nodeName, groupFilterActive);
  
                  if (singleElementFilterActive && activeSingleElement) {
                      const validNodes = traceBidirectional(activeSingleElement, links);
  
                      const filtered = links.filter(lk => {
                          return validNodes.has(lk.source) && validNodes.has(lk.target)
                              && isVisibleByGroup(lk.source) && isVisibleByGroup(lk.target);
                      });
  
                      nodes.forEach(n => {
                          if (!n.esEspaciador) {
                              const active = validNodes.has(n.name) && isVisibleByGroup(n.name);
                              n.itemStyle = n.itemStyle || {};
                              n.itemStyle.opacity = active ? 1 : 0.01;
                              n.label = n.label || {};
                              n.label.show = !!active;
                              if (!active) {
                                  n.label.backgroundColor = 'rgba(0,0,0,0)';
                                  n.label.borderWidth = 0;
                                  n.label.color = 'rgba(0,0,0,0)';
                              }
                          }
                      });
                      return filtered;
                  }
  
                  if (hydrocarbonsFilterActive) {
                      const rootNodes = ['Petróleo crudo', 'Gas natural', 'Condensados'];
                      // Incluir nodos de Entrada de Energía Secundaria (Importación ES, V.I. y Dif. Est. ES)
                      const secondaryInputNodes = ['Importación ES', 'V.I. y Dif. Est. ES'];
  
                      // Definir nodos explícitamente excluidos del filtro de hidrocarburos
                      const excludedNodes = new Set(['Energía eléctrica', 'Coque de carbón', 'Carbón mineral', 'Energía Nuclear', 'Energía Hidráulica', 'Energía Geotérmica', 'Energía solar', 'Energía eólica', 'Bagazo de caña', 'Leña', 'Biogás']);
  
                      // Rastreo downstream desde fuentes primarias
                      let validNodes = traceDownstream(rootNodes, links);
  
                      // Rastreo downstream desde entradas secundarias
                      const secondaryValidNodes = traceDownstream(secondaryInputNodes, links);
  
                      // Unir ambos conjuntos de nodos válidos
                      secondaryValidNodes.forEach(node => validNodes.add(node));
  
                      const filtered = links.filter(lk => {
                          // Excluir enlaces si alguno de los nodos está en la lista de excluidos
                          if (excludedNodes.has(lk.source) || excludedNodes.has(lk.target)) {
                              return false;
                          }
  
                          return validNodes.has(lk.source) && validNodes.has(lk.target)
                              && isVisibleByGroup(lk.source) && isVisibleByGroup(lk.target);
                      });
  
                      // Reconstruir el conjunto de nodos válidos basado en los enlaces filtrados para limpiar nodos huérfanos
                      const finalValidNodes = new Set();
                      filtered.forEach(lk => {
                          finalValidNodes.add(lk.source);
                          finalValidNodes.add(lk.target);
                      });
  
                      nodes.forEach(n => {
                          if (!n.esEspaciador) {
                              const active = finalValidNodes.has(n.name) && isVisibleByGroup(n.name);
                              n.itemStyle = n.itemStyle || {};
                              n.itemStyle.opacity = active ? 1 : 0.01;
                              n.label = n.label || {};
                              n.label.show = !!active;
                              if (!active) {
                                  n.label.backgroundColor = 'rgba(0,0,0,0)';
                                  n.label.borderWidth = 0;
                                  n.label.color = 'rgba(0,0,0,0)';
                              }
                          }
                      });
                      return filtered;
                  }
  
                  const filtered = links.filter(lk => {
                      const sc = allNodes.get(lk.source);
                      const tc = allNodes.get(lk.target);
                      return sc && tc
                          && activeCategories[sc.category]
                          && activeCategories[tc.category]
                          && isVisibleByGroup(lk.source)
                          && isVisibleByGroup(lk.target);
                  });
                  const connected = new Set();
                  filtered.forEach(lk => { connected.add(lk.source); connected.add(lk.target); });
                  nodes.forEach(n => {
                      if (!n.esEspaciador) {
                          const active = activeCategories[n.category] && connected.has(n.name) && isVisibleByGroup(n.name);
                          n.itemStyle = n.itemStyle || {};
                          n.itemStyle.opacity = active ? 1 : 0.01;
                          // Asegurar que las etiquetas tambien se oculten cuando el nodo no este activo
                          n.label = n.label || {};
                          n.label.show = !!active;
                          if (!active) {
                              // Remover decoracion de etiqueta para que no quede halo visible
                              n.label.backgroundColor = 'rgba(0,0,0,0)';
                              n.label.borderWidth = 0;
                              n.label.color = 'rgba(0,0,0,0)';
                          }
                      }
                  });
                  return filtered;
              }
  
              // Función para mostrar información del nodo en modo focus
  
              // Función para mostrar valor PJ debajo del nombre del nodo
              function showFocusNodeInfo(nodeName) {
                  const nodeInfo = allNodes.get(nodeName);
  
                  if (nodeInfo) {
                      // Primero limpiar todos los labels existentes
                      hideFocusNodeInfo();
  
                      // Calcular el valor total (puede ser entrada, salida o balance según el tipo de nodo)
                      let displayValue = 0;
                      if (nodeInfo.inflow > 0 && nodeInfo.outflow > 0) {
                          // Nodo de transformación - mostrar entrada
                          displayValue = nodeInfo.inflow;
                      } else if (nodeInfo.outflow > 0) {
                          // Nodo fuente - mostrar salida
                          displayValue = nodeInfo.outflow;
                      } else if (nodeInfo.inflow > 0) {
                          // Nodo sumidero - mostrar entrada
                          displayValue = nodeInfo.inflow;
                      }
  
                      const valueText = formatNumber(displayValue);
  
                      // Encontrar todos los nodos conectados (adyacentes)
                      const connectedNodes = new Set();
                      connectedNodes.add(nodeName); // Incluir el nodo seleccionado
  
                      // Buscar nodos conectados a través de los enlaces
                      currentLinks.forEach(link => {
                          if (link.source === nodeName) {
                              connectedNodes.add(link.target);
                          }
                          if (link.target === nodeName) {
                              connectedNodes.add(link.source);
                          }
                      });
  
                      // Actualizar el gráfico con labels para todos los nodos conectados
                      const currentOption = sankeyChart.getOption();
                      const nodes = currentOption.series[0].data;
  
                      connectedNodes.forEach(connectedNodeName => {
                          const connectedNodeInfo = allNodes.get(connectedNodeName);
                          if (connectedNodeInfo) {
                              // Calcular el valor para cada nodo conectado
                              let displayValue = 0;
                              if (connectedNodeInfo.inflow > 0 && connectedNodeInfo.outflow > 0) {
                                  // Nodo de transformación - mostrar entrada
                                  displayValue = connectedNodeInfo.inflow;
                              } else if (connectedNodeInfo.outflow > 0) {
                                  // Nodo fuente - mostrar salida
                                  displayValue = connectedNodeInfo.outflow;
                              } else if (connectedNodeInfo.inflow > 0) {
                                  // Nodo sumidero - mostrar entrada
                                  displayValue = connectedNodeInfo.inflow;
                              }
  
                              const valueText = formatNumber(displayValue);
  
                              // Encontrar el nodo y agregar el label
                              const nodeIndex = nodes.findIndex(node => node.name === connectedNodeName);
                              if (nodeIndex !== -1) {
                                  nodes[nodeIndex].label = {
                                      show: true,
                                      position: 'right',
                                      distance: 2,
                                      formatter: function (params) {
                                          return `${params.name}\n${valueText}`;
                                      },
                                      fontSize: 8,
                                      fontWeight: 'normal',
                                      color: '#333',
                                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                      borderColor: 'rgba(128,128,128,0.9)',
                                      borderWidth: 1,
                                      borderRadius: 4,
                                      padding: [4, 8],
                                      shadowBlur: 2,
                                      shadowColor: 'rgba(0,0,0,0.12)'
                                  };
                              }
                          }
                      });
  
                      // Actualizar el gráfico
                      sankeyChart.setOption({
                          series: [{
                              data: nodes
                          }]
                      });
  
                      console.log('Mostrando valores PJ para nodo principal:', nodeName, 'y', connectedNodes.size - 1, 'nodos conectados');
                      ensureProperLayering();
                  }
  
                  // Mostrar también las etiquetas de enlaces conectados
                  showLinkLabels(nodeName);
              }
  
              // Función para mostrar etiquetas en enlaces conectados a un nodo específico
              function showLinkLabels(nodeName) {
                  // Obtener enlaces conectados al nodo especificado
                  const connectedLinks = currentLinks.filter(link =>
                      link.source === nodeName || link.target === nodeName
                  );
  
                  if (connectedLinks.length > 0) {
                      // Actualizar la configuración de la serie para mostrar edgeLabel y mejorar visibilidad de enlaces
                      sankeyChart.setOption({
                          series: [{
                              edgeLabel: {
                                  show: true,
                                  formatter: function (params) {
                                      // Solo mostrar etiqueta si el enlace está conectado al nodo en focus
                                      if (params.data.source === nodeName || params.data.target === nodeName) {
                                          return '{connected|' + formatNumber(params.data.value) + '}';
                                      }
                                      return '';
                                  },
                                  rich: {
                                      connected: {
                                          color: '#000',
                                          fontSize: 8,
                                          fontStyle: 'italic',
                                          backgroundColor: '#ffffff',
                                          borderColor: '#808080',
                                          borderWidth: 1,
                                          borderRadius: 3,
                                          padding: [2, 4, 2, 4]
                                      }
                                  }
                              },
                              // Mejorar la visibilidad de los enlaces conectados
                              lineStyle: {
                                  curveness: window.sankeyConfig.layoutConfig.curveness,
                                  opacity: function (params) {
                                      // Enlaces conectados al nodo filtrado más visibles
                                      if (params.data.source === nodeName || params.data.target === nodeName) {
                                          return 0.9;
                                      }
                                      return 0.3; // Enlaces no conectados más tenues
                                  },
                                  width: function (params) {
                                      // Enlaces conectados ligeramente más gruesos
                                      if (params.data.source === nodeName || params.data.target === nodeName) {
                                          return Math.max(1, Math.sqrt(params.data.value) * 0.8);
                                      }
                                      return Math.max(1, Math.sqrt(params.data.value) * 0.5);
                                  }
                              }
                          }]
                      });
  
                      console.log('Mostrando etiquetas en', connectedLinks.length, 'enlaces conectados a:', nodeName);
                  }
              }
  
              // Función para ocultar etiquetas de enlaces y restaurar visibilidad normal
              function hideLinkLabels() {
                  sankeyChart.setOption({
                      series: [{
                          edgeLabel: {
                              show: false
                          },
                          // Restaurar visibilidad normal de enlaces
                          lineStyle: {
                              curveness: window.sankeyConfig.layoutConfig.curveness,
                              opacity: 0.8,
                              width: function (params) {
                                  return Math.max(1, Math.sqrt(params.data.value) * 0.6);
                              }
                          }
                      }]
                  });
                  console.log('Ocultando todas las etiquetas de enlaces y restaurando visibilidad normal');
              }
  
              // Función para ocultar información del nodo
              function hideFocusNodeInfo() {
                  // Limpiar todos los labels personalizados
                  const currentOption = sankeyChart.getOption();
                  if (currentOption && currentOption.series && currentOption.series[0]) {
                      const nodes = currentOption.series[0].data;
  
                      nodes.forEach(node => {
                          if (node.label && node.label.show) {
                              // En lugar de eliminar, restaurar configuración por defecto
                              node.label = {
                                  show: true,
                                  fontSize: 8,
                                  fontWeight: 'normal',
                                  color: '#000',
                                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                  borderColor: 'rgba(128,128,128,0.9)',
                                  borderWidth: 1,
                                  borderRadius: 4,
                                  padding: [2, 6, 2, 6],
                                  shadowBlur: 6,
                                  shadowColor: 'rgba(0, 0, 0, 0.08)',
                                  shadowOffsetX: 0,
                                  shadowOffsetY: 1
                              };
                          }
                      });
  
                      // Actualizar el gráfico
                      sankeyChart.setOption({
                          series: [{
                              data: nodes
                          }]
                      });
                  }
  
                  // Ocultar también las etiquetas de enlaces
                  hideLinkLabels();
                  ensureProperLayering();
              }
  
              // Nueva función de filtros mejorada
              function renderLegendNew() {
                  if (!legendContainer) return;
  
                  // Verificar que el gráfico esté inicializado
                  if (!sankeyChart) {
                      console.warn('Sankey chart not ready for legend rendering');
                      return;
                  }
  
                  // Contar elementos por categoría
                  Object.keys(categoryCounts).forEach(cat => categoryCounts[cat] = 0);
                  if (window.currentNodes) {
                      window.currentNodes.forEach(node => {
                          if (node.category && categoryCounts.hasOwnProperty(node.category)) {
                              categoryCounts[node.category]++;
                          }
                      });
                  }
  
                  legendContainer.innerHTML = '';
  
                  Object.entries(window.sankeyConfig.categoryColors || {}).forEach(([cat, color]) => {
                      const filterItem = document.createElement('div');
                      filterItem.className = `filter-item ${activeCategories[cat] ? 'active' : 'inactive'}`;
                      filterItem.style.setProperty('--filter-color', color);
  
                      const colorDiv = document.createElement('div');
                      colorDiv.className = 'filter-color';
                      colorDiv.style.backgroundColor = color;
  
                      const textDiv = document.createElement('div');
                      textDiv.className = 'filter-text';
                      textDiv.textContent = cat;
  
                      const countDiv = document.createElement('div');
                      countDiv.className = 'filter-count';
                      countDiv.textContent = categoryCounts[cat] || 0;
  
                      filterItem.appendChild(colorDiv);
                      filterItem.appendChild(textDiv);
                      filterItem.appendChild(countDiv);
  
                      filterItem.onclick = () => {
                          // Toggle the category filter
                          activeCategories[cat] = !activeCategories[cat];
                          filterItem.className = `filter-item ${activeCategories[cat] ? 'active' : 'inactive'}`;
                          updateChart(yearSelector.value);
                      };
  
                      // Add click handler to filter by clicking the text
                      textDiv.onclick = (e) => {
                          e.stopPropagation();
                          // Filter by this category only
                          Object.keys(activeCategories).forEach(c => activeCategories[c] = false);
                          activeCategories[cat] = true;
  
                          // Update UI
                          legendContainer.querySelectorAll('.filter-item').forEach(item => {
                              item.className = `filter-item ${item === filterItem ? 'active' : 'inactive'}`;
                          });
  
                          updateChart(yearSelector.value);
                      };
  
                      legendContainer.appendChild(filterItem);
                  });
              }
  
              function updateChart(year) {
                  if (!energyData || !energyData.Datos) {
                      console.warn('energyData no está disponible');
                      return;
                  }
  
                  const processedData = window.dataProcessor.processSankeyData(energyData, year, window.sankeyConfig);
                  const { nodes, links } = processedData;
                  currentLinks = links; // Guardar los enlaces
                  window.currentNodes = nodes; // Guardar los nodos para el conteo de filtros
  
                  // Actualizar conteos de filtros
                  setTimeout(() => {
                      if (sankeyChart && sankeyChart.getOption()) {
                          renderLegendNew();
                      }
                  }, 50);
  
                  // Guardar nodos para tooltip y búsqueda, y aplicar indicadores visuales
                  allNodes.clear();
                  nodes.forEach(node => {
                      if (!node.esEspaciador) {
                          allNodes.set(node.name, node);
                      } else {
                          // Para nodos espaciadores, deshabilitar completamente la interacción
                          node.silent = true; // Deshabilita todos los eventos de mouse
                          node.itemStyle = node.itemStyle || {};
                          node.itemStyle.color = 'transparent';
                          node.itemStyle.borderColor = 'transparent';
                          node.itemStyle.borderWidth = 0;
                          node.label = { show: false }; // Solo ocultar etiquetas para espaciadores
                      }
  
                      if (!node.esEspaciador) {
  
                          // Establecer un resplandor base para todos los nodos
                          node.itemStyle = node.itemStyle || {};
                          node.itemStyle.shadowBlur = 3; // Resplandor sutil por defecto
                          node.itemStyle.shadowColor = 'rgba(0, 0, 0, 0.2)'; // Color de resplandor sutil
  
                          // Aplicar patrón decal de rayas diagonales si está activado
                          const decalSwitch = document.getElementById('decal-switch');
                          if (decalSwitch && decalSwitch.checked) {
                              node.itemStyle.decal = {
                                  symbol: 'line',
                                  symbolSize: 1,
                                  symbolKeepAspect: true,
                                  color: 'rgba(0, 0, 0, 0.3)',
                                  backgroundColor: 'transparent',
                                  dashArrayX: [3, 3],
                                  dashArrayY: [3, 3],
                                  rotation: Math.PI / 4
                              };
                          }
  
  
  
                          // Lógica de indicadores visuales por pérdida de energía
                          const showAlerts = document.getElementById('alert-switch').checked;
                          const transformationNodes = [
                              "Coquizadoras y Hornos",
                              "Plantas de Gas y Fraccionadoras",
                              "Refinerías",
                              "Centrales Eléctricas"
                          ];
  
                          if (showAlerts && node.inflow > 0 && node.outflow > 0 && !transformationNodes.includes(node.name)) { // Excluir nodos de transformación específicos
                              const lossPercentage = (node.inflow - node.outflow) / node.inflow;
                              node.itemStyle = node.itemStyle || {}; // Asegurar que itemStyle exista
  
                              if (lossPercentage >= 0.05) { // Crítico
                                  node.itemStyle.borderColor = window.sankeyConfig.efficiencyColors.critical;
                                  node.itemStyle.borderWidth = 2.5;
                                  node.itemStyle.shadowBlur = 15; // Resplandor más intenso
                                  node.itemStyle.shadowColor = hexToRgba(window.sankeyConfig.efficiencyColors.critical, 0.8);
                              } else if (lossPercentage >= 0.03) { // Alerta
                                  node.itemStyle.borderColor = window.sankeyConfig.efficiencyColors.warning;
                                  node.itemStyle.borderWidth = 2.5;
                                  node.itemStyle.shadowBlur = 10; // Resplandor intenso
                                  node.itemStyle.shadowColor = hexToRgba(window.sankeyConfig.efficiencyColors.warning, 0.6);
                              } else { // Eficiente
                                  node.itemStyle.borderColor = window.sankeyConfig.efficiencyColors.efficient;
                                  node.itemStyle.borderWidth = 2;
                                  node.itemStyle.shadowBlur = 5; // Resplandor ligeramente mayor para eficiente
                                  node.itemStyle.shadowColor = hexToRgba(window.sankeyConfig.efficiencyColors.efficient, 0.4);
                              }
                          }
                      }
                  });
  
                  const filteredLinks = applyLegendFilter(nodes, currentLinks);
  
                  if (filteredLinks.length === 0) {
                      sankeyChart.clear();
                      sankeyChart.showLoading({ text: `No hay datos de flujo para el año ${year}.` });
                      return;
                  }
                  sankeyChart.hideLoading();
  
                  const option = {
                      title: {
                          text: `Balance Nacional de Energía SENER - ${year}`,
                          subtext: 'Valores en Petajoules (PJ)',
                          left: 'center',
                          textStyle: { color: '#1f2937', fontWeight: 700, fontSize: 18 },
                          subtextStyle: { color: '#6b7280', fontSize: 12 }
                      },
                      tooltip: {
                          trigger: 'item',
                          triggerOn: 'mousemove',
                          formatter: function (params) {
                              if (params.name && params.name.includes('SPACER')) return null;
                              const nodeInfo = allNodes.get(params.name);
                              if (nodeInfo && nodeInfo.esEspaciador) return null;
  
                              if (params.dataType === 'edge') {
                                  const sourceInfo = allNodes.get(params.data.source);
                                  const pct = sourceInfo && sourceInfo.outflow ? (params.data.value / sourceInfo.outflow * 100).toFixed(2) : '0.00';
                                  return `${params.data.source} → ${params.data.target}: ${formatNumber(params.data.value)} (${pct}%)`;
                              }
  
                              if (nodeInfo) {
                                  const inflowPct = nodeInfo.value ? (nodeInfo.inflow / nodeInfo.value * 100).toFixed(2) : '0.00';
                                  const outflowPct = nodeInfo.value ? (nodeInfo.outflow / nodeInfo.value * 100).toFixed(2) : '0.00';
                                  let text = `<b>${params.name}</b><br/>Valor: ${formatNumber(nodeInfo.value)}<br/>`;
                                  text += `Entrada: ${formatNumber(nodeInfo.inflow)} (${inflowPct}%)<br/>`;
                                  text += `Salida: ${formatNumber(nodeInfo.outflow)} (${outflowPct}%)`;
                                  const showDescription = document.getElementById('description-switch').checked;
                                  if (showDescription && nodeInfo.description) {
                                      text += `<br/><hr style="margin: 5px 0;"/><i>${nodeInfo.description}</i>`;
                                  }
                                  return text;
                              }
                              return `<b>${params.name}</b><br/>Valor: ${formatNumber(params.value)}`;
                          },
                          extraCssText: 'max-width:400px; white-space: normal;'
                      },
                      // Configuración de accesibilidad
                      aria: {
                          enabled: true
                      },
                      series: [{
                          type: 'sankey',
                          top: 10,
                          bottom: 10,
                          left: 20,
                          right: 20,
                          roam: zoomEnabled,
                          draggable: focusMode || !zoomEnabled,
  
                          data: nodes,
                          links: filteredLinks,
                          label: {
                              show: true,
                              position: 'right',
                              formatter: function (params) {
                                  const nodeInfo = allNodes.get(params.name);
                                  if (nodeInfo && (nodeInfo.value > 0.1 || params.name === "Coquizadoras y Hornos")) {
                                      return `${params.name} ${formatNumberForLabel(params.value)} PJ`;
                                  }
                                  return '';
                              },
                              color: '#000',
                              fontSize: 8,
                              fontWeight: 'normal',
                              backgroundColor: '#ffffff',
                              borderColor: '#808080',
                              borderWidth: 1,
                              borderRadius: 3,
                              padding: 4
                          },
                          edgeLabel: { show: false },
                          // Reposicionar etiquetas fuera del nodo para minimizar solapamientos visuales
                          labelLayout: function (params) {
                              if (params.dataType !== 'node') return {};
                              const r = params.rect; // bounding box del nodo
                              const padding = 6;
  
                              // Obtener información del nodo para determinar su columna
                              const nodeInfo = allNodes.get(params.name);
                              const chartWidth = sankeyChart?.getWidth ? sankeyChart.getWidth() : (r.x + r.width) * 2;
  
                              // Determinar si es la última columna (energéticos secundarios)
                              // Los nodos de la última columna están más a la derecha
                              const isLastColumn = (r.x + r.width / 2) > (chartWidth * 0.75);
  
                              // Si es la última columna, etiqueta hacia la izquierda (para evitar cortes)
                              // Si es primera columna, etiqueta hacia la derecha
                              // Columnas del medio, etiqueta hacia la derecha también
                              const isFirstColumn = (r.x + r.width / 2) < (chartWidth * 0.25);
                              const labelToRight = !isLastColumn; // Todas hacia la derecha excepto la última
  
                              return {
                                  x: labelToRight ? r.x + r.width + padding : r.x - padding,
                                  y: r.y + r.height / 2,
                                  verticalAlign: 'middle',
                                  align: labelToRight ? 'left' : 'right'
                              };
                          },
                          emphasis: {
                              focus: 'adjacency',
                              blurScope: 'coordinateSystem',
                              itemStyle: {
                                  borderWidth: 3,
                                  borderColor: function (params) {
                                      const nodeData = allNodes.get(params.name);
                                      if (nodeData && nodeData.itemStyle && nodeData.itemStyle.color) {
                                          return brightenColor(nodeData.itemStyle.color, 30); // Aclarar un 30%
                                      }
                                      return '#ffffff'; // Fallback color
                                  },
                                  shadowBlur: 10,
                                  shadowColor: 'rgba(0,0,0,0.3)'
                              },
                              lineStyle: {
                                  opacity: 1,
                                  width: 4,
                                  shadowBlur: 8,
                                  shadowColor: 'rgba(0,0,0,0.3)'
                              },
                              label: {
                                  show: true,
                                  fontSize: 8,
                                  fontWeight: 'bold',
                                  color: '#000',
                                  backgroundColor: '#ffffff',
                                  borderColor: '#808080',
                                  borderWidth: 1,
                                  borderRadius: 3,
                                  padding: 4,
                                  formatter: function (params) {
                                      const nodeInfo = allNodes.get(params.name);
                                      if (nodeInfo) {
                                          return `${params.name}\n${formatNumberForLabel(nodeInfo.value)} PJ`;
                                      }
                                      return params.name;
                                  }
                              }
                          },
                          blur: {
                              itemStyle: {
                                  opacity: 0.02
                              },
                              lineStyle: {
                                  opacity: 0.02
                              }
                          },
                          nodeAlign: window.sankeyConfig.layoutConfig.nodeAlign,
                          nodeGap: window.sankeyConfig.layoutConfig.nodeGap,
                          nodeWidth: (() => {
                              // Calcular ancho promedio de las columnas personalizadas
                              const columnWidths = window.sankeyConfig.columnWidths;
                              if (columnWidths) {
                                  const widths = Object.values(columnWidths);
                                  return widths.reduce((sum, width) => sum + width, 0) / widths.length;
                              }
                              return window.sankeyConfig.layoutConfig.nodeWidth;
                          })(),
                          layoutIterations: window.sankeyConfig.layoutConfig.layoutIterations,
                          lineStyle: {
                              color: 'gradient',
                              curveness: window.sankeyConfig.layoutConfig.curveness,
                              opacity: 0.8
                          },
                          // Configuración para mejorar la visibilidad de enlaces
                          levels: [
                              {
                                  depth: 0,
                                  itemStyle: {
                                      borderWidth: 0
                                  },
                                  lineStyle: {
                                      opacity: 0.8
                                  }
                              }
                          ],
                          // Configuración de z-index para mejor layering
                          zlevel: 0,
                          z: 2
                      }]
                  };
                  sankeyChart.setOption(option, true);
                  populateDatalist(nodes);
                  sankeyChart.dispatchAction({ type: 'unfocusNodeAdjacency', seriesIndex: 0 });
                  focusedNodeIndex = null;
                  document.getElementById('node-details-container').style.display = 'none';
                  document.getElementById('sub-sankey-container').style.display = 'none';
  
                  // Asegurar el orden correcto de capas después del renderizado
                  setTimeout(() => {
                      ensureProperLayering();
                  }, 100);
  
                  // <<< AÑADIR: crear/actualizar etiquetas de columnas después de dibujar >>>
                  renderColumnLabels();
                  updateLabelOverlayPositions();
                  // Forzar una actualización del overlay por si filtros cambiaron visibilidad
                  setTimeout(() => {
                      renderColumnLabels();
                      updateLabelOverlayPositions();
                  }, 50);
              }
  
              function populateDatalist(nodes) {
                  const nodeNames = new Set();
                  nodes.forEach(node => {
                      if (!node.esEspaciador) { // Excluir nodos espaciadores
                          nodeNames.add(node.name);
                      }
                  });
                  nodeDatalist.innerHTML = '';
                  Array.from(nodeNames).sort().forEach(name => {
                      const option = document.createElement('option');
                      option.value = name;
                      nodeDatalist.appendChild(option);
                  });
              }
  
              function handleSearch() {
                  const term = searchInput.value.trim().toLowerCase();
  
                  // Primero limpiar cualquier highlight previo
                  sankeyChart.dispatchAction({ type: 'downplay', seriesIndex: 0 });
                  sankeyChart.dispatchAction({ type: 'unfocusNodeAdjacency', seriesIndex: 0 });
  
                  // Si no hay término de búsqueda, ocultar etiquetas de enlaces
                  if (!term) {
                      hideLinkLabels();
                      return;
                  }
  
                  const option = sankeyChart.getOption();
                  const nodes = option.series[0].data;
  
                  const exactMatchIndex = nodes.findIndex(n => !n.esEspaciador && n.name && n.name.toLowerCase() === term);
                  let idx = exactMatchIndex;
                  if (idx === -1) {
                      idx = nodes.findIndex(n => !n.esEspaciador && n.name && n.name.toLowerCase().includes(term));
                  }
  
                  if (idx === -1) {
                      hideLinkLabels();
                      return;
                  }
  
                  const name = nodes[idx].name;
  
                  // Primero hacer focus en el nodo y sus adyacentes
                  sankeyChart.dispatchAction({
                      type: 'focusNodeAdjacency',
                      seriesIndex: 0,
                      dataIndex: idx
                  });
  
                  // Luego hacer highlight específico del nodo encontrado para mayor visibilidad
                  setTimeout(() => {
                      sankeyChart.dispatchAction({
                          type: 'highlight',
                          seriesIndex: 0,
                          dataIndex: idx
                      });
                  }, 100);
  
                  // Mostrar etiquetas de enlaces para el nodo encontrado
                  showLinkLabels(name);
  
                  // Mejorar la visibilidad de elementos después del filtro
                  setTimeout(() => {
                      improveFilteredVisibility(name);
                  }, 200);
              }
  
              // Función para mejorar la visibilidad después de aplicar filtros
              function improveFilteredVisibility(focusedNodeName) {
                  // Obtener el canvas del gráfico para manipular z-index
                  const zr = sankeyChart.getZr();
                  const storage = zr.storage;
  
                  // Obtener todos los elementos gráficos
                  const displayList = storage.getDisplayList();
  
                  // Separar nodos, enlaces y etiquetas
                  const nodes = displayList.filter(el => el.type === 'rect' || el.type === 'circle');
                  const links = displayList.filter(el => el.type === 'bezierCurve' || el.type === 'line');
                  const labels = displayList.filter(el => el.type === 'text');
  
                  // Reordenar z-index: enlaces primero, luego nodos, luego etiquetas
                  links.forEach((link, index) => {
                      link.z = 1 + index * 0.001; // Enlaces en el fondo
                  });
  
                  nodes.forEach((node, index) => {
                      node.z = 100 + index * 0.001; // Nodos en el medio
                  });
  
                  labels.forEach((label, index) => {
                      label.z = 200 + index * 0.001; // Etiquetas arriba de todo
                  });
  
                  // Forzar re-renderizado
                  zr.refresh();
              }
  
              // Función para asegurar el orden correcto de capas en el gráfico
              function ensureProperLayering() {
                  try {
                      const zr = sankeyChart.getZr();
                      const storage = zr.storage;
                      const displayList = storage.getDisplayList();
  
                      // Clasificar elementos por tipo
                      const links = [];
                      const nodes = [];
                      const labels = [];
  
                      displayList.forEach(el => {
                          if (el.type === 'bezierCurve' || el.type === 'line' || el.type === 'polygon') {
                              links.push(el);
                          } else if (el.type === 'rect' || el.type === 'circle') {
                              nodes.push(el);
                          } else if (el.type === 'text') {
                              labels.push(el);
                          }
                      });
  
                      // Asignar z-index apropiado
                      nodes.forEach((node, index) => {
                          node.z = 1 + index * 0.001;
                      });
  
                      links.forEach((link, index) => {
                          link.z = 100 + index * 0.001;
                      });
  
                      labels.forEach((label, index) => {
                          label.z = 200 + index * 0.001;
                      });
  
                      // Refresh para aplicar cambios
                      zr.refresh();
                  } catch (error) {
                      console.warn('Error al ajustar capas:', error);
                  }
              }
  
              // Función para crear la leyenda des
              // Alias de nombres para mostrar (no cambia claves de datos)
              function getDisplayName(name) {
                  const aliases = {
                      'Plantas de Gas y Fraccionadoras': 'Plantas de Gas y Fracc.'
                  };
                  return aliases[name] || name;
              }
              function createColorLegend() {
                  const legendContainer = document.getElementById('color-legend-content');
                  if (!legendContainer) return;
  
                  // Verificar que el grafico este inicializado
                  if (!sankeyChart) {
                      console.warn('Sankey chart not initialized yet');
                      return;
                  }
  
                  const option = sankeyChart.getOption();
                  if (!option || !option.series || !option.series[0] || !option.series[0].data) {
                      console.warn('Sankey chart data not available yet');
                      return;
                  }
  
                  const colors = window.sankeyConfig.energeticColors;
  
                  // Mantener todos los elementos del grupo, incluso con valor 0.
                  const currentNodes = option.series[0].data || [];
                  const nodesByName = new Map(
                      currentNodes
                          .filter(node => !node.esEspaciador && colors[node.name])
                          .map(node => [node.name, node])
                  );
  
                  legendContainer.innerHTML = '';
                  let legendCounter = 1;
  
                  // Crear leyenda por grupos
                  Object.entries(legendGroups).forEach(([nombreGrupo, energeticosGrupo]) => {
                      // Mostrar todos los elementos del grupo, tengan o no color definido
                      const groupItemsAvailable = energeticosGrupo;
  
                      if (groupItemsAvailable.length === 0) {
                          return;
                      }
  
                      const groupActive = !!activeGroupFilters[nombreGrupo];
  
                      // Crear columna completa para el grupo
                      const grupoColumn = document.createElement('div');
                      grupoColumn.className = 'legend-group-column';
  
                      // Crear titulo del grupo
                      const grupoTitle = document.createElement('button');
                      grupoTitle.type = 'button';
                      grupoTitle.className = `legend-group-title ${groupActive ? 'is-active' : 'is-inactive'}`;
                      grupoTitle.setAttribute('aria-pressed', groupActive ? 'true' : 'false');
                      grupoTitle.textContent = nombreGrupo;
                      grupoTitle.title = 'Click: filtra la columna. Doble click: solo una.';
                      let groupClickTimer;
                      grupoTitle.addEventListener('click', () => {
                          if (groupClickTimer) {
                              clearTimeout(groupClickTimer);
                          }
                          groupClickTimer = setTimeout(() => {
                              toggleGroupActive(nombreGrupo);
                              updateChart(yearSelector.value);
                              createColorLegend();
                              groupClickTimer = null;
                          }, 220);
                      });
                      grupoTitle.addEventListener('dblclick', () => {
                          if (groupClickTimer) {
                              clearTimeout(groupClickTimer);
                              groupClickTimer = null;
                          }
                          setSingleGroupActive(nombreGrupo);
                          updateChart(yearSelector.value);
                          createColorLegend();
                      });
                      grupoColumn.appendChild(grupoTitle);
  
                      // Crear contenedor para los elementos del grupo
                      const grupoContainer = document.createElement('div');
                      grupoContainer.className = 'legend-group-items';
  
                      if (!legendDetailsVisible || !groupActive) {
                          grupoContainer.style.display = 'none';
                      }
  
                      if (legendDetailsVisible && groupActive) {
                          groupItemsAvailable.forEach(energetico => {
                              // Buscar el color primero con el nombre exacto, luego normalizado
                              let color = colors[energetico];
                              if (!color) {
                                  // Intentar buscar normalizando el nombre del energético
                                  const normalized = normalizeLegendKey(energetico);
                                  // Buscar en colors alguna clave que al normalizar coincida
                                  for (const [key, value] of Object.entries(colors)) {
                                      if (normalizeLegendKey(key) === normalized) {
                                          color = value;
                                          break;
                                      }
                                  }
                              }
                              color = color || '#cccccc'; // Color por defecto si no está definido
                              const nodeInfo = nodesByName.get(energetico);
                              const hasData = !!nodeInfo && Number(nodeInfo.value) > 0;
  
                              // No mostrar elementos sin datos
                              if (!hasData) {
                                  return;
                              }
  
                              const exportStyle = hasData ? '' : 'opacity: 0.35; pointer-events: none;';
                              const order = legendCounter++;
  
                              const legendItem = document.createElement('div');
                              legendItem.className = 'legend-item-card';
                              legendItem.dataset.order = order;
                              legendItem.dataset.hasData = hasData ? 'true' : 'false';
  
                              if (!hasData) {
                                  legendItem.title = 'Sin datos para este año';
                              }
  
                              legendItem.innerHTML = `
                                  <div style="
                                      width: 10px;
                                      height: 10px;
                                      background-color: ${color};
                                      border-radius: 3px;
                                      border: 1px solid rgba(0, 0, 0, 0.2);
                                      flex-shrink: 0;
                                  "></div>
                                  <span style="
                                      font-size: 0.65rem;
                                      color: var(--color-gris-oscuro);
                                      font-weight: 500;
                                      line-height: 1.2;
                                  ">${truncateText(getDisplayName(energetico), 25)}</span>
                                  <div class="legend-actions">
                                      <i class="fas fa-info-circle legend-info-btn" data-energetico="${energetico}" title="Ver informacion del energetico"></i>
                                      <i class="fas fa-chart-area legend-main-export-btn" data-energetico="${energetico}" data-order="${order}" style="${exportStyle}" title="Descargar Sankey principal filtrado"></i>
                                      <i class="fas fa-download legend-export-btn" data-energetico="${energetico}" data-order="${order}" style="${exportStyle}" title="Exportar Sub-Sankey detallado"></i>
                                  </div>
                              `;
  
                              // Hover effect handled by CSS class .legend-item-card
  
                              // Agregar funcionalidad de busqueda y mostrar detalles al hacer clic
                              legendItem.addEventListener('click', (e) => {
                                  const energetico = e.currentTarget.querySelector('.legend-info-btn').dataset.energetico;
                                  const itemHasData = e.currentTarget.dataset.hasData === 'true';
                                  if (e.target.classList.contains('legend-info-btn')) {
                                      showNodeInfoModal(energetico);
                                      // Actualizar el subtitulo del Sankey principal
                                      const nodeInfo = allNodes.get(energetico);
                                      if (nodeInfo) {
                                          sankeyChart.setOption({ title: { subtext: `${nodeInfo.name} - Valores en Petajoules (PJ)` } });
                                      }
                                  } else if (e.target.classList.contains('legend-main-export-btn')) {
                                      if (!itemHasData) {
                                          return;
                                      }
                                      const energetico = e.target.dataset.energetico;
                                      const order = parseInt(e.target.dataset.order, 10);
  
                                      // Mostrar indicador de carga
                                      const originalIcon = e.target.className;
                                      e.target.className = 'fas fa-spinner fa-spin legend-main-export-btn';
                                      e.target.style.color = 'var(--color-verde-bandera)';
  
                                      searchInput.value = energetico;
                                      handleSearch();
  
                                      // Descargar sankey principal filtrado despues de aplicar el filtro
                                      setTimeout(() => {
                                          exportChartWithLegendFiltered('png', 4, 'element', energetico, energetico, order);
  
                                          // Restaurar icono original despues de la descarga
                                          setTimeout(() => {
                                              e.target.className = originalIcon;
                                              e.target.style.color = '';
                                          }, 2000);
                                      }, 500);
  
                                      // Actualizar el subtitulo del Sankey principal
                                      const nodeInfo = allNodes.get(energetico);
                                      if (nodeInfo) {
                                          sankeyChart.setOption({ title: { subtext: `${nodeInfo.name} - Valores en Petajoules (PJ)` } });
                                      }
                                  } else if (e.target.classList.contains('legend-export-btn')) {
                                      if (!itemHasData) {
                                          return;
                                      }
                                      const energetico = e.target.dataset.energetico;
                                      const order = parseInt(e.target.dataset.order, 10);
                                      currentLegendOrder = order;
  
                                      // Mostrar indicador de carga
                                      const originalIcon = e.target.className;
                                      e.target.className = 'fas fa-spinner fa-spin legend-export-btn';
                                      e.target.style.color = 'var(--color-guinda)';
  
                                      searchInput.value = energetico;
                                      handleSearch();
  
                                      // Simular clic en nodo para mostrar detalles y sub-sankey
                                      handleNodeClick(energetico);
  
                                      // Abrir modal de exportacion despues de que se cree el sub-sankey
                                      setTimeout(() => {
                                          // Restaurar icono original
                                          e.target.className = originalIcon;
                                          e.target.style.color = '';
  
                                          if (subSankeyChart) {
                                              const modal = document.getElementById('export-modal');
                                              const previewContainer = document.getElementById('export-preview-container');
                                              previewContainer.innerHTML = '';
  
                                              exportSubSankeyWithLegend(true);
                                              modal.style.display = 'block';
                                          } else {
                                              alert('No se pudo generar el Sub-Sankey. Intenta de nuevo.');
                                          }
                                      }, 800);
                                  } else {
                                      searchInput.value = energetico;
                                      handleSearch();
  
                                      // Actualizar el subtitulo del Sankey principal
                                      const nodeInfo = allNodes.get(energetico);
                                      if (nodeInfo) {
                                          sankeyChart.setOption({ title: { subtext: `${nodeInfo.name} - Valores en Petajoules (PJ)` } });
                                      }
                                  }
                              });
  
                              grupoContainer.appendChild(legendItem);
                          });
                      }
  
                      grupoColumn.appendChild(grupoContainer);
                      legendContainer.appendChild(grupoColumn);
                  });
  
                  updateLegendDetailsState();
              }
  
              // Función para exportar gráfico con leyenda
              function exportChartWithLegend(format = 'png', pixelRatio = 3, exportType = 'general', elementName = '', focusedNodeName = null, order = null) {
                  // Primera exportación con fondo blanco
                  exportWithBackground(true, format, pixelRatio, exportType, elementName, focusedNodeName, order);
  
                  // Segunda exportación con fondo transparente
                  setTimeout(() => {
                      const name = order !== null ? elementName : `${elementName}_transparente`;
                      exportWithBackground(false, format, pixelRatio, exportType, name, focusedNodeName, order);
                  }, 1000);
              }
  
              // Función específica para exportar sankey principal filtrado con leyenda de elementos visibles
              function exportChartWithLegendFiltered(format = 'png', pixelRatio = 3, exportType = 'general', elementName = '', focusedNodeName = null, order = null) {
                  // Primera exportación con fondo blanco - pasando el focusedNodeName para filtrar leyenda
                  exportWithBackground(true, format, pixelRatio, exportType, elementName, focusedNodeName, order);
  
                  // Segunda exportación con fondo transparente
                  setTimeout(() => {
                      const name = order !== null ? elementName : `${elementName}_transparente`;
                      exportWithBackground(false, format, pixelRatio, exportType, name, focusedNodeName, order);
                  }, 1000);
              }
  
              function exportWithBackground(useWhiteBackground, format, pixelRatio, exportType, elementName, focusedNodeName, order = null) {
                  new Promise(resolve => {
                      const handler = () => {
                          sankeyChart.off('rendered', handler);
                          resolve();
                      };
                      sankeyChart.on('rendered', handler);
  
                      if (!sankeyChart.isDisposed() && sankeyChart.getOption()) {
                          resolve();
                      }
                  }).then(() => {
                      // Obtener la imagen del gráfico
                      const chartUrl = sankeyChart.getDataURL({
                          type: format,
                          pixelRatio: pixelRatio,
                          backgroundColor: 'rgba(0,0,0,0)' // Always transparent from ECharts
                      });
  
                      // Crear un canvas para combinar gráfico y leyenda
                      const canvas = document.createElement('canvas');
                      const ctx = canvas.getContext('2d');
  
                      // Crear imagen del gráfico
                      const chartImg = new Image();
                      chartImg.onload = function () {
                          // Configurar dimensiones del canvas
                          const chartWidth = chartImg.width;
                          const chartHeight = chartImg.height;
                          const legendHeight = 250 * pixelRatio; // Altura para la leyenda (aumentada para evitar superposición)
                          const padding = 20 * pixelRatio;
  
                          canvas.width = chartWidth;
                          canvas.height = chartHeight + legendHeight + padding;
  
                          // Fondo blanco solo si se solicita
                          if (useWhiteBackground) {
                              ctx.fillStyle = '#ffffff';
                              ctx.fillRect(0, 0, canvas.width, canvas.height);
                          } else {
                              ctx.clearRect(0, 0, canvas.width, canvas.height);
                          }
  
                          // Dibujar el gráfico
                          ctx.drawImage(chartImg, 0, 0);
  
                          // Dibujar la leyenda
                          drawLegendOnCanvas(ctx, 0, chartHeight + padding, chartWidth, legendHeight, pixelRatio, focusedNodeName, useWhiteBackground);
  
                          // Detectar y ajustar solapamiento de etiquetas
                          adjustLabelOverlaps(ctx, pixelRatio);
  
                          // Descargar la imagen combinada
                          const finalUrl = canvas.toDataURL('image/png');
                          const a = document.createElement('a');
                          a.href = finalUrl;
                          a.download = generateFileName(exportType, 'png', elementName, order, useWhiteBackground);
                          a.click();
                      };
                      chartImg.src = chartUrl;
                  });
              }
              function adjustLabelOverlaps(ctx, pixelRatio) {
                  const labelLayouts = sankeyChart.getZr().storage.getDisplayList().filter(el => el.type === 'text');
                  const newLabelPositions = new Map();
  
                  for (let i = 0; i < labelLayouts.length; i++) {
                      const label1 = labelLayouts[i];
                      const rect1 = label1.getBoundingRect();
  
                      for (let j = i + 1; j < labelLayouts.length; j++) {
                          const label2 = labelLayouts[j];
                          const rect2 = label2.getBoundingRect();
  
                          if (rect1.intersect(rect2)) {
                              // Simple strategy: move the second label down
                              const newY = rect2.y + (rect1.height / 2);
                              newLabelPositions.set(label2.dataIndex, { y: newY });
                          }
                      }
                  }
  
                  if (newLabelPositions.size > 0) {
                      const option = sankeyChart.getOption();
                      const series = option.series[0];
                      series.data.forEach((node, index) => {
                          const newPos = newLabelPositions.get(index);
                          if (newPos) {
                              node.label = node.label || {};
                              node.label.y = newPos.y;
                          }
                      });
                      sankeyChart.setOption({ series: [series] });
                  }
              }
  
              function truncateText(text, maxLength) {
                  if (text.length <= maxLength) {
                      return text;
                  }
                  return text.substr(0, maxLength) + '...';
              }
  
              // Función para dibujar la leyenda en el canvas
              function drawLegendOnCanvas(ctx, x, y, width, height, pixelRatio, focusedNodeName = null) {
                  const colors = window.sankeyConfig?.energeticColors || {};
                  const option = sankeyChart.getOption();
                  const series = option?.series?.[0] || {};
                  const currentNodes = Array.isArray(series.data) ? series.data : [];
                  const currentLinksFiltered = Array.isArray(series.links) ? series.links : [];
  
                  // Conjunto de nodos realmente visibles (conectados por enlaces filtrados)
                  const connected = new Set();
                  currentLinksFiltered.forEach(l => { connected.add(l.source); connected.add(l.target); });
  
                  let activeEnergeticos = currentNodes
                      .filter(node => !node.esEspaciador && colors[node.name])
                      .filter(node => connected.has(node.name))
                      .filter(node => typeof activeCategories === 'object' ? !!activeCategories[node.category] : true)
                      .map(node => node.name)
                      .sort();
  
                  if (focusedNodeName) {
                      const connectedToFocus = new Set([focusedNodeName]);
                      currentLinksFiltered.forEach(link => {
                          if (link.source === focusedNodeName) connectedToFocus.add(link.target);
                          if (link.target === focusedNodeName) connectedToFocus.add(link.source);
                      });
                      activeEnergeticos = activeEnergeticos.filter(name => connectedToFocus.has(name));
                  }
  
                  // Configuración de la leyenda con padding mejorado
                  const fontSize = 12 * pixelRatio;
                  const itemHeight = 25 * pixelRatio; // Aumentado para evitar superposición
                  const itemWidth = 220 * pixelRatio; // Aumentado para textos más largos
                  const colorBoxSize = 14 * pixelRatio;
  
                  // Padding mejorado para evitar cortes de texto
                  const legendPadding = {
                      left: 15 * pixelRatio,      // Padding izquierdo aumentado
                      right: 15 * pixelRatio,     // Padding derecho para evitar cortes
                      top: (focusedNodeName ? 80 : 70) * pixelRatio,  // Padding superior aumentado
                      bottom: 40 * pixelRatio     // Padding inferior aumentado
                  };
  
                  // Calcular área disponible considerando el padding
                  const availableWidth = width - legendPadding.left - legendPadding.right;
                  const cols = Math.max(1, Math.floor(availableWidth / itemWidth)); // Asegurar al menos 1 columna
                  const startX = x + legendPadding.left;
                  const startY = y + legendPadding.top;
  
                  // Título de la leyenda
                  ctx.fillStyle = '#6a1c32';
                  ctx.font = `bold ${fontSize + 2}px Arial`;
                  const legendTitle = focusedNodeName ?
                      `Leyenda - Filtrado por: ${focusedNodeName}` :
                      'Leyenda de Energéticos';
                  ctx.fillText(legendTitle, startX, y + 20 * pixelRatio);
  
                  // Agregar información del año cuando está filtrado
                  if (focusedNodeName) {
                      ctx.fillStyle = '#374151';
                      ctx.font = `${fontSize - 1}px Arial`;
                      const yearText = `Año: ${yearSelector.value} | Elementos conectados: ${activeEnergeticos.length}`;
                      ctx.fillText(yearText, startX, y + 35 * pixelRatio);
                  }
  
                  // Función auxiliar para truncar texto si es muy largo
                  function truncateTextForCanvas(text, maxWidth, ctx) {
                      if (ctx.measureText(text).width <= maxWidth) return text;
  
                      let truncated = text;
                      while (ctx.measureText(truncated + '...').width > maxWidth && truncated.length > 0) {
                          truncated = truncated.slice(0, -1);
                      }
                      return truncated + '...';
                  }
  
                  // Dibujar elementos de la leyenda
                  ctx.font = `${fontSize}px Arial`;
                  activeEnergeticos.forEach((energetico, index) => {
                      const color = colors[energetico];
                      const col = index % cols;
                      const row = Math.floor(index / cols);
                      const itemX = startX + col * itemWidth;
                      const itemY = startY + row * itemHeight;
  
                      // Dibujar cuadro de color
                      ctx.fillStyle = color;
                      ctx.fillRect(itemX, itemY - colorBoxSize + 2, colorBoxSize, colorBoxSize);
  
                      // Borde del cuadro
                      ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
                      ctx.lineWidth = 1;
                      ctx.strokeRect(itemX, itemY - colorBoxSize + 2, colorBoxSize, colorBoxSize);
  
                      // Texto del energético (truncado si es necesario)
                      ctx.fillStyle = '#333';
                      const textX = itemX + colorBoxSize + 8 * pixelRatio;
                      const maxTextWidth = itemWidth - colorBoxSize - 16 * pixelRatio; // Espacio disponible para texto
                      const displayText = truncateTextForCanvas(getDisplayName(energetico), maxTextWidth, ctx);
                      ctx.fillText(displayText, textX, itemY);
                  });
  
                  // Nota aclaratoria (siempre al final de la leyenda)
                  const note = '*NOTA: "EP" = Energía Primaria, "ES" = Energía Secundaria y "V.I. y Dif. Est." = Variación de Inventarios y Diferencia Estadística';
                  ctx.fillStyle = '#444';
                  ctx.font = `${fontSize - 1}px Arial`;
                  // Posicionar nota al fondo respetando el padding inferior
                  const noteY = y + height - legendPadding.bottom;
                  ctx.fillText(note, startX, noteY);
              }
  
              function showNodeInfoModal(nodeName) {
                  const nodeInfo = allNodes.get(nodeName);
                  if (!nodeInfo) return;
  
                  const modal = document.createElement('div');
                  modal.className = 'modal';
                  modal.style.display = 'flex';
  
                  const modalContent = document.createElement('div');
                  modalContent.className = 'modal-content';
  
                  const closeBtn = document.createElement('span');
                  closeBtn.className = 'modal-close-btn';
                  closeBtn.innerHTML = '&times;';
                  closeBtn.onclick = () => {
                      modal.style.display = 'none';
                      document.body.removeChild(modal);
                  };
  
                  const title = document.createElement('h3');
                  title.textContent = nodeInfo.name;
  
                  const description = document.createElement('p');
                  description.textContent = nodeInfo.description || 'No hay descripción disponible.';
  
                  modalContent.appendChild(closeBtn);
                  modalContent.appendChild(title);
                  modalContent.appendChild(description);
                  modal.appendChild(modalContent);
                  document.body.appendChild(modal);
              }
  
              // Función para inicializar el gráfico
              function initializeChart() {
                  if (!energyData) return;
  
                  // --- Inicialización de años ---
                  const years = Object.keys(energyData.Datos[0]["Nodos Hijo"][0])
                      .filter(key => !isNaN(key) && key.length === 4)
                      .sort((a, b) => b - a);
  
                  // Limpiar opciones existentes
                  yearSelector.innerHTML = '';
  
                  years.forEach(year => {
                      const option = document.createElement('option');
                      option.value = year;
                      option.textContent = year;
                      yearSelector.appendChild(option);
                  });
  
                  yearSelector.value = years[0];
                  updateChart(years[0]);
                  updateTitle(years[0]); // Actualizar título inicial
  
                  // Esperar a que el gráfico se renderice antes de crear la leyenda
                  setTimeout(() => {
                      renderLegendNew();
                  }, 100);
              }
  
              // Mostrar mensaje de carga
              const loadingMessage = document.createElement('div');
              loadingMessage.id = 'loading-message';
              loadingMessage.innerHTML = '<div style="text-align: center; padding: 2rem; color: var(--color-gris-oscuro);"><div class="loader" style="margin: 0 auto 1rem auto;"></div><p>Cargando datos del Balance Nacional de Energía...</p></div>';
              document.getElementById('chart-container').appendChild(loadingMessage);
  
              // Inicializar cuando los datos estén listos
              waitForData().then((data) => {
                  energyData = data;
                  console.log('Datos cargados correctamente:', energyData);
  
                  // Remover mensaje de carga
                  const loading = document.getElementById('loading-message');
                  if (loading) {
                      loading.remove();
                  }
  
                  initializeChart();
              }).catch((error) => {
                  console.error('Error cargando datos:', error);
                  const loading = document.getElementById('loading-message');
                  if (loading) {
                      loading.innerHTML = '<div style="text-align: center; padding: 2rem; color: var(--color-rojo-bandera);"><p>❌ Error cargando los datos. Por favor, recarga la página.</p></div>';
                  }
              });
              // <<< AÑADIR: render inicial de etiquetas y posicionarlas >>>
              renderColumnLabels();
              updateLabelOverlayPositions();
  
              // Crear leyenda de colores después de que el gráfico esté listo
              setTimeout(() => {
                  createColorLegend();
              }, 200);
  
              // Función para actualizar el título con el año seleccionado
              function updateTitle(year) {
                  const titleElement = document.querySelector('header h1');
                  const pageTitle = document.querySelector('title');
                  if (titleElement) {
                      titleElement.textContent = `Balance Nacional de Energía - ${year}`;
                  }
                  if (pageTitle) {
                      pageTitle.textContent = `Balance Nacional de Energía - ${year}`;
                  }
              }
  
              yearSelector.addEventListener('change', (e) => {
                  currentZoomLevel = 1; // Restablecer zoom al cambiar de año
                  updateChart(e.target.value);
                  updateTitle(e.target.value); // Actualizar título con el año seleccionado
                  searchInput.value = ''; // Clear search input
                  document.getElementById('node-details-container').style.display = 'none'; // Hide details table
                  // Actualizar leyenda de colores después de que el gráfico se actualice
                  setTimeout(() => {
                      createColorLegend();
                  }, 100);
              });
  
  
              // Función auxiliar para generar nombre de archivo consistente
              function generateExportFileName(extension) {
                  const year = yearSelector.value;
                  let fileName = `Balance_Nacional_Energia_${year}`;
  
                  if (hydrocarbonsFilterActive) {
                      fileName += '_Hidrocarburos';
                  }
  
                  return `${fileName}.${extension}`;
              }
  
              document.getElementById('exportar').onclick = function () {
                  let loader;
                  try {
                      loader = showPreloader('Preparando opciones de exportación...');
                      // Guardar el renderizador actual
                      const currentRenderer = sankeyChart.getOption().renderer || 'canvas';
  
                      // Crear un modal para opciones de exportación
                      const modal = document.createElement('div');
                      modal.style.position = 'fixed';
                      modal.style.left = '0';
                      modal.style.top = '0';
                      modal.style.width = '100%';
                      modal.style.height = '100%';
                      modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
                      modal.style.backdropFilter = 'blur(10px)';
                      modal.style.webkitBackdropFilter = 'blur(10px)';
                      modal.style.display = 'flex';
                      modal.style.justifyContent = 'center';
                      modal.style.alignItems = 'center';
                      modal.style.zIndex = '10002';
  
                      const modalContent = document.createElement('div');
                      modalContent.style.backgroundColor = 'white';
                      modalContent.style.padding = '20px';
                      modalContent.style.borderRadius = '12px';
                      modalContent.style.width = '300px';
                      modalContent.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
  
                      modalContent.innerHTML = `
                          <h3 style="margin-top:0;color:var(--primary-color)">Opciones de Exportación</h3>
                          
                          <div style="margin-bottom:15px">
                              <label style="display:block;margin-bottom:5px;font-weight:500">Formato:</label>
                              <select id="export-format" style="width:100%;padding:8px;border-radius:8px;border:1px solid #ccc">
                                  <option value="png" selected>PNG (imagen rasterizada)</option>
                                  <option value="svg">SVG (gráfico vectorial)</option>
                              </select>
                          </div>
                          
                          <div id="resolution-option" style="margin-bottom:15px">
                              <label style="display:block;margin-bottom:5px;font-weight:500">Resolución:</label>
                              <select id="png-resolution" style="width:100%;padding:8px;border-radius:8px;border:1px solid #ccc">
                                  <option value="2">Normal (2x)</option>
                                  <option value="3" selected>Alta (3x)</option>
                                  <option value="4">Muy alta (4x)</option>
                                  <option value="5">Ultra alta (5x)</option>
                              </select>
                          </div>
                          
                          <div style="margin-bottom:20px">
                              <label style="display:block;margin-bottom:5px;font-weight:500">Fondo:</label>
                              <select id="export-background" style="width:100%;padding:8px;border-radius:8px;border:1px solid #ccc">
                                  <option value="#ffffff" selected>Blanco</option>
                                  <option value="transparent">Transparente</option>
                              </select>
                          </div>
                          
                          <div style="display:flex;justify-content:space-between">
                              <button id="cancel-export" style="padding:8px 15px;border:none;border-radius:8px;background:#f0f0f0;cursor:pointer">Cancelar</button>
                              <button id="confirm-export" style="padding:8px 15px;border:none;border-radius:8px;background:var(--primary-color);color:white;cursor:pointer">Descargar</button>
                          </div>
                      `;
  
                      modal.appendChild(modalContent);
                      document.body.appendChild(modal);
  
                      // Mostrar/ocultar opciones de resolución según el formato
                      document.getElementById('export-format').addEventListener('change', function () {
                          const resolutionOption = document.getElementById('resolution-option');
                          resolutionOption.style.display = this.value === 'png' ? 'block' : 'none';
                      });
  
                      // Manejar cancelación
                      document.getElementById('cancel-export').onclick = function () {
                          document.body.removeChild(modal);
                          loader.complete();
                      };
  
                      // Manejar confirmación y descarga
                      document.getElementById('confirm-export').onclick = function () {
                          const format = document.getElementById('export-format').value;
                          const background = document.getElementById('export-background').value;
                          // Guardar las opciones actuales antes de cualquier cambio (para restaurar luego)
                          const currentOptions = sankeyChart.getOption();
  
                          if (format === 'png') {
                              // Asegurar renderizador canvas (requerido para combinar en un <canvas>)
                              if (currentRenderer !== 'canvas') {
                                  sankeyChart.dispose();
                                  const newChart = echarts.init(chartDom, null, { renderer: 'canvas' });
                                  newChart.setOption(currentOptions);
                                  sankeyChart = newChart;
                              }
  
                              const resolution = parseInt(document.getElementById('png-resolution').value, 10);
                              const chartUrl = sankeyChart.getDataURL({
                                  type: 'png',
                                  pixelRatio: resolution,
                                  backgroundColor: background === 'transparent' ? 'rgba(0,0,0,0)' : background
                              });
  
                              const img = new Image();
                              img.onload = () => {
                                  const chartW = img.width;
                                  const chartH = img.height;
  
                                  // Determinar energéticos activos y conectados (misma lógica que drawLegendOnCanvas)
                                  const colors = window.sankeyConfig?.energeticColors || {};
                                  const option = sankeyChart.getOption();
                                  const series = option?.series?.[0] || {};
                                  const dataNodes = Array.isArray(series.data) ? series.data : [];
                                  const linksFiltered = Array.isArray(series.links) ? series.links : [];
                                  const connected = new Set();
                                  linksFiltered.forEach(l => { connected.add(l.source); connected.add(l.target); });
                                  const activeNodes = dataNodes
                                      .filter(n => !n.esEspaciador && colors[n.name])
                                      .filter(n => connected.has(n.name))
                                      .filter(n => typeof activeCategories === 'object' ? !!activeCategories[n.category] : true)
                                      .map(n => n.name)
                                      .sort();
  
                                  // Calcular alto dinámico para la leyenda según nº de elementos (actualizado para coincidir con drawLegendOnCanvas)
                                  const itemWidth = 220 * resolution; // igual que en drawLegendOnCanvas
                                  const itemsPerRow = Math.max(1, Math.floor(chartW / itemWidth));
                                  const rows = Math.ceil(activeNodes.length / itemsPerRow);
                                  const baseTop = 70 * resolution; // espacio para título dentro de drawLegendOnCanvas (actualizado)
                                  const rowHeight = 25 * resolution; // altura por fila (coincide con drawLegendOnCanvas - actualizado)
                                  // +80*resolution para garantizar espacio de la nota explicativa añadida al final
                                  const legendInnerHeight = baseTop + rows * rowHeight + 80 * resolution; // margen inferior extra + nota (aumentado)
                                  const padding = 20 * resolution;
  
                                  const canvas = document.createElement('canvas');
                                  canvas.width = chartW;
                                  canvas.height = chartH + legendInnerHeight + padding;
                                  const ctx = canvas.getContext('2d');
  
                                  if (background !== 'transparent') {
                                      ctx.fillStyle = '#ffffff';
                                      ctx.fillRect(0, 0, canvas.width, canvas.height);
                                  } else {
                                      ctx.clearRect(0, 0, canvas.width, canvas.height);
                                  }
  
                                  // Dibuja el gráfico primero
                                  ctx.drawImage(img, 0, 0);
  
                                  // Dibuja la leyenda reutilizando función existente
                                  try {
                                      drawLegendOnCanvas(
                                          ctx,
                                          0,
                                          chartH + padding / 2,
                                          chartW,
                                          legendInnerHeight,
                                          resolution,
                                          null // sin nodo enfocado
                                      );
                                  } catch (e) {
                                      console.warn('No se pudo dibujar la leyenda en el canvas, se exportará solo el gráfico.', e);
                                  }
  
                                  const finalUrl = canvas.toDataURL('image/png');
                                  const a = document.createElement('a');
                                  a.href = finalUrl;
                                  a.download = generateExportFileName('png');
                                  a.click();
  
                                  // Restaurar renderer original si fue temporal
                                  if (currentRenderer !== 'canvas') {
                                      sankeyChart.dispose();
                                      const originalChart = echarts.init(chartDom, null, { renderer: currentRenderer });
                                      originalChart.setOption(currentOptions);
                                      sankeyChart = originalChart;
                                  }
  
                                  document.body.removeChild(modal);
                                  if (loader) loader.complete();
                              };
                              img.onerror = () => {
                                  alert('Error cargando imagen para exportar.');
                                  document.body.removeChild(modal);
                                  if (loader) loader.complete();
                              };
                              img.src = chartUrl;
                          } else {
                              // Exportación SVG (sin combinación manual de leyenda en canvas)
                              if (currentRenderer !== 'svg') {
                                  sankeyChart.dispose();
                                  const newChart = echarts.init(chartDom, null, { renderer: 'svg' });
                                  newChart.setOption(currentOptions);
                                  sankeyChart = newChart;
                              }
  
                              const url = sankeyChart.getDataURL({
                                  type: 'svg',
                                  backgroundColor: background === 'transparent' ? 'rgba(0,0,0,0)' : background
                              });
                              const a = document.createElement('a');
                              a.href = url;
                              a.download = generateExportFileName('svg');
                              a.click();
  
                              // Restaurar renderer original si fue temporal
                              if (currentRenderer !== 'svg') {
                                  sankeyChart.dispose();
                                  const originalChart = echarts.init(chartDom, null, { renderer: currentRenderer });
                                  originalChart.setOption(currentOptions);
                                  sankeyChart = originalChart;
                              }
  
                              document.body.removeChild(modal);
                              if (loader) loader.complete();
                          }
                      }; // Cierre de onclick
                  } catch (error) { // Cierre del bloque try
                      console.error('Error al exportar:', error);
                      alert('Ocurrió un error al exportar la imagen. Por favor intente nuevamente.');
                      if (loader) loader.complete();
                  }
              };
  
              document.getElementById('export-svg').onclick = function () {
                  let loader;
                  try {
                      loader = showPreloader('Generando archivo SVG...');
                      const url = sankeyChart.getDataURL({ type: 'svg', backgroundColor: '#fff' });
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = generateExportFileName('svg');
                      a.click();
                  } catch (error) {
                      console.error('Error al exportar SVG:', error);
                      alert('Error al exportar el archivo SVG. Por favor intente nuevamente.');
                  } finally {
                      if (loader) loader.complete();
                  }
              };
              document.getElementById('export-csv').onclick = function () {
                  let loader;
                  try {
                      loader = showPreloader('Generando archivo CSV...');
                      const rows = currentLinks.map(l => {
                          const cat = allNodes.get(l.source) ? allNodes.get(l.source).category : '';
                          return `"${l.source}","${l.target}",${l.value},${yearSelector.value},"${cat}","${l.lineStyle?.color || '#999'}"`;
                      });
                      const csv = 'source,target,value,year,category,color\n' + rows.join('\n');
                      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                      const a = document.createElement('a');
                      const url = URL.createObjectURL(blob);
                      a.href = url;
                      a.download = generateExportFileName('csv');
                      a.click();
                      setTimeout(() => URL.revokeObjectURL(url), 100);
                  } catch (error) {
                      console.error('Error al exportar CSV:', error);
                      alert('Error al exportar el archivo CSV. Por favor intente nuevamente.');
                  } finally {
                      if (loader) loader.complete();
                  }
              };
  
              // Evento para el botón de exportar Sub-Sankey
              const exportSubSankeyBtn = document.getElementById('export-sub-sankey');
              if (exportSubSankeyBtn) {
                  exportSubSankeyBtn.addEventListener('click', function () {
                      if (subSankeyChart) {
                          // Mostrar modal de exportación para Sub-Sankey
                          // Si existe función para exportar directamente:
                          if (typeof exportSubSankeyWithLegend === 'function') {
                              exportSubSankeyWithLegend(true);
                          } else {
                              alert('La función de exportación no está disponible.');
                          }
                      } else {
                          alert('No hay un gráfico detallado disponible para exportar.');
                      }
                  });
              }
  
              let subSankeyChart = null; // Variable para el gráfico hijo
  
              // Función para limpiar nombres de archivo preservando acentos
              // Ejemplo: "Energía Eléctrica" → "Energía_Eléctrica"
              // Ejemplo: "Petróleo/Gas" → "Petróleo_Gas"
              function cleanFileName(text) {
                  return text
                      .replace(/[<>:"/\\|?*]/g, '_') // Solo reemplazar caracteres realmente problemáticos para archivos
                      .replace(/ /g, '_') // Espacios por guiones bajos
                      .replace(/_+/g, '_') // Múltiples guiones bajos por uno solo
                      .replace(/^_|_$/g, ''); // Quitar guiones bajos al inicio y final
              }
  
              // Función para generar nombres de archivo dinámicos
              function generateExportFileName(extension) { // Renombrado de generateFileName para evitar conflicto
                  const year = yearSelector.value;
                  let fileName = `BNE_${year}`;
  
                  // Si estamos en vista detallada
                  if (subSankeyChart && document.getElementById('sub-sankey-container').style.display !== 'none') {
                      const subtitle = document.getElementById('sub-sankey-subtitle').textContent;
                      if (subtitle) {
                          const parts = subtitle.split('-');
                          if (parts.length > 0) {
                              fileName += `_Detalle_${cleanFileName(parts[0].trim())}`;
                          }
                      }
                  }
                  // Si hay un nodo enfocado
                  else if (focusedNodeIndex !== null && focusMode) {
                      const option = sankeyChart.getOption();
                      if (option && option.series && option.series[0] && option.series[0].data) {
                          const focusedNode = option.series[0].data[focusedNodeIndex];
                          if (focusedNode && !focusedNode.name.includes('SPACER')) {
                              fileName += `_${cleanFileName(focusedNode.name)}`;
                          }
                      }
                  }
                  // Si hay búsqueda activa
                  else {
                      const searchInput = document.getElementById('search-input');
                      if (searchInput && searchInput.value.trim()) {
                          fileName += `_${cleanFileName(searchInput.value.trim())}`;
                      }
                  }
  
                  return `${fileName}.${extension}`;
              }
  
              sankeyChart.on('click', function (params) {
                  console.log('Click en Sankey:', params);
  
                  if (focusMode) {
                      // Modo fijar foco activado
                      if (params.dataType === 'node' && !params.name.startsWith('SPACER') && !params.name.includes('SPACER')) {
                          if (focusedNodeIndex === params.dataIndex) {
                              // Si hacemos clic en el mismo nodo, lo deseleccionamos
                              sankeyChart.dispatchAction({ type: 'unfocusNodeAdjacency', seriesIndex: 0 });
                              sankeyChart.dispatchAction({ type: 'downplay', seriesIndex: 0 });
                              focusedNodeIndex = null;
  
                              // Ocultar información del nodo
                              hideFocusNodeInfo();
  
                              // Ocultar también las tablas de detalles
                              document.getElementById('node-details-container').style.display = 'none';
                              document.getElementById('sub-sankey-container').style.display = 'none';
  
                              // Restaurar el subtitulo
                              sankeyChart.setOption({ title: { subtext: 'Valores en Petajoules (PJ)' } });
  
                              console.log('Nodo deseleccionado');
                              return;
                          } else {
                              // Seleccionar nuevo nodo
                              sankeyChart.dispatchAction({ type: 'downplay', seriesIndex: 0 });
  
                              // Aplicar highlight al nodo seleccionado
                              sankeyChart.dispatchAction({
                                  type: 'highlight',
                                  seriesIndex: 0,
                                  name: params.name
                              });
  
                              focusedNodeIndex = params.dataIndex;
  
                              // Mostrar información del nodo
                              showFocusNodeInfo(params.name);
  
                              // Actualizar el subtitulo
                              const nodeInfo = allNodes.get(params.name);
                              if (nodeInfo) {
                                  sankeyChart.setOption({ title: { subtext: `${params.name} - Valores en Petajoules (PJ)` } });
                              }
  
                              console.log('Nodo seleccionado:', params.name, 'dataIndex:', params.dataIndex);
  
                              // En modo focus, continuar para mostrar también las tablas de detalles
                              // No hacer return aquí para que se ejecute el código de las tablas
                          }
                      } else {
                          // Click fuera de un nodo válido, deseleccionar todo
                          sankeyChart.dispatchAction({ type: 'unfocusNodeAdjacency', seriesIndex: 0 });
                          sankeyChart.dispatchAction({ type: 'downplay', seriesIndex: 0 });
                          focusedNodeIndex = null;
  
                          // Ocultar información del nodo
                          hideFocusNodeInfo();
  
                          // Ocultar también las tablas de detalles
                          document.getElementById('node-details-container').style.display = 'none';
                          document.getElementById('sub-sankey-container').style.display = 'none';
  
                          // Restaurar el subtitulo
                          sankeyChart.setOption({ title: { subtext: 'Valores en Petajoules (PJ)' } });
  
                          console.log('Deselección por click fuera');
                          return;
                      }
                  }
                  if (params.dataType === 'node' && !params.name.startsWith('SPACER') && !params.name.includes('SPACER')) {
                      const nodeInfo = allNodes.get(params.name);
  
                      if (nodeInfo) {
                          console.log('Displaying node details for:', nodeInfo.name);
  
                          const valuesContainer = document.getElementById('node-details-container'); // Corrected target to container
                          valuesContainer.innerHTML = '<div class="loader mx-auto"></div>'; // Mostrar preloader
                          valuesContainer.classList.remove('hidden');
                          valuesContainer.style.display = 'block';
  
  
                          // Usar setTimeout para permitir que el preloader se renderice antes de la carga pesada
                          setTimeout(() => {
                              const clickedNodeName = params.name;
                              const selectedYear = yearSelector.value;
  
                              const inflows = currentLinks.filter(link => link.target === clickedNodeName);
                              const outflows = currentLinks.filter(link => link.source === clickedNodeName);
  
                              // --- Build 3-Column Layout ---
  
                              // --- Inflow Card (Left, Guinda Header) ---
                              let inflowHtml = '<div class="bg-white rounded-xl shadow-lg border-0 overflow-hidden h-full flex flex-col transition-all hover:shadow-xl group">';
                              if (inflows.length > 0) {
                                  inflowHtml += `
                                  <div class="px-6 py-4 bg-[#9E2A2F] text-white flex justify-between items-center relative overflow-hidden">
                                      <div class="relative z-10 flex items-center gap-2">
                                          <h4 class="text-sm font-bold uppercase tracking-wider">Flujos de Entrada</h4>
                                      </div>
                                      <div class="relative z-10 opacity-80"><i class="fas fa-sign-in-alt text-lg"></i></div>
                                      <div class="absolute right-0 top-0 h-full w-20 bg-white/10 skew-x-12 transform translate-x-10"></div>
                                  </div>`;
                                  inflowHtml += '<div class="flex-1 overflow-x-auto p-0">';
                                  inflowHtml += '<table id="inflow-table" class="min-w-full divide-y divide-gray-100">';
                                  inflowHtml += '<thead class="bg-gray-50 text-gray-500"><tr><th scope="col" class="py-4 pl-6 pr-3 text-left text-[10px] font-bold uppercase tracking-widest w-8"></th><th scope="col" class="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-widest w-full">Desde</th><th scope="col" class="px-6 py-4 text-right text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">Valor (PJ)</th><th scope="col" class="px-6 py-4 text-center text-[10px] font-bold uppercase tracking-widest w-24">Historial</th></tr></thead>';
                                  inflowHtml += '<tbody class="divide-y divide-gray-50 bg-white">';
                                  inflows.forEach((link, index) => {
                                      const sourceColor = window.sankeyConfig.energeticColors[link.source] || '#888';
                                      const percentage = (link.value / nodeInfo.inflow) * 100;
                                      inflowHtml += `<tr class="hover:bg-red-50/30 transition-colors group">
                                          <td class="whitespace-nowrap py-4 pl-6 pr-3 text-xs font-medium"><div class="relative flex items-center justify-center"><input type="checkbox" class="peer appearance-none h-5 w-5 border-2 border-gray-300 rounded-full bg-white checked:bg-[#9E2A2F] checked:border-[#9E2A2F] transition-all cursor-pointer flow-check" data-value="${link.value}"></div></td>
                                          <td class="px-6 py-4 text-sm text-gray-700 font-medium w-full group-hover:text-[#9E2A2F] transition-colors"><div class="flex items-center gap-3"><span class="w-1.5 h-1.5 rounded-full" style="background-color:${sourceColor}"></span>${link.source}</div></td>
                                          <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-900 font-mono text-right font-bold">${formatNumber(link.value)}</td>
                                          <td class="whitespace-nowrap px-6 py-4 text-center"><div id="sparkline-in-${index}" class="sparkline-container h-6 w-20 mx-auto opacity-70 group-hover:opacity-100 transition-opacity" data-source="${link.source}" data-target="${clickedNodeName}"></div></td>
                                      </tr>`;
                                  });
                                  inflowHtml += `</tbody><tfoot class="bg-red-50/20 text-sm border-t border-red-100">
                                  <tr><td colspan="2" class="py-4 pl-6 text-gray-600 font-bold">Total Entradas</td><td class="py-4 px-6 text-right text-gray-900 font-bold">${formatNumber(nodeInfo.inflow)}</td><td></td></tr>
                                  <tr class="hidden selection-row"><td colspan="2" class="py-2 pl-6 text-[#9E2A2F] font-medium">Subtotal Seleccionado</td><td class="py-2 px-6 text-right text-[#9E2A2F] font-bold subtotal">0.00 PJ</td><td></td></tr>
                                  <tr><td colspan="4" class="p-4"><label class="flex items-center gap-3 text-xs text-gray-500 cursor-pointer hover:text-[#9E2A2F] transition-colors p-2 rounded-lg hover:bg-red-50 border border-transparent hover:border-red-100"><div class="relative flex items-center justify-center"><input type="checkbox" class="peer appearance-none h-4 w-4 border border-gray-300 rounded bg-white checked:bg-[#9E2A2F] checked:border-[#9E2A2F] transition-all cross-sum"></div> <span class="uppercase tracking-wide font-bold">Sumar selección en 'Salidas'</span></label></td></tr>
                                  </tfoot></table></div>`;
                              } else {
                                  inflowHtml += '<div class="p-8 h-full flex flex-col justify-center items-center text-center text-gray-400"><i class="fas fa-inbox text-4xl mb-3 opacity-20"></i><p class="text-sm font-medium">No hay flujos de entrada</p></div>';
                              }
                              inflowHtml += '</div>';
  
                              // Column 2: Center Info Card (Split Layout)
                              let infoHtml = `
                              <div class="flex flex-col h-full gap-6">
                                  <!-- Top Card: Description & Context -->
                                  <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex-1 relative overflow-hidden group hover:shadow-md transition-all">
                                      <div class="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                                          <i class="fas fa-gas-pump text-9xl text-gray-900 transform -rotate-12 translate-x-4 -translate-y-4"></i>
                                      </div>
                                      
                                      <div class="relative z-10">
                                          <div class="flex items-center gap-4 mb-2">
                                              <h2 class="text-3xl font-bold text-[#9E2A2F] tracking-tight">${nodeInfo.name}</h2>
                                          </div>
                                          
                                          <div class="mb-6 flex items-center">
                                              <span class="text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-gray-100 px-3 py-1 rounded-full">TIPO: <span class="text-gray-800">${nodeInfo.tipo || 'N/A'}</span></span>
                                          </div>
  
                                          <div class="border-l-4 border-[#9E2A2F] pl-6 py-1">
                                              <h5 class="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2"><div class="w-1 h-4 bg-[#9E2A2F] rounded-full hidden"></div>Descripción</h5>
                                              <p class="text-gray-600 text-sm leading-relaxed font-body text-justify italic">
                                                  "${nodeInfo.description || 'No hay descripción disponible para este nodo.'}"
                                              </p>
                                          </div>
                                      </div>
                                  </div>
  
                                  <!-- Bottom Row: Key Stats Cards -->
                                  <div class="grid grid-cols-1 xl:grid-cols-3 gap-4">
                                      <!-- Entrada -->
                                      <div class="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden group hover:shadow-md transition-all hover:-translate-y-1">
                                          <div class="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 w-1/3 mx-auto rounded-t-full"></div>
                                          <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Entrada</span>
                                          <div class="text-2xl font-bold text-gray-900 font-mono tracking-tight">${formatNumber(nodeInfo.inflow)} <span class="text-xs text-gray-400 font-normal">PJ</span></div>
                                      </div>
  
                                      <!-- Salida -->
                                      <div class="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden group hover:shadow-md transition-all hover:-translate-y-1">
                                          <div class="absolute bottom-0 left-0 right-0 h-1 bg-[#9E2A2F] w-1/3 mx-auto rounded-t-full"></div>
                                          <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Salida</span>
                                          <div class="text-2xl font-bold text-gray-900 font-mono tracking-tight">${formatNumber(nodeInfo.outflow)} <span class="text-xs text-gray-400 font-normal">PJ</span></div>
                                      </div>
  
                                      <!-- Balance -->
                                      <div class="bg-[#FFF5F5] p-5 rounded-xl border border-red-100 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden group hover:shadow-md transition-all">
                                          <span class="text-[10px] font-bold text-[#9E2A2F] uppercase tracking-widest mb-2">Balance Neto</span>
                                          <div class="text-2xl font-bold text-[#9E2A2F] font-mono tracking-tight">${formatNumber(nodeInfo.inflow - nodeInfo.outflow)} <span class="text-xs text-red-300 font-normal">PJ</span></div>
                                          <div class="mt-2 flex items-center gap-1 text-[10px] text-gray-500 font-medium">
                                              <i class="fas fa-check-circle text-green-500"></i> Validado
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              `;
  
                              // Column 3: Outflow Card
                              let outflowHtml = '';
                              if (outflows.length > 0) {
                                  outflowHtml += '<div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-full flex flex-col">';
                                  outflowHtml += '<div class="px-6 py-4 border-b border-gray-100 bg-gray-50/50"><h4 class="text-sm font-headings font-bold text-gray-800 uppercase tracking-wide">Flujos de Salida</h4></div>';
                                  outflowHtml += '<div class="flex-1 overflow-x-auto">';
                                  outflowHtml += '<table id="outflow-table" class="min-w-full divide-y divide-gray-200">';
                                  outflowHtml += '<thead class="bg-gobmx-guinda text-white"><tr><th scope="col" class="py-3 pl-6 pr-3 text-left text-xs font-bold uppercase tracking-wider w-8"><input type="checkbox" class="select-all rounded border-white text-gobmx-guinda focus:ring-offset-gobmx-guinda" style="color: #691C32;"></th><th scope="col" class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider w-full">Hacia</th><th scope="col" class="px-6 py-3 text-right text-xs font-bold uppercase tracking-wider whitespace-nowrap">Valor (PJ)</th><th scope="col" class="px-6 py-3 text-center text-xs font-bold uppercase tracking-wider w-24">Historial</th></tr></thead>';
                                  outflowHtml += '<tbody class="divide-y divide-gray-100 bg-white">';
                                  outflows.forEach((link, index) => {
                                      const targetColor = window.sankeyConfig.energeticColors[link.target] || '#888';
                                      const percentage = (link.value / nodeInfo.outflow) * 100;
                                      outflowHtml += `<tr class="hover:bg-gray-50 transition-colors group">
                                          <td class="whitespace-nowrap py-3 pl-6 pr-3 text-xs font-medium"><input type="checkbox" class="flow-check rounded border-gray-300 text-gobmx-guinda focus:ring-gobmx-guinda" data-value="${link.value}"></td>
                                          <td class="px-6 py-3 text-xs text-gray-600 font-medium w-full"><div class="flex items-center gap-2"><div class="w-1 h-4 rounded-sm" style="background-color:${targetColor}"></div>${link.target} <i class="fas fa-chevron-right text-gray-300 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"></i></div></td>
                                          <td class="relative whitespace-nowrap px-6 py-3 text-xs text-gray-800 font-mono text-right font-bold overflow-hidden">
                                              <div class="absolute inset-y-0 left-0 bg-gobmx-guinda opacity-10 transition-all duration-500 ease-out" style="width: ${percentage}%"></div>
                                              <div class="relative z-10">${formatNumber(link.value)}</div>
                                          </td>
                                          <td class="whitespace-nowrap px-6 py-3 text-xs text-center"><div id="sparkline-out-${index}" class="sparkline-container h-6 w-20 mx-auto" data-source="${clickedNodeName}" data-target="${link.target}"></div></td>
                                      </tr> `;
                                  });
                                  outflowHtml += `</tbody> <tfoot class="bg-gray-50/80 font-bold text-xs">
                                  <tr><td colspan="2" class="py-3 pl-6 pr-6 text-gray-700">Total Salidas</td><td class="py-3 px-6 text-right text-gray-800">${formatNumber(nodeInfo.outflow)}</td><td></td></tr>
                                  <tr><td colspan="2" class="py-2 pl-6 pr-6 text-gobmx-guinda">Subtotal Seleccionado</td><td class="py-2 px-6 text-right text-gobmx-guinda subtotal">0.00 PJ</td><td></td></tr>
                                  <tr><td colspan="2" class="py-2 pl-6 pr-6 text-gray-400 font-normal">Total No Seleccionado</td><td class="py-2 px-6 text-right text-gray-400 font-normal unselected-total">${formatNumber(nodeInfo.outflow)}</td><td></td></tr>
                                  <tr><td colspan="4" class="py-3 px-6 bg-gray-50 border-t border-gray-100"><label class="flex items-center gap-2 text-[10px] text-gray-500 cursor-pointer hover:text-gray-700 uppercase tracking-wide"><input type="checkbox" class="cross-sum rounded border-gray-300 text-gobmx-guinda focus:ring-gobmx-guinda"> Sumar selección en 'Entradas'</label></td></tr>
                              </tfoot></table></div></div> `;
                              } else {
                                  outflowHtml += '<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full flex flex-col justify-center items-center text-center"><h4 class="text-sm font-headings font-bold text-gray-400 mb-2">Flujos de Salida</h4><p class="text-gray-300 text-xs italic">No hay flujos registrados.</p></div>';
                              }
  
                              // Assemble Grid
                              // Premium Layout: Flex row for equal heights, Gap-8 for spacing
                              const gridHtml = `<div class="flex flex-col md:flex-row gap-8 items-stretch mb-10">
                                  <div class="flex-1 w-full min-w-0 transition-all duration-300 hover:shadow-md h-full">${inflowHtml}</div>
                                  <div class="flex-1 w-full min-w-0 order-first md:order-none transition-all duration-300 hover:shadow-md h-full">${infoHtml}</div>
                                  <div class="flex-1 w-full min-w-0 transition-all duration-300 hover:shadow-md h-full">${outflowHtml}</div>
                              </div> `;
  
                              // Update container
                              valuesContainer.innerHTML = gridHtml;
  
                              // --- Parent Nodes Table (Dark Header, Minimalist) ---
                              const parentNodesContainer = document.createElement('div');
                              parentNodesContainer.className = "bg-white rounded-xl shadow-lg border-0 overflow-hidden mt-10 mb-10 transition-all hover:shadow-xl group";
  
                              // 1. Dark Card Header
                              const headerDiv = document.createElement('div');
                              headerDiv.className = "px-8 py-5 bg-gray-900 text-white flex justify-between items-center";
                              headerDiv.innerHTML = `
                                  <h3 class="text-sm font-bold uppercase tracking-widest flex items-center gap-3" >
                                      <span class="w-1 h-4 bg-[#9E2A2F] rounded-full"></span>
                                      Participación del Energético en la Cadena de Valor
                                  </h3>
                                  <div class="flex gap-4 text-gray-400">
                                      <button class="hover:text-white transition-colors"><i class="fas fa-info-circle"></i></button>
                                      <button class="hover:text-white transition-colors"><i class="fas fa-download"></i></button>
                                  </div>
                              `;
                              parentNodesContainer.appendChild(headerDiv);
  
                              // 2. Minimalist Table
                              const parentTable = document.createElement('div');
                              parentTable.className = "p-0"; // No padding on container to let table stretch
                              parentTable.innerHTML = `<table class="min-w-full divide-y divide-gray-100" >
                                  <thead class="bg-gray-50 text-gray-500">
                                      <tr>
                                          <th scope="col" class="px-8 py-5 text-left text-[10px] font-bold uppercase tracking-widest w-full">Energético Padre / Fuente</th>
                                          <th scope="col" class="px-8 py-5 text-right text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">Valor (PJ)</th>
                                          <th scope="col" class="px-8 py-5 text-center text-[10px] font-bold uppercase tracking-widest w-32">Historial 2018-2024</th>
                                      </tr>
                                  </thead>
                                  <tbody class="divide-y divide-gray-50 bg-white"></tbody>
                              </table> `;
  
                              const tbody = parentTable.querySelector('tbody');
                              let parentRows = 0;
  
                              window.energyData.Datos.forEach((parentData, index) => {
                                  const parentName = parentData["Nodo Padre"];
                                  const childEnergetic = parentData["Nodos Hijo"].find(hijo => hijo["Nodo Hijo"] === clickedNodeName);
                                  if (childEnergetic && childEnergetic[selectedYear] !== undefined && childEnergetic[selectedYear] !== null) {
                                      const percentage = nodeInfo.inflow ? (childEnergetic[selectedYear] / nodeInfo.inflow) * 100 : 0;
                                      const row = tbody.insertRow();
                                      row.className = "hover:bg-gray-50 transition-colors group";
                                      // Row Styling: Red bullet, gray text, bold numbers
                                      row.innerHTML = `
                                  <td class="px-8 py-6 text-sm w-full" >
                                      <div class="flex items-center gap-4">
                                          <div class="w-2 h-2 rounded-full bg-red-100 border border-[#9E2A2F]"></div>
                                          <span class="text-[#9E2A2F] font-bold">${parentName}</span>
                                          <i class="fas fa-arrow-right text-gray-300 text-xs mx-2"></i>
                                      </div>
                                          </td>
                                          <td class="whitespace-nowrap px-8 py-6 text-right">
                                              <div class="flex flex-col items-end">
                                                  <span class="text-xl font-bold text-gray-900 font-mono tracking-tight">${formatNumber(childEnergetic[selectedYear])}</span>
                                                  <span class="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Petajoules</span>
                                              </div>
                                          </td>
                                          <td class="whitespace-nowrap px-8 py-6 text-center">
                                              <div id="sparkline-parent-${index}" class="sparkline-container h-8 w-24 mx-auto" data-source="${parentName}" data-target="${clickedNodeName}"></div>
                                          </td>
                              `;
                                      parentRows++;
                                  }
                              });
  
                              // valuesContainer.innerHTML = detailsHtml; // Removed to prevent overwrite and error
                              valuesContainer.insertAdjacentHTML('beforeend', '<div id="selected-balance-container" class="mt-8 pt-6 border-t border-dashed border-gray-300"></div>');
  
                              if (parentRows > 0) {
                                  parentNodesContainer.appendChild(parentTable);
                                  valuesContainer.appendChild(parentNodesContainer);
                              }
                              const inflowTable = document.getElementById('inflow-table');
                              const outflowTable = document.getElementById('outflow-table');
  
                              function updateAllSubtotals(nodeInfo) {
                                  let inflowSelectedSum = 0;
                                  if (inflowTable) {
                                      inflowTable.querySelectorAll('.flow-check:checked').forEach(cb => inflowSelectedSum += parseFloat(cb.dataset.value));
                                  }
  
                                  let outflowSelectedSum = 0;
                                  if (outflowTable) {
                                      outflowTable.querySelectorAll('.flow-check:checked').forEach(cb => outflowSelectedSum += parseFloat(cb.dataset.value));
                                  }
  
                                  const sumInflowToOutflow = inflowTable ? inflowTable.querySelector('.cross-sum').checked : false;
                                  const sumOutflowToInflow = outflowTable ? outflowTable.querySelector('.cross-sum').checked : false;
  
                                  const finalInflowSubtotal = (sumOutflowToInflow ? outflowSelectedSum : 0) + inflowSelectedSum;
                                  const finalOutflowSubtotal = (sumInflowToOutflow ? inflowSelectedSum : 0) + outflowSelectedSum;
  
                                  const totalInflowValue = parseFloat(nodeInfo.inflow);
                                  const totalOutflowValue = parseFloat(nodeInfo.outflow);
  
                                  if (inflowTable) {
                                      inflowTable.querySelector('.subtotal').textContent = formatNumber(finalInflowSubtotal);
                                      inflowTable.querySelector('.unselected-total').textContent = formatNumber(totalInflowValue - inflowSelectedSum);
                                  }
                                  if (outflowTable) {
                                      outflowTable.querySelector('.subtotal').textContent = formatNumber(finalOutflowSubtotal);
                                      outflowTable.querySelector('.unselected-total').textContent = formatNumber(totalOutflowValue - outflowSelectedSum);
                                  }
  
                                  const selectedBalanceContainer = document.getElementById('selected-balance-container');
                                  const selectedBalance = finalInflowSubtotal - finalOutflowSubtotal;
  
                                  let balanceHtml = `<h4 class="text-sm font-headings font-bold text-gray-800 mb-3"> Análisis de la Selección</h4>
                                  <div class="flex flex-col gap-1 text-sm">
                                      <div class="flex justify-between max-w-xs"><span class="text-gray-600 font-medium">Entrada Seleccionada:</span> <span class="font-bold text-gray-900">${formatNumber(finalInflowSubtotal)}</span></div>
                                      <div class="flex justify-between max-w-xs"><span class="text-gray-600 font-medium">Salida Seleccionada:</span> <span class="font-bold text-gray-900">${formatNumber(finalOutflowSubtotal)}</span></div>
                                      <div class="flex justify-between max-w-xs border-t border-gray-200 pt-1 mt-1"><span class="text-gray-800 font-bold">Balance Seleccionado:</span> <span class="font-bold ${selectedBalance >= 0 ? 'text-gobmx-guinda' : 'text-red-600'}">${formatNumber(selectedBalance)}</span></div>
                                  </div>`;
  
                                  if (finalInflowSubtotal > 0) {
                                      const lossPercentage = (finalInflowSubtotal - finalOutflowSubtotal) / finalInflowSubtotal;
                                      const efficiency = 1 - lossPercentage;
                                      let message = '';
  
                                      if (lossPercentage >= 0.05) {
                                          message = `<div class="mt-4 p-3 bg-red-100 text-red-800 rounded-lg flex items-center gap-3 font-bold border border-red-200"><i class="fas fa-exclamation-circle text-xl"></i> Pérdida en Selección: ${(lossPercentage * 100).toFixed(2)}% (Crítica)</div> `;
                                      } else if (lossPercentage >= 0.03) {
                                          message = `<div class="mt-4 p-3 bg-yellow-100 text-yellow-800 rounded-lg flex items-center gap-3 font-bold border border-yellow-200"><i class="fas fa-exclamation-triangle text-xl"></i> Pérdida en Selección: ${(lossPercentage * 100).toFixed(2)}% (Alerta)</div> `;
                                      } else {
                                          message = `<div class="mt-4 p-3 bg-green-100 text-green-800 rounded-lg flex items-center gap-3 font-bold border border-green-200"><i class="fas fa-check-circle text-xl"></i> Eficiencia en Selección: ${(efficiency * 100).toFixed(2)}%</div> `;
                                      }
                                      balanceHtml += message;
                                  }
                                  balanceHtml += '</div>';
                                  selectedBalanceContainer.innerHTML = balanceHtml;
                              }
  
                              function setupTableInteractivity(table) {
                                  if (!table) return;
                                  const selectAll = table.querySelector('.select-all');
                                  const checkboxes = table.querySelectorAll('.flow-check, .cross-sum');
  
                                  selectAll.addEventListener('change', function () {
                                      table.querySelectorAll('.flow-check').forEach(cb => cb.checked = this.checked);
                                      updateAllSubtotals(nodeInfo);
                                  });
  
                                  checkboxes.forEach(cb => cb.addEventListener('change', () => updateAllSubtotals(nodeInfo)));
                              }
  
                              setupTableInteractivity(inflowTable);
                              setupTableInteractivity(outflowTable);
  
                              renderSparklines();
  
                              document.getElementById('node-details-container').style.display = 'block';
  
                              // --- Lógica del Gráfico Hijo ---
                              createSubSankey(clickedNodeName, inflows, outflows, nodeInfo);
                          }, 50); // 50ms de retraso para asegurar el renderizado del loader
  
                      } else {
                          console.log('Not an energetic child node or spacer.');
                          document.getElementById('node-details-container').style.display = 'none';
                      }
                  } else {
                      // Click fuera de un nodo válido, deseleccionar todo
                      sankeyChart.dispatchAction({ type: 'unfocusNodeAdjacency', seriesIndex: 0 });
                      sankeyChart.dispatchAction({ type: 'downplay', seriesIndex: 0 });
                      focusedNodeIndex = null;
  
                      // Ocultar información del nodo
                      hideFocusNodeInfo();
  
                      // Ocultar también las tablas de detalles
                      document.getElementById('node-details-container').style.display = 'none';
                      document.getElementById('sub-sankey-container').style.display = 'none';
  
                      // Restaurar el subtitulo
                      sankeyChart.setOption({ title: { subtext: 'Valores en Petajoules (PJ)' } });
  
                      console.log('Deselección por click fuera');
                      return;
                  }
              });
  
              document.getElementById('alert-switch').addEventListener('change', () => {
                  updateChart(yearSelector.value);
              });
  
              document.getElementById('description-switch').addEventListener('change', () => {
                  // No es necesario redibujar todo el gráfico, ECharts actualizará los tooltips automáticamente.
              });
  
              document.getElementById('decal-switch').addEventListener('change', () => {
                  updateChart(yearSelector.value);
              });
  
              if (legendToggleDetailsBtn) {
                  legendToggleDetailsBtn.addEventListener('click', () => {
                      legendDetailsVisible = !legendDetailsVisible;
                      updateLegendDetailsState();
                      createColorLegend();
                  });
              }
  
              if (legendShowAllBtn) {
                  legendShowAllBtn.addEventListener('click', () => {
                      setAllGroupsActive();
                      legendDetailsVisible = true;
                      updateLegendDetailsState();
                      updateChart(yearSelector.value);
                      createColorLegend();
                  });
              }
  
              updateLegendDetailsState();
  
              document.getElementById('hydrocarbons-switch').addEventListener('change', (e) => {
                  hydrocarbonsFilterActive = e.target.checked;
                  updateChart(yearSelector.value);
              });
  
              // Funcionalidad del modal de exportación
              const exportModal = document.getElementById('export-modal');
              const exportButton = document.getElementById('export-subsankey');
              const closeModal = document.getElementById('close-export-modal');
  
              exportButton.addEventListener('click', () => {
                  if (subSankeyChart) {
                      showExportModal();
                  }
              });
  
              closeModal.addEventListener('click', () => {
                  exportModal.style.display = 'none';
              });
  
              window.addEventListener('click', (event) => {
                  if (event.target === exportModal) {
                      exportModal.style.display = 'none';
                  }
              });
  
              function showExportModal() {
                  const previewContainer = document.getElementById('export-preview-container');
  
                  // Verificar que el sub-sankey esté disponible
                  if (!subSankeyChart) {
                      alert('Por favor, selecciona un energético primero para generar el sub-sankey.');
                      return;
                  }
  
                  // Crear vista previa combinada
                  createExportPreview(previewContainer);
  
                  exportModal.style.display = 'block';
              }
  
              function createExportPreview(container) {
                  container.innerHTML = '';
  
                  // Título principal
                  const mainTitle = document.createElement('h2');
                  mainTitle.textContent = document.getElementById('sub-sankey-main-title').textContent;
                  mainTitle.style.cssText = 'text-align: center; margin: 0 0 0.5rem 0; color: var(--color-guinda); font-size: 1.5rem;';
  
                  // Subtítulo
                  const subtitle = document.createElement('h3');
                  subtitle.textContent = document.getElementById('sub-sankey-subtitle').textContent;
                  subtitle.style.cssText = 'text-align: center; margin: 0 0 1rem 0; color: var(--color-gris-oscuro); font-size: 1.2rem; font-weight: 600;';
  
                  // Descripción del energético (si está disponible)
                  const description = document.createElement('p');
                  const energeticoName = document.getElementById('sub-sankey-subtitle').textContent.split(' - ')[0];
                  const nodeInfo = allNodes.get(energeticoName);
                  if (nodeInfo && nodeInfo.description) {
                      description.textContent = nodeInfo.description;
                      description.style.cssText = 'text-align: center; margin: 0 0 2rem 0; color: var(--color-gris-oscuro); font-size: 1rem; font-style: italic; max-width: 600px; margin-left: auto; margin-right: auto;';
                  } else {
                      description.style.display = 'none';
                  }
  
                  // Contenedor del gráfico
                  const chartContainer = document.createElement('div');
                  chartContainer.style.cssText = 'width: 800px; height: 500px; margin: 0 auto 2rem auto; border: 1px solid #ddd;';
  
                  // Leyenda
                  const legendContainer = document.createElement('div');
                  legendContainer.style.cssText = 'margin-top: 2rem; padding: 1.5rem; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;';
  
                  const legendTitle = document.createElement('h4');
                  legendTitle.textContent = 'Leyenda de Colores - Sub-Sankey';
                  legendTitle.style.cssText = 'text-align: center; margin: 0 0 0.5rem 0; color: var(--color-guinda);';
  
                  const legendNote = document.createElement('p');
                  legendNote.textContent = 'Energéticos presentes en el diagrama detallado';
                  legendNote.style.cssText = 'text-align: center; margin: 0 0 1rem 0; color: var(--color-gris-oscuro); font-size: 0.8rem; font-style: italic;';
  
                  const legendContent = document.createElement('div');
                  legendContent.style.cssText = 'display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.9rem; max-width: 100%;';
  
                  // Generar leyenda basada en los nodos del sub-sankey
                  if (subSankeyChart) {
                      const subOption = subSankeyChart.getOption();
                      if (subOption && subOption.series && subOption.series[0] && subOption.series[0].data) {
                          // Obtener solo los nodos del sub-sankey (no espaciadores)
                          const subSankeyNodes = subOption.series[0].data
                              .filter(node => !node.name.startsWith('SPACER') &&
                                  !node.esEspaciador &&
                                  node.itemStyle &&
                                  node.itemStyle.color)
                              .sort((a, b) => a.name.localeCompare(b.name)); // Ordenar alfabéticamente
  
                          // Crear leyenda simple con todos los nodos del sub-sankey
                          const legendGrid = document.createElement('div');
                          legendGrid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; width: 100%;';
  
                          subSankeyNodes.forEach(node => {
                              const legendItem = document.createElement('div');
                              legendItem.style.cssText = 'display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem; background: white; border-radius: 4px; border: 1px solid #e0e0e0;';
  
                              const colorBox = document.createElement('div');
                              colorBox.style.cssText = `width: 16px; height: 16px; background - color: ${node.itemStyle.color}; border - radius: 3px; border: 1px solid #ccc; flex - shrink: 0; `;
  
                              const label = document.createElement('span');
                              label.textContent = node.name;
                              label.style.cssText = 'font-size: 0.9rem; font-weight: 500;';
  
                              legendItem.appendChild(colorBox);
                              legendItem.appendChild(label);
                              legendGrid.appendChild(legendItem);
                          });
  
                          legendContent.appendChild(legendGrid);
                      }
                  }
  
                  // Ensamblar vista previa
                  container.appendChild(mainTitle);
                  container.appendChild(subtitle);
                  if (description.textContent) {
                      container.appendChild(description);
                  }
                  container.appendChild(chartContainer);
                  legendContainer.appendChild(legendTitle);
                  legendContainer.appendChild(legendNote);
                  legendContainer.appendChild(legendContent);
                  container.appendChild(legendContainer);
  
                  // Crear gráfico en el contenedor de vista previa
                  const previewChart = echarts.init(chartContainer);
                  if (subSankeyChart) {
                      const originalOption = subSankeyChart.getOption();
                      previewChart.setOption(originalOption);
                  }
  
                  // Configurar botón de exportación
                  document.getElementById('export-subsankey').onclick = () => {
                      exportSubSankey(previewChart);
                  };
              }
              function exportSubSankey(chartInstance) {
                  if (!chartInstance) {
                      alert('No hay sub-Sankey disponible para exportar');
                      return;
                  }
  
                  // Función para exportar con un fondo específico
                  function exportWithSpecificBackground(useWhiteBackground) {
                      new Promise(resolve => {
                          const handler = () => {
                              chartInstance.off('rendered', handler);
                              resolve();
                          };
                          chartInstance.on('rendered', handler);
  
                          if (!chartInstance.isDisposed() && chartInstance.getOption()) {
                              resolve();
                          }
                      }).then(() => {
                          const chartUrl = chartInstance.getDataURL({
                              type: 'png',
                              pixelRatio: 3,
                              backgroundColor: 'rgba(0,0,0,0)', // Siempre transparente desde ECharts
                              excludeComponents: []
                          });
  
                          const chartImg = new Image();
                          chartImg.onload = function () {
                              const canvas = document.createElement('canvas');
                              const ctx = canvas.getContext('2d');
  
                              canvas.width = chartImg.width;
                              canvas.height = chartImg.height;
  
                              if (useWhiteBackground) {
                                  ctx.fillStyle = '#ffffff';
                                  ctx.fillRect(0, 0, canvas.width, canvas.height);
                              } else {
                                  ctx.clearRect(0, 0, canvas.width, canvas.height);
                              }
  
                              ctx.drawImage(chartImg, 0, 0);
  
                              const finalUrl = canvas.toDataURL('image/png');
                              const link = document.createElement('a');
                              const subtitleText = document.getElementById('sub-sankey-subtitle').textContent;
                              const baseName = cleanFileName(subtitleText.split(' - ')[0]);
                              const year = yearSelector.value;
                              const prefix = currentLegendOrder !== null ?
                                  `${currentLegendOrder}.-BNE_${year}_${useWhiteBackground ? '' : 'transparente_'} subsankey_` :
                                  `BNE_${year}_subsankey_${useWhiteBackground ? '' : 'transparente_'} `;
                              link.download = `${prefix}${baseName}.png`;
                              link.href = finalUrl;
                              link.click();
                          };
                          chartImg.src = chartUrl;
                      });
                  }
  
                  // Exportar con fondo blanco primero
                  // exportWithSpecificBackground(true);
                  setTimeout(() => {
                      exportWithSpecificBackground(true);
                  }, 1500);
                  // Exportar con fondo transparente después de un delay
                  setTimeout(() => {
                      exportWithSpecificBackground(false);
                  }, 3000);
              }
  
              // Función para manejar clic en nodos (desde leyenda o diagrama)
              function handleNodeClick(nodeName) {
                  // Verificar si es un nodo energético válido
                  const nodeInfo = allNodes.get(nodeName);
                  if (!nodeInfo || nodeInfo.esEspaciador) {
                      console.log('Not an energetic node or spacer.');
                      document.getElementById('node-details-container').style.display = 'none';
                      return;
                  }
  
                  // Actualizar información del nodo
                  document.getElementById('node-details-name').innerHTML = `< span style = "display:inline-block; width:15px; height:15px; background-color:${nodeInfo.itemStyle.color}; border-radius:3px; margin-right:5px; vertical-align:middle;" ></span > ${nodeInfo.name} `;
                  document.getElementById('node-details-type').textContent = nodeInfo.tipo || 'N/A';
                  document.getElementById('node-details-description').textContent = nodeInfo.description || 'No hay descripción disponible.';
                  document.getElementById('node-details-inflow').textContent = formatNumber(nodeInfo.inflow);
                  document.getElementById('node-details-outflow').textContent = formatNumber(nodeInfo.outflow);
                  document.getElementById('node-details-balance').textContent = formatNumber(nodeInfo.inflow - nodeInfo.outflow);
  
                  // Actualizar el subtitulo del Sankey principal
                  sankeyChart.setOption({ title: { subtext: `${nodeInfo.name} - Valores en Petajoules(PJ)` } });
  
                  // Calcular y mostrar eficiencia
                  const efficiencySpan = document.getElementById('node-details-efficiency');
                  const alertInfoContainer = document.getElementById('alert-info-container');
                  efficiencySpan.innerHTML = '';
                  alertInfoContainer.style.display = 'none';
  
                  const showAlerts = document.getElementById('alert-switch').checked;
                  const transformationNodes = [
                      "Coquizadoras y Hornos",
                      "Plantas de Gas y Fraccionadoras",
                      "Refinerías y Despuntadoras",
                      "Centrales Eléctricas"
                  ];
  
                  if (showAlerts && nodeInfo.inflow > 0 && nodeInfo.outflow > 0 && !transformationNodes.includes(nodeInfo.name)) {
                      alertInfoContainer.style.display = 'block';
                      const lossPercentage = (nodeInfo.inflow - nodeInfo.outflow) / nodeInfo.inflow;
                      const efficiency = 1 - lossPercentage;
                      let message = '';
  
                      if (lossPercentage >= 0.05) {
                          message = `🚨 <strong style="color:${window.sankeyConfig.efficiencyColors.critical};">Pérdida: ${(lossPercentage * 100).toFixed(2)}% (Crítica: >5%)</strong>`;
                      } else if (lossPercentage >= 0.03) {
                          message = `⚠️ <strong style="color:${window.sankeyConfig.efficiencyColors.warning};">Pérdida: ${(lossPercentage * 100).toFixed(2)}% (Alerta: 3%-5%)</strong>`;
                      } else {
                          message = `✅ <strong style="color:${window.sankeyConfig.efficiencyColors.efficient};">Eficiencia: ${(efficiency * 100).toFixed(2)}%</strong>`;
                      }
                      efficiencySpan.innerHTML = message;
                  }
  
                  const valuesContainer = document.getElementById('node-details-values');
                  valuesContainer.innerHTML = '<div class="loader"></div>'; // Mostrar preloader
                  document.getElementById('node-details-container').style.display = 'block';
  
                  // Usar setTimeout para permitir que el preloader se renderice antes de la carga pesada
                  setTimeout(() => {
                      const selectedYear = yearSelector.value;
                      const inflows = currentLinks.filter(link => link.target === nodeName);
                      const outflows = currentLinks.filter(link => link.source === nodeName);
  
                      let detailsHtml = '<div style="display: flex; flex-wrap: wrap; gap: 2rem;">';
  
                      if (inflows.length > 0) {
                          detailsHtml += '<div style="flex: 1; min-width: 300px;">';
                          detailsHtml += '<h4>Flujos de Entrada</h4><div class="details-table-wrapper"><table id="inflow-table">';
                          detailsHtml += '<thead><tr><th><input type="checkbox" class="select-all"></th><th>Desde</th><th>Valor (PJ)</th><th>Historial</th></tr></thead><tbody>';
                          inflows.forEach((link, index) => {
                              const sourceColor = window.sankeyConfig.energeticColors[link.source] || '#888';
                              detailsHtml += `< tr ><td><input type="checkbox" class="flow-check" data-value="${link.value}"></td><td><span style="display:inline-block; width:15px; height:15px; background-color:${sourceColor}; border-radius:3px; margin-right:5px; vertical-align:middle;"></span>${link.source}</td><td>${formatNumber(link.value)}</td><td><div id="sparkline-in-${index}" class="sparkline-container" data-source="${link.source}" data-target="${nodeName}"></div></td></tr> `;
                          });
                          detailsHtml += `</tbody> <tfoot>
                                  <tr><td colspan="2" style="font-weight: bold;">Total Entradas</td><td style="font-weight: bold;">${formatNumber(nodeInfo.inflow)}</td></tr>
                                  <tr><td colspan="2" style="font-weight: bold;">Subtotal Seleccionado</td><td style="font-weight: bold;" class="subtotal">0.00 PJ</td></tr>
                                  <tr><td colspan="2" style="font-weight: bold;">Total No Seleccionado</td><td style="font-weight: bold;" class="unselected-total">${formatNumber(nodeInfo.inflow)}</td></tr>
                                  <tr><td colspan="3"><label><input type="checkbox" class="cross-sum"> Sumar selección en 'Salidas'</label></td></tr>
                              </tfoot></table></div> `;
                          detailsHtml += '</div>';
                      } else {
                          detailsHtml += '<div style="flex: 1; min-width: 300px;"><h4>Flujos de Entrada</h4><p>No hay flujos de entrada para este nodo.</p></div>';
                      }
  
                      if (outflows.length > 0) {
                          detailsHtml += '<div style="flex: 1; min-width: 300px;">';
                          detailsHtml += '<h4>Flujos de Salida</h4><div class="details-table-wrapper"><table id="outflow-table">';
                          detailsHtml += '<thead><tr><th><input type="checkbox" class="select-all"></th><th>Hacia</th><th>Valor (PJ)</th><th>Historial</th></tr></thead><tbody>';
                          outflows.forEach((link, index) => {
                              const targetColor = window.sankeyConfig.energeticColors[link.target] || '#888';
                              detailsHtml += `< tr ><td><input type="checkbox" class="flow-check" data-value="${link.value}"></td><td><span style="display:inline-block; width:15px; height:15px; background-color:${targetColor}; border-radius:3px; margin-right:5px; vertical-align:middle;"></span>${link.target}</td><td>${formatNumber(link.value)}</td><td><div id="sparkline-out-${index}" class="sparkline-container" data-source="${nodeName}" data-target="${link.target}"></div></td></tr> `;
                          });
                          detailsHtml += `</tbody> <tfoot>
                                  <tr><td colspan="2" style="font-weight: bold;">Total Salidas</td><td style="font-weight: bold;">${formatNumber(nodeInfo.outflow)}</td></tr>
                                  <tr><td colspan="2" style="font-weight: bold;">Subtotal Seleccionado</td><td style="font-weight: bold;" class="subtotal">0.00 PJ</td></tr>
                                  <tr><td colspan="2" style="font-weight: bold;">Total No Seleccionado</td><td style="font-weight: bold;" class="unselected-total">${formatNumber(nodeInfo.outflow)}</td></tr>
                                  <tr><td colspan="3"><label><input type="checkbox" class="cross-sum"> Sumar selección en 'Entradas'</label></td></tr>
                              </tfoot></table></div> `;
                          detailsHtml += '</div>';
                      } else {
                          detailsHtml += '<div style="flex: 1; min-width: 300px;"><h4>Flujos de Salida</h4><p>No hay flujos de salida para este nodo.</p></div>';
                      }
  
                      detailsHtml += '</div>';
  
                      const parentNodesContainer = document.createElement('div');
                      const parentTable = document.createElement('table');
                      parentTable.innerHTML = '<thead><tr><th>Energético/Elemento</th><th>Valor (PJ)</th><th>Historial</th></tr></thead><tbody></tbody>';
                      const tbody = parentTable.querySelector('tbody');
                      let parentRows = 0;
  
                      window.energyData.Datos.forEach((parentData, index) => {
                          const parentName = parentData["Nodo Padre"];
                          const childEnergetic = parentData["Nodos Hijo"].find(hijo => hijo["Nodo Hijo"] === nodeName);
                          if (childEnergetic && childEnergetic[selectedYear] !== undefined && childEnergetic[selectedYear] !== null) {
                              const parentColor = window.sankeyConfig.energeticColors[parentName] || '#888';
                              const row = tbody.insertRow();
                              row.innerHTML = `<td > <span style="display:inline-block; width:15px; height:15px; background-color:${parentColor}; border-radius:3px; margin-right:5px; vertical-align:middle;"></span>${parentName}</td><td>${formatNumber(childEnergetic[selectedYear])}</td><td><div id="sparkline-parent-${index}" class="sparkline-container" data-source="${parentName}" data-target="${nodeName}"></div></td>`;
                              parentRows++;
                          }
                      });
  
                      if (parentRows > 0) {
                          parentNodesContainer.innerHTML = '<h4 style="margin-top: 1.5rem;">Participación del Energético en la Cadena de Valor</h4>';
                          parentNodesContainer.appendChild(parentTable);
                      }
  
                      valuesContainer.innerHTML = detailsHtml;
                      valuesContainer.insertAdjacentHTML('beforeend', '<div id="selected-balance-container" style="margin-top: 2rem; padding-top: 1rem; border-top: 2px dashed #ccc;"></div>');
                      valuesContainer.insertAdjacentHTML('beforeend', parentNodesContainer.innerHTML);
  
                      const inflowTable = document.getElementById('inflow-table');
                      const outflowTable = document.getElementById('outflow-table');
  
                      function updateAllSubtotals(nodeInfo) {
                          let inflowSelectedSum = 0;
                          if (inflowTable) {
                              inflowTable.querySelectorAll('.flow-check:checked').forEach(cb => inflowSelectedSum += parseFloat(cb.dataset.value));
                          }
  
                          let outflowSelectedSum = 0;
                          if (outflowTable) {
                              outflowTable.querySelectorAll('.flow-check:checked').forEach(cb => outflowSelectedSum += parseFloat(cb.dataset.value));
                          }
  
                          const sumInflowToOutflow = inflowTable ? inflowTable.querySelector('.cross-sum').checked : false;
                          const sumOutflowToInflow = outflowTable ? outflowTable.querySelector('.cross-sum').checked : false;
  
                          const finalInflowSubtotal = (sumOutflowToInflow ? outflowSelectedSum : 0) + inflowSelectedSum;
                          const finalOutflowSubtotal = (sumInflowToOutflow ? inflowSelectedSum : 0) + outflowSelectedSum;
  
                          const totalInflowValue = parseFloat(nodeInfo.inflow);
                          const totalOutflowValue = parseFloat(nodeInfo.outflow);
  
                          if (inflowTable) {
                              inflowTable.querySelector('.subtotal').textContent = formatNumber(finalInflowSubtotal);
                              inflowTable.querySelector('.unselected-total').textContent = formatNumber(totalInflowValue - inflowSelectedSum);
                          }
                          if (outflowTable) {
                              outflowTable.querySelector('.subtotal').textContent = formatNumber(finalOutflowSubtotal);
                              outflowTable.querySelector('.unselected-total').textContent = formatNumber(totalOutflowValue - outflowSelectedSum);
                          }
  
                          const selectedBalanceContainer = document.getElementById('selected-balance-container');
                          const selectedBalance = finalInflowSubtotal - finalOutflowSubtotal;
                          let balanceHtml = `< h4 > Análisis de la Selección</h4 >
                          <p><strong>Entrada Seleccionada:</strong> ${formatNumber(finalInflowSubtotal)}</p>
                          <p><strong>Salida Seleccionada:</strong> ${formatNumber(finalOutflowSubtotal)}</p>
                          <p><strong>Balance Seleccionado:</strong> ${formatNumber(selectedBalance)}</p>`;
  
                          if (finalInflowSubtotal > 0) {
                              const lossPercentage = (finalInflowSubtotal - finalOutflowSubtotal) / finalInflowSubtotal;
                              const efficiency = 1 - lossPercentage;
                              let message = '';
  
                              if (lossPercentage >= 0.05) {
                                  message = `🚨 <strong style="color:${window.sankeyConfig.efficiencyColors.critical};">Pérdida en Selección: ${(lossPercentage * 100).toFixed(2)}% (Crítica)</strong>`;
                              } else if (lossPercentage >= 0.03) {
                                  message = `⚠️ <strong style="color:${window.sankeyConfig.efficiencyColors.warning};">Pérdida en Selección: ${(lossPercentage * 100).toFixed(2)}% (Alerta)</strong>`;
                              } else {
                                  message = `✅ <strong style="color:${window.sankeyConfig.efficiencyColors.efficient};">Eficiencia en Selección: ${(efficiency * 100).toFixed(2)}%</strong>`;
                              }
                              balanceHtml += `< p > ${message}</p > `;
                          }
                          selectedBalanceContainer.innerHTML = balanceHtml;
                      }
  
                      function setupTableInteractivity(table) {
                          if (!table) return;
                          const selectAll = table.querySelector('.select-all');
                          const checkboxes = table.querySelectorAll('.flow-check, .cross-sum');
  
                          selectAll.addEventListener('change', function () {
                              table.querySelectorAll('.flow-check').forEach(cb => cb.checked = this.checked);
                              updateAllSubtotals(nodeInfo);
                          });
  
                          checkboxes.forEach(cb => cb.addEventListener('change', () => updateAllSubtotals(nodeInfo)));
                      }
  
                      setupTableInteractivity(inflowTable);
                      setupTableInteractivity(outflowTable);
  
                      renderSparklines();
  
                      document.getElementById('node-details-container').style.display = 'block';
  
                      // --- Lógica del Gráfico Hijo ---
                      createSubSankey(nodeName, inflows, outflows, nodeInfo);
                  }, 50); // 50ms de retraso para asegurar el renderizado del loader
              }
  
              searchInput.addEventListener('input', handleSearch);
              clearSearchBtn.addEventListener('click', () => {
                  searchInput.value = '';
                  sankeyChart.dispatchAction({ type: 'downplay', seriesIndex: 0 });
                  sankeyChart.dispatchAction({ type: 'unfocusNodeAdjacency', seriesIndex: 0 });
                  hideLinkLabels(); // Ocultar etiquetas de enlaces al limpiar búsqueda
              });
  
              // Agregar funcionalidad para limpiar búsqueda con Escape
              searchInput.addEventListener('keydown', (e) => {
                  if (e.key === 'Escape') {
                      searchInput.value = '';
                      sankeyChart.dispatchAction({ type: 'downplay', seriesIndex: 0 });
                      sankeyChart.dispatchAction({ type: 'unfocusNodeAdjacency', seriesIndex: 0 });
                      hideLinkLabels();
                      searchInput.blur(); // Quitar foco del input
                  }
              });
  
              // Deshabilitar hover automático cuando focus mode está activado
              sankeyChart.on('mouseover', function (params) {
                  // Verificación simple para nodos espaciadores
                  if (params.name && params.name.includes('SPACER')) {
                      return false;
                  }
  
                  // Verificar por propiedades del nodo
                  const nodeInfo = allNodes.get(params.name);
                  if (nodeInfo && nodeInfo.esEspaciador) {
                      return false;
                  }
  
                  if (focusMode && focusedNodeIndex !== null) {
                      // Si hay un nodo fijo seleccionado, no permitir hover en otros
                      if (params.dataIndex !== focusedNodeIndex) {
                          return false;
                      }
                  }
              });
  
              sankeyChart.on('mouseout', function (params) {
                  // Verificación simple para nodos espaciadores
                  if (params.name && params.name.includes('SPACER')) {
                      return false;
                  }
  
                  const nodeInfo = allNodes.get(params.name);
                  if (nodeInfo && nodeInfo.esEspaciador) {
                      return false;
                  }
  
                  if (focusMode && focusedNodeIndex !== null) {
                      // Mantener el foco en el nodo seleccionado con mejor timing
                      setTimeout(() => {
                          // Primero limpiar todo
                          sankeyChart.dispatchAction({ type: 'downplay', seriesIndex: 0 });
                          // Luego resaltar el nodo fijo
                          sankeyChart.dispatchAction({
                              type: 'highlight',
                              seriesIndex: 0,
                              dataIndex: focusedNodeIndex
                          });
                      }, 50);
                  }
              });
  
              // --- Lógica de Zoom y Paneo con Transformaciones CSS ---
              const wrapper = document.getElementById('chart-wrapper');
              const sankeyDom = document.getElementById('sankey');
              sankeyDom.style.cursor = zoomEnabled ? 'grab' : 'default';
              let scale = 1,
                  panX = 0,
                  panY = 0,
                  isPanning = false,
                  startX,
                  startY;
  
              /* ====== ETIQUETAS DE COLUMNA (overlay que sigue zoom/pan) ====== */
              function renderColumnLabels() {
                  const overlay = document.getElementById('sankey-label-overlay');
                  if (!overlay) return;
                  overlay.innerHTML = '';
                  const labels = (window.sankeyConfig && window.sankeyConfig.columnLabels) || [];
                  const count = labels.length || 0;
  
                  labels.forEach((lbl, i) => {
                      const el = document.createElement('div');
                      el.className = 'label-chip';
                      el.textContent = lbl.text || `Col ${i + 1} `;
                      // Guardamos posición base en % y px
                      const leftPct = typeof lbl.left === 'string' && lbl.left.endsWith('%')
                          ? parseFloat(lbl.left)
                          : (lbl.left != null ? Number(lbl.left) : Math.round(((i + 1) / (count + 1)) * 100));
                      el.dataset.leftPct = leftPct; // porcentaje 0-100
                      el.dataset.top = (lbl.top ?? 8); // px
                      document.getElementById('sankey-label-overlay').appendChild(el);
                  });
  
                  updateLabelOverlayPositions();
              }
  
              // Helper: leer el transform actual del #sankey
              function getSankeyTransform() {
                  const el = document.getElementById('sankey');
                  if (!el) return { scale: 1, tx: 0, ty: 0 };
                  const tr = getComputedStyle(el).transform;
                  if (!tr || tr === 'none') return { scale: 1, tx: 0, ty: 0 };
  
                  const m2d = tr.match(/matrix\(([^)]+)\)/);
                  if (m2d) {
                      const v = m2d[1].split(',').map(parseFloat);
                      return { scale: v[0] || 1, tx: v[4] || 0, ty: v[5] || 0 };
                  }
                  const m3d = tr.match(/matrix3d\(([^)]+)\)/);
                  if (m3d) {
                      const v = m3d[1].split(',').map(parseFloat);
                      return { scale: v[0] || 1, tx: v[12] || 0, ty: v[13] || 0 };
                  }
                  return { scale: 1, tx: 0, ty: 0 };
              }
  
              function updateLabelOverlayPositions() {
                  const overlay = document.getElementById('sankey-label-overlay');
                  const sankeyEl = document.getElementById('sankey');
                  if (!overlay || !sankeyEl) return;
  
                  const { scale, tx, ty } = getSankeyTransform();
                  const sankeyW = sankeyEl.clientWidth;
  
                  overlay.querySelectorAll('.label-chip').forEach(el => {
                      const leftPct = parseFloat(el.dataset.leftPct || '0');
                      const topPx = parseFloat(el.dataset.top || '0');
  
                      // Seguir pan/zoom horizontal; mantener offset vertical fijo en px
                      const x = tx + (leftPct / 100) * sankeyW * scale;
                      const y = ty + topPx;
  
                      // Sin escala inversa: tamaño constante
                      el.style.transform = `translate(${x}px, ${y}px)`;
                  });
              }
  
              function updateTransform() {
                  sankeyDom.style.transform = `translate(${panX}px, ${panY}px) scale(${scale})`;
                  updateLabelOverlayPositions(); // sincroniza overlay
              }
  
              wrapper.addEventListener('wheel', e => {
                  if (!zoomEnabled) return;
                  e.preventDefault();
                  const delta = e.deltaY > 0 ? -0.1 : 0.1;
  
                  if (scale + delta < 1) {
                      scale = 1;
                      panX = 0;
                      panY = 0;
                  } else {
                      const newScale = Math.min(Math.max(1, scale + delta), 4);
                      const rect = wrapper.getBoundingClientRect();
                      const mouseX = e.clientX - rect.left;
                      const mouseY = e.clientY - rect.top;
                      panX = mouseX - (mouseX - panX) * (newScale / scale);
                      panY = mouseY - (mouseY - panY) * (newScale / scale);
                      scale = newScale;
                  }
                  updateTransform();
              });
  
              sankeyDom.addEventListener('mousedown', e => {
                  if (!zoomEnabled) return;
                  isPanning = true;
                  startX = e.clientX - panX;
                  startY = e.clientY - panY;
                  sankeyDom.style.cursor = 'grabbing';
              });
  
              document.addEventListener('mousemove', e => {
                  if (!zoomEnabled || !isPanning) return;
                  panX = e.clientX - startX;
                  panY = e.clientY - startY;
                  updateTransform();
              });
  
              document.addEventListener('mouseup', () => {
                  if (!isPanning) return;
                  isPanning = false;
                  sankeyDom.style.cursor = zoomEnabled ? 'grab' : 'default';
              });
  
              document.getElementById('zoom-reset-btn').onclick = function () {
                  scale = 1;
                  panX = 0;
                  panY = 0;
                  updateTransform();
                  sankeyChart.dispatchAction({ type: 'restore' });
                  sankeyDom.style.cursor = zoomEnabled ? 'grab' : 'default';
              };
  
              zoomSwitch.addEventListener('change', () => {
                  zoomEnabled = zoomSwitch.checked;
                  scale = 1;
                  panX = 0;
                  panY = 0;
                  updateTransform();
                  sankeyDom.style.cursor = zoomEnabled ? 'grab' : 'default';
                  sankeyChart.setOption({
                      series: [{ roam: zoomEnabled, draggable: focusMode || !zoomEnabled }]
                  });
              });
  
              focusSwitch.addEventListener('change', () => {
                  focusMode = focusSwitch.checked;
                  focusedNodeIndex = null;
                  sankeyChart.dispatchAction({ type: 'unfocusNodeAdjacency', seriesIndex: 0 });
                  sankeyChart.dispatchAction({ type: 'downplay', seriesIndex: 0 });
  
                  // Ocultar información del nodo cuando se desactive el modo focus
                  if (!focusMode) {
                      hideFocusNodeInfo();
                  }
  
                  // Actualizar la configuración del gráfico
                  sankeyChart.setOption({
                      series: [{
                          draggable: focusMode || !zoomEnabled,
                          emphasis: {
                              focus: 'adjacency',
                              blurScope: 'coordinateSystem',
                              itemStyle: {
                                  borderWidth: focusMode ? 4 : 3, // Borde más grueso en focus mode
                                  borderColor: focusMode ? '#6a1c32' : '#ffffff', // Color guinda en focus mode
                                  shadowBlur: focusMode ? 15 : 10,
                                  shadowColor: focusMode ? 'rgba(106, 28, 50, 0.5)' : 'rgba(0,0,0,0.3)'
                              }
                          },
                          blur: {
                              itemStyle: {
                                  opacity: focusMode ? 0.1 : 0.1 // Más transparente en focus mode
                              },
                              lineStyle: {
                                  opacity: focusMode ? 0.1 : 0.1 // Enlaces más transparentes en focus mode
                              }
                          }
                      }]
                  });
  
                  console.log('Focus mode:', focusMode ? 'ACTIVADO' : 'DESACTIVADO');
  
                  // Cambiar el estilo del contenedor para indicar el modo
                  const chartContainer = document.getElementById('chart-container');
                  if (focusMode) {
                      chartContainer.style.border = '2px solid var(--color-guinda)';
                      chartContainer.style.borderRadius = 'var(--border-radius)';
                  } else {
                      chartContainer.style.border = 'none';
                  }
              });
  
              window.addEventListener('resize', () => {
                  sankeyChart.resize();
                  if (subSankeyChart) {
                      subSankeyChart.resize();
                  }
                  // <<< AÑADIR: reposicionar etiquetas en resize >>>
                  updateLabelOverlayPositions();
              });
  
              // --- Lógica para el Gráfico Histórico ---
              const historicModal = document.getElementById('historic-chart-modal');
              const historicChartContainer = document.getElementById('historic-chart-container');
              let historicChart = echarts.init(historicChartContainer);
  
              function showHistoricChart(sourceNodeName, targetNodeName) {
                  const historicData = getHistoricData(sourceNodeName, targetNodeName);
                  if (!historicData) {
                      alert("No se encontraron datos históricos para este flujo.");
                      return;
                  }
  
                  const { years, values } = historicData;
                  const projection = calculateProjection(years, values);
  
                  document.getElementById('historic-chart-title').innerText = `Evolución: ${sourceNodeName} → ${targetNodeName} `;
  
                  const option = {
                      tooltip: {
                          trigger: 'axis',
                          formatter: function (params) {
                              const year = params[0].axisValue;
                              let tooltip = `${year} <br />`;
                              params.forEach(param => {
                                  if (param.value != null) {
                                      const value = parseFloat(param.value).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                                      const label = param.seriesName === 'Proyección' ? 'Proyección' : 'Valor';
                                      tooltip += `${param.marker} ${label}: <b>${value} PJ</b><br/>`;
                                  }
                              });
                              return tooltip;
                          }
                      },
                      legend: { data: ['Valor Histórico', 'Proyección'] },
                      xAxis: { type: 'category', data: [...years, projection.year] },
                      yAxis: {
                          type: 'value',
                          name: 'Petajoules (PJ)',
                          axisLabel: {
                              formatter: function (value) {
                                  return value.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' PJ';
                              }
                          }
                      },
                      series: [
                          {
                              name: 'Valor Histórico',
                              type: 'line',
                              data: values,
                              smooth: true
                          },
                          {
                              name: 'Proyección',
                              type: 'line',
                              data: new Array(values.length).fill(null).concat([projection.value]),
                              lineStyle: { type: 'dashed', color: window.sankeyConfig.efficiencyColors.critical },
                              itemStyle: { color: window.sankeyConfig.efficiencyColors.critical },
                              symbol: 'circle',
                              symbolSize: 8
                          }
                      ]
                  };
  
                  historicChart.setOption(option, true);
                  historicModal.style.display = 'flex';
                  historicChart.resize(); // Forzar redimensionamiento del gráfico
              }
  
              function getHistoricData(sourceNodeName, targetNodeName) {
                  let parentNode = energyData.Datos.find(p => p["Nodo Padre"] === sourceNodeName);
                  let childNode = parentNode ? parentNode["Nodos Hijo"].find(c => c["Nodo Hijo"] === targetNodeName) : null;
  
                  // Si no se encuentra, intentar la búsqueda inversa (target como padre)
                  if (!childNode) {
                      parentNode = energyData.Datos.find(p => p["Nodo Padre"] === targetNodeName);
                      childNode = parentNode ? parentNode["Nodos Hijo"].find(c => c["Nodo Hijo"] === sourceNodeName) : null;
                  }
  
                  if (!childNode) return null;
  
                  const years = Object.keys(childNode).filter(k => !isNaN(k)).sort();
                  const values = years.map(y => Math.abs(childNode[y])); // Usar siempre valores absolutos
                  return { years, values };
              }
  
              function calculateProjection(years, values) {
                  const n = years.length;
                  if (n < 2) return { year: parseInt(years[n - 1]) + 1, value: values[n - 1] }; // No se puede proyectar con menos de 2 puntos
  
                  const x = years.map(y => parseInt(y));
                  const y = values;
  
                  const sumX = x.reduce((a, b) => a + b, 0);
                  const sumY = y.reduce((a, b) => a + b, 0);
                  const sumXY = x.map((xi, i) => xi * y[i]).reduce((a, b) => a + b, 0);
                  const sumX2 = x.map(xi => xi * xi).reduce((a, b) => a + b, 0);
  
                  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
                  const intercept = (sumY - slope * sumX) / n;
  
                  const nextYear = x[n - 1] + 1;
                  const projectedValue = slope * nextYear + intercept;
  
                  return { year: nextYear, value: projectedValue };
              }
  
              document.querySelector('.modal-close-btn').onclick = () => {
                  historicModal.style.display = 'none';
              };
  
              document.getElementById('download-historic-chart-btn').onclick = function () {
                  const title = document.getElementById('historic-chart-title').innerText;
                  const url = historicChart.getDataURL({
                      type: 'png',
                      pixelRatio: 2,
                      backgroundColor: '#fff'
                  });
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${title.replace(/ /g, '_')}.png`;
                  a.click();
              };
  
              function renderSparklines() {
                  document.querySelectorAll('.sparkline-container').forEach(container => {
                      const source = container.dataset.source;
                      const target = container.dataset.target;
                      const historicData = getHistoricData(source, target);
  
                      if (historicData && historicData.values.length > 1) {
                          const sparklineChart = echarts.init(container);
                          sparklineChart.setOption({
                              grid: { top: 5, bottom: 5, left: 5, right: 5 },
                              xAxis: { type: 'category', show: false },
                              yAxis: { type: 'value', show: false },
                              series: [{
                                  type: 'line',
                                  data: historicData.values,
                                  smooth: true,
                                  symbol: 'none',
                                  lineStyle: { width: 2, color: '#6a1c32' }
                              }]
                          });
                          container.addEventListener('click', () => showHistoricChart(source, target));
                      }
                  });
              }
  
              function createSubSankey(centerNodeName, inflows, outflows, centerNodeInfo) {
                  const subSankeyContainer = document.getElementById('sub-sankey-container');
                  subSankeyContainer.style.display = 'block';
  
                  // Actualizar título y subtítulo del sub-sankey
                  document.getElementById('sub-sankey-main-title').textContent = `Vista Detallada del Flujo`;
                  document.getElementById('sub-sankey-subtitle').textContent = `${centerNodeName} - ${yearSelector.value} `;
  
                  const subChartDom = document.getElementById('sub-sankey-chart');
                  if (subSankeyChart) {
                      subSankeyChart.dispose();
                  }
                  subSankeyChart = echarts.init(subChartDom);
  
                  const links = [];
                  const nodeMap = new Map();
                  const totalFlow = centerNodeInfo.inflow > 0 ? centerNodeInfo.inflow : centerNodeInfo.outflow;
                  const scaleFactor = totalFlow > 0 ? (subChartDom.clientHeight * 0.6) / totalFlow : 0;
  
                  // Función para crear itemStyle con patrón decal si está activado
                  const createItemStyle = (color) => {
                      const itemStyle = { color: color };
                      const decalSwitch = document.getElementById('decal-switch');
                      if (decalSwitch && decalSwitch.checked) {
                          itemStyle.decal = {
                              symbol: 'line',
                              symbolSize: 1,
                              symbolKeepAspect: true,
                              color: 'rgba(0, 0, 0, 0.3)',
                              backgroundColor: 'transparent',
                              dashArrayX: [3, 3],
                              dashArrayY: [3, 3],
                              rotation: Math.PI / 4
                          };
                      }
                      return itemStyle;
                  };
  
                  // Registrar nodo central
                  nodeMap.set(centerNodeName, {
                      name: centerNodeName,
                      value: totalFlow,
                      itemStyle: createItemStyle(centerNodeInfo.itemStyle.color)
                  });
  
                  // Registrar nodos de entrada y enlaces
                  inflows.forEach(link => {
                      const sourceNode = allNodes.get(link.source);
                      nodeMap.set(link.source, {
                          name: link.source,
                          value: link.value,
                          itemStyle: createItemStyle(sourceNode.itemStyle.color)
                      });
                      links.push({
                          source: link.source,
                          target: centerNodeName,
                          value: link.value,
                          lineStyle: {
                              color: 'gradient',
                              opacity: 0.7
                          }
                      });
                  });
  
                  // Registrar nodos de salida y enlaces
                  outflows.forEach(link => {
                      const targetNode = allNodes.get(link.target);
                      nodeMap.set(link.target, {
                          name: link.target,
                          value: link.value,
                          itemStyle: createItemStyle(targetNode.itemStyle.color)
                      });
                      links.push({
                          source: centerNodeName,
                          target: link.target,
                          value: link.value,
                          lineStyle: {
                              color: 'gradient',
                              opacity: 0.7
                          }
                      });
                  });
  
                  const option = {
                      // Título integrado en el sub-Sankey
                      title: {
                          text: 'Vista Detallada del Flujo',
                          subtext: `${centerNodeName} - ${yearSelector.value} `,
                          left: 'center',
                          top: 10,
                          textStyle: {
                              color: '#6a1c32',
                              fontSize: 16,
                              fontWeight: 'bold'
                          },
                          subtextStyle: {
                              color: '#666',
                              fontSize: 12
                          }
                      },
                      // Configuración de accesibilidad para sub-sankey
                      aria: {
                          enabled: true
                      },
                      tooltip: {
                          trigger: 'item',
                          triggerOn: 'mousemove',
                          formatter: function (params) {
                              if (params.dataType === 'edge') {
                                  // Para enlaces (flujos)
                                  return `${params.data.source} → ${params.data.target}: ${formatNumber(params.value)} `;
                              } else {
                                  // Para nodos
                                  return `< b > ${params.name}</b > <br />Valor: ${formatNumber(params.value)} `;
                              }
                          },
                          extraCssText: 'max-width:400px; white-space: normal;'
                      },
                      graphic: (() => {
                          const legendItems = Array.from(nodeMap.values())
                              .filter(node => window.sankeyConfig.energeticColors[node.name])
                              .sort((a, b) => a.name.localeCompare(b.name));
  
                          const graphics = [];
                          const itemsPerRow = 4; // Más elementos por fila
                          const itemWidth = 140; // Más ancho por elemento
                          const itemHeight = 18;
                          const startX = 30;
                          const startY = 60; // Más espacio desde abajo
  
                          // Título de la leyenda
                          graphics.push({
                              type: 'text',
                              left: 'center',
                              bottom: startY + (Math.ceil(legendItems.length / itemsPerRow) * itemHeight) + 15,
                              style: {
                                  text: 'Leyenda de Energéticos',
                                  fontSize: 12,
                                  fill: '#6a1c32',
                                  fontWeight: 'bold',
                                  textAlign: 'center'
                              }
                          });
  
                          // Elementos de la leyenda
                          legendItems.forEach((node, index) => {
                              const row = Math.floor(index / itemsPerRow);
                              const col = index % itemsPerRow;
                              const x = startX + col * itemWidth;
                              const y = startY + row * itemHeight;
  
                              // Cuadro de color
                              graphics.push({
                                  type: 'rect',
                                  left: x,
                                  bottom: y,
                                  shape: { width: 12, height: 12 },
                                  style: {
                                      fill: window.sankeyConfig.energeticColors[node.name],
                                      stroke: '#333',
                                      lineWidth: 1
                                  }
                              });
  
                              // Texto
                              graphics.push({
                                  type: 'text',
                                  left: x + 18,
                                  bottom: y + 6,
                                  style: {
                                      text: node.name,
                                      fontSize: 9,
                                      fill: '#333',
                                      textAlign: 'left',
                                      textVerticalAlign: 'middle'
                                  }
                              });
                          });
  
                          // Nota explicativa
                          graphics.push({
                              type: 'text',
                              left: 'center',
                              bottom: 15,
                              style: {
                                  text: '*NOTA: "EP" = Energía Primaria, "ES" = Energía Secundaria y "V.I. y Dif. Est." = Variación de Inventarios y Diferencia Estadística',
                                  fontSize: 8,
                                  fill: '#666',
                                  textAlign: 'center',
                                  width: 500,
                                  overflow: 'break'
                              }
                          });
  
                          return graphics;
                      })(),
                      series: [{
                          type: 'sankey',
                          top: 60,
                          bottom: 120,
                          left: 20,
                          right: 120,
                          data: Array.from(nodeMap.values()),
                          links: links,
                          nodeWidth: 35,
                          nodeGap: 20,
                          layoutIterations: 0,
                          nodeAlign: 'justify',
                          label: {
                              formatter: function (params) {
                                  const value = params.data.value || 0;
                                  const formattedValue = value.toLocaleString('es-MX', {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2
                                  });
                                  return `${params.data.name} \n${formattedValue} PJ`;
                              },
                              color: '#000',
                              fontSize: 7,
                              fontWeight: 'normal',
                              backgroundColor: '#ffffff',
                              borderColor: '#808080',
                              borderWidth: 1,
                              borderRadius: 3,
                              padding: 4
                          },
                          labelLayout: function (params) {
                              if (params.dataType !== 'node') return {};
                              const r = params.rect; // bounding box del nodo
                              const padding = 6;
  
                              // Obtener el ancho del gráfico para determinar posición
                              const chartWidth = subSankeyChart?.getWidth ? subSankeyChart.getWidth() : (r.x + r.width) * 2;
  
                              // Determinar si es la última columna (más a la derecha)
                              const isLastColumn = (r.x + r.width / 2) > (chartWidth * 0.75);
  
                              // Si es la última columna, etiqueta hacia la izquierda
                              // Si no, etiqueta hacia la derecha
                              const labelToRight = !isLastColumn;
  
                              return {
                                  x: labelToRight ? r.x + r.width + padding : r.x - padding,
                                  y: r.y + r.height / 2,
                                  verticalAlign: 'middle',
                                  align: labelToRight ? 'left' : 'right'
                              };
                          },
  
                          labelLayout: function (params) {
                              if (params.dataType === 'edge') {
                                  const link = links[params.dataIndex];
                                  const isInflow = link.target === centerNodeName;
                                  return {
                                      x: params.labelRect.x + (isInflow ? -8 : 8),
                                      align: isInflow ? 'right' : 'left',
                                      verticalAlign: 'middle'
                                  };
                              }
                          },
                          lineStyle: {
                              color: 'gradient',
                              curveness: 0.5
                          },
                          emphasis: {
                              focus: 'adjacency'
                          }
                      }]
                  };
  
                  subSankeyChart.setOption(option);
  
                  // El botón de descarga ahora abre el modal (manejado en otro lugar)
              }
  
              // Portal para tooltips de controles
              function setupControlTooltipsPortal() {
                  let portal = document.getElementById('ui-tooltip-portal');
                  if (!portal) {
                      portal = document.createElement('div');
                      portal.id = 'ui-tooltip-portal';
                      document.body.appendChild(portal);
                  }
  
                  const attach = (tc) => {
                      const tip = tc.querySelector('.tooltip');
                      if (!tip) return;
  
                      const show = () => {
                          // Clonar contenido del tooltip embebido
                          const clone = tip.cloneNode(true);
                          // Normalizar estilos dentro del portal
                          clone.style.position = 'static';
                          clone.style.visibility = 'visible';
                          clone.style.opacity = '1';
                          clone.style.transform = 'none';
                          portal.innerHTML = '';
                          portal.appendChild(clone);
  
                          // Calcular posición (debajo del control)
                          const r = tc.getBoundingClientRect();
                          // Forzar layout para conocer tamaño del clon
                          const cr = clone.getBoundingClientRect();
                          const left = Math.max(8, Math.min(r.left + r.width / 2 - cr.width / 2, window.innerWidth - cr.width - 8));
                          const top = r.bottom + 10;
  
                          portal.style.left = left + 'px';
                          portal.style.top = top + 'px';
                      };
  
                      const hide = () => { portal.innerHTML = ''; };
  
                      tc.addEventListener('mouseenter', show);
                      tc.addEventListener('mouseleave', hide);
                      window.addEventListener('scroll', hide, { passive: true });
                      window.addEventListener('resize', hide);
                  };
  
                  document.querySelectorAll('.controls .tooltip-container').forEach(attach);
              }
  
              setupControlTooltipsPortal();
  
              // ...existing code...
          });
  
      </script>
      const parentName = parentData["Nodo Padre"];
      const childEnergetic = parentData["Nodos Hijo"].find(hijo => hijo["Nodo Hijo"] === nodeName);
      if (childEnergetic && childEnergetic[selectedYear] !== undefined && childEnergetic[selectedYear] !== null) {
      const parentColor = window.sankeyConfig.energeticColors[parentName] || '#888';
      const row = tbody.insertRow();
      row.innerHTML = `<td> <span
              style="display:inline-block; width:15px; height:15px; background-color:${parentColor}; border-radius:3px; margin-right:5px; vertical-align:middle;"></span>${
          parentName }</td>
      <td>${formatNumber(childEnergetic[selectedYear])}</td>
      <td>
          <div id="sparkline-parent-${index}" class="sparkline-container" data-source="${parentName}"
              data-target="${nodeName}"></div>
      </td>`;
      parentRows++;
      }
      });
  
      if (parentRows > 0) {
      parentNodesContainer.innerHTML = '<h4 style="margin-top: 1.5rem;">Participación del Energético en la Cadena de
          Valor</h4>';
      parentNodesContainer.appendChild(parentTable);
      }
  
      valuesContainer.innerHTML = detailsHtml;
      valuesContainer.insertAdjacentHTML('beforeend', '<div id="selected-balance-container"
          style="margin-top: 2rem; padding-top: 1rem; border-top: 2px dashed #ccc;"></div>');
      valuesContainer.insertAdjacentHTML('beforeend', parentNodesContainer.innerHTML);
  
      const inflowTable = document.getElementById('inflow-table');
      const outflowTable = document.getElementById('outflow-table');

