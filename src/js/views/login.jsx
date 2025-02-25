import React from "react";
import "../../styles/login.css"


const Login = () => {
    return (
        <div className="w-100 bg-custom-yellow">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 d-flex flex-column align-items-center mt-5">
                        <h2 className="text-center">Bienvenido a esta nueva aventura!</h2>
                        <img className="logo-login" src="https://res.cloudinary.com/dntc8trob/image/upload/v1740263488/avilamet-removebg-preview_z9fhqx.png" alt="logo avilamet" />
                    </div>
                    <div className="col-12 col-md-7 mt-5">
                        <div className="container bg-inputs borde container-width">
                            <nav className="fs-3 d-flex justify-content-center borde p-3">
                                <div className="nav nav-tabs bg-inputs" id="nav-tab" role="tablist">
                                    <button class="nav-link active border-end" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Iniciar Sesion</button>
                                    <button className="nav-link " id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Registrarme</button>
                                </div>
                            </nav>
                            <div class="tab-content  mt-2" id="nav-tabContent">
                                <div class="tab-pane fade show active " id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                    <form action="" className="d-flex flex-column align-items-center">
                                        <input class="form-control form-control-lg text-white inputs-width borde-input" type="text" placeholder="Correo" aria-label=".form-control-lg example"/>
                                        <input class="form-control form-control-lg text-white inputs-width borde-input mt-3" type="password" placeholder="Contraseña" aria-label=".form-control-lg example"></input>
                                        <button className="btn text-white bg-custom-green button-width mt-3" type="submit">Iniciar sesion</button>
                                        <div className="container d-flex flex-column align-items-center mb-4 mt-3">
                                            <h5>--CONTINUAR CON--</h5>
                                            <div className="iconos justify-content-center">
                                                <img className="icono-login-google"  src="https://res.cloudinary.com/dntc8trob/image/upload/v1740431278/pngwing.com_5_xlprpf.png" />
                                                <img className="icono-login-face"  src="https://res.cloudinary.com/dntc8trob/image/upload/v1740431488/pngwing.com_6_jgwllf.png" />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                    <form className="d-flex flex-column align-items-center">
                                        <input class="form-control form-control-lg mb-2 text-white inputs-width borde-input" type="text" placeholder="Nombre" aria-label=".form-control-lg example"/>
                                        <input class="form-control form-control-lg mb-2 text-white inputs-width borde-input" type="text" placeholder="Apellido" aria-label=".form-control-lg example"/>
                                        <input class="form-control form-control-lg mb-2 text-white inputs-width borde-input" type="email" placeholder="Correo" aria-label=".form-control-lg example"/>
                                        <input class="form-control form-control-lg mb-2 text-white inputs-width borde-input" type="tel" placeholder="Telefono" aria-label=".form-control-lg example"/>
                                        <input class="form-control form-control-lg mb-2 text-white inputs-width borde-input" type="text" placeholder="Nombre de usuario" aria-label=".form-control-lg example"/>
                                        <input class="form-control form-control-lg mb-2 text-white inputs-width borde-input" type="password" placeholder="Contraseña" aria-label=".form-control-lg example"/>
                                        <input class="form-control form-control-lg text-white inputs-width borde-input" type="password" placeholder="Confirma contraseña" aria-label=".form-control-lg example"/>
                                        <button className="btn text-white bg-custom-green button-width mb-4 mt-3" type="submit">Crear cuenta</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="my-5"></div>
                </div>
            </div>

        </div>
    )
}

export default Login