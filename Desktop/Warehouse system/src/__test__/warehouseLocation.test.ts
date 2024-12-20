import { app } from "../app.js";
import request from "supertest";
import prisma from "../utils/prisma.js";
import { describe, it, expect, afterAll, beforeAll } from "vitest";
import {
  deleteUser,
  generateUser,
  warehouseLocationData,
} from "../utils/testData.js";

describe("WarehouseLocation", () => {
  let userToken: string;
  let userId: string;
  let warehouseLocationId: string;

  beforeAll(async (): Promise<void> => {
    const result: { userId: string; userToken: string } = await generateUser();
    userToken = result.userToken;
    userId = result.userId;
  });
  afterAll(async (): Promise<void> => {
    await deleteUser(userId);
    await prisma.warehouseLocation.deleteMany({
      where: { id: warehouseLocationId },
    });
  });
  it("Create warehouseLocation", async (): Promise<void> => {
    console.log(`TEST`, warehouseLocationData.name);
    const response: any = await request(app)
      .post("/warehouseLocation/create")
      .set("Authorization", `Bearer ${userToken}`)
      .send(warehouseLocationData);
    expect(response.status).toBe(201);

    expect(response._body.result.name).toBe(warehouseLocationData.name);
    warehouseLocationId = response._body.result.id;
  });
  it("Get warehouseLocations", async (): Promise<void> => {
    const response: any = await request(app)
      .get("/warehouseLocation/get")
      .set("Authorization", `Bearer ${userToken}`);

    expect(response.status).toBe(200);
    expect(response._body.result[0].name).toBe(warehouseLocationData.name);
  });
  it("Get warehouseLocation by id", async (): Promise<void> => {
    const response: any = await request(app)
      .get(`/warehouseLocation/${warehouseLocationId}`)
      .set("Authorization", `Bearer ${userToken}`);
    expect(response.status).toBe(200);
    expect(response.status).toBe(200);
    expect(response._body.result.name).toBe(warehouseLocationData.name);
  });
  it("Update warehouseLocation", async (): Promise<void> => {
    const response: any = await request(app)
      .put(`/warehouseLocation/${warehouseLocationId}/update`)
      .set("Authorization", `Bearer ${userToken}`)
      .send(warehouseLocationData);
    expect(response.status).toBe(200);
    expect(response._body.result.name).toBe(warehouseLocationData.name);
  });
  it("Delete warehouseLocation", async (): Promise<void> => {
    const response: any = await request(app)
      .delete(`/warehouseLocation/${warehouseLocationId}/delete`)
      .set("Authorization", `Bearer ${userToken}`);
    expect(response.status).toBe(200);
  });
});
