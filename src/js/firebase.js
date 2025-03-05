// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCDlM8AlEw8Vdgtgn9k2fXCqIe2vzJb2DI",
  authDomain: "proyectofinal-sistemasdeinfo.firebaseapp.com",
  projectId: "proyectofinal-sistemasdeinfo",
  storageBucket: "proyectofinal-sistemasdeinfo.firebasestorage.app",
  messagingSenderId: "102396516511",
  appId: "1:102396516511:web:d597b16d3fcb05fe67eaaa",
  measurementId: "G-TR12D0PHMZ"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta los servicios de Firebase que necesitas
const auth = getAuth(app); // Para autenticación
const db = getFirestore(app); // Para Firestore (base de datos)
const rtdb = getDatabase(app); // Para Realtime Database (si lo usas)

export { auth, db, rtdb };
