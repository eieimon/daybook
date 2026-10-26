import express from "express";
import {
  getTodosByUserId,
  createTodo,
  updateTodoById,
  deleteTodoById,
} from "../controllers/todoController.js";

const router = express.Router();

// Register todo routes

router.get("/todos/user/:userId", getTodosByUserId);
router.post("/todos", createTodo);
router.put("/todos/:id", updateTodoById);
router.delete("/todos/:id", deleteTodoById);

export default router;
