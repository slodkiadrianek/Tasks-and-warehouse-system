import { app } from "../app.js";
import request from "supertest";
import prisma from "../utils/prisma.js";
import { describe, it, expect, afterAll, beforeAll } from "vitest";
import { deleteUser, generateUser, taskData } from "../utils/testData.js";

describe("Tasks", () => {
  let userToken: string;
  let userId: string;
  let taskId: string;
  beforeAll(async (): Promise<void> => {
    const result: { userId: string; userToken: string } = await generateUser();
    userToken = result.userToken;
    userId = result.userId;
  });
  afterAll(async (): Promise<void> => {
    await deleteUser(userId);
    await prisma.tasks.deleteMany({
      where: { id: taskId },
    });
  });
  it("should create a task", async () => {
    const response: any = await request(app)
      .post("/tasks/create")
      .set("Authorization", `Bearer ${userToken}`)
      .send(taskData);
    expect(response.status).toBe(201);
    expect(response._body.result.title).toBe(taskData.title);
    taskId = response._body.result.id;
  });
  it("should get all tasks", async () => {
    const response: any = await request(app)
      .get("/tasks")
      .set("Authorization", `Bearer ${userToken}`);
    console.log(response);
    expect(response.status).toBe(200);
    expect(response._body.result[0].title).toBe(taskData.title);
  });
  it("should get a task by id", async () => {
    const response: any = await request(app)
      .get(`/tasks/${taskId}`)
      .set("Authorization", `Bearer ${userToken}`);
    expect(response.status).toBe(200);
    expect(response._body.result.title).toBe(taskData.title);
  });
  it("should update a task", async () => {
    const response: any = await request(app)
      .put(`/tasks/${taskId}/update`)
      .set("Authorization", `Bearer ${userToken}`)
      .send(taskData);
    expect(response.status).toBe(200);
    expect(response._body.result.title).toBe(taskData.title);
  });
  it("should delete a task", async () => {
    const response: any = await request(app)
      .delete(`/tasks/${taskId}/delete`)
      .set("Authorization", `Bearer ${userToken}`);
    expect(response.status).toBe(200);
    expect(response._body.message).toBe("Task deleted successfully");
  });
});
