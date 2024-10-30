import express from "express";
import {
  createWarehouseLocation,
  getAllWarehouseLocations,
  updateWarehouseLocation,
  deleteWarehouseLocation,
  getWarehouseLocationById,
} from "../controller/warehouseLocation.js";
import { loginVerifier } from "../middleware/loginVerifier.js";
import { validateSchema } from "../middleware/schemaValidator.js";
const router = express.Router();

router.post(
  "/warehouseLocation/create",
  loginVerifier,
  validateSchema,
  createWarehouseLocation,
);

router.get("/warehouseLocation/get", loginVerifier, getAllWarehouseLocations);
router.get("/warehouseLocation/:id", loginVerifier, getWarehouseLocationById);
router.put(
  "/warehouseLocation/:id/update",
  loginVerifier,
  validateSchema,
  updateWarehouseLocation,
);
router.delete(
  "/warehouseLocation/:id/delete",
  loginVerifier,
  deleteWarehouseLocation,
);

export default router;
