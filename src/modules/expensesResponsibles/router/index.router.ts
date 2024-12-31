import { Router, Application } from "express";
import { ExpensesResponsiblesController } from "@src/modules/expensesResponsibles/controller/index.controller";
import { ExpensesResponsiblesService } from "@src/modules/expensesResponsibles/service/index.service";
import { ExpensesResponsiblesRepository } from "@src/modules/expensesResponsibles/repository/index.repository";

const createExpensesResponsiblesRouter = (app: Application) => {
  const router = Router();

  const expensesResponsiblesController = new ExpensesResponsiblesController(
    new ExpensesResponsiblesService(
      new ExpensesResponsiblesRepository(
        app.get("prismaClient"),
      )
    ),
  );

  router.get("/expensesResponsibles", async (req, res) => {
    await expensesResponsiblesController.execute(req, res, 'fetchMany');
  });

  router.get("/expensesResponsibles/:id", async (req, res) => {
    await expensesResponsiblesController.execute(req, res, 'fetchUnique');
  });

  router.post("/expensesResponsibles", async (req, res) => {
    await expensesResponsiblesController.execute(req, res, 'create')
  });

  router.put("/expensesResponsibles/:id", async (req, res) => {
    await expensesResponsiblesController.execute(req, res, 'update')
  });

  router.delete("/expensesResponsibles/:id", async (req, res) => {
    await expensesResponsiblesController.execute(req, res, 'delete')
  });

  return router;
}


export default createExpensesResponsiblesRouter;