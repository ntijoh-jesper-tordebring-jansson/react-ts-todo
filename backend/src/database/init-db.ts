import mariadb from "mariadb";
import env from "../config/env";

// Create a temporary connection to check and create the database
const createDatabase = async () => {
  let connection;
  try {
    connection = await mariadb.createConnection({
      host: env.DB_HOST,
      user: env.DB_USERNAME,
      password: env.DB_PASSWORD,
    });

    console.log(`🔍 Checking if database "${env.DB_NAME}" exists...`);
    
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${env.DB_NAME}\`;`);
    console.log(`✅ Database "${env.DB_NAME}" is ready!`);
  } catch (err) {
    console.error("❌ Error creating database:", err);
  } finally {
    if (connection) connection.end();
  }
};

// Create tables inside the database
const createTables = async () => {
  let connection;
  try {
    connection = await mariadb.createPool({
      host: env.DB_HOST,
      user: env.DB_USERNAME,
      password: env.DB_PASSWORD,
      database: env.DB_NAME,
      connectionLimit: 5,
    }).getConnection();

    console.log("🔄 Dropping existing tables...");
    await connection.query("DROP TABLE IF EXISTS todos, users;");

    console.log("📌 Creating tables...");

    // Users Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(320) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Todos Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS todos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        completed BOOLEAN DEFAULT FALSE,
        user_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    console.log("✅ Tables created successfully!");
  } catch (err) {
    console.error("❌ Error creating tables:", err);
  } finally {
    if (connection) connection.release();
  }
};

// Run database initialization
const initDatabase = async () => {
  await createDatabase();
  await createTables();
  process.exit();
};

initDatabase();
