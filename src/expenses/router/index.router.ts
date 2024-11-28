import { Router } from "express";
import { ExpensesController } from "../controller/index.controller";
import { ExceptionHandler } from "../../utils/exceptionHandler";
import { ExpensesService } from "../service/index.service";
import { ExpensesRepository } from "../repository/index.repository";
import { PrismaClient } from "@prisma/client";

const router = Router();
const expensesController = new ExpensesController(
  new ExpensesService({
    expensesRepository: new ExpensesRepository()
  }),
  new ExceptionHandler(new PrismaClient().logs)
);

router.get("/expenses", async (req, res) => {
  await expensesController.getExpenses(req, res);
});

router.get("/expenses/:id", async (req, res) => {
  await expensesController.getExpenseById(req, res);
});

router.post("/expenses", async (req, res) => {
  await expensesController.createExpense(req, res)
});

export default router;