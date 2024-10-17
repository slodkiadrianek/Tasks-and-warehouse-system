import express from "express";
import {
  createUser,
  loginUser,
  getUser,
  deleteUser,
} from "../controller/employees";
import { loginVerifier } from "../middleware/loginVerifier";
import { validateSchema } from "../middleware/schemaValidator";

const router = express.Router();

router.post("/employees/create", validateSchema, createUser);

router.post("/employees/login", validateSchema, loginUser);

router.get("/employees/:id", getUser);

router.post("/employees/:id/delete", loginVerifier, deleteUser);

export default router;
