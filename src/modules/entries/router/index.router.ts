import { Router, Application } from "express";
import { EntriesController } from "@src/modules/entries/controller/index.controller";
import { EntriesService } from "@src/modules/entries/service/index.service";
import { EntriesRepository } from "@src/modules/entries/repository/index.repository";

const createEntriesRouter = (app: Application) => {
  const router = Router();

  const entriesController = new EntriesController(
    new EntriesService(
      new EntriesRepository(
        app.get("prismaClient"),
      )
    ),
  );

  router.get("/entries", async (req, res) => {
    await entriesController.execute(req, res, 'fetchMany');
  });

  router.get("/entries/:id", async (req, res) => {
    await entriesController.execute(req, res, 'fetchOne');
  });

  router.post("/entries", async (req, res) => {
    await entriesController.execute(req, res, 'create')
  });

  router.put("/entries/:id", async (req, res) => {
    await entriesController.execute(req, res, 'update')
  });

  router.delete("/entries/:id", async (req, res) => {
    await entriesController.execute(req, res, 'delete')
  });

  return router;
}


export default createEntriesRouter;