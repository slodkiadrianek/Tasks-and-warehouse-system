import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controller/categories";
import { loginVerifier } from "../middleware/loginVerifier";
import { validateSchema } from "../middleware/schemaValidator";

const router = express.Router();

router.post(
  "/categories/create",
  loginVerifier,
  validateSchema,
  createCategory
);
router.put("/categories/:id", loginVerifier, validateSchema, updateCategory);
router.delete("/categories/:id", loginVerifier, deleteCategory);
router.get("/categories", getAllCategories);
router.get("/categories/:id", getCategoryById);

export default router;
