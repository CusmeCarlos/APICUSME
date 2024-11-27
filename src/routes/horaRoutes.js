import express from 'express';
import { autenticar, crearHoras } from '../controladores/HoraController.js';

const router = express.Router();

// Ruta para crear horas, protegida por autenticación
router.post('/horas', autenticar, crearHoras);

export default router;
