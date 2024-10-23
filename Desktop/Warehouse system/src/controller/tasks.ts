import { Request, Response, NextFunction, RequestHandler } from "express";
import prisma from "../utils/prisma.js";
import {
  addElement,
  deleteElement,
  updateElement,
} from "../model/operations.js";

export const createTask: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const result = await addElement("tasks", {
      ...req.body,
      status: "To be done",
    });
    return res
      .status(201)
      .json({ message: "Task created successfully", result });
  } catch (error) {
    next(error);
  }
};

export const deleteTask: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const id = req.params.id;
    const result = await deleteElement("tasks", id);
    return res
      .status(200)
      .json({ message: "Task deleted successfully", result });
  } catch (error) {
    next(error);
  }
};
export const updateTask: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const id = req.params.id;
    const result = await updateElement("tasks", id, req.body);
    return res
      .status(200)
      .json({ message: "Task updated successfully", result });
  } catch (error) {
    next(error);
  }
};

export const getTask: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const id = req.params.id;
    const result = await prisma.tasks.findUnique({
      where: { id: id },
      include: {
        employee: true,
      },
    });
    return res
      .status(200)
      .json({ message: "Task retrieved successfully", result });
  } catch (error) {
    next(error);
  }
};
export const getAllTasks: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const result = await prisma.tasks.findMany({
      include: {
        employee: true,
      },
    });
    return res
      .status(200)
      .json({ message: "All tasks retrieved successfully", result });
  } catch (error) {
    next(error);
  }
};
