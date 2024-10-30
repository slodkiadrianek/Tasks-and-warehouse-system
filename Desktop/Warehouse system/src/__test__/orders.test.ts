import { app } from "../app.js";
import request from "supertest";
import prisma from "../utils/prisma.js";
import { describe, it, expect, afterAll, beforeAll } from "vitest";
import { deleteUser, generateUser, orderData } from "../utils/testData.js";

describe("Orders", () => {
  let userToken: string;
  let userId: string;
  let orderId: string;

  beforeAll(async (): Promise<void> => {
    const result: { userId: string; userToken: string } = await generateUser();
    userToken = result.userToken;
    userId = result.userId;
  });
  afterAll(async (): Promise<void> => {
    await deleteUser(userId);
    await prisma.orders.deleteMany({
      where: { id: orderId },
    });
  });
  it("should create an order", async (): Promise<void> => {
    const response: any = await request(app)
      .post("/orders/create")
      .set("Authorization", `Bearer ${userToken}`)
      .send(orderData);
    orderId = response._body.result.id;
    expect(response.status).toBe(201);
    expect(response._body.result.id).toBeTypeOf("string");
  });
  it("should get a order by id", async (): Promise<void> => {
    const response: any = await request(app)
      .get(`/orders/${orderId}`)
      .set("Authorization", `Bearer ${userToken}`);
    expect(response.status).toBe(200);
    expect(response._body.id).toBe(orderId);
  });
  it("should get all orders", async (): Promise<void> => {
    const response: any = await request(app)
      .get(`/orders/`)
      .set("Authorization", `Bearer ${userToken}`);
    expect(response.status).toBe(200);
    expect(response._body.length).toBeGreaterThan(0);
  });
  it("should delete an order", async (): Promise<void> => {
    const response: any = await request(app)
      .delete(`/orders/${orderId}/delete`)
      .set("Authorization", `Bearer ${userToken}`);
    expect(response.status).toBe(200);
    expect(response._body.message).toBe("Order deleted successfully");
  });
});
