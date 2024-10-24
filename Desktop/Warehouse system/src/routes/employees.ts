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

router.post("/employees/create", validateSchema, createUser);

router.post("/employees/login", validateSchema, loginUser);

router.get("/employees/:id", getUser);

router.post("/employees/:id/delete", loginVerifier, deleteUser);

export default router;
