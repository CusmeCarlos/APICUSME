import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno

const conmysql = mysql.createConnection({
  host: process.env.BD_HOST,         // 
  user: process.env.DB_USER,         // 
  password: process.env.DB_PASSWORD, // 
  database: process.env.BD_DATABASE, // 
  port: process.env.DB_PORT          // 
});

conmysql.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err.stack);
    return;
  }
  console.log('Conectado a la base de datos MySQL en Railway');
});

export { conmysql };
