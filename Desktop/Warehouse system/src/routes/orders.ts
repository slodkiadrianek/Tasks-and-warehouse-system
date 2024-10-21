import express from "express";
import { validateSchema } from "../middleware/schemaValidator";
import { loginVerifier } from "../middleware/loginVerifier";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from "../controller/orders";
const router = express.Router();

router.post("/orders/create", loginVerifier, validateSchema, createOrder);

router.get("/orders", loginVerifier, getOrders);
router.get("/orders/:id", loginVerifier, getOrderById);
router.put("/orders/:id", loginVerifier, validateSchema, updateOrder);
router.delete("/orders/:id", loginVerifier, deleteOrder);
export default router;
