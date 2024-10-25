import jwt from "jsonwebtoken";
import Prisma from "../utils/prisma.js";
import bcrypt from "bcrypt";
import { configDotenv } from "dotenv";
import { deleteElement, addElement } from "../model/operations.js";
import { AppError } from "../model/error.js";
configDotenv();
import { Request, Response, RequestHandler, NextFunction } from "express";

interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  assignedTasks?: [];
}

//Function to create a new user
export const createUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const { email, password } = req.body;
    const existingUser = await Prisma.employee.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new AppError("UserError", 400, "User already exists", false);
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await addElement("employee", {
      ...req.body,
      password: hashedPassword,
    });
    return res
      .status(200)
      .json({ message: "User created successfully", userData: result });
  } catch (error) {
    next(error);
  }
};

export const loginUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const { email, password } = req.body;
    const user: User | null = await Prisma.employee.findUnique({
      where: { email },
    });
    if (!user) {
      throw new AppError("LoginError", 400, "Invalid email", false);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new AppError("LoginError", 400, "Invalid password", false);
    }
    const token = jwt.sign({ user }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });
    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    next(error);
  }
};

export const getUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const { id } = req.params;
    const user: User | null = await Prisma.employee.findUnique({
      where: { id },
      include: {
        tasks: true,
      },
    });
    if (!user) {
      throw new AppError("UserError", 400, "User not found", false);
    }
    return res.status(200).json({ message: "User found", user });
  } catch (error) {
    next(error);
  }
};
export const deleteUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const { password } = req.body;
    const { id } = req.params;

    const user: User | null = await Prisma.employee.findUnique({
      where: { id },
    });
    if (!user) {
      throw new AppError("UserError", 400, "User not found", false);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new AppError("DeleteError", 400, "Invalid password", false);
    }
    const result = await deleteElement("employee", id);
    return res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    next(error);
  }
};
