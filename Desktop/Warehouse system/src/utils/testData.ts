import request from "supertest";
import { app } from "../app.js";
import prisma from "./prisma.js";

export const userData = {
  name: "John",
  surname: "Doe",
  email: "johndoe@6dxam22ple.com",
  password: "password123",
};
export const categoryData = {
  name: "Category 1",
  description: "This is the first category",
};
export const warehouseLocationData = {
  name: "Warehouse 1",
  description: "This is the first location",
};

export const productData = {
  name: "Product 1",
  description: "This is the first product",
  price: 100,
  categoryId: "6712907bde06020eeadad87b",
  warehouseLocationId: "6720f6703f4c21f896d34a9a",
  quantity: 100,
};
export const taskData = {
  title: "Task 1",
  description: "This is the first task",
  dueDate: "2025-10-29T15:04:33.893+00:00",
  employeeId: "6720f981eb3b4e5c65d88bdf",
};

export const orderData = {
  customerName: "John Doe",
  customerEmail: "johndoe@6dxam22ple.com",
  customerPhone: "1234567890",
  quantity: [10],
  productsId: ["6723adf02b1c003bdd06bbdb"],
};

export async function generateUser() {
  const user: any = await request(app).post("/employees/create").send(userData);
  const userId: string = user._body.userData.id;
  const loginRes: any = await request(app).post("/login").send({
    email: userData.email,
    password: userData.password,
  });
  const userToken: string = loginRes._body.token;
  return { userId, userToken };
}

export async function deleteUser(userId: string) {
  await prisma.employee.deleteMany({
    where: {
      id: userId,
    },
  });
}
