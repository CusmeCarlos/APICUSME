import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import actividadRoutes from './routes/actividadRoutes.js';
import horaRoutes from './routes/HoraRoutes.js';  // Ruta de horas
import reporteRoutes from './routes/reporteRoutes.js';
import usuarioRoutes from './routes/UsuariosRoutes.js'; // Ruta de usuarios
import { conmysql } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Usar las rutas
app.use('/api', usuarioRoutes);  // Ruta de usuarios
app.use('/api', actividadRoutes);  // Ruta de actividades
app.use('/api', horaRoutes);  // Ruta de horas
app.use('/api', reporteRoutes);  // Ruta de reportes

app.use((req, res, next) => {
  res.status(404).json({ message: 'Endpoint no encontrado' });
});

export default app;
