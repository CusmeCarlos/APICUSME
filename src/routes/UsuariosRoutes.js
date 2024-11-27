import { Router } from 'express';
import { check } from 'express-validator';
import { crearUsuario } from '../controladores/UsuarioController.js';

const router = Router();

// Validaciones para la creación de usuario
router.post('/usuarios', [
  check('nombre').notEmpty().withMessage('El nombre es obligatorio'),
  check('correo').isEmail().withMessage('El correo debe ser válido'),
  check('contraseña').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
], crearUsuario);

export default router;
