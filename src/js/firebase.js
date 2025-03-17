import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";  // Importar correctamente

const firebaseConfig = {
  apiKey: "AIzaSyCDlM8AlEw8Vdgtgn9k2fXCqIe2vzJb2DI",
  authDomain: "proyectofinal-sistemasdeinfo.firebaseapp.com",
  projectId: "proyectofinal-sistemasdeinfo",
  storageBucket: "proyectofinal-sistemasdeinfo.appspot.com",  // Corrección aquí
  messagingSenderId: "102396516511",
  appId: "1:102396516511:web:d597b16d3fcb05fe67eaaa",
  measurementId: "G-TR12D0PHMZ"  // Opcional, solo si usas Firebase Analytics
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);  // Inicializar autenticación

// Exportar Firestore, autenticación y funciones necesarias
export { db, auth, collection, addDoc };
