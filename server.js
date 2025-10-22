'use strict';

const express = require('express');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const app = express();
const PORT = process.env.PORT || 3000;
const ROOT_DIR = __dirname;
const DATA_FILE = path.join(ROOT_DIR, 'datos.js');

app.use(express.json({ limit: '10mb' }));
app.use(express.static(ROOT_DIR, { extensions: ['html'] }));

function readDatos() {
  const code = fs.readFileSync(DATA_FILE, 'utf8');
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { filename: 'datos.js' });
  const energyData = sandbox.window.energyData;
  if (!energyData || typeof energyData !== 'object') {
    throw new Error('No se pudo obtener window.energyData desde datos.js');
  }
  return energyData;
}

function writeDatos(data) {
  const content = 'window.energyData = ' + JSON.stringify(data, null, 2) + ';\n';
  fs.writeFileSync(DATA_FILE, content, 'utf8');
}

app.get('/api/datos', (req, res) => {
  try {
    const data = readDatos();
    res.json(data);
  } catch (err) {
    console.error('Error al leer datos.js:', err);
    res.status(500).json({ error: 'No se pudieron cargar los datos.' });
  }
});

app.post('/api/datos', (req, res) => {
  const payload = req.body;
  if (!payload || typeof payload !== 'object' || !payload.Datos) {
    return res.status(400).json({ error: 'Formato invalido. Se esperaba un objeto con la propiedad Datos.' });
  }
  try {
    writeDatos(payload);
    res.json({ status: 'ok' });
  } catch (err) {
    console.error('Error al escribir datos.js:', err);
    res.status(500).json({ error: 'No se pudo guardar datos.js.' });
  }
});

app.post('/save-config', (req, res) => {
  const config = req.body;
  if (!config || typeof config !== 'object') {
    return res.status(400).json({ error: 'Formato invalido. Se esperaba un objeto de configuración.' });
  }
  try {
    const content = 'window.sankeyConfig = ' + JSON.stringify(config, null, 4) + ';\n';
    fs.writeFileSync(path.join(ROOT_DIR, 'sankey_config.js'), content, 'utf8');
    res.send('Configuración guardada exitosamente.');
  } catch (err) {
    console.error('Error al escribir sankey_config.js:', err);
    res.status(500).json({ error: 'No se pudo guardar la configuración.' });
  }
});

app.listen(PORT, () => {
  console.log(`Editor corriendo en http://localhost:${PORT}/editor.html`);
});
