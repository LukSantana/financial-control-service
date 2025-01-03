import { Router, Application } from "express";
import { InvestmentsController } from "@src/modules/investments/controller/index.controller";
import { InvestmentsService } from "@src/modules/investments/service/index.service";
import { InvestmentsRepository } from "@src/modules/investments/repository/index.repository";

const createInvestmentsRouter = (app: Application) => {
  const router = Router();

  const investmentsController = new InvestmentsController(
    new InvestmentsService(
      new InvestmentsRepository(
        app.get("prismaClient"),
      )
    ),
  );

  router.get("/investments", async (req, res) => {
    await investmentsController.execute(req, res, 'fetchMany');
  });

  router.get("/investments/:id", async (req, res) => {
    await investmentsController.execute(req, res, 'fetchOne');
  });

  router.post("/investments", async (req, res) => {
    await investmentsController.execute(req, res, 'create')
  });

  router.put("/investments/:id", async (req, res) => {
    await investmentsController.execute(req, res, 'update')
  });

  router.delete("/investments/:id", async (req, res) => {
    await investmentsController.execute(req, res, 'delete')
  });

  return router;
}


export default createInvestmentsRouter;