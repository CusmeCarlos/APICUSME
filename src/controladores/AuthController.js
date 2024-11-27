import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { conmysql } from '../db.js';

export const login = async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    const [usuarios] = await conmysql.query('SELECT * FROM Usuarios WHERE correo = ?', [correo]);

    if (usuarios.length === 0) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    const usuario = usuarios[0];

    const esValido = await bcrypt.compare(contraseña, usuario.contraseña);

    if (!esValido) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ userId: usuario.id }, 'secretkey', { expiresIn: '1h' });

    res.status(200).json({ message: 'Autenticación exitosa', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
