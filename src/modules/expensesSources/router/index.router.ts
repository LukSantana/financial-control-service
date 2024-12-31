import { Router, Application } from "express";
import { ExpensesSourcesController } from "@src/modules/expensesSources/controller/index.controller";
import { ExpensesSourcesService } from "@src/modules/expensesSources/service/index.service";
import { ExpensesSourcesRepository } from "@src/modules/expensesSources/repository/index.repository";

const createExpensesSourcesRouter = (app: Application) => {
  const router = Router();

  const expensesSourcesController = new ExpensesSourcesController(
    new ExpensesSourcesService(
      new ExpensesSourcesRepository(
        app.get("prismaClient"),
      )
    ),
  );

  router.get("/expensesSources", async (req, res) => {
    await expensesSourcesController.execute(req, res, 'fetchMany');
  });

  router.get("/expensesSources/:id", async (req, res) => {
    await expensesSourcesController.execute(req, res, 'fetchUnique');
  });

  router.post("/expensesSources", async (req, res) => {
    await expensesSourcesController.execute(req, res, 'create')
  });

  router.put("/expensesSources/:id", async (req, res) => {
    await expensesSourcesController.execute(req, res, 'update')
  });

  router.delete("/expensesSources/:id", async (req, res) => {
    await expensesSourcesController.execute(req, res, 'delete')
  });

  return router;
}


export default createExpensesSourcesRouter;