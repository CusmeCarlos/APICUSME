import { conmysql } from '../db.js';

export const obtenerActividades = async (req, res) => {
  try {
    const [rows] = await conmysql.query('SELECT * FROM actividades');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const crearActividad = async (req, res) => {
  const { descripcion } = req.body;
  try {
    const [result] = await conmysql.query(
      'INSERT INTO actividades (descripcion) VALUES (?)',
      [descripcion]
    );
    res.status(201).json({ id: result.insertId, descripcion });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const actualizarActividad = async (req, res) => {
  const { id } = req.params;
  const { descripcion } = req.body;
  try {
    await conmysql.query('UPDATE actividades SET descripcion = ? WHERE id_actividad = ?', [descripcion, id]);
    res.status(200).json({ message: 'Actividad actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const eliminarActividad = async (req, res) => {
  const { id } = req.params;
  try {
    await conmysql.query('DELETE FROM actividades WHERE id_actividad = ?', [id]);
    res.status(200).json({ message: 'Actividad eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
