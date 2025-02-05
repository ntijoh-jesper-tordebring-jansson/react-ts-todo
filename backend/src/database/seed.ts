import mariadb from "mariadb";
import bcrypt from "bcrypt";
import env from "../config/env";

const seedDatabase = async () => {
  let connection;
  try {
    const pool = mariadb.createPool({
      host: env.DB_HOST,
      user: env.DB_USERNAME,
      password: env.DB_PASSWORD,
      database: env.DB_NAME,
      connectionLimit: 5,
    });

    connection = await pool.getConnection();

    console.log("🌱 Seeding database...");

    // Insert sample users with hashed passwords
    const passwordHash1 = await bcrypt.hash("a", 10);
    const passwordHash2 = await bcrypt.hash("b", 10);
    const passwordHash3 = await bcrypt.hash("c", 10);

    await connection.batch(`
      INSERT INTO users (username, email, password) VALUES 
      (?, ?, ?),
      (?, ?, ?),
      (?, ?, ?);
    `, [
      "a", "a@mail.com", passwordHash1,
      "b", "b@mail.com", passwordHash2,
      "c", "c@mail.com", passwordHash3
    ]);

    // Get user IDs for foreign key relationship
    const users = await connection.query("SELECT id FROM users;");
    const userId1 = users[0].id;
    const userId2 = users[1].id;
    const userId3 = users[1].id;

    // Insert sample todo items
    await connection.batch(`
      INSERT INTO todos (title, description, completed, user_id)
      VALUES 
        (?, ?, ?, ?),
        (?, ?, ?, ?),
        (?, ?, ?, ?)
    `, [
      "Buy groceries", "Milk, eggs, bread, and fruits", false, userId1,
      "Finish project", "Complete backend API and documentation", false, userId2,
      "Workout", "Go to the gym for an hour", true, userId3
    ]);

    console.log("✅ Database seeded successfully!");
  } catch (err) {
    console.error("❌ Error seeding database:", err);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
};

seedDatabase();
