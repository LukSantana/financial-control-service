import { Router, Application } from "express";
import { EntriesSourcesController } from "@src/modules/entriesSources/controller/index.controller";
import { EntriesSourcesService } from "@src/modules/entriesSources/service/index.service";
import { EntriesSourcesRepository } from "@src/modules/entriesSources/repository/index.repository";

const createEntriesSourcesRouter = (app: Application) => {
  const router = Router();

  const entriesSourcesController = new EntriesSourcesController(
    new EntriesSourcesService(
      new EntriesSourcesRepository(
        app.get("prismaClient"),
      )
    ),
  );

  router.get("/entriesSources", async (req, res) => {
    await entriesSourcesController.execute(req, res, 'fetchMany');
  });

  router.get("/entriesSources/:id", async (req, res) => {
    await entriesSourcesController.execute(req, res, 'fetchOne');
  });

  router.post("/entriesSources", async (req, res) => {
    await entriesSourcesController.execute(req, res, 'create')
  });

  router.put("/entriesSources/:id", async (req, res) => {
    await entriesSourcesController.execute(req, res, 'update')
  });

  router.delete("/entriesSources/:id", async (req, res) => {
    await entriesSourcesController.execute(req, res, 'delete')
  });

  return router;
}


export default createEntriesSourcesRouter;