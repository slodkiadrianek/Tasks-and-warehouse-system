import { Request, Response, NextFunction, RequestHandler } from "express";
import Prisma from "../utils/prisma";

export const createCategory: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { name, description } = req.body;
    const result = await Prisma.category.create({
      data: {
        name,
        description,
      },
    });
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
