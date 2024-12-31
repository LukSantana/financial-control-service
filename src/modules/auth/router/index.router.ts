import { Router, Application } from "express";
import { AuthService } from "../service/index.service";
import { AuthController } from "../controller/index.controller";

const createAuthRouter = (app: Application) => {
  const router = Router();

  const authController = new AuthController(
    new AuthService(
      app.get('firebaseAuth')
    ),
  );

  router.post("/auth/login", async (req, res) => {
    await authController.execute(req, res, 'login');
  });

  router.post("/auth/register", async (req, res) => {
    await authController.execute(req, res, 'register');
  })

  router.post("/auth/logout", async (req, res) => {
    await authController.execute(req, res, 'logout');
  })

  return router;
}


export default createAuthRouter;