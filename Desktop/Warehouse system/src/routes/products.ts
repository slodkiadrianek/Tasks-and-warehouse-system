import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controller/products.js";
import { loginVerifier } from "../middleware/loginVerifier.js";
import { validateSchema } from "../middleware/schemaValidator.js";
const router = express.Router();

router.post(
  "/products/create",
  loginVerifier,
  validateSchema,
  createProduct as any,
);
router.get("/products", loginVerifier, getAllProducts as any);
router.get("/products/:id", loginVerifier, getProductById as any);
router.put(
  "/products/:id/update",
  loginVerifier,
  validateSchema,
  updateProduct as any,
);
router.delete("/products/:id/delete", loginVerifier, deleteProduct as any);

export default router;
