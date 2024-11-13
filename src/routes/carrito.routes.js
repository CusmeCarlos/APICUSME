// En carrito.routes.js
import { Router } from 'express';
import { agregarAlCarrito, grabarCompra } from '../controladores/carritoCtrl.js';

const router = Router();

router.post('/', agregarAlCarrito);
router.post('/comprar', grabarCompra);

export default router;
