// src/controllers/ubicaciones.controller.js
import { conmysql } from '../db.js';  // Asegúrate de que esté correctamente importado

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
      id: result.insertId
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al guardar la ubicación', error: err });
  }
};
