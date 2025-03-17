import React, { useState } from "react";
import { PaypalButton } from "../component/paypalButton.jsx";
import { db } from "../../js/firebase.js";
import { collection, addDoc } from "firebase/firestore";

const Reservation = () => {
    const [reserva, setReserva] = useState({
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        numeroPersonas: "",
        fecha: "",
        ruta: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Restricción para número de personas (máximo 10)
        if (name === "numeroPersonas" && (value < 1 || value > 10)) {
            alert("El número de personas debe ser entre 1 y 10.");
            return;
        }

        // Restricción para la fecha (no se permiten fechas pasadas)
        if (name === "fecha") {
            const today = new Date().toISOString().split("T")[0];
            if (value < today) {
                alert("No puedes seleccionar una fecha pasada.");
                return;
            }
        }

        setReserva({
            ...reserva,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación para asegurarse de que se seleccionó una ruta
        if (!reserva.ruta) {
            alert("Por favor, selecciona una ruta antes de reservar.");
            return;
        }

        try {
            const docRef = await addDoc(collection(db, "reservas"), reserva);
            console.log("✅ Reserva guardada con ID:", docRef.id);
            alert("Reserva realizada con éxito!");

            setReserva({
                nombre: "",
                apellido: "",
                email: "",
                telefono: "",
                numeroPersonas: "",
                fecha: "",
                ruta: "",
            });
        } catch (error) {
            console.error("❌ Error al guardar la reserva:", error);
            alert("Hubo un error al guardar la reserva.");
        }
    };
    return (
        <>
            <div className="container-fluid bg-custom-green p-4">
                <h1 className="text-center text-custom-green2">RESERVAS</h1>
            </div>
            <div className="container-fluid bg-custom-yellow">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-5">
                            <select className="form-select bg-inputs borde mt-5"
                                name="ruta"
                                value={reserva.ruta}
                                onChange={handleChange}
                                required>
                                <option value="">Seleccione una ruta</option>
                                <option value="Sabas Nieve">Sabas Nieve</option>
                                <option value="Lagunazo">Lagunazo</option>
                                <option value="El Banquito, Lagunazo y Pico">El Banquito, Lagunazo y Pico</option>
                                <option value="Pico Naiguiata">Pico Naiguiata</option>
                                <option value="Cruz de los palmeros y Pico Oriental">Cruz de los palmeros y Pico Oriental</option>
                                <option value="Piedra del indio Via Quebrada Quintero">Piedra del indio Via Quebrada Quintero</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mt-5 justify-content-center">
                        <div className="col-12 col-md-4 mb-5 borde bg-inputs">
                            <form onSubmit={handleSubmit} className="p-4">
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" name="nombre"
                                        placeholder="Nombre" value={reserva.nombre}
                                        onChange={handleChange} required />
                                    <label>Nombre</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" name="apellido"
                                        placeholder="Apellido" value={reserva.apellido}
                                        onChange={handleChange} required />
                                    <label>Apellido</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control" name="email"
                                        placeholder="Correo" value={reserva.email}
                                        onChange={handleChange} required />
                                    <label>Correo</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="tel" className="form-control" name="telefono"
                                        placeholder="Teléfono" value={reserva.telefono}
                                        onChange={handleChange} required />
                                    <label>Teléfono</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="number" className="form-control" name="numeroPersonas"
                                        placeholder="Número de Personas" value={reserva.numeroPersonas}
                                        onChange={handleChange} required />
                                    <label>Número de Personas</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="date" className="form-control" name="fecha"
                                        value={reserva.fecha} onChange={handleChange} required />
                                    <label>Fecha</label>
                                </div>
                                <div className="form-floating d-flex justify-content-center mb-3">
                                    <button type="submit" className="btn bg-custom-green text-white">Reservar</button>
                                </div>
                            </form>
                            <PaypalButton />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Reservation;
