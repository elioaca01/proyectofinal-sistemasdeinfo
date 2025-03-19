import React from "react";

const Information = () => {
    return (
        <>
            <div className="position-relative w-100 overflow-hidden" style={{ height: "500px" }}>
                <img src="https://res.cloudinary.com/dntc8trob/image/upload/v1741746514/pexels-walcouyi-4148187_z8oz5m.jpg" className="img-fluid w-100" alt="imagen-info" style={{ objectFit: "cover", height: "100%" }} />
                <h1 className="position-absolute top-50 start-50 translate-middle text-white fw-bold display-4 text-shadow">
                    INFORMACIÓN
                </h1>
            </div>
            <div className="container-fluid py-5" style={{ backgroundColor: "#f8f9fa" }}>
                <div className="container">
                    <div className="row bg-light shadow rounded p-5">
                        <div className="col-12 col-md-6">
                            <h2 className="text-decoration-underline text-success fw-bold">ELEVACIONES</h2>
                            <p className="text-dark fs-5 mt-3">
                                El Ávila tiene 4 elevaciones principales ubicadas en el suroeste del parque. Esta es la zona más concurrida debido a que las principales rutas y servicios pasan por allí.
                                <br /><br />
                                Se puede encontrar naturaleza casi intacta en la vertiente norte, pero hay poca documentación sobre las rutas y algunos caminos han desaparecido con el tiempo.
                            </p>
                        </div>
                        <div className="col-12 col-md-6 d-flex flex-column align-items-center">
                            <img src="https://res.cloudinary.com/dntc8trob/image/upload/v1741751295/mount_1_chuqkg.jpg" className="img-fluid rounded shadow mb-4" alt="imagen" />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <img src="https://res.cloudinary.com/dntc8trob/image/upload/v1741803130/eleva_jnytaz.jpg" className="img-fluid rounded shadow" alt="img avila" />
                    </div>
                    <div className="row mt-5">
                        <div className="col-md-6 mb-4">
                            <div className="bg-white shadow rounded p-4 text-center">
                                <img src="https://res.cloudinary.com/dntc8trob/image/upload/v1741803523/avipic_jhfjmo.jpg" className="img-fluid rounded mb-3" alt="img" />
                                <h4 className="text-success fw-bold">Pico el Ávila</h4>
                                <p className="text-muted">2.250 m.s.n.m.</p>
                                <p className="text-dark">Ubicado en el corazón del parque, siendo la elevación más famosa.</p>
                            </div>
                        </div>
                        <div className="col-md-6 mb-4">
                            <div className="bg-white shadow rounded p-4 text-center">
                                <img src="https://res.cloudinary.com/dntc8trob/image/upload/v1741804512/naigua_u21zwa.jpg" className="img-fluid rounded mb-3" alt="img" />
                                <h4 className="text-danger fw-bold">Pico Naiguatá</h4>
                                <p className="text-muted">2.765 m.s.n.m.</p>
                                <p className="text-dark">El pico más alto del parque, cuyo nombre proviene de un cacique indígena.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5 bg-success text-white rounded p-4">
                        <h2 className="text-center fw-bold">SABÍAS QUE...</h2>
                        <p className="fs-4 text-center">El Parque Nacional El Ávila es la principal fuente de oxígeno de Caracas.</p>
                    </div>
                    <div className="row mt-5">
                        <div className="col-md-6">
                            <h3 className="fw-bold text-success">Recomendaciones para senderistas:</h3>
                            <ul className="fs-5 text-dark">
                                <li>Regístrate y planifica tu ruta.</li>
                                <li>Lleva un mapa y suficiente agua.</li>
                                <li>No te separes del grupo.</li>
                                <li>Economiza la batería de tu teléfono.</li>
                            </ul>
                        </div>
                        <div className="col-md-6 text-center overflow-hidden" style={{ height: "400px" }}>
                            <img src="https://res.cloudinary.com/dntc8trob/image/upload/v1741883215/580945f1766ee31e3d6a6466c2f304ab_qzrzgz.jpg" className="img-fluid rounded shadow" alt="senderistas" style={{ objectFit: "cover", height: "100%", width: "100%" }} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Information;