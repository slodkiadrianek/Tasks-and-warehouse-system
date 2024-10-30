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

router.post("/products/create", loginVerifier, validateSchema, createProduct);
router.get("/products", loginVerifier, getAllProducts);
router.get("/products/:id", loginVerifier, getProductById);
router.put(
  "/products/:id/update",
  loginVerifier,
  validateSchema,
  updateProduct,
);
router.delete("/products/:id/delete", loginVerifier, deleteProduct);

export default router;
