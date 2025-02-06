import pool from "../config/db";

// ✅ Get Todos From Database
export const getTodosFromDB = async () => {
  try {
    const connection = await pool.getConnection();
    const rows = await connection.query("SELECT * FROM todos");
    connection.release();
    return rows;
  } catch (error) {
    throw new Error("Database query failed");
  }
};

// ✅ Create Todo in Database
export const createTodoInDB = async (title: string, completed: boolean) => {
  try {
    const connection = await pool.getConnection();
    const result = await connection.query("INSERT INTO todos (title, completed) VALUES (?, ?)", [
      title,
      completed,
    ]);
    connection.release();
    return { id: result.insertId, title, completed };
  } catch (error) {
    throw new Error("Failed to insert todo");
  }
};
