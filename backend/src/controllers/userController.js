import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

/**
 * registerUser()
 * Controller function to register a new user.
 * @params {req, res} - The request and response object.
 * @returns {object} - success state and data of the new user.
 */

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(409);
    throw new Error("A user with this email already exists.");
  }

  // Create new user
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      success: true,
      data: {
        _id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

/**
 * loginUser()
 * Controller function to log in a user.
 * @params {req, res} - The request and response object.
 * @returns {object} - success state and data of the logged-in user or an error message.
 */

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      success: true,
      data: {
        _id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

export { registerUser, loginUser };
