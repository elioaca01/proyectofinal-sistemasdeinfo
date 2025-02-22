import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="py-3 bg-custom-yellow">
			<div className="container d-flex justify-content-between align-items-center">
				<div className="d-flex">
					<img alt="Logo de la Universidad Metropolitana" className="logo-universidad" src="https://res.cloudinary.com/dntc8trob/image/upload/v1740263475/Logo-unimet-6-removebg-preview_x7gf7b.png"/>
					<img alt="Logo de Avilamet" className="logo ms-4" src="https://res.cloudinary.com/dntc8trob/image/upload/v1740263488/avilamet-removebg-preview_z9fhqx.png"/>
				</div>

				<nav className="d-none d-md-flex gap-4 fs-3">
					<a className="text-custom-green text-decoration-none" href="#">Destino</a>
					<a className="text-custom-green text-decoration-none" href="#">Reservación</a>
					<a className="text-custom-green text-decoration-none" href="#">Foro</a>
					<a className="text-custom-green text-decoration-none" href="#">Información</a>
					<a className="text-custom-green text-decoration-none" href="#">Sobre Avilamet</a>
				</nav>

				<div className="d-flex align-items-center gap-4">
					<button className="btn btn-success bg-custom-green">Iniciar sesión</button>
					<button className="btn btn-outline-success bg-custom-yellow">Registrarse</button>
				</div>
			</div>
		</nav>
		// <nav classNameName="navbar navbar-light bg-light mb-3">
		// 	<Link to="/">
		// 		<span classNameName="navbar-brand mb-0 h1">React Boilerplate</span>
		// 	</Link>
		// 	<div classNameName="ml-auto">
		// 		<Link to="/demo">
		// 			<button classNameName="btn btn-primary">Check the Context in action</button>
		// 		</Link>
		// 	</div>
		// </nav>
	)
};
