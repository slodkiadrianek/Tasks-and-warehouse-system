import { Request, Response, NextFunction, RequestHandler } from "express";
import Prisma from "../utils/prisma";
import { AppError } from "../model/error";

export const createWarehouseLocation: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const result = await Prisma.warehouseLocation.create({
      data: {
        ...req.body,
      },
    });
    return res
      .status(201)
      .json({ message: "Warehouse location created successfully", result });
  } catch (error) {
    next(error);
  }
};

export const getAllWarehouseLocations: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const result = await Prisma.warehouseLocation.findMany();
    return res.status(200).json({ message: "All warehouse locations", result });
  } catch (error) {
    next(error);
  }
};
export const getWarehouseLocationById: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.params;
    const result = await Prisma.warehouseLocation.findUnique({
      where: { id },
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

export const updateWarehouseLocation: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.params;
    const result = await Prisma.warehouseLocation.update({
      where: { id },
      data: {
        ...req.body,
      },
    });
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

export const deleteWarehouseLocation: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.params;
    const result = await Prisma.warehouseLocation.delete({
      where: { id },
    });
    const products = await Prisma.products.findMany({
      where: { warehouseLocationId: id },
    });
    if (products.length > 0) {
      throw new AppError(
        "warehouseLocation",
        400,
        "Cannot delete warehouse location with products",
        false
      );
    }
    if (!result) {
      throw new AppError(
        "warehouseLocation",
        404,
        "Warehouse location not found",
        false
      );
    }
    return res
      .status(200)
      .json({ message: "Warehouse location deleted successfully" });
  } catch (error) {
    next(error);
  }
};
