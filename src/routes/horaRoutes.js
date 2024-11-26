import { Router } from 'express';
import { conmysql } from '../db.js';

const router = Router();

// Obtener todas las horas
router.get('/horas', async (req, res) => {
  try {
    const [rows] = await conmysql.query('SELECT * FROM Horas');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las horas' });
  }
});

export default router;
