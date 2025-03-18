import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
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

    const [pagoExitoso, setPagoExitoso] = useState(false);
    const [paypalReady, setPaypalReady] = useState(false);

    useEffect(() => {
        setPaypalReady(true);  // Confirma que PayPal se ha cargado
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "numeroPersonas" && (value < 1 || value > 10)) {
            alert("El número de personas debe ser entre 1 y 10.");
            return;
        }

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

        if (!pagoExitoso) {
            alert("Debes realizar el pago antes de reservar.");
            return;
        }

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

            setPagoExitoso(false);
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
                                        placeholder="Número de Personas"
                                        value={reserva.numeroPersonas}
                                        onChange={handleChange}
                                        min="1" max="10" required />
                                    <label>Número de Personas (Máx 10)</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="date" className="form-control" name="fecha"
                                        value={reserva.fecha} onChange={handleChange} required
                                        min={new Date().toISOString().split("T")[0]} />
                                    <label>Fecha</label>
                                </div>

                                {/* 🟢 PAYPAL */}
                                {paypalReady && (
                                    <PayPalScriptProvider options={{ "client-id": "AbB7-32DDP6ODkkI8EX_YARuWejKXP9ANCbQjpGK5KTXpzcRTPxgpIcCqNekvKHyFj7Jge8B5nyD88vF" }}>
                                        <div className="mb-3 d-flex justify-content-center">
                                            <PayPalButtons
                                                style={{ layout: "vertical" }}
                                                createOrder={(data, actions) => {
                                                    return actions.order.create({
                                                        purchase_units: [
                                                            { amount: { value: "10.00" } }
                                                        ],
                                                    });
                                                }}
                                                onApprove={(data, actions) => {
                                                    return actions.order.capture().then((details) => {
                                                        alert("Pago exitoso: " + details.payer.name.given_name);
                                                        setPagoExitoso(true);
                                                    });
                                                }}
                                                onError={() => {
                                                    alert("Hubo un error con el pago.");
                                                    setPagoExitoso(false);
                                                }}
                                            />
                                        </div>
                                    </PayPalScriptProvider>
                                )}

                                <div className="form-floating d-flex justify-content-center mt-3">
                                    <button type="submit" className="btn bg-custom-green text-white"
                                        disabled={!pagoExitoso}>
                                        Reservar
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Reservation;
