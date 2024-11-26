import { Router } from 'express';
import {
  obtenerActividades,
  crearActividad,
  actualizarActividad,
  eliminarActividad
} from '../controladores/actividadController.js';

const router = Router();

router.get('/actividades', obtenerActividades);
router.post('/actividades', crearActividad);
router.put('/actividades/:id', actualizarActividad);
router.delete('/actividades/:id', eliminarActividad);

export default router;
