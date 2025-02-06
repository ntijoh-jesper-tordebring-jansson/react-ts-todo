import { Request, Response } from "express";
import { Todo } from "../models/todo.model";
import { getTodosByUser, createTodoForUser } from "../services/todo.services";

// ✅ Get All Todos from specific user
export const getTodosByUserController = async (req: Request, res: Response): Promise<void> => {
  const userId = Number(req.params.userId);
  try {
    const todos: Todo[] = await getTodosByUser(userId);
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos" });
  }
};

// ✅ Create Todo
export const createTodoForUserController = async (req: Request, res: Response): Promise<void> => {
  const userId = Number(req.params.userId);
  try {
    const { title, description } = req.body;
    const result = await createTodoForUser(title, description, userId);
    if (result.result.affectedRows > 0) {
      res.status(200).json({ message: "Todo created successfully" });
    } else {
      res.status(500).json({ error: "Failed to create todo" });
    }
  } catch (error) {
    console.log(console.log(error));
    res.status(500).json({ error: "Failed to create todo" });
  }
};
