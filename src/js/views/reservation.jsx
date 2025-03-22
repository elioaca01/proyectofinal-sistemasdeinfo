import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"; // Reintegrado
import { db, auth } from "../../js/firebase.js";
import { collection, addDoc, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
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
        guiaId: "",
    });

    const [pagoExitoso, setPagoExitoso] = useState(false);
    const [precioTotal, setPrecioTotal] = useState(1);
    const [montoPersonalizado, setMontoPersonalizado] = useState(1);
    const [excursiones, setExcursiones] = useState([]);
    const [excursionSeleccionada, setExcursionSeleccionada] = useState(null);
    const [usuario, setUsuario] = useState(null);
    const [destinos, setDestinos] = useState([]); // Nuevo estado para los destinos

    useEffect(() => {
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

    // Cargar los destinos desde Firestore
    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "destinations"));
                const availableDestinations = querySnapshot.docs.map(doc => ({
                    ...doc.data(),
                }));
                setDestinos(availableDestinations);
                console.log("Destinations loaded:", availableDestinations);
            } catch (error) {
                console.error("Error al obtener los destinos:", error);
            }
        };

        fetchDestinations();
    }, []);

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
            const resultados = querySnapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .filter(excursion => !excursion.reservadoPor); // Filtra las excursiones donde "reservadoPor" está vacío
            setExcursiones(resultados);
        } catch (error) {
            console.error("Error al buscar excursiones:", error);
        }
    };

    const handleSeleccionarExcursion = (excursion) => {
        setExcursionSeleccionada(excursion);
        setReserva({
            ...reserva,
            ruta: excursion.nombre,
            guiaId: excursion.guiaId,
            fecha: excursion.fecha
        });
    };

    const handleCancelarSeleccion = () => {
        setExcursionSeleccionada(null);
        setReserva({ ...reserva, ruta: "", guiaId: "", fecha: "" });
    };

    const handleReserva = async () => {
        try {
            if (parseInt(reserva.numeroPersonas) > 20) {
                alert("El máximo de personas por reserva es 20.");
                return;
            }

            // Verificación de campos
            if (!reserva.guiaId) {
                throw new Error("El campo guía no puede estar vacío.");
            }

            const reservaData = {
                nombre: usuario.displayName || "",
                email: usuario.email || "",
                telefono: usuario.phoneNumber || "",
                numeroPersonas: reserva.numeroPersonas || 1,
                ruta: reserva.ruta || "",
                fecha: reserva.fecha || "",
                guiaId: reserva.guiaId,
                pagoExitoso: pagoExitoso,
            };

            // Asegúrate de que todos los campos estén definidos antes de enviar
            for (let key in reservaData) {
                if (reservaData[key] === undefined || reservaData[key] === null || reservaData[key] === "") {
                    if (key !== "telefono") {
                        throw new Error(`El campo ${key} no puede ser nulo, indefinido o vacío`);
                    }
                }
            }

            console.log("Datos de reserva:", reservaData); // Verifica los datos

            // Crear el ID de la reserva manualmente (con un UUID o cualquier otro método)
            const idReserva = new Date().getTime().toString(); // Usamos el timestamp como un ID único

            // Agregar la reserva en Firestore
            const reservaDocRef = await addDoc(collection(db, "reservas"), { ...reservaData, idReserva });

            // Ahora actualizamos la excursión seleccionada con el idReserva
            if (excursionSeleccionada) {
                const excursionRef = doc(db, "excursions", excursionSeleccionada.id);
                await updateDoc(excursionRef, {
                    reservadoPor: idReserva // Agregar el id de la reserva a la excursión
                });
            }

            alert("Reserva realizada con éxito.");

            setReserva({
                nombre: "",
                apellido: "",
                email: "",
                telefono: "",
                numeroPersonas: 1,
                fecha: "",
                ruta: "",
                guiaId: "",
            });

        } catch (error) {
            console.error("Error al realizar la reserva:", error);
            alert("Hubo un error al realizar la reserva: " + error.message);
        }
    };

    const handlePagoExitoso = (details) => {
        setPagoExitoso(true);
        alert("¡Pago realizado con éxito!");
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
                            {destinos.map((destino, index) => (
                                <option key={index} value={destino.nombre}>{destino.nombre}</option>
                            ))}
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

                            {/* PayPal Integration */}
                            <PayPalScriptProvider options={{ "client-id": "AbB7-32DDP6ODkkI8EX_YARuWejKXP9ANCbQjpGK5KTXpzcRTPxgpIcCqNekvKHyFj7Jge8B5nyD88vF" }}>
                                <PayPalButtons
                                    style={{ layout: "vertical" }}
                                    createOrder={(data, actions) => {
                                        return actions.order.create({
                                            purchase_units: [
                                                {
                                                    amount: {
                                                        value: montoPersonalizado.toFixed(2), // Monto mínimo
                                                    },
                                                },
                                            ],
                                        });
                                    }}
                                    onApprove={handlePagoExitoso}
                                />
                            </PayPalScriptProvider>

                            {pagoExitoso && excursionSeleccionada && (
                                <button type="button" className="btn text-white w-100 mt-3"
                                    style={{ backgroundColor: "#045c2c", borderRadius: "10px", fontSize: "18px" }}
                                    onClick={handleReserva}>
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
