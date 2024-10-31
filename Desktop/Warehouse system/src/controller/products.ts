import { Request, Response, NextFunction, RequestHandler } from "express";
import Prisma from "../utils/prisma.js";
import { AppError } from "../model/error.js";
import {
  addElement,
  deleteElement,
  updateElement,
} from "../model/operations.js";

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | undefined> => {
  try {
    const { price } = req.body;
    const convertedPrice = parseFloat(price);
    const result = await addElement("products", {
      ...req.body,
      quantity: req.body.quantity,
      price: convertedPrice,
    });
    return res
      .status(201)
      .json({ message: "Product created successfully", result });
  } catch (error) {
    next(error);
  }
};

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | undefined> => {
  try {
    const result = await Prisma.products.findMany({
      include: {
        category: true,
        wareHouseLocation: true,
        orders: true,
      },
    });
    return res
      .status(200)
      .json({ message: "Products retrieved successfully", result });
  } catch (error) {
    next(error);
  }
};
export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | undefined> => {
  try {
    const { id } = req.params;
    const result = await Prisma.products.findUnique({
      include: {
        category: true,
        wareHouseLocation: true,
        orders: true,
      },
      where: { id },
    });
    if (!result) {
      throw new AppError("Product error", 404, "Product not found", false);
    }
    return res
      .status(200)
      .json({ message: "Product retrieved successfully", result });
  } catch (error) {
    next(error);
  }
};
export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | undefined> => {
  try {
    const { id } = req.params;
    const result = await updateElement("products", id, req.body);
    if (!result) {
      throw new AppError("Product error", 404, "Product not found", false);
    }
    return res
      .status(200)
      .json({ message: "Product updated successfully", result });
  } catch (error) {
    next(error);
  }
};
export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | undefined> => {
  try {
    const { id } = req.params;
    const result = await deleteElement("products", id);
    if (!result) {
      throw new AppError("Product error", 404, "Product not found", false);
    }
    return res
      .status(200)
      .json({ message: "Product deleted successfully", result });
  } catch (error) {
    next(error);
  }
};
