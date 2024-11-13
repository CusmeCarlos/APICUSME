import express from 'express';
import { procesarCompra } from '../controladores/comprasCtrl.js';  // Importar el controlador para procesar la compra

const router = express.Router();

// Ruta para procesar la compra
router.post('/compras', procesarCompra);

export default router;
