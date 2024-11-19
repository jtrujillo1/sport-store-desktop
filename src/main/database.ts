import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Conexión a la base de datos
connection.connect((err) => {
  if (err) {
    console.error("Error de conexión a la base de datos:", err);
  } else {
    console.log("Conexión exitosa a la base de datos");
  }
});

// Función para ejecutar consultas
export const queryDatabase = (query: string, values: any[] = []) => {
  return new Promise<any>((resolve, reject) => {
    connection.query(query, values, (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
};

export default connection;
