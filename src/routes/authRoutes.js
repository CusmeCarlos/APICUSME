import { Router } from 'express';
import { login } from '../controladores/AuthController.js';

const router = Router();

// Ruta para iniciar sesión
router.post('/login', login);

export default router;
