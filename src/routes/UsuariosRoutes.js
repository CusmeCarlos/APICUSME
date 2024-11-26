import { Router } from 'express';
import { conmysql } from '../db.js';

const router = Router();

router.get('/usuarios', async (req, res) => {
  try {
    const [rows] = await conmysql.query('SELECT * FROM Usuarios');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

export default router;
