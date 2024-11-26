import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import actividadRoutes from './routes/actividadRoutes.js';
import horaRoutes from './routes/horaRoutes.js';
import reporteRoutes from './routes/reporteRoutes.js';
import { conmysql } from './db.js';
import UsuarioRoutes from './routes/UsuariosRoutes.js';

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

app.use('/api', actividadRoutes);
app.use('/api', horaRoutes);
app.use('/api', UsuarioRoutes)
app.use('/api', reporteRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

export default app;
