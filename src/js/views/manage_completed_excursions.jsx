import React, { useState, useEffect } from "react";
import { db, auth } from "../../js/firebase.js";
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const CompletedExcursions = () => {
    const [excursionesCompletadas, setExcursionesCompletadas] = useState([]);
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUsuario(user);
                fetchCompletedExcursions(user.uid); // Obtener excursiones completadas del guía
            }
        });

        return () => unsubscribe(); // Limpiar el listener
    }, []);

    const fetchCompletedExcursions = async (guiaUid) => {
        try {
            const q = query(collection(db, "reservas"), where("guiaUid", "==", guiaUid));
            const querySnapshot = await getDocs(q);
            const resultados = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setExcursionesCompletadas(resultados);
        } catch (error) {
            console.error("Error al obtener excursiones completadas:", error);
        }
    };

    return (
        <div className="container my-5">
            <h1 className="text-center">Excursiones Completadas</h1>
            {excursionesCompletadas.length === 0 ? (
                <p className="text-center">No hay excursiones completadas.</p>
            ) : (
                <div className="row">
                    {excursionesCompletadas.map(excursion => (
                        <div key={excursion.id} className="col-md-4 mb-4">
                            <div className="card shadow-lg p-3 text-center" style={{ borderRadius: "15px" }}>
                                <h5 className="fw-bold">{excursion.ruta}</h5>
                                <p className="text-muted">Fecha: {excursion.fecha}</p>
                                <p className="text-muted">Número de personas: {excursion.numeroPersonas}</p>
                                <p className="text-muted">Email: {excursion.email}</p>
                                <p className="text-muted">Teléfono: {excursion.telefono}</p>
                                <p className="text-muted">Pago Exitoso: {excursion.pagoExitoso ? "Sí" : "No"}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CompletedExcursions;