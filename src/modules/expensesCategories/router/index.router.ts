import { Router } from "express";
import { ExpensesCategoriesController } from "../controller/index.controller";
import { ExceptionHandler } from "@src/utils/exceptionHandler";
import { ExpensesCategoriesService } from "../service/index.service";
import { ExpensesCategoriesRepository } from "../repository/index.repository";
import { PrismaClient } from "@prisma/client";
import { LogsRegistry } from "@src/utils/logsHandling";

const router = Router();
const expensesCategoriesController = new ExpensesCategoriesController(
  new ExpensesCategoriesService({
    expensesCategoriesRepository: new ExpensesCategoriesRepository()
  }),
  new ExceptionHandler(
    new LogsRegistry(
      new PrismaClient().logs
    )
  )
);

router.get("/expenses-categories", async (req, res) => {
  await expensesCategoriesController.getExpensesCategories(req, res);
});

router.get("/expenses-categories/:id", async (req, res) => {
  await expensesCategoriesController.getExpenseCategoryById(req, res);
});

router.post("/expenses-categories", async (req, res) => {
  await expensesCategoriesController.createExpenseCategory(req, res)
});

export default router;