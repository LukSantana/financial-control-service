import express from 'express';
import logger from './utils/logger';
import { port } from '@src/core/config/environment';
import { createAuthenticatedRouters, createUnauthenticatedRouters } from './router/index';
import { PrismaClient } from '@prisma/client';
import { configureFirebase } from './core/config/firebase';
import { authMiddleware } from './middlewares/auth.middleware';

class Main {
  app: express.Application
  prismaClient: PrismaClient

  constructor() {
    this.app = express();
    this.prismaClient = new PrismaClient()
  }

  async start() {
    try {
      const { auth } = configureFirebase();
      this.app.use(express.json());
      this.app.set('firebaseAuth', auth)
      this.app.set('prismaClient', this.prismaClient);

      this.app.use(
        createUnauthenticatedRouters(
          this.app
        )
      )
      this.app.use(
        authMiddleware,
        createAuthenticatedRouters(
          this.app
        ),
        authMiddleware
      );



      this.app.listen(port, () => {
        logger.info(`Server is running on port ${port}`);
      });
    } catch (err: any) {
      console.error(err)
      process.exit(1);
    } finally {
      await this.app.get('prismaClient').$disconnect();
    }
  }
}

new Main()
  .start()