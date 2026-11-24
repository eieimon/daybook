import express from "express";
import {
  getTodosByUserId,
  createTodo,
  updateTodoById,
  deleteTodoById,
} from "../controllers/todoController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Register todo routes with authentication middleware
router.use(protect);

router.get("/user/:userId", getTodosByUserId);
router.post("/", createTodo);
router.put("/:id", updateTodoById);
router.delete("/:id", deleteTodoById);

export default router;
