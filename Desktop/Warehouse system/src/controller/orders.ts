import { Request, Response, NextFunction, RequestHandler } from "express";
import prisma from "../utils/prisma.js";
import { addElement, deleteElement } from "../model/operations.js";
import { AppError } from "../model/error.js";
import { ObjectId } from "mongodb";

export const createOrder: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const order = await prisma.products.findUnique({
      where: { id: req.body.productsId[0] },
    });
    if (!order) {
      throw new AppError("Product error", 404, "Product not found", false);
    }

    const totalPrice = +order.price * req.body.quantity;
    const result = await addElement("orders", {
      ...req.body,
      totalPrice,
      quantity: +req.body.quantity,
    });

    const products = await prisma.products.update({
      where: { id: req.body.productsId[0] },
      data: {
        quantity: order.quantity - +req.body.quantity,
        ordersId: [new ObjectId(result.id).toString()],
      },
    });

    res.status(201).json({ message: `Order created successfully`, result });
  } catch (error) {
    next(error);
  }
};
export const getOrders: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const orders = await prisma.orders.findMany({
      include: {
        products: true,
      },
    });
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export const getOrderById: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const order = await prisma.orders.findUnique({
      where: { id: req.params.id },
    });
    if (!order) {
      throw new AppError("Order error", 404, "Order not found", false);
    }
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};
export const updateOrder: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const order = await prisma.orders.update({
      where: { id: req.params.id },
      data: req.body,
    });
    if (!order) {
      throw new AppError("Order error", 404, "Order not found", false);
    }
    res.status(200).json({ message: `Order updated successfully`, order });
  } catch (error) {
    next(error);
  }
};

export const deleteOrder: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const order = await deleteElement("orders", req.params.id);
    if (!order) {
      throw new AppError("Order error", 404, "Order not found", false);
    }
    res.status(200).json({ message: `Order deleted successfully`, order });
  } catch (error) {
    next(error);
  }
};
