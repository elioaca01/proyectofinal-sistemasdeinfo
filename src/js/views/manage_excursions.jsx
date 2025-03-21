import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const ManageExcursions = () => {
    const [excursions, setExcursions] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [guides, setGuides] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editExcursionId, setEditExcursionId] = useState(null);
    const [filterStatus, setFilterStatus] = useState("todos"); // Estado para el filtro

    const [newExcursion, setNewExcursion] = useState({
        nombre: "",
        descripcion: "",
        fecha: "",
        dificultad: "",
        destinoId: "",
        guiaId: "",
        reservadoPor: "" // Inicialmente vacío
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

        // Crear la excursión con el campo reservadoPor vacío
        await addDoc(collection(db, "excursions"), {
            ...newExcursion,
            reservadoPor: "" // Asegurarse de que esté vacío
        });

        // Reiniciar el formulario
        setNewExcursion({ nombre: "", descripcion: "", fecha: "", dificultad: "", destinoId: "", guiaId: "", reservadoPor: "" });

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

    // Filtrar excursiones según el estado
    const filteredExcursions = excursions.filter(excursion => {
        if (filterStatus === "reservada") return excursion.reservadoPor;
        if (filterStatus === "noReservada") return !excursion.reservadoPor;
        return true; // "todos"
    });

    return (
        <div style={{ width: "100%", backgroundColor: "#fef9c3", padding: "30px", textAlign: "center" }}>
            <div style={{ backgroundColor: "#31470b", padding: "20px", borderRadius: "10px", display: "inline-block", width: "80%", margin: "auto" }}>
                <h2 className="display-4 fw-bold text-custom-green2"
                    style={{ fontSize: "3rem", letterSpacing: '2px', color: "#fef9c3" }}>
                    Gestión de Excursiones
                </h2>

                <div style={{ marginBottom: "20px" }}>
                    {/* Filtro de estado */}
                    <select onChange={(e) => setFilterStatus(e.target.value)} style={{ fontSize: "1.2rem", padding: "10px", backgroundColor: "#fef9c3", color: "#31470b", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                        <option value="todos">Todos</option>
                        <option value="reservada">Reservadas</option>
                        <option value="noReservada">No Reservadas</option>
                    </select>
                </div>

                {/* Mostrar excursiones filtradas */}
                <div style={{ marginTop: "20px", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                    {filteredExcursions.map(excursion => (
                        <div key={excursion.id} style={{
                            border: "1px solid #ddd",
                            padding: "15px",
                            margin: "10px",
                            backgroundColor: "#fff",
                            borderRadius: "8px",
                            width: "300px",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                            transition: "transform 0.3s ease",
                        }}>
                            <h3 style={{ marginBottom: "10px", fontSize: "1.5rem", color: "#31470b" }}>{excursion.nombre}</h3>
                            <p><strong>Descripción:</strong> {excursion.descripcion}</p>
                            <p><strong>Fecha:</strong> {excursion.fecha}</p>
                            <p><strong>Guía:</strong> {guides.find(g => g.id === excursion.guiaId)?.nombre || "No asignado"}</p>
                            <p><strong>Estado:</strong> {excursion.reservadoPor ? `Reservada, ID Reserva: ${excursion.reservadoPor}` : "No reservada"}</p>
                            <button onClick={() => handleEdit(excursion)} style={{
                                backgroundColor: "#28a745",
                                color: "white",
                                padding: "10px 20px",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                                marginRight: "10px",
                            }}>
                                Editar
                            </button>
                            <button onClick={() => handleDelete(excursion.id)} style={{
                                backgroundColor: "#dc3545",
                                color: "white",
                                padding: "10px 20px",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}>
                                Eliminar
                            </button>
                        </div>
                    ))}
                </div>

                {/* Opción para agregar nueva excursión */}
                <div style={{ marginTop: "20px" }}>
                    <button
                        className="fw-bold text-custom-green2"
                        onClick={() => { setShowAddForm(!showAddForm); setEditExcursionId(null); }}
                        style={{
                            fontSize: "1.2rem",
                            padding: "10px 20px",
                            backgroundColor: "#fef9c3",
                            color: "#31470b",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            marginRight: "10px",
                        }}>
                        {showAddForm ? "Cancelar" : "Agregar Excursión"}
                    </button>
                </div>

                {showAddForm && (
                    <form onSubmit={handleAddExcursion}
                        style={{
                            marginTop: "20px",
                            backgroundColor: "#fff",
                            padding: "20px",
                            borderRadius: "8px",
                            boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
                            maxWidth: "400px",
                            margin: "auto",
                        }}>
                        <input type="text" name="nombre" placeholder="Nombre de la ruta" value={newExcursion.nombre} onChange={(e) => handleInputChange(e, setNewExcursion)} required
                            style={{ marginBottom: "10px", padding: "10px", borderRadius: "5px", border: "1px solid #ddd", width: "100%" }} />
                        <textarea name="descripcion" placeholder="Descripción de la ruta" value={newExcursion.descripcion} onChange={(e) => handleInputChange(e, setNewExcursion)}
                            style={{ marginBottom: "10px", padding: "10px", borderRadius: "5px", border: "1px solid #ddd", width: "100%" }} />
                        <input type="date" name="fecha" value={newExcursion.fecha} onChange={(e) => handleInputChange(e, setNewExcursion)} required
                            style={{ marginBottom: "10px", padding: "10px", borderRadius: "5px", border: "1px solid #ddd", width: "100%" }} />
                        <input type="text" name="dificultad" placeholder="Dificultad" value={newExcursion.dificultad} onChange={(e) => handleInputChange(e, setNewExcursion)}
                            style={{ marginBottom: "10px", padding: "10px", borderRadius: "5px", border: "1px solid #ddd", width: "100%" }} />

                        <select name="destinoId" value={newExcursion.destinoId} onChange={(e) => handleInputChange(e, setNewExcursion)} required
                            style={{ marginBottom: "10px", padding: "10px", borderRadius: "5px", border: "1px solid #ddd", width: "100%" }}>
                            <option value="">Seleccione un destino</option>
                            {destinations.map(destino => (
                                <option key={destino.id} value={destino.id}>{destino.nombre}</option>
                            ))}
                        </select>

                        <select name="guiaId" value={newExcursion.guiaId} onChange={(e) => handleInputChange(e, setNewExcursion)} required
                            style={{ marginBottom: "10px", padding: "10px", borderRadius: "5px", border: "1px solid #ddd", width: "100%" }}>
                            <option value="">Seleccione un guía</option>
                            {guides.map(guia => (
                                <option key={guia.id} value={guia.id}>{guia.nombre} - {guia.años_experiencia} años</option>
                            ))}
                        </select>

                        <button type="submit" style={{
                            marginTop: "10px",
                            padding: "10px",
                            backgroundColor: "#007bff",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}>
                            Guardar Excursión
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ManageExcursions;