// src/models/horasModel.js

import { conmysql } from '../db.js';
import db from 'mysql2/promise';
const horasModel = {
  // Función para insertar horas
  insertHoras: (data) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO Horas (horas, actividad_id, validada, supervisor_id, estudiante_id, fecha_registro) VALUES (?, ?, ?, ?, ?, ?)';
      db.query(query, [data.horas, data.actividad_id, data.validada, data.supervisor_id, data.estudiante_id, data.fecha_registro], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  // Puedes agregar más funciones aquí para manejar otras operaciones, como obtener horas, actualizar, eliminar, etc.
};

export default horasModel;
