import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controller/categories.js";
import { loginVerifier } from "../middleware/loginVerifier.js";
import { validateSchema } from "../middleware/schemaValidator.js";

const router = express.Router();

router.post(
  "/categories/create",
  loginVerifier,
  validateSchema,
  createCategory,
);
router.put("/categories/:id", loginVerifier, validateSchema, updateCategory);
router.delete("/categories/:id", loginVerifier, deleteCategory);
router.get("/categories", getAllCategories);
router.get("/categories/:id", getCategoryById);

export default router;
