import React from "react"




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
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control " id="floatingInput" placeholder="Nombre"/>
                                        <label for="floatingInput">Nombre</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="floatingInput" placeholder="Apellido"/>
                                        <label for="floatingInput">Apellido</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="email" class="form-control" id="floatingInput" placeholder="Correo"/>
                                        <label for="floatingInput">Correo</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="tel" class="form-control" id="floatingInput" placeholder="Telefono"/>
                                        <label for="floatingInput">Telefono</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="number" class="form-control" id="floatingInput" placeholder="Numero de Personas"/>
                                        <label for="floatingInput">Numero de Personas</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="date" class="form-control" id="floatingInput" />
                                        <label for="floatingInput">Fecha</label>
                                </div>
                                <div class="form-floating d-flex justify-content-center mb-3">
                                    <button type="button" class="btn bg-custom-green text-white ">Reservar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Reservation