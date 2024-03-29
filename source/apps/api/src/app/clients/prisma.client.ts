import { PrismaClient } from '@prisma/client';
const prismaClient = new PrismaClient();

export default () => {
  return prismaClient;
};
