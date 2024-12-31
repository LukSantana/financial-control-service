import { Router, Application } from "express";
import { ExpensesController } from "@src/modules/expenses/controller/index.controller";
import { ExpensesService } from "@src/modules/expenses/service/index.service";
import { ExpensesRepository } from "@src/modules/expenses/repository/index.repository";

const createExpensesRouter = (app: Application) => {
  const router = Router();

  const expensesController = new ExpensesController(
    new ExpensesService(
      new ExpensesRepository(
        app.get("prismaClient"),
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

  return router;
}


export default createExpensesRouter;