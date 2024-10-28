import { app } from "../app.js";
import request from "supertest";
import prisma from "../utils/prisma.js";
import { describe, it, expect, afterAll, beforeAll } from "vitest";
import {
  categoryData,
  userData,
  deleteUser,
  generateUser,
  warehouseLocationData,
} from "../utils/testData.js";

describe("WarehouseLocation", () => {
  let userToken: string;
  let userId: string;
  let categoryId: string;

  beforeAll(async () => {
    const result: { userId: string; userToken: string } = await generateUser();
    userToken = result.userToken;
    userId = result.userId;
  });
  afterAll(async () => {
    await deleteUser(userId);
    await prisma.warehouseLocation.deleteMany({ where: { id: categoryId } });
  });
  it("Create warehouseLocation", async () => {
    const response: any = await request(app)
      .post("/categories/create")
      .set("Authorization", `Bearer ${userToken}`)
      .send(warehouseLocationData);
    expect(response.status).toBe(200);
    expect(response._data.name).toBe(warehouseLocationData.name);
  });
});
