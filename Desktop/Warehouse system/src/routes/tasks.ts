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

router.post("/tasks/create", loginVerifier, validateSchema, createTask);

router.get("/tasks/:id", loginVerifier, getTask);

router.get("/tasks", loginVerifier, getAllTasks);

router.put("/tasks/:id", loginVerifier, validateSchema, updateTask);
router.delete("/tasks/:id", loginVerifier, deleteTask);

export default router;
