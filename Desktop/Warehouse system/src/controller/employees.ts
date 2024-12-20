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
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | undefined> => {
  try {
    const { email, password } = req.body;
    const existingUser = await Prisma.employee.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new AppError("UserError", 400, "User already exists", false);
    }
    const hashedPassword: string = await bcrypt.hash(password, 12);
    const result: object = await addElement("employee", {
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

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | undefined> => {
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

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | undefined> => {
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
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | undefined> => {
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
    return res
      .status(200)
      .json({ message: "Employee deleted successfully", result });
  } catch (error) {
    next(error);
  }
};
