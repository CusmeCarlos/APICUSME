import { Router } from 'express';
import { conmysql } from '../db.js';

const router = Router();

// Obtener todas las actividades
router.get('/actividades', async (req, res) => {
  try {
    const [rows] = await conmysql.query('SELECT * FROM Actividades');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener actividades' });
  }
});

export default router;
