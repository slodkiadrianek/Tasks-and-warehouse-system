import { Request, Response, NextFunction } from "express";
import { AppError } from "../model/error";
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (Error instanceof AppError) {
    // return res.status(AppError.statusCode).json({ message: err.message });
  }
  console.error(err.stack);
  res.status(500).send("Something broke!");
};

export default errorHandler;
