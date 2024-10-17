import jwt from "jsonwebtoken";
import Prisma from "../utils/prisma";
import bcrypt from "bcrypt";
import { configDotenv } from "dotenv";
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
  next: NextFunction
): Promise<any> => {
  try {
    const { name, surname, email, password } = req.body;
    console.log(req.originalUrl);
    const existingUser = await Prisma.employee.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await Prisma.employee.create({
      data: {
        name,
        surname,
        email,
        password: hashedPassword,
      },
    });
    return res
      .status(200)
      .json({ message: "User created successfully", userData: result });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const loginUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { email, password } = req.body;
    const user: User | null = await Prisma.employee.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ user }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });
    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.params;
    const user: User | null = await Prisma.employee.findUnique({
      where: { id },
    });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const userData = {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      assignedTasks: user?.assignedTasks,
    };
    return res.status(200).json({ message: "User found", userData });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
export const deleteUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { password } = req.body;
    const { id } = req.params;

    const user: User | null = await Prisma.employee.findUnique({
      where: { id },
    });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
    await Prisma.employee.delete({
      where: { id },
    });
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
