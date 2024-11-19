// src/routes/ubicaciones.routes.js
import { Router } from 'express'
import {listarUbicaciones,crearUbicacion} from '../controladores/ubicacionesCtrl.js'
const router = Router();

// Ruta POST para crear una nueva ubicación
router.get('/ubicaciones', listarUbicaciones);
router.post('/ubicaciones', crearUbicacion);

export default router;
