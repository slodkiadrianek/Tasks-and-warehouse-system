import express from "express";
import {
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getAllTasks,
} from "../controller/tasks.js";
import { loginVerifier } from "../middleware/loginVerifier.js";
import { validateSchema } from "../middleware/schemaValidator.js";

const router = express.Router();

router.post("/tasks/create", loginVerifier, validateSchema, createTask as any);

router.get("/tasks/:id", loginVerifier, getTask as any);

router.get("/tasks", loginVerifier, getAllTasks as any);

router.put(
  "/tasks/:id/update",
  loginVerifier,
  validateSchema,
  updateTask as any,
);
router.delete("/tasks/:id/delete", loginVerifier, deleteTask as any);

export default router;
