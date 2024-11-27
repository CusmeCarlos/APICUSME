import { conmysql } from '../db.js';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';

export const crearUsuario = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { nombre, correo, rol_id, contraseña } = req.body;

  // Encriptar contraseña
  const hashedPassword = bcrypt.hashSync(contraseña, 10); 

  try {
    const [result] = await conmysql.query(
      'INSERT INTO Usuarios (nombre, correo, contraseña, rol_id) VALUES (?, ?, ?, ?)',
      [nombre, correo, hashedPassword, rol_id]
    );
    res.status(201).json({ id: result.insertId, nombre, correo, rol_id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
