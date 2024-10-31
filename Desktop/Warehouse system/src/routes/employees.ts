import express from "express";
import {
  createUser,
  loginUser,
  getUser,
  deleteUser,
} from "../controller/employees.js";
import { loginVerifier } from "../middleware/loginVerifier.js";
import { validateSchema } from "../middleware/schemaValidator.js";

const router = express.Router();

router.post("/employees/create", validateSchema, createUser as any);

router.post("/login", validateSchema, loginUser as any);

router.get("/employees/:id", getUser as any);

router.delete("/employees/:id/delete", loginVerifier, deleteUser as any);

export default router;
