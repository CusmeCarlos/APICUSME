import { Router } from 'express';
import { addProductToCart, getCartItems, clearCart } from '../controllers/carrito.controller.js';

const router = Router();

router.post('/carrito', addProductToCart);  // Agregar producto al carrito
router.get('/carrito', getCartItems);       // Obtener productos del carrito
router.delete('/carrito', clearCart);       // Vaciar carrito

export default router;
