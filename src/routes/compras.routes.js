import { Router } from 'express';
import { getCarrito, agregarAlCarrito, realizarCompra } from '../controladores/comprasCtrl.js';
import app from '../app.js';

const router = Router();

// Ruta para obtener los productos en el carrito
router.get('/carrito/:cliente_id', getCarrito);

// Ruta para agregar productos al carrito
router.post('/carrito', agregarAlCarrito);

// Ruta para realizar la compra
router.post('/compra', realizarCompra);

app.post('/agregar-al-carrito', agregarAlCarrito);

export default router;
