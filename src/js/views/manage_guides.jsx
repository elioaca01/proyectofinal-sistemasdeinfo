import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, query, where, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

const Manage_Guides = () => {
    const navigate = useNavigate();
    const [guides, setGuides] = useState([]);
    const [filteredGuides, setFilteredGuides] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [newGuide, setNewGuide] = useState({
        usuario_id: "",
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        nombre_usuario: "",
        contraseña: "",
        rol: "Guía",
        años_experiencia: 0,
        idiomas: [],
        creado_por: "",
        fecha_creacion: new Date().toISOString().split('T')[0],
    });
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchGuides();
    }, []);

    const fetchGuides = async () => {
        try {
            const q = query(collection(db, "users"), where("rol", "==", "Guía"));
            const querySnapshot = await getDocs(q);
            const guidesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setGuides(guidesList);
            setFilteredGuides(guidesList);
        } catch (error) {
            console.error("Error obteniendo guías:", error);
        }
    };

    const addGuide = async () => {
        if (!newGuide.nombre || !newGuide.email || !newGuide.nombre_usuario) {
            alert("Por favor, completa los campos obligatorios.");
            return;
        }

        try {
            const docRef = await addDoc(collection(db, "users"), newGuide);
            const newGuideWithId = { id: docRef.id, ...newGuide };
            setGuides([...guides, newGuideWithId]);
            setFilteredGuides([...filteredGuides, newGuideWithId]);
            setNewGuide({
                usuario_id: "",
                nombre: "",
                apellido: "",
                email: "",
                telefono: "",
                nombre_usuario: "",
                contraseña: "",
                rol: "Guía",
                años_experiencia: 0,
                idiomas: [],
                creado_por: "",
                fecha_creacion: new Date().toISOString().split('T')[0],
            });
            setShowForm(false);
        } catch (error) {
            console.error("Error agregando guía:", error);
        }
    };

    const deleteGuide = async (id) => {
        try {
            await deleteDoc(doc(db, "users", id));
            const updatedGuides = guides.filter(guide => guide.id !== id);
            setGuides(updatedGuides);
            setFilteredGuides(updatedGuides);
        } catch (error) {
            console.error("Error eliminando guía:", error);
        }
    };

    useEffect(() => {
        if (searchTerm === "") {
            setFilteredGuides(guides);
        } else {
            setFilteredGuides(guides.filter(guide =>
                guide.nombre_usuario.toLowerCase().includes(searchTerm.toLowerCase())
            ));
        }
    }, [searchTerm, guides]);

    return (
        <div className="d-flex flex-column align-items-center my-4" style={{ width: "100%" }}>

            {/* Barra de búsqueda */}
            <input
                type="text"
                placeholder="🔍 Buscar por nombre de usuario..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                    padding: "8px",
                    width: "300px",
                    marginBottom: "15px",
                    border: "1px solid #ccc",
                    borderRadius: "5px"
                }}
            />

            {/* Botón para mostrar/ocultar el formulario */}
            <button
                onClick={() => setShowForm(!showForm)}
                style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", marginBottom: "15px" }}>
                {showForm ? "Cancelar" : "➕ Agregar Guía"}
            </button>

            {showForm && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "20px" }}>
                    <input type="text" placeholder="Nombre" value={newGuide.nombre} onChange={(e) => setNewGuide({ ...newGuide, nombre: e.target.value })} />
                    <input type="text" placeholder="Apellido" value={newGuide.apellido} onChange={(e) => setNewGuide({ ...newGuide, apellido: e.target.value })} />
                    <input type="email" placeholder="Correo" value={newGuide.email} onChange={(e) => setNewGuide({ ...newGuide, email: e.target.value })} />
                    <input type="text" placeholder="Teléfono" value={newGuide.telefono} onChange={(e) => setNewGuide({ ...newGuide, telefono: e.target.value })} />
                    <input type="text" placeholder="Nombre de Usuario" value={newGuide.nombre_usuario} onChange={(e) => setNewGuide({ ...newGuide, nombre_usuario: e.target.value })} />
                    <input type="number" placeholder="Años de Experiencia" value={newGuide.años_experiencia} onChange={(e) => setNewGuide({ ...newGuide, años_experiencia: e.target.value })} />
                    <input type="text" placeholder="Idiomas (separados por coma)" value={newGuide.idiomas.join(", ")} onChange={(e) => setNewGuide({ ...newGuide, idiomas: e.target.value.split(",") })} />
                    <button onClick={addGuide} style={{ padding: "8px 15px", backgroundColor: "green", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Guardar Guía</button>
                </div>
            )}

            {/* Lista de Guías con tamaño fijo */}
            <div style={{ minHeight: "300px", width: "80%", border: "1px solid #ddd", padding: "10px", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
                <h3>Lista de Guías</h3>
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {filteredGuides.length > 0 ? (
                        filteredGuides.map(guide => (
                            <li key={guide.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px", borderBottom: "1px solid #ccc" }}>
                                {guide.nombre} {guide.apellido} - {guide.email} - {guide.telefono} - {guide.idiomas.join(", ")}
                                <button
                                    onClick={() => deleteGuide(guide.id)}
                                    style={{ color: "white", backgroundColor: "red", border: "none", padding: "5px 10px", cursor: "pointer", borderRadius: "5px" }}>
                                    ❌ Eliminar
                                </button>
                            </li>
                        ))
                    ) : (
                        <p style={{ textAlign: "center", color: "#888" }}>No hay guías disponibles.</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Manage_Guides;