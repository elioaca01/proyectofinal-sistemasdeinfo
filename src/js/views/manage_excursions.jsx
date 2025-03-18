import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const Manage_Excursions = () => {
    const [excursions, setExcursions] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editExcursionId, setEditExcursionId] = useState(null);

    const [newExcursion, setNewExcursion] = useState({
        nombre: "",
        descripcion: "",
        fecha: "",
        cupoMaximo: "",
        dificultad: "",
        guiaId: ""
    });

    const [editExcursion, setEditExcursion] = useState(null);

    const fetchExcursions = async () => {
        const querySnapshot = await getDocs(collection(db, "excursions"));
        const excursionsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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
        await addDoc(collection(db, "excursions"), {
            ...newExcursion,
            cupoMaximo: Number(newExcursion.cupoMaximo)
        });
        setNewExcursion({ nombre: "", descripcion: "", fecha: "", cupoMaximo: "", dificultad: "", guiaId: "" });
        setShowAddForm(false);
        fetchExcursions();
    };

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "excursions", id));
        fetchExcursions();
    };

    const handleEdit = (excursion) => {
        setEditExcursion({ ...excursion });
        setEditExcursionId(excursion.id);
        setShowAddForm(false);
    };

    const handleUpdateExcursion = async (e) => {
        e.preventDefault();
        if (!editExcursionId) return;
        const excursionRef = doc(db, "excursions", editExcursionId);
        await updateDoc(excursionRef, editExcursion);
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
                <form onSubmit={handleAddExcursion} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <input type="text" name="nombre" placeholder="Nombre" value={newExcursion.nombre} onChange={(e) => handleInputChange(e, setNewExcursion)} required />
                    <input type="text" name="descripcion" placeholder="Descripción" value={newExcursion.descripcion} onChange={(e) => handleInputChange(e, setNewExcursion)} />
                    <input type="date" name="fecha" value={newExcursion.fecha} onChange={(e) => handleInputChange(e, setNewExcursion)} required />
                    <input type="number" name="cupoMaximo" placeholder="Cupo Máximo" value={newExcursion.cupoMaximo} onChange={(e) => handleInputChange(e, setNewExcursion)} required />
                    <input type="text" name="dificultad" placeholder="Dificultad" value={newExcursion.dificultad} onChange={(e) => handleInputChange(e, setNewExcursion)} />
                    <input type="text" name="guiaId" placeholder="ID del Guía" value={newExcursion.guiaId} onChange={(e) => handleInputChange(e, setNewExcursion)} />
                    <button type="submit">Guardar Excursión</button>
                </form>
            )}
            <div>
                {excursions.map(excursion => (
                    <div key={excursion.id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px", backgroundColor: "#fff", display: "flex", flexDirection: "column", alignItems: "center" }}>
                        {editExcursionId === excursion.id ? (
                            <form onSubmit={handleUpdateExcursion} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <input type="text" name="nombre" value={editExcursion.nombre} onChange={(e) => handleInputChange(e, setEditExcursion)} required />
                                <input type="text" name="descripcion" value={editExcursion.descripcion} onChange={(e) => handleInputChange(e, setEditExcursion)} />
                                <input type="date" name="fecha" value={editExcursion.fecha} onChange={(e) => handleInputChange(e, setEditExcursion)} required />
                                <input type="number" name="cupoMaximo" value={editExcursion.cupoMaximo} onChange={(e) => handleInputChange(e, setEditExcursion)} required />
                                <input type="text" name="dificultad" value={editExcursion.dificultad} onChange={(e) => handleInputChange(e, setEditExcursion)} />
                                <input type="text" name="guiaId" value={editExcursion.guiaId} onChange={(e) => handleInputChange(e, setEditExcursion)} />
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
                                <p><strong>ID del Guía:</strong> {excursion.guiaId}</p>
                                <button onClick={() => handleEdit(excursion)}>Editar</button>
                                <button onClick={() => handleDelete(excursion.id)} style={{ color: "red", marginLeft: "10px" }}>Eliminar</button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Manage_Excursions;