import { app } from "../app.js";
import request from "supertest";
import prisma from "../utils/prisma.js";
import { describe, it, expect, afterAll, beforeAll } from "vitest";
import {
  deleteUser,
  generateUser,
  warehouseLocationData,
  productData,
} from "../utils/testData.js";
import { aw } from "vitest/dist/chunks/reporters.C4ZHgdxQ.js";

describe("Products", () => {
  let userToken: string;
  let userId: string;
  let productId: string;
  beforeAll(async (): Promise<void> => {
    const result: { userId: string; userToken: string } = await generateUser();
    userToken = result.userToken;
    userId = result.userId;
  });
  afterAll(async (): Promise<void> => {
    await deleteUser(userId);
    await prisma.products.deleteMany({
      where: { id: productId },
    });
  });
  it("should create a product", async () => {
    const response: any = await request(app)
      .post("/products/create")
      .set("Authorization", `Bearer ${userToken}`)
      .send(productData);
    productId = response._body.result.id;
    expect(response.status).toBe(201);
    expect(response._body.result.name).toBe(productData.name);
  });
  it("should get all products", async () => {
    const response: any = await request(app)
      .get("/products")
      .set("Authorization", `Bearer ${userToken}`);
    expect(response.status).toBe(200);
    expect(response._body.result[0].name).toBe(productData.name);
  });
  it("should get a product by id", async () => {
    const response: any = await request(app)
      .get(`/products/${productId}`)
      .set("Authorization", `Bearer ${userToken}`);
    expect(response.status).toBe(200);
    expect(response._body.result.name).toBe(productData.name);
  });
  it("should get a product by name", async () => {
    const response: any = await request(app)
      .put(`/products/${productId}/update`)
      .set("Authorization", `Bearer ${userToken}`)
      .send(productData);
    expect(response.status).toBe(200);
    expect(response._body.result.name).toBe(productData.name);
  });
  it("should delete a product", async () => {
    const response: any = await request(app)
      .delete(`/products/${productId}/delete`)
      .set("Authorization", `Bearer ${userToken}`);
    expect(response.status).toBe(200);
    expect(response._body.message).toBe("Product deleted successfully");
  });
});
