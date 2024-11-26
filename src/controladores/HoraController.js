import { conmysql } from '../db.js';

export const registrarHora = async (req, res) => {
  const { id_usuario, id_actividad, fecha, horas } = req.body;
  try {
    await conmysql.query(
      'INSERT INTO horas_registradas (id_usuario, id_actividad, fecha, horas, aprobado) VALUES (?, ?, ?, ?, FALSE)',
      [id_usuario, id_actividad, fecha, horas]
    );
    res.status(201).json({ message: 'Hora registrada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerHorasPorUsuario = async (req, res) => {
  const { id_usuario } = req.params;
  try {
    const [rows] = await conmysql.query(
      'SELECT * FROM horas_registradas WHERE id_usuario = ?',
      [id_usuario]
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const aprobarHora = async (req, res) => {
  const { id_hora } = req.params;
  try {
    await conmysql.query('UPDATE horas_registradas SET aprobado = TRUE WHERE id_hora = ?', [id_hora]);
    res.status(200).json({ message: 'Hora aprobada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
