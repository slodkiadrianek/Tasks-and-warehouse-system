import { it, describe, expect, afterAll } from "vitest";
import { app } from "../app.js";
import request from "supertest";
import prisma from "../utils/prisma.js";
import { userData } from "../utils/testData.js";
let userId: string = "";
let userToken: string = "";
afterAll(async (): Promise<void> => {
  await prisma.employee.deleteMany({
    where: {
      id: userId,
    },
  });
});
describe("Employee", () => {
  it("Creation of employee", async () => {
    const res: any = await request(app)
      .post("/employees/create")
      .send(userData);
    expect(res._body.userData.name).toBe("John");
    expect(res._body.userData.surname).toBe("Doe");
    expect(res._body.userData.email).toBe("johndoe@6dxam22ple.com");
    userId = res._body.userData.id;
  });
  it("get User by id", async () => {
    const res: any = await request(app).get(`/employees/${userId}`);
    expect(res._body.user.name).toBe("John");
    expect(res._body.user.surname).toBe("Doe");
    expect(res._body.user.email).toBe("johndoe@6dxam22ple.com");
    expect(res._body.user.id).toBe(userId);
  });
  it("Login of employee", async () => {
    const res: any = await request(app).post("/employees/login").send({
      email: userData.email,
      password: userData.password,
    });
    expect(res._body.token).toBeTypeOf("string");
    userToken = res._body.token;
  });
  it("Delete of employee", async () => {
    const res: any = await request(app)
      .delete(`/employees/${userId}/delete`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        password: userData.password,
      });
    expect(res._body.message).toBe("Employee deleted successfully");
  });
});
