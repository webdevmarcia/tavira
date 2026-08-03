import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AQUI",
  authDomain: "AQUI",
  projectId: "AQUI",
  storageBucket: "AQUI",
  messagingSenderId: "AQUI",
  appId: "AQUI"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
