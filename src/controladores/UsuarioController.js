import { conmysql } from '../db.js';

export const obtenerUsuarios = async (req, res) => {
  try {
    const [rows] = await conmysql.query('SELECT * FROM usuarios');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const crearUsuario = async (req, res) => {
  const { nombre, correo, tipo_usuario } = req.body;
  try {
    const [result] = await conmysql.query(
      'INSERT INTO usuarios (nombre, correo, tipo_usuario) VALUES (?, ?, ?)',
      [nombre, correo, tipo_usuario]
    );
    res.status(201).json({ id: result.insertId, nombre, correo, tipo_usuario });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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

export const eliminarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    await conmysql.query('DELETE FROM usuarios WHERE id_usuario = ?', [id]);
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
