import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient;
}

const prisma = new PrismaClient().$extends(withAccelerate());

export const db = prisma;
