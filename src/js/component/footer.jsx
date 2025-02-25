import React, { Component } from "react";

export const Footer = () => (
	<footer classnNameName="footer py-5 text-center bg-custom-green ">
		<div className="container text-center ">
            <div className="d-flex justify-content-center mt-3 gap-4 mb-4">
                <i className="fab fa-facebook-f"></i>
                <i className="fab fa-twitter"></i>
                <i className="fab fa-instagram"></i>
                <i className="fab fa-youtube"></i>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <h3 className="h4 fw-bold mb-3">Contacto</h3>
                    <p>Dirección: Calle Falsa 123</p>
                    <p>Teléfono: +58 123 456 7890</p>
                    <p>Email: info@avilamet.com</p>
                </div>
                <div className="col-md-4">
                    <h3 className="h4 fw-bold mb-3">Enlaces</h3>
                    <p><a className="text-white text-decoration-none" href="#">Destino</a></p>
                    <p><a className="text-white text-decoration-none" href="#">Reservación</a></p>
                    <p><a className="text-white text-decoration-none" href="#">Foro</a></p>
                    <p><a className="text-white text-decoration-none" href="#">Información</a></p>
                </div>
                <div className="col-md-4">
                    <h3 className="h4 fw-bold mb-3">Descubre</h3>
                    <p><a className="text-white text-decoration-none" href="#">Sabas Nieves</a></p>
                    <p><a className="text-white text-decoration-none" href="#">Lagunazo</a></p>
                    <p><a className="text-white text-decoration-none" href="#">El Banquito</a></p>
                    <p><a className="text-white text-decoration-none" href="#">Pico Naiguatá</a></p>
                </div>
            </div>
        </div>
	</footer>
);
