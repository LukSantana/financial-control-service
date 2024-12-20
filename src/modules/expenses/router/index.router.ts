import { Router } from "express";
import { ExpensesController } from "@src/modules/expenses/controller/index.controller";
import { ExpensesService } from "@src/modules/expenses/service/index.service";
import { ExpensesRepository } from "@src/modules/expenses/repository/index.repository";
import { PrismaClient } from "@prisma/client";

const router = Router();

const expensesController = new ExpensesController(
  new ExpensesService(
    new ExpensesRepository(
      new PrismaClient()
    )
  ),
);

router.get("/expenses", async (req, res) => {
  await expensesController.execute(req, res, 'fetchMany');
});

router.get("/expenses/:id", async (req, res) => {
  await expensesController.execute(req, res, 'fetchUnique');
});

router.post("/expenses", async (req, res) => {
  await expensesController.execute(req, res, 'create')
});

router.put("/expenses/:id", async (req, res) => {
  await expensesController.execute(req, res, 'update')
});

router.delete("/expenses/:id", async (req, res) => {
  await expensesController.execute(req, res, 'delete')
});

export default router;