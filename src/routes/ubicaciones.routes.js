// src/routes/ubicaciones.routes.js
import { Router } from 'express';
import { crearUbicacion } from '../controladores/ubicacionesCtrl.js';
const router = Router();

// Ruta POST para crear una nueva ubicación
router.post('/ubicaciones', crearUbicacion);

export default router;
