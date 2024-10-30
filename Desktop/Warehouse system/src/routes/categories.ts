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
  createCategory as any,
);
router.put(
  "/categories/:id/update",
  loginVerifier,
  validateSchema,
  updateCategory as any,
);
router.delete("/categories/:id/delete", loginVerifier, deleteCategory as any);
router.get("/categories", getAllCategories as any);
router.get("/categories/:id", getCategoryById as any);

export default router;
