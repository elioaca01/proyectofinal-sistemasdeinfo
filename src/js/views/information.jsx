import React from "react";


const Information = () =>{
    return(
       <>
            <div className="contenedor-imagen w-100">
                <img src="https://res.cloudinary.com/dntc8trob/image/upload/v1741746514/pexels-walcouyi-4148187_z8oz5m.jpg" className="img-fluid banner" alt="imagen-info" />
                <h1 className="texto-centrado">
                    INFORMACION
                </h1>
            </div>
            <div className="container-fluid bg-custom-yellow">
                <div className="container">
                    <div className="row bg-custom-green borde p-5">
                        <div className="col-12 col-md-6">
                            <h2 className="text-decoration-underline text-custom-paragraph2">ELEVACIONES</h2>
                            <p className="text-custom-paragraph2 fs-4 mt-3">El Avila tiene 4 elevaciones principales que están ubicadas en el Suroeste del parque. Esta es la zona más concurrida, debido a que las principales rutas y servicios pasan por esa región. Sin embargo es la zona menos virgen del parque. 
                            <br />
                            <br />
                            Por otro lado, se puede encontrar naturaleza casi intacta en la vertiente norte, pero existe muy poca documentación sobre las rutas, y algunos caminos han desaparecido con el tiempo.</p>
                        </div>
                        <div className="col-12 col-md-6 d-flex flex-column align-items-center">
                            <img src="https://res.cloudinary.com/dntc8trob/image/upload/v1741751295/mount_1_chuqkg.jpg" className="img-fluid imagen mb-5" alt="imagen" />
                            <img src="https://res.cloudinary.com/dntc8trob/image/upload/v1741751295/mount_1_chuqkg.jpg" className="img-fluid imagen" alt="imagen" />

                        </div>
                    </div>
                    <div className="row mt-2">
                        <img src="https://res.cloudinary.com/dntc8trob/image/upload/v1741803130/eleva_jnytaz.jpg" alt="img avila" />
                        <div className="container d-flex justify-content-between mt-4">
                            <div className="col-12 col-md-5 bg-custom-green width-card borde">
                                <div className="d-flex flex-column align-items-center p-4">
                                    <img src="https://res.cloudinary.com/dntc8trob/image/upload/v1741803523/avipic_jhfjmo.jpg" className="img-fluid imagen  pt-4" alt="img" />
                                    <div className="container">
                                        <div className="d-flex">
                                            <i class="fa-solid fa-caret-up fs-1 color-purple"></i>
                                            <p className="fs-2 ms-3 yellow">Pico el Avila</p>
                                        </div>
                                        <div className="d-flex align-items-start">
                                            <i class="fa-solid fa-up-long fs-1 yellow"></i>
                                            <p className="fs-3 ms-3 yellow">2.250 m.s.n.m.</p>
                                        </div>
                                        <div className="d-flex align-items-start">
                                            <i class="fa-solid fa-globe yellow fs-1"></i>
                                            <p className="fs-5 ms-3 yellow">Es un pico en la parte central, ubicada en el corazón del parque, siendo la más famosa.</p>
                                        </div>
                                    </div>
                                </div>
                            
                            </div>
                            <div className="col-12 col-md-5 width-card bg-custom-green borde">
                                <div className="d-flex flex-column align-items-center p-4">
                                    <img src="https://res.cloudinary.com/dntc8trob/image/upload/v1741804512/naigua_u21zwa.jpg" className="rounded imagen pt-4" alt="" />
                                    <div className="container">
                                        <div className="d-flex">
                                            <i class="fa-solid fa-caret-up fs-1 color-red"></i>
                                            <p className="fs-2 ms-3 yellow">Pico Naiguata</p>
                                        </div>
                                        <div className="d-flex align-items-start">
                                            <i class="fa-solid fa-up-long fs-1 yellow"></i>
                                            <p className="fs-3 ms-3 yellow">2.765 m.s.n.m.</p>
                                        </div>
                                        <div className="d-flex align-items-start">
                                            <i class="fa-solid fa-globe yellow fs-1"></i>
                                            <p className="fs-5 ms-3 yellow">El nombre del Naiguatá proviene de un poderoso cacique, es el pico más alto.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container d-flex justify-content-between mt-4">
                            <div className="col-12 col-md-5 bg-custom-green width-card borde">
                                <div className="d-flex flex-column align-items-center p-4">
                                    <img src="https://res.cloudinary.com/dntc8trob/image/upload/v1741833818/oriental_ygecmw.jpg" className="img-fluid imagen  pt-4" alt="img" />
                                    <div className="container">
                                        <div className="d-flex">
                                            <i class="fa-solid fa-caret-up fs-1 color-yellow"></i>
                                            <p className="fs-2 ms-3 yellow">Pico Oriental</p>
                                        </div>
                                        <div className="d-flex align-items-start">
                                            <i class="fa-solid fa-up-long fs-1 yellow"></i>
                                            <p className="fs-3 ms-3 yellow">2.640 m.s.n.m.</p>
                                        </div>
                                        <div className="d-flex align-items-start">
                                            <i class="fa-solid fa-globe yellow fs-1"></i>
                                            <p className="fs-5 ms-3 yellow">Es el segundo pico más alto del parque, donde además se encuentra la Cruz de palmeros.</p>
                                        </div>
                                    </div>
                                </div>
                            
                            </div>
                            <div className="col-12 col-md-5 width-card bg-custom-green borde">
                                <div className="d-flex flex-column align-items-center p-4">
                                    <img src="https://res.cloudinary.com/dntc8trob/image/upload/v1741833745/occi_z6taht.jpg" className="rounded imagen pt-4" alt="" />
                                    <div className="container">
                                        <div className="d-flex">
                                            <i class="fa-solid fa-caret-up fs-1 color-green"></i>
                                            <p className="fs-2 ms-3 yellow">Pico Occidental</p>
                                        </div>
                                        <div className="d-flex align-items-start">
                                            <i class="fa-solid fa-up-long fs-1 yellow"></i>
                                            <p className="fs-3 ms-3 yellow">2.480 m.s.n.m.</p>
                                        </div>
                                        <div className="d-flex align-items-start">
                                            <i class="fa-solid fa-globe yellow fs-1"></i>
                                            <p className="fs-5 ms-3 yellow">Es el tercer pico más alto del parque, se puede ver el mar y el Hotel Humboldt.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="container mt-5">
                            <div className="row p-2">
                                <div className="col-12 col-md-3 d-flex justify-content-center">
                                    <i class="fa-solid fa-message icono-message custom-green"></i>
                                </div>
                                <div className="col-12 col-md-9 d-flex flex-column justify-content-start">
                                    <h1>SABIAS QUE...</h1>
                                    <p className="fs-1">¡El Parque Nacional El Ávila  es la principal fuente de oxígeno de Caracas!</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 bg-custom-green rounded-lg mt-3 p-5">
                                    <h1 className="text-center">RECOMENDACIONES</h1>
                                </div>
                            </div>
                            <div className="row mt-5">
                                <div className="col-12 col-md-7 custom-green">
                                    <h2>SENDERISTAS:</h2>
                                    <p className="fs-2"> Antes de visitar el parque nacional:</p>
                                    <ul className="fs-3">
                                        <li>Regístrate y planifica tu ruta</li>
                                        <li>Lleva un mapa</li>
                                        <li>Hidrátate bien</li>
                                        <li>No te separes del grupo </li>
                                        <li>No pierdas de vista a tu guía</li>
                                        <li>Economiza la batería de tu teléfono </li>
                                        <li>Ten a mano los números de emergencia.</li>
                                    </ul>
                                    <p className="fs-2">¡Disfruta del parque de forma segura!</p>
                                </div>
                                <div className="col-12 col-md-5 d-flex align-items-center justify-content-center">
                                    <img src="https://res.cloudinary.com/dntc8trob/image/upload/v1741883215/580945f1766ee31e3d6a6466c2f304ab_qzrzgz.jpg" className="img-fluid height borde" alt="personas" />
                                </div>
                            </div>
                            <div className="row mt-5">
                                <div className="col-12 col-md-5 d-flex align-items-center justify-content-center">
                                    <img src="https://res.cloudinary.com/dntc8trob/image/upload/v1741888790/man-6800728_1280_razjyi.jpg" className="img-fluid height2 borde" alt="personas" />
                                </div>
                                <div className="col-12 col-md-7 custom-green">
                                    <h2>ACAMPADORES</h2>
                                    <p className="fs-2"> Antes de visitar el parque nacional:</p>
                                    <ul className="fs-3">
                                        <li>Asegúrate de llevar el equipo básico de acampada, 
                                        carpa, saco de dormir y linterna. Al acampar, 
                                        elige lugares conocidos como Loma Serrano o No Te Apures. </li>
                                        <li>Evita zonas de maleza alta y caminos desconocidos.</li>
                                        <li>Pide a tu guía consejos</li>
                                        <li>Sigue instrucciones</li>
                                        <li>Respeta la fauna, a otros visitantes y 
                                        usa calzado adecuado. Recuerda que estás en un entorno natural con animales salvajes.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       </>
    )
}

export default Information;