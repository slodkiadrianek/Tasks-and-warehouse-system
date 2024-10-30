import { Request, Response, NextFunction, RequestHandler } from "express";
import prisma from "../utils/prisma.js";
import {
  addElement,
  deleteElement,
  updateElement,
} from "../model/operations.js";
import { AppError } from "../model/error.js";
import { ObjectId } from "mongodb";

export async function createOrder(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | undefined> {
  try {
    let totalPrice = 0;
    for (let i = 0; i < req.body.productsId.length; i++) {
      const order = await prisma.products.findUnique({
        where: { id: req.body.productsId[i] },
      });
      if (!order) {
        throw new AppError("Product error", 404, "Product not found", false);
      }

      totalPrice += +order.price * +req.body.quantity[i];
      req.body.quantity[i] = +req.body.quantity[i];
    }
    const result = await addElement("orders", {
      ...req.body,
      totalPrice,
      quantity: req.body.quantity,
    });
    for (let i = 0; i < req.body.productsId.length; i++) {
      const order = await prisma.products.findUnique({
        where: { id: req.body.productsId[i] },
      });
      if (!order) {
        throw new AppError("Product error", 404, "Product not found", false);
      }
      await prisma.products.update({
        where: { id: req.body.productsId[i] },
        data: {
          quantity: order.quantity - +req.body.quantity[i],
          ordersId: [new ObjectId(result.id).toString()],
        },
      });
    }

    return res
      .status(201)
      .json({ message: `Order created successfully`, result });
  } catch (error) {
    next(error);
  }
}
export async function getOrders(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | undefined> {
  try {
    const orders = await prisma.orders.findMany({
      include: {
        products: true,
      },
    });
    return res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
}

export async function getOrderById(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | undefined> {
  try {
    const order = await prisma.orders.findUnique({
      where: { id: req.params.id },
    });
    if (!order) {
      throw new AppError("Order error", 404, "Order not found", false);
    }
    return res.status(200).json(order);
  } catch (error) {
    next(error);
  }
}

export async function deleteOrder(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | undefined> {
  try {
    const order = await deleteElement("orders", req.params.id);
    if (!order) {
      throw new AppError("Order error", 404, "Order not found", false);
    }
    return res
      .status(200)
      .json({ message: `Order deleted successfully`, order });
  } catch (error) {
    next(error);
  }
}
