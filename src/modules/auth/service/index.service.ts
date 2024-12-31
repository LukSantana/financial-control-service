import {
  type Auth as FirebaseAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { TLogin, TLogout, TRegister } from "@src/modules/auth/types";
import logger from "@src/utils/logger";
import { HttpError } from "@src/utils/httpError";

export class AuthService {
  constructor(
    protected readonly auth: FirebaseAuth
  ) {
    this.auth = auth;
  }

  login: TLogin = async (args) => {
    try {
      logger.info('Auth - Login - Service - Enter');
      const { email, password } = args;
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      logger.info('Auth - Login - Service - Exit');
      return userCredential;
    } catch (err: any) {
      const error = new HttpError({
        message: 'Failed to login',
        status: 401,
        stack: err.stack
      });
      logger.error(`Auth - Login - Service - Error: ${err.message}`);
      throw error;
    }
  }

  register: TRegister = async (args: { email: string, password: string }) => {
    try {
      logger.info('Auth - Register - Service - Enter');
      const { email, password } = args;
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      logger.info('Auth - Register - Service - Exit');
      return userCredential;
    } catch (err: any) {
      const error = new HttpError({
        message: 'Failed to register',
        status: 401,
        stack: err.stack
      });
      logger.error(`Auth - Register - Service - Error: ${err.message}`);
      throw error;
    }
  }

  logout: TLogout = async () => {
    try {
      logger.info('Auth - Logout - Service - Enter');
      await signOut(this.auth);
      logger.info('Auth - Logout - Service - Exit');
    } catch (err: any) {
      const error = new HttpError({
        message: 'Failed to logout',
        status: 401,
        stack: err.stack
      });
      logger.error(`Auth - Logout - Service - Error: ${err.message}`);
      throw error;
    }
  }
}