import { Request, Response, NextFunction, RequestHandler } from "express";
import Prisma from "../utils/prisma.js";
import { AppError } from "../model/error.js";
import {
  addElement,
  updateElement,
  deleteElement,
} from "../model/operations.js";

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | undefined> => {
  try {
    const result = await addElement("category", req.body);
    return res
      .status(201)
      .json({ message: "Category created successfully", result });
  } catch (error) {
    next(error);
  }
};

export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | undefined> => {
  try {
    const result = await Prisma.category.findMany();
    return res
      .status(200)
      .json({ message: "Categories retrieved successfully", result });
  } catch (error) {
    next(error);
  }
};
export const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | undefined> => {
  try {
    const { id } = req.params;
    const result = await Prisma.category.findUnique({
      where: { id: id },
    });
    if (!result) {
      throw new AppError("CategoryError", 404, "Category not found", false);
    }
    return res
      .status(200)
      .json({ message: "Category retrieved successfully", result });
  } catch (error) {
    next(error);
  }
};
export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | undefined> => {
  try {
    const { id } = req.params;
    const result = await updateElement("category", id, req.body);
    if (!result) {
      throw new AppError("CategoryError", 404, "Category not found", false);
    }
    return res
      .status(200)
      .json({ message: "Category updated successfully", result });
  } catch (error) {
    next(error);
  }
};
export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | undefined> => {
  try {
    const { id } = req.params;
    const categoryProducts = await Prisma.products.findMany({
      where: { categoryId: id },
    });
    if (categoryProducts.length > 0) {
      throw new AppError(
        "CategoryError",
        400,
        "Category cannot be deleted as it has products",
        false,
      );
    }
    const result = deleteElement("category", id);

    if (!result) {
      throw new AppError("CategoryError", 404, "Category not found", false);
    }
    return res
      .status(200)
      .json({ message: "Category deleted successfully", result });
  } catch (error) {
    next(error);
  }
};
