import {
  type Auth as FirebaseAuth,
  signInWithEmailAndPassword
} from "firebase/auth";
import { TLogin } from "@src/modules/auth/types"
import logger from "@src/utils/logger"
import { HttpError } from "@src/utils/httpError";

export class Auth {
  constructor(
    protected readonly auth: FirebaseAuth
  ) {
    this.auth = auth
  }

  login: TLogin = async (args) => {
    try {
      logger.info('Auth - Login - Starting process')
      const { email, password } = args;
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return userCredential;
    } catch (err: any) {
      logger.error(`Auth - Login - Error: ${err.message}`)
      throw new HttpError({
        message: 'Failed to login',
        status: 401,
        stack: err.stack
      })
    }
  }


}