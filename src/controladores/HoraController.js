import { conmysql } from '../db.js';
import { validationResult } from 'express-validator';

// Función para registrar una hora
export const registrarHora = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id_usuario, id_actividad, fecha, horas } = req.body;

  if (horas <= 0) {
    return res.status(400).json({ error: 'La cantidad de horas debe ser mayor a cero' });
  }

  try {
    await conmysql.query(
      'INSERT INTO Horas (id_usuario, id_actividad, fecha_registro, horas, estado_hora) VALUES (?, ?, ?, ?, "Pendiente")',
      [id_usuario, id_actividad, fecha, horas]
    );
    res.status(201).json({ message: 'Hora registrada correctamente' });
  } catch (error) {
    console.error('Error al registrar hora:', error);
    res.status(500).json({ error: error.message });
  }
};

// Función para aprobar una hora
export const aprobarHora = async (req, res) => {
  const { horaId } = req.params;

  try {
    const [result] = await conmysql.query(
      'UPDATE Horas SET validada = 1 WHERE id = ?',
      [horaId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Hora no encontrada' });
    }

    res.status(200).json({ message: 'Hora aprobada exitosamente' });
  } catch (error) {
    console.error('Error al aprobar hora:', error);
    res.status(500).json({ error: error.message });
  }

  
};
export const obtenerHorasPorUsuario = async (req, res) => {
  const { id_usuario } = req.params;

  try {
    const [rows] = await conmysql.query(
      'SELECT * FROM Horas WHERE id_usuario = ?',
      [id_usuario]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'No se encontraron horas para este usuario' });
    }

    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener horas por usuario:', error);
    res.status(500).json({ error: error.message });
  }
};