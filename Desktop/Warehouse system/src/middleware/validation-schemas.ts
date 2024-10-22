import Joi, { ObjectSchema } from "joi";

const newEmployeeSchema = Joi.object({
  name: Joi.string().required(),
  surname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(1).required(),
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

const assignTaskToEmployeeSchema = Joi.object({
  employeeId: Joi.string().required(),
  taskId: Joi.string().required(),
  title: Joi.string().required(),
  status: Joi.string().required(),
});

const newOrderSchema = Joi.object({
  customerName: Joi.string().required(),
  customerEmail: Joi.string().email().required(),
  customerPhone: Joi.string().required(),
  quantity: Joi.number().required(),
  productsId: Joi.array().items(Joi.string()).required(),
});

export default {
  "/employees/create": newEmployeeSchema,
  "/employees/login": loginSchema,
  "/products/create": newProductSchema,
  "/categories/create": newCategorySchema,
  "/warehouseLocation/create": newWarehouseLocationSchema,
  "/tasks/create": newTaskSchema,
  assignTaskToEmployeeSchema,
  "/orders/create": newOrderSchema,
} as { [key: string]: ObjectSchema };
