import bcrypt from 'bcryptjs';
import { conmysql } from '../db.js';

// Obtener todos los usuarios
export const obtenerUsuarios = async (req, res) => {
  try {
    const [rows] = await conmysql.query('SELECT * FROM usuarios');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo usuario
export const crearUsuario = async (req, res) => {
  const { nombre, correo, password, tipo_usuario } = req.body;
  
  // Validación básica
  if (!nombre || !correo || !password || !tipo_usuario) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }
  
  try {
    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar el nuevo usuario en la base de datos
    const [result] = await conmysql.query(
      'INSERT INTO usuarios (nombre, correo, password, tipo_usuario) VALUES (?, ?, ?, ?)',
      [nombre, correo, hashedPassword, tipo_usuario]
    );

    // Responder con los datos del usuario recién creado
    res.status(201).json({
      id: result.insertId,
      nombre,
      correo,
      tipo_usuario
    });
  } catch (error) {
    console.error('Error en la creación del usuario:', error);
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
};

// Actualizar un usuario existente
export const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, correo, tipo_usuario } = req.body;
  try {
    await conmysql.query(
      'UPDATE usuarios SET nombre = ?, correo = ?, tipo_usuario = ? WHERE id_usuario = ?',
      [nombre, correo, tipo_usuario, id]
    );
    res.status(200).json({ message: 'Usuario actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un usuario
export const eliminarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    await conmysql.query('DELETE FROM usuarios WHERE id_usuario = ?', [id]);
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
