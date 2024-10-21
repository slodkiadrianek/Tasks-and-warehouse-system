import { Request, Response, NextFunction, RequestHandler } from "express";
import Prisma from "../utils/prisma";
import { AppError } from "../model/error";

export const createProduct: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { price } = req.body;
    const convertedPrice = parseFloat(price);

    const result = await Prisma.products.create({
      data: {
        ...req.body,
        quantity: +req.body.quantity,
        price: convertedPrice,
      },
    });
    return res
      .status(201)
      .json({ message: "Product created successfully", result });
  } catch (error) {
    next(error);
  }
};

export const getAllProducts: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
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
export const getProductById: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
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
export const updateProduct: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.params;
    const result = await Prisma.products.update({
      where: { id },
      data: req.body,
    });
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
export const deleteProduct: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.params;
    const result = await Prisma.products.delete({
      where: { id },
    });
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
