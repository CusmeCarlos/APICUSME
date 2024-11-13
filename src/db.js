// db.js
import { createPool } from 'mysql2/promise';
import { BD_HOST, DB_USER, DB_PASSWORD, BD_DATABASE, DB_PORT } from './config.js';

// Crear un pool de conexiones con la base de datos
export const conmysql = createPool({
    host: BD_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: BD_DATABASE,
    port: DB_PORT,
    waitForConnections: true,  // Espera si el pool de conexiones está lleno
    connectionLimit: 10,       // Límite de conexiones en el pool
    queueLimit: 0              // Sin límite en la cola de conexiones
});
