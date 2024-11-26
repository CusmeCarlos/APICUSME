import { Router } from 'express';
import { generarReporte } from '../controladores/reporteController.js';

const router = Router();

router.post('/reportes', generarReporte);

export default router;
