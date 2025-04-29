const sql = require('mssql');
require('dotenv').config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  }
};

async function testConnection() {
  try {
    await sql.connect(config);
    console.log("Conexión exitosa a SQL Server.");
    sql.close();
  } catch (err) {
    console.error("Error de conexión:", err);
  }
}

testConnection();
