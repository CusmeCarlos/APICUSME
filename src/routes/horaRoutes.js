import express from 'express';
import { obtenerHorasEstudiante } from '../controladores/HoraController.js';

const router = express.Router();

// Endpoint para obtener las horas registradas por un estudiante
router.get('/horas', obtenerHorasEstudiante);

export default router;
