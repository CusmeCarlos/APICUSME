import express from 'express';
import { conmysql } from '../db.js';

const router = express.Router();

// Obtener todas las actividades
router.get('/actividades', (req, res) => {
  conmysql.query('SELECT * FROM Actividades', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Agregar una nueva actividad
router.post('/actividades', (req, res) => {
  const { descripcion, tipo_actividad, estudiante_id } = req.body;
  conmysql.query(
    'INSERT INTO Actividades (descripcion, tipo_actividad, estudiante_id) VALUES (?, ?, ?)',
    [descripcion, tipo_actividad, estudiante_id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: result.insertId, descripcion, tipo_actividad, estudiante_id });
    }
  );
});

export default router;
