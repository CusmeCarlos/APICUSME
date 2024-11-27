import jwt from 'jsonwebtoken';

// src/middlewares/authMiddleware.js

export const autenticar = (req, res, next) => {
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


export default autenticar;
