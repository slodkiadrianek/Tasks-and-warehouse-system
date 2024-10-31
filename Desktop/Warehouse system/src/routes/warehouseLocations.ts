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
  createWarehouseLocation as any,
);

router.get(
  "/warehouseLocation/get",
  loginVerifier,
  getAllWarehouseLocations as any,
);
router.get(
  "/warehouseLocation/:id",
  loginVerifier,
  getWarehouseLocationById as any,
);
router.put(
  "/warehouseLocation/:id/update",
  loginVerifier,
  validateSchema,
  updateWarehouseLocation as any,
);
router.delete(
  "/warehouseLocation/:id/delete",
  loginVerifier,
  deleteWarehouseLocation as any,
);

export default router;
