import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { AppError } from "../model/error.js";
//custom error handler for handling AppError
const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ message: err.message, isOperational: err.isOperational });
  }
  console.error(err.stack);
  res.status(500).send("Something broke!");
};

export default errorHandler;
