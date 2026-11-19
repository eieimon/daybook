import express from "express";
import {
  getTodosByUserId,
  createTodo,
  updateTodoById,
  deleteTodoById,
} from "../controllers/todoController.js";

const router = express.Router();

// Register todo routes

router.get("/user/:userId", getTodosByUserId);
router.post("/", createTodo);
router.put("/:id", updateTodoById);
router.delete("/:id", deleteTodoById);

export default router;
