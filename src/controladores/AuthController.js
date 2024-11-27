import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { conmysql } from '../db.js';

export const loginUsuario = async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    const [rows] = await conmysql.query(
      'SELECT id, nombre, password, rol_id FROM Usuarios WHERE correo = ?',
      [correo]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const usuario = rows[0];
    const passwordMatch = bcrypt.compareSync(contraseña, usuario.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: usuario.id, rol_id: usuario.rol_id },
      'clave_secreta',
      { expiresIn: '2h' }
    );

    res.json({ 
      token, 
      usuario: { id: usuario.id, nombre: usuario.nombre, rol_id: usuario.rol_id } 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
