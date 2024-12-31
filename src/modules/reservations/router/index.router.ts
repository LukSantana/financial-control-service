import { Router, Application } from "express";
import { ReservationsController } from "@src/modules/reservations/controller/index.controller";
import { ReservationsService } from "@src/modules/reservations/service/index.service";
import { ReservationsRepository } from "@src/modules/reservations/repository/index.repository";

const createReservationsRouter = (app: Application) => {
  const router = Router();

  const reservationsController = new ReservationsController(
    new ReservationsService(
      new ReservationsRepository(
        app.get("prismaClient"),
      )
    ),
  );

  router.get("/reservations", async (req, res) => {
    await reservationsController.execute(req, res, 'fetchMany');
  });

  router.get("/reservations/:id", async (req, res) => {
    await reservationsController.execute(req, res, 'fetchUnique');
  });

  router.post("/reservations", async (req, res) => {
    await reservationsController.execute(req, res, 'create')
  });

  router.put("/reservations/:id", async (req, res) => {
    await reservationsController.execute(req, res, 'update')
  });

  router.delete("/reservations/:id", async (req, res) => {
    await reservationsController.execute(req, res, 'delete')
  });

  return router;
}


export default createReservationsRouter;