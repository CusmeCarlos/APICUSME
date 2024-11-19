// src/controllers/ubicaciones.controller.js
import { conmysql } from '../db.js';

// Controlador para crear una ubicación
export const crearUbicacion = async (req, res) => {
  const { lat, lng, titulo, medida } = req.body;

  // Validación básica
  if (!lat || !lng) {
    return res.status(400).json({ message: 'Latitud y longitud son requeridas' });
  }

  try {
    // Guardar la ubicación en la base de datos
    const [result] = await conmysql.execute(
      'INSERT INTO ubicaciones (lat, lng, titulo, medida) VALUES (?, ?, ?, ?)',
      [lat, lng, titulo || 'Sin título', medida || null]
    );

    // Respuesta al cliente
    res.status(201).json({
      message: 'Ubicación guardada correctamente',
      id: result.insertId,
    });
  } catch (err) {
    console.error('Error al guardar la ubicación:', err);
    res.status(500).json({ message: 'Error al guardar la ubicación', error: err.message });
  }
};

// Controlador para listar ubicaciones
export const listarUbicaciones = async (req, res) => {
  try {
    // Consultar todas las ubicaciones de la base de datos
    const [ubicaciones] = await conmysql.query('SELECT * FROM ubicaciones');

    // Respuesta al cliente
    res.status(200).json(ubicaciones);
  } catch (error) {
    console.error('Error al obtener las ubicaciones:', error);
    res.status(500).json({ message: 'Error al obtener las ubicaciones', error: error.message });
  }
};
