import { conmysql } from '../db.js';
import jwt from 'jsonwebtoken';

export const obtenerHorasEstudiante = async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ error: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, 'clave_secreta');
    const estudianteId = decoded.id;

    const [actividades] = await conmysql.query(
      'SELECT fecha, descripcion, horas FROM Actividades WHERE estudiante_id = ?',
      [estudianteId]
    );

    const totalHoras = actividades.reduce((sum, actividad) => sum + actividad.horas, 0);

    res.json({ totalHoras, actividades });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las horas' });
  }
};
