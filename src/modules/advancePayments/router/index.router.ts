import { Router, Application } from "express";
import { AdvancePaymentsController } from "@src/modules/advancePayments/controller/index.controller";
import { AdvancePaymentsService } from "@src/modules/advancePayments/service/index.service";
import { AdvancePaymentsRepository } from "@src/modules/advancePayments/repository/index.repository";

const createAdvancePaymentsRouter = (app: Application) => {
  const router = Router();

  const advancePaymentsController = new AdvancePaymentsController(
    new AdvancePaymentsService(
      new AdvancePaymentsRepository(
        app.get("prismaClient"),
      )
    ),
  );

  router.get("/advancePayments", async (req, res) => {
    await advancePaymentsController.execute(req, res, 'fetchMany');
  });

  router.get("/advancePayments/:id", async (req, res) => {
    await advancePaymentsController.execute(req, res, 'fetchUnique');
  });

  router.post("/advancePayments", async (req, res) => {
    await advancePaymentsController.execute(req, res, 'create')
  });

  router.put("/advancePayments/:id", async (req, res) => {
    await advancePaymentsController.execute(req, res, 'update')
  });

  router.delete("/advancePayments/:id", async (req, res) => {
    await advancePaymentsController.execute(req, res, 'delete')
  });

  return router;
}


export default createAdvancePaymentsRouter;