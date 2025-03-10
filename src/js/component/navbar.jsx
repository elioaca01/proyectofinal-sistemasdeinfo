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

	const handleRestrictedAccess = () => {
		alert("Debes registrarte o iniciar sesión para acceder a esta función.");
		navigate("/login");
	};

	// No mostrar botones si estás en la vista de login
	const isLoginView = location.pathname === "/login";

	return (
		<nav className="py-3 bg-custom-yellow" style={{ height: "100px" }}>
			<div className="container d-flex justify-content-between align-items-center">
				{/* Contenedor para los logos */}
				<div className="d-flex align-items-center">
					<img
						alt="Logo de la Universidad Metropolitana"
						className="logo-universidad pb-1"
						style={{ marginTop: "-25px" }}
						src="https://res.cloudinary.com/dntc8trob/image/upload/v1740263475/Logo-unimet-6-removebg-preview_x7gf7b.png"
					/>
					<Link to="/">
						<img
							alt="Logo de la Universidad Metropolitana"
							className="logo-universidad pb-1"
							src="https://res.cloudinary.com/dntc8trob/image/upload/v1740263488/avilamet-removebg-preview_z9fhqx.png"
							style={{ marginTop: "-25px", width: "140px", height: "140px" }}
						/>
					</Link>
				</div>

				{/* Contenedor para los enlaces de navegación */}
				<nav
					className="d-none d-md-flex align-items-center gap-5 fw-bold"
					style={{
						marginLeft: "100px",
						marginRight: "100px",
						marginTop: "-25px",
					}}
				>
					<Link
						to="/destination"
						className="text-custom-green text-decoration-none link-hover"
						style={{ fontSize: "2rem" }}
					>
						Destino
					</Link>
					<Link
						to="/reservation"
						className="text-custom-green text-decoration-none link-hover"
						style={{ fontSize: "2rem" }}
					>
						Reservación
					</Link>
					<Link
						to="/forum"
						className="text-custom-green text-decoration-none link-hover"
						style={{ fontSize: "2rem" }}
					>
						Foro
					</Link>
					<Link
						to="/"
						className="text-custom-green text-decoration-none link-hover"
						style={{ fontSize: "2rem" }}
					>
						Información
					</Link>
				</nav>

				{/* Sección de botones */}
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
								<button
									onClick={handleLogout}
									className="btn btn-danger text-white"
								>
									Cerrar sesión
								</button>
							</>
						) : (
							<>
								{store.token ? (
									<div className="d-flex align-items-center gap-4">
										<Link to="/">
											<button
												className="btn btn-success bg-custom-green"
												onClick={() => actions.close()}
											>
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
