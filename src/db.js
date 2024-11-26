import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno

const conmysql = mysql.createConnection({
  host: process.env.BD_HOST,         // 'autorack.proxy.rlwy.net'
  user: process.env.DB_USER,         // 'root'
  password: process.env.DB_PASSWORD, // tu contraseña
  database: process.env.BD_DATABASE, // 'BD_PASANTIAS'
  port: process.env.DB_PORT          // '37100'
});

conmysql.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err.stack);
    return;
  }
  console.log('Conectado a la base de datos MySQL en Railway');
});

export { conmysql };
