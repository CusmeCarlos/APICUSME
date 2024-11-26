import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const conmysql = mysql.createPool({
  host: process.env.BD_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.BD_DATABASE,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export { conmysql };
