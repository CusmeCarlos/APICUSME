import { Router } from 'express';
import { registrarHora, obtenerHorasPorUsuario, aprobarHora } from '../controladores/HoraController.js';
import autenticar from '../middlewares/authMiddleware.js';

const router = Router();

// Ruta protegida para registrar horas
router.post('/registrar', autenticar, registrarHora);

// Rutas protegidas para obtener horas y aprobar horas
router.get('/horas/:usuarioId', autenticar, obtenerHorasPorUsuario);
router.put('/aprobar/:horaId', autenticar, aprobarHora);

export default router;
