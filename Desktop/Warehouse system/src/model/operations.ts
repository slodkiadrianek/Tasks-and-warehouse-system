import prisma from "../utils/prisma";
import { PrismaClient } from "@prisma/client";

export async function addElement(table: string, data: object) {
  const result = await (prisma[table as keyof PrismaClient] as any).create({
    data: {
      ...data,
    },
  });
  return result;
}

//funkcja do usuwania elementu z bazy danych
export async function deleteElement(
  table: string,
  id: string
): Promise<object> {
  const result = await (prisma[table as keyof PrismaClient] as any).delete({
    where: {
      id: id,
    },
  });
  return result;
}
