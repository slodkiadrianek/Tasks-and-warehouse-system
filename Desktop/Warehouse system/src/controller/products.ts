import { Request, Response, NextFunction, RequestHandler } from "express";
import Prisma from "../utils/prisma";

const createProduct: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const {
      name,
      description,
      price,
      quantity,
      categoryId,
      wareHouseLocationId,
    } = req.body;
    const result = await Prisma.products.create({
      data: {
        name,
        description,
        price,
        quantity,
        categoryId,
        wareHouseLocationId,
      },
    });
    return res
      .status(201)
      .json({ message: "Product created successfully", result });
  } catch (error) {
    next(error);
  }
};
