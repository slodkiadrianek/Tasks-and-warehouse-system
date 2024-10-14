import Joi from "joi";
import { title } from "process";

export const newEmployeeSchema = Joi.object({
  name: Joi.string().required(),
  surname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export const newProductSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
  category: Joi.string().required(),
  warehouseLocation: Joi.string().required(),
});

export const newCategorySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
});

export const newWarehouseLocationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
});

export const newTaskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  dueDate: Joi.date().required(),
});

export const assignTaskToEmployeeSchema = Joi.object({
  employeeId: Joi.string().required(),
  taskId: Joi.string().required(),
  title: Joi.string().required(),
  status: Joi.string().required(),
});

export const newOrderSchema = Joi.object({
  customerName: Joi.string().required(),
  customerEmail: Joi.string().email().required(),
  customerPhone: Joi.string().required(),
  quantity: Joi.number().required(),
  totalPrice: Joi.number().required(),
  productsId: Joi.array().items(Joi.string()).required(),
});
