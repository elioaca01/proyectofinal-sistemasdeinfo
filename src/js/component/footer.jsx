import React, { Component } from "react";

export const Footer = () => (
	<footer className="footer py-5 text-center bg-custom-green ">
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
                    <p><span className="text-white text-decoration-none" >Destino</span></p>
                    <p><span className="text-white text-decoration-none" >Reservación</span></p>
                    <p><span className="text-white text-decoration-none" >Foro</span ></p>
                    <p><span  className="text-white text-decoration-none" >Información</span></p>
                </div>
                <div className="col-md-4">
                    <h3 className="h4 fw-bold mb-3">Descubre</h3>
                    <p><span  className="text-white text-decoration-none" >Sabas Nieves</span ></p>
                    <p><span  className="text-white text-decoration-none" >Lagunazo</span ></p>
                    <p><span  className="text-white text-decoration-none" >El Banquito</span ></p>
                    <p><span  className="text-white text-decoration-none" >Pico Naiguatá</span ></p>
                </div>
            </div>
        </div>
	</footer>
);
