import { Router } from 'express';
import { registrarCompra } from '../controladores/comprasCtrl.js';

const router = Router();

router.get('/compras', registrarCompra);

export default router;
