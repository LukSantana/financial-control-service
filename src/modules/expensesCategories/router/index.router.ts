import { Router, Application } from "express";
import { ExpensesCategoriesController } from "@src/modules/expensesCategories/controller/index.controller";
import { ExpensesCategoriesService } from "@src/modules/expensesCategories/service/index.service";
import { ExpensesCategoriesRepository } from "@src/modules/expensesCategories/repository/index.repository";

const createExpensesCategoriesRouter = (app: Application) => {
  const router = Router();

  const expensesCategoriesController = new ExpensesCategoriesController(
    new ExpensesCategoriesService(
      new ExpensesCategoriesRepository(
        app.get("prismaClient"),
      )
    ),
  );

  router.get("/expensesCategories", async (req, res) => {
    await expensesCategoriesController.execute(req, res, 'fetchMany');
  });

  router.get("/expensesCategories/:id", async (req, res) => {
    await expensesCategoriesController.execute(req, res, 'fetchOne');
  });

  router.post("/expensesCategories", async (req, res) => {
    await expensesCategoriesController.execute(req, res, 'create')
  });

  router.put("/expensesCategories/:id", async (req, res) => {
    await expensesCategoriesController.execute(req, res, 'update')
  });

  router.delete("/expensesCategories/:id", async (req, res) => {
    await expensesCategoriesController.execute(req, res, 'delete')
  });

  return router;
}


export default createExpensesCategoriesRouter;