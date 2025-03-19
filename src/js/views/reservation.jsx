import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { db, auth } from "../../js/firebase.js";
import { collection, addDoc, query, where, getDocs, doc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Reservation = () => {
    const [reserva, setReserva] = useState({
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        numeroPersonas: 1, // Valor inicial de 1 persona
        fecha: "",
        ruta: "",
        guiaUid: "",
    });

    const [pagoExitoso, setPagoExitoso] = useState(false);
    const [paypalReady, setPaypalReady] = useState(false);
    const [precioTotal, setPrecioTotal] = useState(1);
    const [montoPersonalizado, setMontoPersonalizado] = useState(1);
    const [excursiones, setExcursiones] = useState([]);
    const [excursionSeleccionada, setExcursionSeleccionada] = useState(null);
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        setPaypalReady(true);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUsuario(user); // Usuario autenticado
                setReserva({ ...reserva, email: user.email, telefono: user.phoneNumber });
            }
        });

        return () => unsubscribe(); // Limpiar el listener
    }, [reserva.email]);

    useEffect(() => {
        const numPersonas = reserva.numeroPersonas ? parseInt(reserva.numeroPersonas, 10) || 1 : 1;
        const montoMinimo = numPersonas * 1; // El monto mínimo es $1 por persona
        setPrecioTotal(montoMinimo);
        setMontoPersonalizado(montoMinimo);
    }, [reserva.numeroPersonas]);

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setReserva({ ...reserva, [name]: value });

        if (name === "ruta" && value) {
            buscarExcursiones(value);
            setExcursionSeleccionada(null);
        }
    };

    const buscarExcursiones = async (rutaSeleccionada) => {
        try {
            const q = query(collection(db, "excursions"), where("nombre", "==", rutaSeleccionada));
            const querySnapshot = await getDocs(q);
            const resultados = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setExcursiones(resultados);
        } catch (error) {
            console.error("Error al buscar excursiones:", error);
        }
    };

    const handleSeleccionarExcursion = (excursion) => {
        setExcursionSeleccionada(excursion);
        setReserva({ ...reserva, ruta: excursion.nombre, guiaUid: excursion.guiaUid, fecha: excursion.fecha });
    };

    const handleCancelarSeleccion = () => {
        setExcursionSeleccionada(null);
        setReserva({ ...reserva, ruta: "", guiaUid: "", fecha: "" });
    };

    const handleReserva = async () => {
        try {
            if (parseInt(reserva.numeroPersonas) > 20) {
                alert("El máximo de personas por reserva es 20.");
                return;
            }

            const reservaData = {
                nombre: usuario.displayName, // Nombre del usuario autenticado
                email: usuario.email,        // Correo del usuario
                telefono: usuario.phoneNumber, // Teléfono del usuario
                numeroPersonas: reserva.numeroPersonas,
                ruta: reserva.ruta,
                fecha: reserva.fecha,
                guiaUid: reserva.guiaUid,
                pagoExitoso: pagoExitoso,
            };

            await addDoc(collection(db, "reservas"), reservaData);
            alert("Reserva realizada con éxito.");

            setReserva({
                nombre: "",
                apellido: "",
                email: "",
                telefono: "",
                numeroPersonas: 1, // Reiniciar a 1 persona
                fecha: "",
                ruta: "",
                guiaUid: "",
            });

        } catch (error) {
            console.error("Error al realizar la reserva:", error);
        }
    };

    return (
        <>
            <div className="container-fluid p-4 text-center" style={{ backgroundColor: "#045c2c" }}>
                <h1 className="text-white fw-bold">RESERVAS</h1>
            </div>

            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-5">
                        <select className="form-select borde mt-3 p-2"
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

                {!excursionSeleccionada && excursiones.length > 0 && (
                    <div className="row mt-4 justify-content-center">
                        {excursiones.map(excursion => (
                            <div key={excursion.id} className="col-md-4 mb-4">
                                <div className="card shadow-lg p-3 text-center" style={{ borderRadius: "15px" }}>
                                    <h5 className="fw-bold">{excursion.nombre}</h5>
                                    <p className="text-muted">{excursion.descripcion}</p>
                                    <button className="btn btn-success mt-2" onClick={() => handleSeleccionarExcursion(excursion)}>
                                        Seleccionar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {excursionSeleccionada && (
                    <div className="row mt-4 justify-content-center">
                        <div className="col-md-6 text-center">
                            <div className="card p-3 shadow-lg" style={{ borderRadius: "15px" }}>
                                <h4 className="fw-bold text-success">{excursionSeleccionada.nombre}</h4>
                                <p className="text-muted">Fecha: {excursionSeleccionada.fecha}</p>
                                <p className="text-muted">Guía: {excursionSeleccionada.guia}</p>
                                <button className="btn btn-danger mt-2" onClick={handleCancelarSeleccion}>
                                    Cancelar selección
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="row mt-5 justify-content-center">
                    <div className="col-12 col-md-4 mb-5 p-4 border rounded shadow bg-light">
                        <form>
                            <div className="mb-3">
                                <label className="fw-bold">Cantidad de personas (máximo 20)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="numeroPersonas"
                                    value={reserva.numeroPersonas}
                                    onChange={handleChange}
                                    min="1"
                                    max="20"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="fw-bold">Monto a pagar (mínimo ${precioTotal.toFixed(2)})</label>
                                <input type="number" className="form-control"
                                    value={montoPersonalizado} onChange={(e) => setMontoPersonalizado(parseFloat(e.target.value))}
                                    min={precioTotal} step="0.01" />
                            </div>

                            {paypalReady && (
                                <PayPalScriptProvider options={{ "client-id": "AbB7-32DDP6ODkkI8EX_YARuWejKXP9ANCbQjpGK5KTXpzcRTPxgpIcCqNekvKHyFj7Jge8B5nyD88vF" }}>
                                    <PayPalButtons
                                        createOrder={(data, actions) => actions.order.create({
                                            purchase_units: [{ amount: { value: montoPersonalizado.toFixed(2) } }]
                                        })}
                                        onApprove={(data, actions) => actions.order.capture().then(() => setPagoExitoso(true))}
                                    />
                                </PayPalScriptProvider>
                            )}

                            {excursionSeleccionada && (
                                <button type="button" className="btn text-white w-100 mt-3"
                                    style={{ backgroundColor: "#045c2c", borderRadius: "10px", fontSize: "18px" }}
                                    disabled={!pagoExitoso} onClick={handleReserva}>
                                    Reservar
                                </button>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Reservation;
