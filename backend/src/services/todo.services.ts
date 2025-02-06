import pool from "../config/db";
import { Todo } from "../models/todo.model";

// ✅ Get Todos For Specific User From Database
export const getTodosByUser = async (userId: number): Promise<Todo[]> => {
  try {
    const connection = await pool.getConnection();
    const todos: Todo[] = await connection.query("SELECT * FROM todos WHERE user_id = ?", [
      userId
    ]);
    connection.release();
    return todos;
  } catch (error : any) {
    throw new Error("Error fetching todos: " + error.message);
  }
};

// ✅ Create Todo For Specific User In Database
export const createTodoForUser = async (title: string, description: string, user_id: number) => {
  try {
    const connection = await pool.getConnection();
    const result = await connection.query("INSERT INTO todos (title, description, user_id) VALUES (?, ?, ?)", [
      title,
      description,
      user_id,
    ]);
    connection.release();
    return { result };
  } catch (error) {
    throw new Error("Failed to insert todo");
    
  }
};
