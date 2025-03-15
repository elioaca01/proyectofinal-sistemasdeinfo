import React from "react"
import { PaypalButton } from "../component/paypalButton.jsx";

const Reservation = () => {
    return (
        <>
            <div className="container-fluid bg-custom-green p-4">
                <h1 className="text-center text-custom-green2 ">RESERVAS</h1>
            </div>
            <div className="container-fluid bg-custom-yellow">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-5">
                            <select className="form-select bg-inputs borde mt-5" aria-label="Default select example">
                                <option defaultValue>Seleccione una ruta</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mt-5 justify-content-center">
                        <div className="col-12 col-md-4 mb-5 borde bg-inputs">
                            <form action="" className="p-4">
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control " id="floatingInput" placeholder="Nombre" />
                                    <label htmlFor="floatingInput">Nombre</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingInput" placeholder="Apellido" />
                                    <label htmlFor="floatingInput">Apellido</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control" id="floatingInput" placeholder="Correo" />
                                    <label htmlFor="floatingInput">Correo</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="tel" className="form-control" id="floatingInput" placeholder="Telefono" />
                                    <label htmlFor="floatingInput">Telefono</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="number" className="form-control" id="floatingInput" placeholder="Numero de Personas" />
                                    <label htmlFor="floatingInput">Numero de Personas</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="date" className="form-control" id="floatingInput" />
                                    <label htmlFor="floatingInput">Fecha</label>
                                </div>
                                <div className="form-floating d-flex justify-content-center mb-3">
                                    <button type="button" className="btn bg-custom-green text-white ">Reservar</button>
                                </div>
                            </form>
                            <PaypalButton/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Reservation