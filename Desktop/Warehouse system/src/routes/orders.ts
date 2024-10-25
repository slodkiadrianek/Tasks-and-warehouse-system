import express from "express";
import { validateSchema } from "../middleware/schemaValidator.js";
import { loginVerifier } from "../middleware/loginVerifier.js";
import {
  createOrder,
  getOrders,
  getOrderById,
  deleteOrder,
} from "../controller/orders.js";
const router = express.Router();

router.post("/orders/create", loginVerifier, validateSchema, createOrder);

router.get("/orders", loginVerifier, getOrders);
router.get("/orders/:id", loginVerifier, getOrderById);
router.delete("/orders/:id", loginVerifier, deleteOrder);
export default router;
