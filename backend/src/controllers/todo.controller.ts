import { Request, Response } from "express";
import { getTodosFromDB, createTodoInDB } from "../services/todo.services";

// ✅ Get All Todos
export const getAllTodos = async (req: Request, res: Response) => {
  try {
    const todos = await getTodosFromDB();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};

// ✅ Create Todo
export const createTodo = async (req: Request, res: Response) => {
  try {
    const { title, completed } = req.body;
    const newTodo = await createTodoInDB(title, completed);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: "Failed to create todo" });
  }
};
