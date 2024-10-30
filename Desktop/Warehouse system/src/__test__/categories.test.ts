import { it, describe, expect, afterAll, beforeAll } from "vitest";
import { app } from "../app.js";
import request from "supertest";
import prisma from "../utils/prisma.js";
import { categoryData, userData, deleteUser } from "../utils/testData.js";
let userId: string = "";
let categoryId: string = "";
let userToken: string = "";
describe("Categories", () => {
  beforeAll(async () => {
    const user: any = await request(app)
      .post("/employees/create")
      .send(userData);
    console.log(user);
    userId = user._body.userData.id;
    const loginRes: any = await request(app).post("/login").send({
      email: userData.email,
      password: userData.password,
    });
    userToken = loginRes._body.token;
  });
  afterAll(async () => {
    await deleteUser(userId);
    await prisma.category.deleteMany({
      where: {
        id: categoryId,
      },
    });
  });
  it("create category", async () => {
    const res: any = await request(app)
      .post("/categories/create")
      .set("Authorization", `Bearer ${userToken}`)
      .send(categoryData);
    expect(res.statusCode).toBe(201);
    expect(res._body.result.name).toBe(categoryData.name);
    categoryId = res._body.result.id;
  });
  it("get all categories", async () => {
    const res: any = await request(app)
      .get("/categories")
      .set("Authorization", `Bearer ${userToken}`);
    expect(res.statusCode).toBe(200);
    expect(res._body.result[1].name).toBe(categoryData.name);
  });
  it("get category by id", async () => {
    const res: any = await request(app)
      .get(`/categories/${categoryId}`)
      .set("Authorization", `Bearer ${userToken}`);
    expect(res.statusCode).toBe(200);
    expect(res._body.result.name).toBe(categoryData.name);
  });
  it("update category", async () => {
    console.log(categoryId, categoryData, userToken);
    const res: any = await request(app)
      .put(`/categories/${categoryId}/update`)
      .send(categoryData)
      .set("Authorization", `Bearer ${userToken}`);
    expect(res.statusCode).toBe(200);

    expect(res._body.result.name).toBe("Category 1");
  });
  it("delete category", async () => {
    const res: any = await request(app)
      .delete(`/categories/${categoryId}/delete`)
      .set("Authorization", `Bearer ${userToken}`);
    expect(res.statusCode).toBe(200);
    expect(res._body.message).toBe("Category deleted successfully");
  });
});
console.log("categories test");
