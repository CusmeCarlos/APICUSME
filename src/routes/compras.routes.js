import { Router } from 'express';
import { registrarCompra } from '../controladores/comprasCtrl.js';

const router = Router();

router.post('/compras', registrarCompra);

export default router;
