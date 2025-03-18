import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const ManageRoutes = () => {
    const [destinations, setDestinations] = useState([]);
    const [editingDestination, setEditingDestination] = useState(null);
    const [editForm, setEditForm] = useState(null);

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                console.log("📥 Cargando destinos desde Firestore...");
                const querySnapshot = await getDocs(collection(db, "destinations"));
                const destinationsList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setDestinations(destinationsList);
                console.log("✅ Destinos cargados:", destinationsList);
            } catch (error) {
                console.error("❌ Error al obtener destinos:", error);
            }
        };

        fetchDestinations();
    }, []);

    // 🔥 Función para eliminar un destino
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este destino?");
        if (confirmDelete) {
            try {
                await deleteDoc(doc(db, "destinations", id));
                setDestinations(destinations.filter(dest => dest.id !== id));
                alert("Destino eliminado correctamente ✅");
            } catch (error) {
                console.error("❌ Error al eliminar el destino:", error);
            }
        }
    };

    // 🔥 Función para activar el modo edición
    const handleEdit = (destino) => {
        setEditingDestination(destino.id);
        setEditForm({ ...destino }); // Copia los datos del destino a editar
    };

    // 🔥 Función para manejar cambios en el formulario de edición
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm({ ...editForm, [name]: value });
    };

    // 🔥 Función para guardar cambios en Firestore
    const handleSaveChanges = async () => {
        try {
            const destinoRef = doc(db, "destinations", editingDestination);
            await updateDoc(destinoRef, editForm);
            setDestinations(destinations.map(dest => (dest.id === editingDestination ? editForm : dest)));
            setEditingDestination(null); // Cerrar el modo edición
            alert("Destino actualizado correctamente ✅");
        } catch (error) {
            console.error("❌ Error al actualizar destino:", error);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Gestionar Destinos</h2>

            {/* Modo edición */}
            {editingDestination ? (
                <div className="card p-4 shadow">
                    <h3 className="text-center">Editar Destino</h3>
                    <input
                        className="form-control mb-2"
                        value={editForm.nombre}
                        onChange={handleEditChange}
                        name="nombre"
                        placeholder="Nombre del destino"
                    />
                    <textarea
                        className="form-control mb-2"
                        value={editForm.descripcion}
                        onChange={handleEditChange}
                        name="descripcion"
                        placeholder="Descripción"
                    />
                    <input
                        className="form-control mb-2"
                        type="number"
                        value={editForm.ranking}
                        onChange={handleEditChange}
                        name="ranking"
                        placeholder="Ranking (1-5)"
                    />
                    <input
                        className="form-control mb-2"
                        type="number"
                        value={editForm.km}
                        onChange={handleEditChange}
                        name="km"
                        placeholder="Kilómetros del trayecto"
                    />
                    <select
                        className="form-control mb-2"
                        value={editForm.dificultad}
                        onChange={handleEditChange}
                        name="dificultad"
                    >
                        <option value="Fácil">Fácil</option>
                        <option value="Medio">Medio</option>
                        <option value="Difícil">Difícil</option>
                    </select>
                    <input
                        className="form-control mb-2"
                        value={editForm.tiempo}
                        onChange={handleEditChange}
                        name="tiempo"
                        placeholder="Tiempo estimado (ej: 1h 30min)"
                    />

                    {/* Botones de acción */}
                    <div className="d-flex justify-content-between mt-3">
                        <button className="btn btn-success" onClick={handleSaveChanges}>Guardar Cambios</button>
                        <button className="btn btn-secondary" onClick={() => setEditingDestination(null)}>Cancelar</button>
                    </div>
                </div>
            ) : (
                // Lista de destinos
                destinations.length === 0 ? (
                    <h3 className="text-center">No hay destinos disponibles.</h3>
                ) : (
                    destinations.map((destino) => (
                        <div key={destino.id} className="card mb-3 shadow">
                            <div className="row g-0">
                                {/* Imagen del destino */}
                                <div className="col-md-4">
                                    {destino.fotos?.length > 0 && (
                                        <img
                                            src={destino.fotos[0]}
                                            alt={`Imagen de ${destino.nombre}`}
                                            className="img-fluid rounded-start"
                                            style={{ width: "100%", height: "200px", objectFit: "cover" }}
                                        />
                                    )}
                                </div>

                                {/* Detalles del destino */}
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h3 className="card-title">{destino.nombre}</h3>
                                        <p className="card-text">{destino.descripcion}</p>
                                        <p className="card-text">
                                            <strong>Ranking:</strong> ★ {destino.ranking} |
                                            <strong> Distancia:</strong> {destino.km} km |
                                            <strong> Dificultad:</strong> {destino.dificultad} |
                                            <strong> Tiempo:</strong> {destino.tiempo}
                                        </p>

                                        {/* Botones de Editar y Eliminar */}
                                        <button
                                            className="btn btn-warning me-2"
                                            onClick={() => handleEdit(destino)}
                                        >
                                            ✏️ Editar
                                        </button>

                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(destino.id)}
                                        >
                                            ❌ Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )
            )}
        </div>
    );
};

export default ManageRoutes;
