import Todo from "../models/todoModel.js";
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";

/**
 * @desc Get todos by user_id
 * @route GET /api/todos/user/:userId
 * @params {req, res} - The request and response object.
 * @returns {object} - success state and lists of todos.
 */
const getTodosByUserId = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  // Validate the userId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400);
    throw new Error("Invalid user ID");
  }

  const todos = await Todo.find({ user_id: userId });

  if (!todos || todos.length === 0) {
    res.status(404);
    throw new Error("No todos found for the user");
  }

  res.status(200).json({ success: true, todos });
});

/**
 * @desc Create a new todo
 * @route POST /api/todos
 * @params {req, res} - The request and response object.
 * @returns {object} - success state and the created todo.
 */
const createTodo = asyncHandler(async (req, res) => {
  const { title, description, user_id } = req.body;

  // Validate the input
  if (!title || !description || !user_id) {
    res.status(400);
    throw new Error("Please provide title, description, and user_id");
  }

  // Validate the user_id
  if (!mongoose.Types.ObjectId.isValid(user_id)) {
    res.status(400);
    throw new Error("Invalid user ID");
  }

  const newTodo = await Todo.create({ title, description, user_id });

  res.status(201).json({ success: true, todo: newTodo });
});

/**
 * @desc Update a todo by ID
 * @route PUT /api/todos/:id
 * @params {req, res} - The request and response object.
 * @returns {object} - success state and the updated todo.
 */
const updateTodoById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  // Validate the todo ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid todo ID");
  }

  const todo = await Todo.findById(id);

  if (!todo) {
    res.status(404);
    throw new Error("Todo not found");
  }

  // Update the todo fields
  if (title !== undefined) todo.title = title;
  if (description !== undefined) todo.description = description;
  if (completed !== undefined) todo.completed = completed;

  const updatedTodo = await todo.save();

  res.status(200).json({ success: true, todo: updatedTodo });
});

/**
 * @desc Delete a todo by ID
 * @route DELETE /api/todos/:id
 * @params {req, res} - The request and response object.
 * @returns {object} - success state and a message.
 */
const deleteTodoById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Validate the todo ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid todo ID");
  }

  const todo = await Todo.findById(id);

  if (!todo) {
    res.status(404);
    throw new Error("Todo not found");
  }

  await todo.remove();

  res
    .status(200)
    .json({ success: true, message: "Todo is deleted successfully" });
});

/**
 * Export the controller functions
 */

export { getTodosByUserId, createTodo, updateTodoById, deleteTodoById };
