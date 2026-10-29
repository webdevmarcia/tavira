// Firebase é opcional: só é ligado se as variáveis VITE_FIREBASE_* estiverem definidas
// (ficheiro .env.local ou nas definições do Vercel). Sem elas, as edições ficam só neste dispositivo.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const firebaseAtivo = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

let dbPromise = null;

// Carrega o Firebase só quando é preciso (a app fica mais leve)
export function getDb() {
  if (!firebaseAtivo) return null;
  if (!dbPromise) {
    dbPromise = Promise.all([import("firebase/app"), import("firebase/firestore")]).then(
      ([{ initializeApp }, firestore]) => ({
        db: firestore.getFirestore(initializeApp(firebaseConfig)),
        firestore,
      })
    );
  }
  return dbPromise;
}
