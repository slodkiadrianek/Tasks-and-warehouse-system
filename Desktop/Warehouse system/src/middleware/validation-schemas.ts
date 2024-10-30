import Joi, { ObjectSchema } from "joi";

const newEmployeeSchema = Joi.object({
  name: Joi.string().required(),
  surname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(1).required(),
});

const newProductSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
  categoryId: Joi.string().required(),
  warehouseLocationId: Joi.string().required(),
});

const newCategorySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
});

const newWarehouseLocationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
});

const newTaskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  dueDate: Joi.date().required(),
  employeeId: Joi.string().required(),
});

const newOrderSchema = Joi.object({
  customerName: Joi.string().required(),
  customerEmail: Joi.string().email().required(),
  customerPhone: Joi.string().required(),
  quantity: Joi.array().items(Joi.number()).required(),
  productsId: Joi.array().items(Joi.string()).required(),
});

export default {
  employees: newEmployeeSchema,
  login: loginSchema,
  products: newProductSchema,
  categories: newCategorySchema,
  warehouseLocation: newWarehouseLocationSchema,
  tasks: newTaskSchema,
  orders: newOrderSchema,
} as { [key: string]: ObjectSchema };
