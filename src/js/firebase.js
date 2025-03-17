import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCDlM8AlEw8Vdgtgn9k2fXCqIe2vzJb2DI",
  authDomain: "proyectofinal-sistemasdeinfo.firebaseapp.com",
  projectId: "proyectofinal-sistemasdeinfo",
  storageBucket: "proyectofinal-sistemasdeinfo.appspot.com",
  messagingSenderId: "102396516511",
  appId: "1:102396516511:web:d597b16d3fcb05fe67eaaa",
  databaseURL: "https://proyectofinal-sistemasdeinfo-default-rtdb.firebaseio.com/", // Agrega esto
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const database = getDatabase(app); // Inicializar Realtime Database

// Exportar Firestore, autenticación, database y funciones necesarias
export { db, auth, database, collection, addDoc };