import { UserCredential } from "firebase/auth";

export type TLogin = (args: { email: string, password: string }) => Promise<UserCredential>;
export type TRegister = (args: { email: string, password: string }) => Promise<UserCredential>;
export type TLogout = () => Promise<void>;