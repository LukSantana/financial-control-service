import { AuthService } from "../service/index.service";
import { LogsRegistry } from "@src/utils/logsHandling";
import { PrismaClient } from "@prisma/client";
import logger from "@src/utils/logger";
import { TAuthOperations, type TOperationGeneric } from "@src/core/controller/types";
import { Controller } from "@src/core/controller";

export class AuthController extends Controller<keyof TAuthOperations> {
  constructor(
    private readonly service: AuthService,
  ) {
    super(
      new LogsRegistry(
        new PrismaClient().logs
      )
    )
    this.service = service;
  }

  protected login: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Auth - Login - Controller - Starting request')

      const { email, password } = req.body;

      const login = await this.service.login({ email, password });

      logger.info('Auth - Login - Controller - Request finished successfully')

      res.json(login);
    } catch (err: any) {
      logger.error(`Auth - Login - Controller - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }

  protected register: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Auth - Register - Controller - Starting request')

      const { email, password } = req.body;

      const register = await this.service.register({ email, password });

      logger.info('Auth - Register - Controller - Request finished successfully')

      res.json(register);
    } catch (err: any) {
      logger.error(`Auth - Register - Controller - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }

  protected logout: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Auth - Logout - Controller - Starting request')

      const logout = await this.service.logout();

      logger.info('Auth - Logout - Controller - Request finished successfully')

      res.json(logout);
    } catch (err: any) {
      logger.error(`Auth - Logout - Controller - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }
}