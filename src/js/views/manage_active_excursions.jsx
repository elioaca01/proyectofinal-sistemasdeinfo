import React, { useState, useEffect } from "react";
import { db, auth } from "../../js/firebase.js";
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const GuideExcursions = () => {
    const [excursiones, setExcursiones] = useState([]);
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUsuario(user);
                fetchExcursions(user.uid); // Obtener excursiones del guía
            }
        });

        return () => unsubscribe(); // Limpiar el listener
    }, []);

    const fetchExcursions = async (guiaUid) => {
        try {
            const q = query(collection(db, "excursions"), where("guiaUid", "==", guiaUid));
            const querySnapshot = await getDocs(q);
            const resultados = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setExcursiones(resultados);
        } catch (error) {
            console.error("Error al obtener excursiones:", error);
        }
    };

    return (
        <div className="container my-5">
            <h1 className="text-center">Excursiones Asignadas</h1>
            {excursiones.length === 0 ? (
                <p className="text-center">No tienes excursiones asignadas.</p>
            ) : (
                <div className="row">
                    {excursiones.map(excursion => (
                        <div key={excursion.id} className="col-md-4 mb-4">
                            <div className="card shadow-lg p-3 text-center" style={{ borderRadius: "15px" }}>
                                <h5 className="fw-bold">{excursion.nombre}</h5>
                                <p className="text-muted">Fecha: {excursion.fecha}</p>
                                <p className="text-muted">Descripción: {excursion.descripcion}</p>
                                <p className="text-muted">Número de personas: {excursion.numeroPersonas}</p>
                                <p className="text-muted">Guía: {excursion.guiaUid}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GuideExcursions;