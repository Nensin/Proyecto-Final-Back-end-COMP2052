const express = require('express');
require('dotenv').config(); 
const cors = require('cors');



const app = express();


// Middleware para que Express entienda JSON
app.use(cors());
app.use(express.json());

// Rutas
const tasksRoutes = require('./routes/tasksRoutes');
app.use('/tasks', tasksRoutes);

// Puerto desde .env
const PORT = process.env.PORT || 3000;

// Retraso antes de iniciar el servidor (en milisegundos)
const STARTUP_DELAY = 5000; // 5 segundos

// Inicia el servidor con un retraso
setTimeout(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}, STARTUP_DELAY);