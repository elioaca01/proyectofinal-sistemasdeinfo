import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const ManageExcursions = () => {
    const [excursions, setExcursions] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [guides, setGuides] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editExcursionId, setEditExcursionId] = useState(null);

    const [newExcursion, setNewExcursion] = useState({
        nombre: "",
        descripcion: "",
        fecha: "",
        dificultad: "",
        destinoId: "",
        guiaId: ""
    });

    const [editExcursion, setEditExcursion] = useState(null);

    useEffect(() => {
        fetchExcursions();
        fetchDestinations();
        fetchGuides();
    }, []);

    // Cargar excursiones desde Firebase
    const fetchExcursions = async () => {
        const querySnapshot = await getDocs(collection(db, "excursions"));
        const excursionsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setExcursions(excursionsList);
    };

    // Cargar destinos desde Firebase
    const fetchDestinations = async () => {
        const querySnapshot = await getDocs(collection(db, "destinations"));
        const destinationsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDestinations(destinationsList);
    };

    // Cargar guías desde Firebase
    const fetchGuides = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "users"));
            const guidesList = querySnapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .filter(user => user.rol && user.rol.toLowerCase() === "guía");

            setGuides(guidesList);
        } catch (error) {
            console.error("Error al obtener los guías:", error);
        }
    };

    const handleInputChange = (e, setFunction) => {
        setFunction(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleAddExcursion = async (e) => {
        e.preventDefault();
        if (!newExcursion.destinoId || !newExcursion.guiaId) {
            alert("Debe seleccionar un destino y un guía.");
            return;
        }

        await addDoc(collection(db, "excursions"), newExcursion);
        setNewExcursion({ nombre: "", descripcion: "", fecha: "", dificultad: "", destinoId: "", guiaId: "" });

        setShowAddForm(false);
        fetchExcursions();
    };

    const handleDelete = async (id) => {
        if (!id) return;

        try {
            await deleteDoc(doc(db, "excursions", id));
            setExcursions(prev => prev.filter(excursion => excursion.id !== id));
            alert("Excursión eliminada con éxito.");
        } catch (error) {
            console.error("Error al eliminar la excursión:", error);
        }
    };

    const handleEdit = (excursion) => {
        setEditExcursion({ ...excursion });
        setEditExcursionId(excursion.id);
        setShowAddForm(false);
    };

    const handleUpdateExcursion = async (e) => {
        e.preventDefault();
        if (!editExcursionId) return;

        try {
            const excursionRef = doc(db, "excursions", editExcursionId);
            await updateDoc(excursionRef, editExcursion);
            setEditExcursionId(null);
            setEditExcursion(null);
            fetchExcursions();
            alert("Excursión actualizada correctamente.");
        } catch (error) {
            console.error("Error al actualizar la excursión:", error);
        }
    };

    return (
        <div style={{ width: "100%", backgroundColor: "#f4f4f4", padding: "30px", textAlign: "center" }}>
            <h2 style={{ color: "#333", marginBottom: "20px" }}>Gestión de Excursiones</h2>
            <button onClick={() => { setShowAddForm(!showAddForm); setEditExcursionId(null); }}
                style={{ padding: "10px 20px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                {showAddForm ? "Cancelar" : "Agregar Excursión"}
            </button>

            {showAddForm && (
                <form onSubmit={handleAddExcursion}
                    style={{ marginTop: "20px", backgroundColor: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0px 4px 8px rgba(0,0,0,0.1)", maxWidth: "400px", margin: "auto" }}>
                    <input type="text" name="nombre" placeholder="Nombre" value={newExcursion.nombre} onChange={(e) => handleInputChange(e, setNewExcursion)} required />
                    <textarea name="descripcion" placeholder="Descripción" value={newExcursion.descripcion} onChange={(e) => handleInputChange(e, setNewExcursion)} />
                    <input type="date" name="fecha" value={newExcursion.fecha} onChange={(e) => handleInputChange(e, setNewExcursion)} required />
                    <input type="text" name="dificultad" placeholder="Dificultad" value={newExcursion.dificultad} onChange={(e) => handleInputChange(e, setNewExcursion)} />

                    <select name="destinoId" value={newExcursion.destinoId} onChange={(e) => handleInputChange(e, setNewExcursion)} required>
                        <option value="">Seleccione un destino</option>
                        {destinations.map(destino => (
                            <option key={destino.id} value={destino.id}>{destino.nombre}</option>
                        ))}
                    </select>

                    <select name="guiaId" value={newExcursion.guiaId} onChange={(e) => handleInputChange(e, setNewExcursion)} required>
                        <option value="">Seleccione un guía</option>
                        {guides.map(guia => (
                            <option key={guia.id} value={guia.id}>{guia.nombre} - {guia.años_experiencia} años</option>
                        ))}
                    </select>

                    <button type="submit" style={{ marginTop: "10px", padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                        Guardar Excursión
                    </button>
                </form>
            )}

            <div style={{ marginTop: "20px", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                {excursions.map(excursion => (
                    <div key={excursion.id} style={{ border: "1px solid #ddd", padding: "15px", margin: "10px", backgroundColor: "#fff", borderRadius: "8px", width: "300px" }}>
                        <h3>{excursion.nombre}</h3>
                        <p><strong>Descripción:</strong> {excursion.descripcion}</p>
                        <p><strong>Fecha:</strong> {excursion.fecha}</p>
                        <p><strong>Guía:</strong> {guides.find(g => g.id === excursion.guiaId)?.nombre || "No asignado"}</p>
                        <button onClick={() => handleEdit(excursion)}>Editar</button>
                        <button onClick={() => handleDelete(excursion.id)} style={{ color: "red" }}>Eliminar</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageExcursions;