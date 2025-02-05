import mariadb from "mariadb";
import env from "./env";

// Create a connection pool using environment variables
const pool = mariadb.createPool({
  host: env.DB_HOST,
  port: Number(env.DB_PORT),
  user: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  connectionLimit: 5,
});

// Function to get a database connection
export const getConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to MariaDB!");
    return connection;
  } catch (err) {
    console.error("Error connecting to MariaDB:", err);
    throw err;
  }
};

// Export the pool if you need direct access elsewhere
export default pool;
