import { Router } from "express";
import { getTodosByUserController, createTodoForUserController } from "../controllers/todo.controller";

const router = Router();

// ✅ Define Routes
router.get("/user/:userId", getTodosByUserController);
router.post("/user/:userId", createTodoForUserController);

export default router;
