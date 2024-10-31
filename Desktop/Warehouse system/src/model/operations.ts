import prisma from "../utils/prisma.js";
import { PrismaClient } from "@prisma/client";

// function to add an element to the database
export async function addElement(table: string, data: object) {
  const result = await (prisma[table as keyof PrismaClient] as any).create({
    data: {
      ...data,
    },
  });
  return result;
}
// function to delete an element from the database
export async function deleteElement(
  table: string,
  id: string,
): Promise<object> {
  const result = await (prisma[table as keyof PrismaClient] as any).delete({
    where: {
      id: id,
    },
  });
  return result;
}
// function to update an element in the database
export async function updateElement(
  table: string,
  id: string,
  data: object,
): Promise<object> {
  const result = await (prisma[table as keyof PrismaClient] as any).update({
    where: {
      id: id,
    },
    data: {
      ...data,
    },
  });
  return result;
}
