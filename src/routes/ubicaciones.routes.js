// src/routes/ubicaciones.routes.js
import { Router } from 'express'
import {listarUbicaciones,} from '../controladores/ubicacionesCtrl.js'
const router = Router();

// Ruta POST para crear una nueva ubicación
router.get('/ubicaciones', listarUbicaciones);

export default router;
