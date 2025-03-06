import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { isAuthenticated, logout } from "../auth.js";
import "../../styles/home.css";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const user = isAuthenticated();
	const { store, actions } = useContext(Context);

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	const goToProfile = () => {
		if (isAuthenticated()) {
			navigate("/profile");
		} else {
			navigate("/login");
		}
	};

	// No mostrar botones si estás en la vista de login
	const isLoginView = location.pathname === "/login";

	return (
		<nav className="py-3 bg-custom-yellow">
			<div className="container d-flex justify-content-between align-items-center">
				<div className="d-flex align-items-center">
					<img
						alt="Logo de la Universidad Metropolitana"
						className="logo-universidad pb-1"
						src="https://res.cloudinary.com/dntc8trob/image/upload/v1740263475/Logo-unimet-6-removebg-preview_x7gf7b.png"
					/>
					<img
						alt="Logo de Avilamet"
						className="logo ms-4"
						src="https://res.cloudinary.com/dntc8trob/image/upload/v1740263488/avilamet-removebg-preview_z9fhqx.png"
					/>
				</div>

				<nav className="d-none d-md-flex align-items-center gap-3 fw-bold">
					<Link to="/" className="text-custom-green text-decoration-none">Destino</Link>
					<Link to="/" className="text-custom-green text-decoration-none">Reservación</Link>
					<Link to="/" className="text-custom-green text-decoration-none">Foro</Link>
					<Link to="/" className="text-custom-green text-decoration-none">Información</Link>
					<Link to="/" className="text-custom-green text-decoration-none">Sobre Avilamet</Link>
				</nav>

				{!isLoginView && (
					<div className="d-flex align-items-center gap-4">
						{user ? (
							<>
								{/* Mostrar botón Perfil solo si NO estás en /profile */}
								{location.pathname !== "/profile" && (
									<Link to="/profile">
										<button className="btn btn-success bg-custom-green text-white">
											Perfil
										</button>
									</Link>
								)}
								<button onClick={handleLogout} className="btn btn-danger text-white">
									Cerrar sesión
								</button>
							</>
						) : (
							<>
								{store.token ? (
									<div className="d-flex align-items-center gap-4">
										<Link to="/">
											<button className="btn btn-success bg-custom-green" onClick={() => actions.close()}>
												Cerrar sesión
											</button>
										</Link>
									</div>
								) : (
									<div className="d-flex align-items-center gap-4">
										<Link to="/login">
											<button className="btn btn-success bg-custom-green text-white">
												Iniciar sesión
											</button>
										</Link>
									</div>
								)}
							</>
						)}
					</div>
				)}
			</div>
		</nav>
	);
};
