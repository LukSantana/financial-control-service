import express from 'express';
import { PrismaClient } from '@prisma/client';
import router from './router/index';
import logger from './utils/logger';
import { port } from './utils/environment';

const prisma = new PrismaClient();

async function main() {
  const app = express();

  app.use(express.json());
  app.use(router)

  app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });