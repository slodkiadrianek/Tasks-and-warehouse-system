import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controller/products";
import { loginVerifier } from "../middleware/loginVerifier";
import { validateSchema } from "../middleware/schemaValidator";
const router = express.Router();

router.post("/products/create", loginVerifier, validateSchema, createProduct);
router.get("/products", loginVerifier, getAllProducts);
router.get("/products/:id", loginVerifier, getProductById);
router.put("/products/:id", loginVerifier, validateSchema, updateProduct);
router.delete("/products/:id", loginVerifier, deleteProduct);

export default router;
