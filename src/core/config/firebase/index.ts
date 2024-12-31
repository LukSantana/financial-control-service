import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  apiKey,
  appId,
  authDomain,
  messagingSenderId,
  projectId,
  storageBucket,
  measurementId
} from "../environment";

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId
};

const configureFirebase = () => {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  return { auth };
}

export { configureFirebase };