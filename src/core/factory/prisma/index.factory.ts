import { PrismaClient } from "@prisma/client";

export class PrismaFactory {
  static createPrismaClient() {
    return new PrismaClient();
  }

  static getPrismaClient() {
    return this.createPrismaClient();
  }

  static getPrismaModel<M extends keyof PrismaClient>(model: M) {
    return this.getPrismaClient()[model];
  }
}