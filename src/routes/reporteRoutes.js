import { Router } from 'express';
import { conmysql } from '../db.js';

const router = Router();

// Obtener todos los reportes
router.get('/reportes', async (req, res) => {
  try {
    const [rows] = await conmysql.query('SELECT * FROM Reportes');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener reportes' });
  }
});

export default router;
