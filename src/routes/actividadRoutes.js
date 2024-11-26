import express from 'express';
import { conmysql } from '../db.js';

const router = express.Router();

// Ruta para insertar una actividad
router.post('/actividades', (req, res) => {
  const { descripcion, tipo_actividad, estudiante_id } = req.body;
  const query = `
    INSERT INTO Actividades (descripcion, tipo_actividad, estudiante_id)
    VALUES (?, ?, ?)
  `;

  conmysql.query(query, [descripcion, tipo_actividad, estudiante_id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Actividad insertada correctamente', result });
  });
});

export default router;
