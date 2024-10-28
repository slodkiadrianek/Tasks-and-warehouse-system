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

export async function generateUser() {
  const user: any = await request(app).post("/employees/create").send(userData);
  console.log(user);
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
