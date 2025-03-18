import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const Manage_Excursions = () => {
    const [excursions, setExcursions] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editExcursionId, setEditExcursionId] = useState(null);
    const [guides, setGuides] = useState({});

    const [newExcursion, setNewExcursion] = useState({
        nombre: "",
        descripcion: "",
        fecha: "",
        cupoMaximo: "",
        dificultad: "",
        guiaId: "",
        asistencia: 0,   // Valor predeterminado fijo
        excursionistas: [] // Lista vacía fija
    });

    const [editExcursion, setEditExcursion] = useState(null);

    const fetchExcursions = async () => {
        const querySnapshot = await getDocs(collection(db, "excursions"));
        const excursionsList = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: parseInt(doc.id),
                nombre: data.nombre || "",
                descripcion: data.descripcion || "",
                fecha: data.fecha || "",
                cupoMaximo: data.cupoMaximo || 0,
                dificultad: data.dificultad || "",
                guiaId: data.guiaId ? parseInt(data.guiaId) : 0,
                asistencia: data.asistencia ?? 0, // Asegurar que exista asistencia
                excursionistas: data.excursionistas ?? [] // Asegurar que exista excursionistas
            };
        });
        setExcursions(excursionsList);
    };

    useEffect(() => {
        fetchExcursions();
    }, []);

    const handleInputChange = (e, setFunction) => {
        setFunction(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleAddExcursion = async (e) => {
        e.preventDefault();
        const newExcursionData = {
            nombre: newExcursion.nombre,
            descripcion: newExcursion.descripcion,
            fecha: newExcursion.fecha,
            cupoMaximo: Number(newExcursion.cupoMaximo),
            dificultad: newExcursion.dificultad,
            guiaId: Number(newExcursion.guiaId),
            asistencia: 0, // Asegurar que asistencia siempre sea un entero
            excursionistas: [] // Lista vacía asegurada
        };

        await addDoc(collection(db, "excursions"), newExcursionData);

        setNewExcursion({
            nombre: "",
            descripcion: "",
            fecha: "",
            cupoMaximo: "",
            dificultad: "",
            guiaId: "",
            asistencia: 0,
            excursionistas: []
        });

        setShowAddForm(false);
        fetchExcursions();
    };

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "excursions", id.toString()));
        fetchExcursions();
    };

    const handleEdit = (excursion) => {
        setEditExcursion({
            ...excursion,
            asistencia: excursion.asistencia ?? 0,
            excursionistas: excursion.excursionistas ?? []
        });
        setEditExcursionId(excursion.id);
        setShowAddForm(false);
    };

    const handleUpdateExcursion = async (e) => {
        e.preventDefault();
        if (!editExcursionId) return;

        const updatedExcursion = {
            ...editExcursion,
            cupoMaximo: Number(editExcursion.cupoMaximo),
            guiaId: Number(editExcursion.guiaId),
            asistencia: editExcursion.asistencia ?? 0,
            excursionistas: editExcursion.excursionistas ?? []
        };

        const excursionRef = doc(db, "excursions", editExcursionId.toString());
        await updateDoc(excursionRef, updatedExcursion);

        setEditExcursionId(null);
        setEditExcursion(null);
        fetchExcursions();
    };

    return (
        <div style={{ width: "100%", backgroundColor: "#f4f4f4", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h2>Gestión de Excursiones</h2>
            <button onClick={() => { setShowAddForm(!showAddForm); setEditExcursionId(null); }} style={{ marginBottom: "20px" }}>
                {showAddForm ? "Cancelar" : "Agregar Excursión"}
            </button>
            {showAddForm && (
                <form onSubmit={handleAddExcursion} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                    {Object.keys(newExcursion).map((key) => (
                        <input key={key} type="text" name={key} placeholder={key.charAt(0).toUpperCase() + key.slice(1)} value={newExcursion[key]} onChange={(e) => handleInputChange(e, setNewExcursion)} required style={{ marginBottom: "10px", width: "90%" }} />
                    ))}
                    <button type="submit">Guardar Excursión</button>
                </form>
            )}
            <div>
                {excursions.map(excursion => (
                    <div key={excursion.id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px", backgroundColor: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center", width: "400px" }}>
                        <div>
                            {editExcursionId === excursion.id ? (
                                <form onSubmit={handleUpdateExcursion} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                                    {Object.keys(editExcursion).map((key) => (
                                        <input key={key} type="text" name={key} placeholder={key.charAt(0).toUpperCase() + key.slice(1)} value={editExcursion[key]} onChange={(e) => handleInputChange(e, setEditExcursion)} required style={{ width: "90%", marginBottom: "10px" }} />
                                    ))}
                                    <button type="submit">Actualizar</button>
                                    <button type="button" onClick={() => setEditExcursionId(null)}>Cancelar</button>
                                </form>
                            ) : (
                                <>
                                    <h3>{excursion.nombre}</h3>
                                    <p><strong>Descripción:</strong> {excursion.descripcion}</p>
                                    <p><strong>Fecha:</strong> {excursion.fecha}</p>
                                    <p><strong>Cupo Máximo:</strong> {excursion.cupoMaximo}</p>
                                    <p><strong>Dificultad:</strong> {excursion.dificultad}</p>
                                    <p><strong>Asistencia:</strong> {excursion.asistencia}</p>
                                    <p><strong>Excursionistas:</strong> {excursion.excursionistas.length}</p>
                                    <button onClick={() => handleEdit(excursion)}>Editar</button>
                                    <button onClick={() => handleDelete(excursion.id)} style={{ color: "red", marginLeft: "10px" }}>Eliminar</button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Manage_Excursions;