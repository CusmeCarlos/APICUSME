// src/routes/compras.routes.js
import { Router } from 'express';
import { getCarrito, agregarAlCarrito, realizarCompra } from '../controladores/comprasCtrl.js';

const router = Router();

// Ruta para obtener los productos en el carrito
router.get('/carrito/:cliente_id', getCarrito);

// Ruta para agregar productos al carrito
router.post('/carrito', agregarAlCarrito);

// Ruta para realizar la compra
router.post('/compra', realizarCompra);

export default router;
