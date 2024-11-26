import { Router } from 'express';
import {
  registrarHora,
  obtenerHorasPorUsuario,
  aprobarHora
} from '../controladores/HoraController.js';

const router = Router();

router.post('/horas', registrarHora);
router.get('/horas/:id_usuario', obtenerHorasPorUsuario);
router.patch('/horas/:id_hora', aprobarHora);

export default router;
