import { Router, Application } from "express";
import { InvestmentsController } from "@src/modules/investmentsCategories/controller/index.controller";
import { InvestmentsService } from "@src/modules/investmentsCategories/service/index.service";
import { InvestmentsRepository } from "@src/modules/investmentsCategories/repository/index.repository";

const createInvestmentsRouter = (app: Application) => {
  const router = Router();

  const investmentsController = new InvestmentsController(
    new InvestmentsService(
      new InvestmentsRepository(
        app.get("prismaClient"),
      )
    ),
  );

  router.get("/investmentsCategories", async (req, res) => {
    await investmentsController.execute(req, res, 'fetchMany');
  });

  router.get("/investmentsCategories/:id", async (req, res) => {
    await investmentsController.execute(req, res, 'fetchOne');
  });

  router.post("/investmentsCategories", async (req, res) => {
    await investmentsController.execute(req, res, 'create')
  });

  router.put("/investmentsCategories/:id", async (req, res) => {
    await investmentsController.execute(req, res, 'update')
  });

  router.delete("/investmentsCategories/:id", async (req, res) => {
    await investmentsController.execute(req, res, 'delete')
  });

  return router;
}


export default createInvestmentsRouter;