import { conmysql } from '../db.js';

export const generarReporte = async (req, res) => {
  const { id_usuario, rango_inicio, rango_fin } = req.body;
  try {
    const [rows] = await conmysql.query(
      `SELECT * FROM horas_registradas WHERE id_usuario = ? AND fecha BETWEEN ? AND ? AND aprobado = TRUE`,
      [id_usuario, rango_inicio, rango_fin]
    );

    // Simulación de generación de archivo
    const archivo = `reporte_${id_usuario}_${Date.now()}.pdf`;

    await conmysql.query(
      `INSERT INTO reportes (id_usuario, rango_inicio, rango_fin, archivo_generado) VALUES (?, ?, ?, ?)`,
      [id_usuario, rango_inicio, rango_fin, archivo]
    );

    res.status(200).json({ message: 'Reporte generado exitosamente', archivo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
