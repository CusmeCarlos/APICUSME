import { Router } from 'express';
import { loginUsuario } from '../controladores/AuthController.js';

const router = Router();

// Ruta para iniciar sesión
router.post('/login', loginUsuario);

export default router;
