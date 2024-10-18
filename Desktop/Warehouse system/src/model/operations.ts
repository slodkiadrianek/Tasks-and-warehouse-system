import prisma from "../utils/prisma";
import { PrismaClient } from "@prisma/client";

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
