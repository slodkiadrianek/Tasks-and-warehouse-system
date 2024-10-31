import { Request, Response, NextFunction, RequestHandler } from "express";
import Prisma from "../utils/prisma.js";
import { AppError } from "../model/error.js";
import {
  addElement,
  deleteElement,
  updateElement,
} from "../model/operations.js";

export const createWarehouseLocation = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | undefined> => {
  try {
    const result = await addElement("warehouseLocation", req.body);
    return res
      .status(201)
      .json({ message: "Warehouse location created successfully", result });
  } catch (error) {
    next(error);
  }
};

export const getAllWarehouseLocations = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | undefined> => {
  try {
    const result = await Prisma.warehouseLocation.findMany({
      include: {
        products: true,
      },
    });
    return res.status(200).json({ message: "All warehouse locations", result });
  } catch (error) {
    next(error);
  }
};
export const getWarehouseLocationById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | undefined> => {
  try {
    const { id } = req.params;
    const result = await Prisma.warehouseLocation.findUnique({
      where: { id },
      include: {
        products: true,
      },
    });
    if (!result) {
      return res.status(404).json({ message: "Warehouse location not found" });
    }
    return res
      .status(200)
      .json({ message: "Warehouse location found", result });
  } catch (error) {
    next(error);
  }
};

export const updateWarehouseLocation = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | undefined> => {
  try {
    const { id } = req.params;
    const result = await updateElement("warehouseLocation", id, req.body);
    if (!result) {
      return res.status(404).json({ message: "Warehouse location not found" });
    }
    return res
      .status(200)
      .json({ message: "Warehouse location updated successfully", result });
  } catch (error) {
    next(error);
  }
};

export const deleteWarehouseLocation = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | undefined> => {
  try {
    const { id } = req.params;
    const result = await deleteElement("warehouseLocation", id);
    const products = await Prisma.products.findMany({
      where: { warehouseLocationId: id },
    });
    if (products.length > 0) {
      throw new AppError(
        "warehouseLocation",
        400,
        "Cannot delete warehouse location with products",
        false,
      );
    }
    if (!result) {
      throw new AppError(
        "warehouseLocation",
        404,
        "Warehouse location not found",
        false,
      );
    }
    return res
      .status(200)
      .json({ message: "Warehouse location deleted successfully" });
  } catch (error) {
    next(error);
  }
};
