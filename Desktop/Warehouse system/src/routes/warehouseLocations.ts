import express from "express";
import {
  createWarehouseLocation,
  getAllWarehouseLocations,
  updateWarehouseLocation,
  deleteWarehouseLocation,
} from "../controller/warehouseLocation.js";
import { loginVerifier } from "../middleware/loginVerifier.js";
import { validateSchema } from "../middleware/schemaValidator.js";
const router = express.Router();

router.post(
  "/warehouseLocation/create",
  loginVerifier,
  validateSchema,
  createWarehouseLocation
);

router.get("/warehouseLocation/get", loginVerifier, getAllWarehouseLocations);
router.get(
  "/warehouseLocation/get/:id",
  loginVerifier,
  getAllWarehouseLocations
);
router.put(
  "warehouseLocation/update/:id",
  loginVerifier,
  validateSchema,
  updateWarehouseLocation
);
router.delete(
  "warehouseLocation/delete/:id",
  loginVerifier,
  deleteWarehouseLocation
);

export default router;
