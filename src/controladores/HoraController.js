import horasModel from '../models/horasModel.js';  // Asegúrate de que la ruta sea correcta
import jwt from 'jsonwebtoken';

const autenticar = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // El token se pasa como "Bearer <token>"

  if (!token) {
    return res.status(403).json({ error: 'Acceso denegado. No se proporcionó un token.' });
  }

  jwt.verify(token, 'secretkey', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido o expirado.' });
    }

    req.userId = decoded.userId; // Adjunta el userId decodificado al objeto req
    next();
  });
};

// Lógica para crear/insertar horas
const crearHoras = async (req, res) => {
  const { horas, actividad_id, validada, supervisor_id, estudiante_id } = req.body;

  try {
    const resultado = await horasModel.insertHoras({
      horas,
      actividad_id,
      validada,
      supervisor_id,
      estudiante_id,
      fecha_registro: new Date(),
    });
    res.status(200).json({ mensaje: 'Horas creadas correctamente', data: resultado });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear horas', detalles: error });
  }
};

export { autenticar, crearHoras };
