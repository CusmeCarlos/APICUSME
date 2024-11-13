import express from 'express';
import { obtenerCarrito, agregarAlCarrito, eliminarDelCarrito } from '../controladores/carritoCtrl.js';

const router = express.Router();

// Definir las rutas del carrito
router.get('/', obtenerCarrito); // Obtener carrito
router.post('/agregar', agregarAlCarrito); // Agregar producto al carrito
router.delete('/eliminar/:id', eliminarDelCarrito); // Eliminar producto del carrito

// Exportar las rutas del carrito
export default router;

