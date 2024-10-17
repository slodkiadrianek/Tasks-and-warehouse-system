import express from "express";

import { loginVerifier } from "../middleware/loginVerifier";
import { validateSchema } from "../middleware/schemaValidator";
const router = express.Router();

router.post("/products/create", validateSchema, loginVerifier);
