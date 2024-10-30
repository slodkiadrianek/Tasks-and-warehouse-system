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

router.post(
  "/orders/create",
  loginVerifier,
  validateSchema,
  createOrder as any,
);

router.get("/orders", loginVerifier, getOrders as any);
router.get("/orders/:id", loginVerifier, getOrderById as any);
router.delete("/orders/:id/delete", loginVerifier, deleteOrder as any);
export default router;
