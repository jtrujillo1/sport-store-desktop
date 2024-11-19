import mysql from "mysql2/promise";

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// Crear la base de datos si no existe
export const createDatabaseIfNotExist = async () => {
  const connection = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);
  console.log(`Base de datos ${DB_NAME} creada o ya existe.`);

  await connection.end();
};

// Sincronizar las tablas
export const syncDatabase = async () => {
  await createDatabaseIfNotExist();

  const connection = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
  });

  // Crear la tabla de productos
  const createProductsTableQuery = `
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      price DECIMAL(10, 2) NOT NULL,
      stock INT NOT NULL
    );
  `;
  await connection.query(createProductsTableQuery);
  console.log("Tabla de productos sincronizada.");

  // Crear la tabla de ventas
  const createSalesTableQuery = `
    CREATE TABLE IF NOT EXISTS sales (
      id INT AUTO_INCREMENT PRIMARY KEY,
      total_price DECIMAL(10, 2) NOT NULL,
      date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await connection.query(createSalesTableQuery);
  console.log("Tabla de ventas sincronizada.");

  // Crear la tabla intermedia SaleProduct (relación muchos a muchos)
  const createSaleProductTableQuery = `
    CREATE TABLE IF NOT EXISTS sale_product (
      sale_id INT NOT NULL,
      product_id INT NOT NULL,
      quantity INT NOT NULL,
      PRIMARY KEY (sale_id, product_id),
      FOREIGN KEY (sale_id) REFERENCES sales(id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    );
  `;
  await connection.query(createSaleProductTableQuery);
  console.log("Tabla intermedia sale_product sincronizada.");

  await connection.end();
};
