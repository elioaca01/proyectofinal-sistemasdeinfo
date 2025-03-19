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
        guiaUid: "", // Agregado campo vacío para el UID del guía
    });

    const [pagoExitoso, setPagoExitoso] = useState(false);
    const [paypalReady, setPaypalReady] = useState(false);
    const [precioTotal, setPrecioTotal] = useState(1); // Monto mínimo basado en personas
    const [montoPersonalizado, setMontoPersonalizado] = useState(1); // Permite pagar más

    useEffect(() => {
        setPaypalReady(true);
    }, []);

    useEffect(() => {
        const numPersonas = reserva.numeroPersonas ? parseInt(reserva.numeroPersonas, 10) || 1 : 1;
        const montoMinimo = numPersonas * 1; // $1 por persona
        setPrecioTotal(montoMinimo);
        setMontoPersonalizado(montoMinimo); // Establecer mínimo inicial
    }, [reserva.numeroPersonas]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "numeroPersonas") {
            if (value === "" || (parseInt(value, 10) > 0 && parseInt(value, 10) <= 20)) {
                setReserva({ ...reserva, numeroPersonas: value });
            } else {
                alert("El número de personas debe ser entre 1 y 20.");
            }
        } else if (name === "fecha") {
            const today = new Date().toISOString().split("T")[0];
            if (value < today) {
                alert("No puedes seleccionar una fecha pasada.");
                return;
            }
            setReserva({ ...reserva, fecha: value });
        } else {
            setReserva({ ...reserva, [name]: value });
        }
    };

    const handleMontoChange = (e) => {
        let nuevoMonto = parseFloat(e.target.value);
        if (nuevoMonto < precioTotal) {
            alert(`El monto debe ser al menos $${precioTotal.toFixed(2)}`);
            setMontoPersonalizado(precioTotal);
        } else {
            setMontoPersonalizado(nuevoMonto);
        }
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
            const docRef = await addDoc(collection(db, "reservations"), reserva);
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
                guiaUid: "", // Mantenerlo vacío hasta que se asigne
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
                                        onChange={handleChange} required />
                                    <label>Número de Personas (Máx 20)</label>
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
                                        <div className="mb-3">
                                            <label>Monto a pagar (mínimo ${precioTotal.toFixed(2)})</label>
                                            <input type="number" className="form-control"
                                                value={montoPersonalizado} onChange={handleMontoChange} min={precioTotal} step="0.01" />
                                        </div>
                                        <PayPalButtons
                                            createOrder={(data, actions) => actions.order.create({
                                                purchase_units: [{ amount: { value: montoPersonalizado.toFixed(2) } }]
                                            })}
                                            onApprove={(data, actions) => actions.order.capture().then(() => setPagoExitoso(true))}
                                            onError={() => setPagoExitoso(false)}
                                        />
                                    </PayPalScriptProvider>
                                )}

                                <button type="submit" className="btn bg-custom-green text-white"
                                    disabled={!pagoExitoso}>
                                    Reservar
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Reservation;
